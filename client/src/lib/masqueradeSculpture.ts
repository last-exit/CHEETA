import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type Point = readonly [number, number];

/** An original campaign sculpture, not a manufacturing model of the frame. */
const wing: Point[] = [
  [0.29, 0.27],
  [0.74, 0.49],
  [1.28, 0.63],
  [1.94, 0.55],
  [1.89, 0.14],
  [1.72, -0.29],
  [1.28, -0.57],
  [0.72, -0.56],
  [0.42, -0.36],
  [0.69, -0.66],
  [1.34, -0.79],
  [1.99, -0.63],
  [2.25, -0.33],
  [2.32, 0.43],
  [2.41, 1.48],
  [2.12, 1.07],
  [1.81, 0.89],
  [1.51, 1.02],
  [1.02, 0.82],
  [0.62, 0.54],
];

const surface = (x: number, y: number, depth = 0) =>
  new THREE.Vector3(x, y, 0.25 - 0.07 * x * x + 0.025 * y + depth);

function tube(points: THREE.Vector3[], radius: number, closed = false) {
  return new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points, closed, "centripetal"),
    Math.max(16, points.length * 5),
    radius,
    6,
    closed
  );
}

function clipCell(polygon: Point[], a: Point, b: Point): Point[] {
  const nx = b[0] - a[0],
    ny = b[1] - a[1];
  const limit = (b[0] ** 2 + b[1] ** 2 - a[0] ** 2 - a[1] ** 2) / 2;
  const output: Point[] = [];
  for (let i = 0; i < polygon.length; i++) {
    const p = polygon[i],
      q = polygon[(i + 1) % polygon.length];
    const dp = p[0] * nx + p[1] * ny - limit;
    const dq = q[0] * nx + q[1] * ny - limit;
    if (dp <= 0.000001) output.push(p);
    if (dp < 0 !== dq < 0) {
      const t = dp / (dp - dq);
      output.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
    }
  }
  return output;
}

function lensShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0.22, 0.04);
  shape.bezierCurveTo(0.32, 0.4, 1.27, 0.7, 1.95, 0.52);
  shape.bezierCurveTo(2.07, 0.45, 1.89, -0.2, 1.6, -0.43);
  shape.bezierCurveTo(1.2, -0.77, 0.51, -0.62, 0.29, -0.23);
  shape.bezierCurveTo(0.19, -0.1, 0.18, -0.04, 0.22, 0.04);
  return shape;
}

export function createMasqueradeSculpture() {
  const sculpture = new THREE.Group();
  sculpture.name = "Masquerade openwork concept";
  const metal = new THREE.MeshPhysicalMaterial({
    color: 0x242023,
    metalness: 0.86,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
    envMapIntensity: 1.35,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x0a080b,
    metalness: 0.16,
    roughness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.025,
    envMapIntensity: 1.1,
  });
  const metalParts: THREE.BufferGeometry[] = [];
  const lensParts: THREE.BufferGeometry[] = [];
  let seed = 717;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  // Deterministic, irregular cells form actual holes and rounded metal edges.
  const sites: Point[] = [];
  for (let row = 0; row < 19; row++)
    for (let col = 0; col < 19; col++)
      sites.push([
        0.2 + (col + random() * 0.8) * 0.123,
        -0.9 + (row + random() * 0.8) * 0.133,
      ]);
  const cells = sites
    .map(site => {
      let cell = [...wing];
      for (const other of sites) {
        if (other === site) continue;
        cell = clipCell(cell, site, other);
        if (cell.length < 3) break;
      }
      return cell;
    })
    .filter(cell => cell.length >= 3);

  for (const side of [-1, 1]) {
    const onSurface = (p: Point, depth = 0) =>
      surface(side * p[0], p[1], depth);
    for (const cell of cells) {
      // Rounding each junction gives the openwork a cast, organic silhouette.
      const rounded = cell.flatMap((p, index) => {
        const before = cell[(index + cell.length - 1) % cell.length];
        const after = cell[(index + 1) % cell.length];
        return [
          onSurface([
            p[0] * 0.8 + before[0] * 0.2,
            p[1] * 0.8 + before[1] * 0.2,
          ]),
          onSurface([p[0] * 0.8 + after[0] * 0.2, p[1] * 0.8 + after[1] * 0.2]),
        ];
      });
      metalParts.push(tube(rounded, 0.0105, true));
    }
    metalParts.push(
      tube(
        wing.map(p => onSurface(p)),
        0.019,
        true
      )
    );
    const outline = lensShape().getPoints(64);
    metalParts.push(
      tube(
        outline.map(p => onSurface([p.x, p.y], 0.018)),
        0.058,
        true
      )
    );

    const lens = new THREE.ExtrudeGeometry(lensShape(), {
      depth: 0.025,
      bevelEnabled: true,
      bevelSize: 0.022,
      bevelThickness: 0.016,
      bevelSegments: 3,
      curveSegments: 32,
      steps: 1,
    });
    const positions = lens.getAttribute("position");
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i),
        y = positions.getY(i);
      const p = onSurface([x, y], positions.getZ(i) - 0.02);
      // Slight convexity catches the moving studio reflection.
      p.z += 0.065 * Math.max(0, 1 - ((x - 1.08) / 0.95) ** 2 - (y / 0.7) ** 2);
      positions.setXYZ(i, p.x, p.y, p.z);
    }
    // Mirroring positions reverses winding, so flip triangles on the left.
    if (side < 0) {
      for (const attribute of Object.values(lens.attributes)) {
        const array = attribute.array;
        for (let i = 0; i < attribute.count; i += 3)
          for (let j = 0; j < attribute.itemSize; j++) {
            const a = (i + 1) * attribute.itemSize + j;
            const b = (i + 2) * attribute.itemSize + j;
            const value = array[a];
            array[a] = array[b];
            array[b] = value;
          }
      }
    }
    lens.computeVertexNormals();
    lensParts.push(lens);

    metalParts.push(
      tube(
        [
          onSurface([1.98, 0.43]),
          new THREE.Vector3(side * 2.12, 0.4, -0.5),
          new THREE.Vector3(side * 2.04, 0.33, -1.4),
          new THREE.Vector3(side * 1.86, 0.16, -2.1),
          new THREE.Vector3(side * 1.7, -0.13, -2.24),
        ],
        0.044
      )
    );
    // A second fine rail meets the hinge and tapers into the temple.
    metalParts.push(
      tube(
        [
          onSurface([2.06, 0.19]),
          new THREE.Vector3(side * 2.15, 0.17, -0.5),
          new THREE.Vector3(side * 2.06, 0.25, -1.3),
        ],
        0.018
      )
    );
  }
  metalParts.push(
    tube(
      [
        surface(-0.25, 0.16),
        surface(-0.12, 0.25),
        surface(0, 0.23),
        surface(0.12, 0.25),
        surface(0.25, 0.16),
      ],
      0.065
    )
  );

  for (const [parts, material, name] of [
    [metalParts, metal, "Openwork and temples"],
    [lensParts, glass, "Dark lenses"],
  ] as const) {
    const geometry = mergeGeometries([...parts]);
    geometry.translate(0, -0.35, 0.9);
    parts.forEach(part => part.dispose());
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    sculpture.add(mesh);
  }
  return sculpture;
}

export function disposeSculpture(sculpture: THREE.Group) {
  sculpture.traverse(object => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      materials.forEach(material => material.dispose());
    }
  });
}
