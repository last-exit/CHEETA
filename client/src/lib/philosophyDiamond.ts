import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createDiamondMaterial } from "./diamondOptics";

export const DIAMOND_POSE = { x: 0.25, y: -0.48 };
const MAX_RENDER_PIXELS = 1_400_000;

/** User-supplied geometry; the original author is credited on the page. */
export async function createDiamondStudio(
  mount: HTMLElement,
  signal: AbortSignal,
  reduced: boolean,
  onReady: () => void,
  onLost: () => void
) {
  const response = await fetch("/philosophy/sculpture/diamond.glb", { signal });
  if (!response.ok) throw new Error("Diamond could not load");
  const gltf = await new GLTFLoader().parseAsync(
    await response.arrayBuffer(),
    ""
  );
  let sourceGeometry: THREE.BufferGeometry | undefined;
  gltf.scene.traverse(object => {
    if (object instanceof THREE.Mesh) {
      if (!sourceGeometry) sourceGeometry = object.geometry.clone();
      object.geometry.dispose();
      for (const material of Array.isArray(object.material)
        ? object.material
        : [object.material])
        material.dispose();
    }
  });
  if (!sourceGeometry) throw new Error("Diamond has no geometry");
  const geometry = sourceGeometry;
  if (signal.aborted) {
    geometry.dispose();
    throw new DOMException("Aborted", "AbortError");
  }
  geometry.rotateX(-Math.PI / 2);
  geometry.center();
  geometry.computeBoundingBox();
  const size = geometry.boundingBox!.getSize(new THREE.Vector3());
  geometry.scale(
    2.8 / Math.max(size.x, size.y, size.z),
    2.8 / Math.max(size.x, size.y, size.z),
    2.8 / Math.max(size.x, size.y, size.z)
  );

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
  } catch (error) {
    geometry.dispose();
    throw error;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  mount.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 30);
  camera.position.set(0, 0.25, 6.8);
  camera.lookAt(0, 0, 0);

  const room = new THREE.Scene();
  const ambient = new THREE.Color("#c1bdb6");
  room.background = ambient;
  const panels: THREE.Mesh[] = [];
  const panel = (
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    colour: THREE.Color
  ) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.ShaderMaterial({
        uniforms: { ambient: { value: ambient }, panel: { value: colour } },
        side: THREE.DoubleSide,
        toneMapped: false,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 ambient;
          uniform vec3 panel;
          varying vec2 vUv;
          void main() {
            vec2 edge = min(vUv, 1.0 - vUv);
            float weight = smoothstep(0.0, 0.24, edge.x) * smoothstep(0.0, 0.24, edge.y);
            gl_FragColor = vec4(mix(ambient, panel, weight), 1.0);
          }
        `,
      })
    );
    mesh.position.set(x, y, z);
    mesh.lookAt(0, 0, 0);
    room.add(mesh);
    panels.push(mesh);
  };
  panel(-4, 3, 3, 3, 8, new THREE.Color().setRGB(3.5, 3.3, 3.05));
  panel(4, 1, 2, 1.5, 7, new THREE.Color().setRGB(2.5, 2.65, 2.8));
  panel(0, 6, -1, 7, 3, new THREE.Color().setRGB(2.9, 2.8, 2.65));
  panel(-1, 0, -5, 5, 7, new THREE.Color("#55514d"));
  panel(4, -2, -2, 4, 4, new THREE.Color("#716c66"));
  const environment = new THREE.WebGLCubeRenderTarget(256, {
    type: THREE.HalfFloatType,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });
  const cubeCamera = new THREE.CubeCamera(0.1, 30, environment);
  cubeCamera.update(renderer, room);
  panels.forEach(p => {
    p.geometry.dispose();
    (p.material as THREE.Material).dispose();
  });
  const material = createDiamondMaterial(geometry, environment.texture);
  const diamond = new THREE.Mesh(geometry, material);
  diamond.rotation.set(DIAMOND_POSE.x, DIAMOND_POSE.y, -0.18);
  scene.add(diamond);

  let frame = 0,
    disposed = false,
    visible = false,
    reduce = reduced,
    painted = false;
  let previous = 0,
    rendered = 0,
    lastInteraction = 0;
  let target = { ...DIAMOND_POSE },
    current = { ...DIAMOND_POSE };
  const paint = (time: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    // A small sculpture needs no continuous 60fps fullscreen render loop.
    if (!reduce && time - rendered < 32) {
      request();
      return;
    }
    const dt = Math.min(0.05, (time - previous) / 1000 || 1 / 30);
    previous = time;
    rendered = time;
    if (!reduce && time - lastInteraction > 5000)
      target.y += (dt * Math.PI * 2) / 140;
    const ease = reduce ? 1 : 1 - Math.exp(-16 * dt);
    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    diamond.rotation.set(current.x, current.y, -0.18);
    diamond.updateMatrixWorld(true);
    material.uniforms.uCamera.value.copy(camera.position);
    diamond.worldToLocal(material.uniforms.uCamera.value);
    material.uniforms.uRotation.value.setFromMatrix4(diamond.matrixWorld);
    try {
      renderer.render(scene, camera);
    } catch {
      onLost();
      return;
    }
    canvas.dataset.pose = `${current.x.toFixed(3)},${current.y.toFixed(3)}`;
    if (!painted) {
      painted = true;
      onReady();
    }
    if (!reduce) request();
  };
  function request() {
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(paint);
  }
  const resize = () => {
    const { width, height } = mount.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.z = Math.max(
      6.8,
      3.25 / (2 * Math.tan(THREE.MathUtils.degToRad(15.5)) * camera.aspect)
    );
    camera.updateProjectionMatrix();
    const pixelRatio = Math.min(
      Math.max(1, window.devicePixelRatio || 1),
      2,
      Math.sqrt(MAX_RENDER_PIXELS / (width * height))
    );
    renderer.setDrawingBufferSize(width, height, pixelRatio);
    request();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(mount);
  const sync = () => {
    const r = mount.getBoundingClientRect();
    const wasVisible = visible;
    visible = r.top < innerHeight && r.bottom > 0 && r.width > 0;
    canvas.dataset.active = String(visible && !document.hidden);
    if (!visible || document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else {
      if (!wasVisible) previous = 0;
      request();
    }
  };
  const observer = new IntersectionObserver(sync);
  observer.observe(mount);
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  const lost = (event: Event) => {
    event.preventDefault();
    onLost();
  };
  canvas.addEventListener("webglcontextlost", lost);
  document.addEventListener("visibilitychange", sync);
  resize();
  sync();
  return {
    orientation() {
      return { ...current };
    },
    pose(x: number, y: number, immediate = false) {
      target = { x: THREE.MathUtils.clamp(x, -0.65, 0.8), y };
      if (immediate || reduce) current = { ...target };
      lastInteraction = performance.now();
      request();
    },
    reduced(value: boolean) {
      reduce = value;
      request();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("webglcontextlost", lost);
      geometry.dispose();
      material.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
