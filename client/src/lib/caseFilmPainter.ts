export interface CaseFilmPainter {
  draw(video: HTMLVideoElement): void;
  dispose(): void;
}

/** Remove the studio matte during playback, so the object sits on the actual
 * page colour. Gold and burgundy are preserved by the neutral-colour test. */
export function createCaseFilmPainter(
  canvas: HTMLCanvasElement
): CaseFilmPainter {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: true,
    powerPreference: "low-power",
  });
  if (!gl) return createCpuPainter(canvas);

  const shader = (type: number, source: string) => {
    const result = gl.createShader(type);
    if (!result) throw new Error("Case film shader unavailable");
    gl.shaderSource(result, source);
    gl.compileShader(result);
    if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) {
      gl.deleteShader(result);
      throw new Error("Case film shader failed to compile");
    }
    return result;
  };
  const vertex = shader(
    gl.VERTEX_SHADER,
    `
    attribute vec2 position;
    varying vec2 uv;
    void main() {
      uv = vec2((position.x + 1.0) * 0.5, (1.0 - position.y) * 0.5);
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `
  );
  const fragment = shader(
    gl.FRAGMENT_SHADER,
    `
    precision mediump float;
    uniform sampler2D film;
    varying vec2 uv;
    void main() {
      vec3 c = texture2D(film, uv).rgb;
      float lo = min(c.r, min(c.g, c.b));
      float hi = max(c.r, max(c.g, c.b));
      float matte = smoothstep(0.87, 0.97, lo)
                  * (1.0 - smoothstep(0.035, 0.12, hi - lo));
      float alpha = 1.0 - matte;
      vec3 foreground = clamp((c - vec3(matte)) / max(alpha, 0.001), 0.0, 1.0);
      gl_FragColor = vec4(foreground, alpha);
    }
  `
  );
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  if (!program || !buffer || !texture)
    throw new Error("Case film renderer unavailable");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
    gl.deleteTexture(texture);
    throw new Error("Case film renderer failed to link");
  }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(gl.getUniformLocation(program, "film"), 0);
  gl.disable(gl.BLEND);

  return {
    draw(video) {
      if (gl.isContextLost()) throw new Error("Case film context lost");
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        video
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    },
  };
}

function createCpuPainter(canvas: HTMLCanvasElement): CaseFilmPainter {
  const context = canvas.getContext("2d", {
    alpha: true,
    willReadFrequently: true,
  });
  if (!context) throw new Error("Case film canvas unavailable");
  const smooth = (low: number, high: number, value: number) => {
    const t = Math.min(1, Math.max(0, (value - low) / (high - low)));
    return t * t * (3 - 2 * t);
  };
  return {
    draw(video) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frame.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i] / 255,
          g = pixels[i + 1] / 255,
          b = pixels[i + 2] / 255;
        const lo = Math.min(r, g, b),
          hi = Math.max(r, g, b);
        const matte =
          smooth(0.87, 0.97, lo) * (1 - smooth(0.035, 0.12, hi - lo));
        const alpha = 1 - matte;
        for (let c = 0; c < 3; c++)
          pixels[i + c] = Math.min(
            255,
            Math.max(0, (pixels[i + c] - matte * 255) / Math.max(alpha, 0.001))
          );
        pixels[i + 3] = alpha * 255;
      }
      context.putImageData(frame, 0, 0);
    },
    dispose() {},
  };
}
