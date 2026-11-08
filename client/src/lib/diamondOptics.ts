import * as THREE from "three";

/** Planes enclosing the supplied faceted mesh, used only for internal light paths. */
export function diamondPlanes(geometry: THREE.BufferGeometry) {
  const positions = geometry.getAttribute("position");
  const index = geometry.index;
  const points = Array.from({ length: positions.count }, (_, i) =>
    new THREE.Vector3().fromBufferAttribute(positions, i)
  );
  const planes: THREE.Vector4[] = [];
  const count = index?.count ?? positions.count;
  for (let i = 0; i < count; i += 3) {
    const a = points[index ? index.getX(i) : i];
    const b = points[index ? index.getX(i + 1) : i + 1];
    const c = points[index ? index.getX(i + 2) : i + 2];
    const normal = new THREE.Vector3()
      .subVectors(b, a)
      .cross(new THREE.Vector3().subVectors(c, a))
      .normalize();
    if (normal.lengthSq() < 0.5) continue;
    if (normal.dot(a) < 0) normal.negate();
    const distance = Math.max(...points.map(point => normal.dot(point)));
    if (
      planes.some(
        p =>
          normal.x * p.x + normal.y * p.y + normal.z * p.z > 0.99999 &&
          Math.abs(p.w - distance) < 0.0001
      )
    )
      continue;
    planes.push(new THREE.Vector4(normal.x, normal.y, normal.z, distance));
  }
  if (planes.length < 4 || planes.length > 128)
    throw new Error("Unsupported diamond boundary");
  return planes;
}

export function createDiamondMaterial(
  geometry: THREE.BufferGeometry,
  environment: THREE.CubeTexture
) {
  const planes = diamondPlanes(geometry);
  return new THREE.ShaderMaterial({
    uniforms: {
      uPlanes: { value: planes },
      uEnvironment: { value: environment },
      uCamera: { value: new THREE.Vector3() },
      uRotation: { value: new THREE.Matrix3() },
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vPosition = position;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform vec4 uPlanes[${planes.length}];
      uniform samplerCube uEnvironment;
      uniform vec3 uCamera;
      uniform mat3 uRotation;
      varying vec3 vPosition;
      varying vec3 vNormal;
      const float IOR = 2.417;
      float fresnel(float cosine) {
        float f0 = pow((IOR - 1.0) / (IOR + 1.0), 2.0);
        return f0 + (1.0 - f0) * pow(1.0 - clamp(cosine, 0.0, 1.0), 5.0);
      }
      vec3 light(vec3 direction) {
        vec3 world = normalize(uRotation * direction);
        // A restrained wavelength offset, not a sparkle or screen-space flare.
        return vec3(
          textureCube(uEnvironment, normalize(world + vec3(.003, 0.0, 0.0))).r,
          textureCube(uEnvironment, world).g,
          textureCube(uEnvironment, normalize(world - vec3(.003, 0.0, 0.0))).b
        );
      }
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 incoming = normalize(vPosition - uCamera);
        if (dot(incoming, normal) > 0.0) normal = -normal;
        float surface = fresnel(-dot(incoming, normal));
        vec3 colour = light(reflect(incoming, normal)) * surface;
        float energy = 1.0 - surface;
        vec3 direction = refract(incoming, normal, 1.0 / IOR);
        vec3 origin = vPosition + direction * .002;
        for (int bounce = 0; bounce < 5; bounce++) {
          float nearest = 10000.0;
          vec3 exitNormal = normal;
          for (int face = 0; face < ${planes.length}; face++) {
            vec3 n = uPlanes[face].xyz;
            float denominator = dot(n, direction);
            if (denominator > .0001) {
              float distance = (uPlanes[face].w - dot(n, origin)) / denominator;
              if (distance > .0001 && distance < nearest) {
                nearest = distance;
                exitNormal = n;
              }
            }
          }
          if (nearest > 9999.0) break;
          vec3 point = origin + direction * nearest;
          vec3 outgoing = refract(direction, -exitNormal, IOR);
          float reflection = length(outgoing) < .01 ? 1.0 : fresnel(dot(direction, exitNormal));
          if (reflection < 1.0) colour += energy * (1.0 - reflection) * light(outgoing);
          energy *= reflection;
          direction = reflect(direction, exitNormal);
          origin = point + direction * .002;
          if (energy < .005) break;
        }
        colour += light(direction) * energy * .22;
        gl_FragColor = vec4(colour * vec3(1.0, .994, .978), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}
