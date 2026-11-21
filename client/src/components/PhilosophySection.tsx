import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Arrow, Reveal } from "./ui";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => t * t * (3 - 2 * t);

function hash3(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

function Gem({ progressRef }: { progressRef: React.RefObject<number> }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0.3, 6.2);

    // topology: shared by rough and cut states so we can morph between them
    const base = new THREE.IcosahedronGeometry(1, 1).toNonIndexed();
    const pos = base.attributes.position as THREE.BufferAttribute;
    const count = pos.count;
    const rough = new Float32Array(count * 3);
    const cut = new Float32Array(count * 3);

    const v = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      v.fromBufferAttribute(pos, i).normalize();
      const { x, y, z } = v;
      // uncut: lumpy, shared per unique vertex so there are no cracks
      const n =
        hash3(Math.round(x * 100), Math.round(y * 100), Math.round(z * 100)) * 0.62 + 0.62;
      rough[i * 3] = x * n * 1.25;
      rough[i * 3 + 1] = y * n * 1.1;
      rough[i * 3 + 2] = z * n * 0.95;
      // brilliant: flat table on top, pavilion tapering to a culet
      let cx = x * 1.25;
      let cy = y;
      let cz = z * 1.25;
      if (cy > 0.52) cy = 0.52;
      if (y < 0) {
        const t = 1 + y * 0.82;
        cx *= t;
        cz *= t;
        cy = y * 1.15;
      }
      cut[i * 3] = cx;
      cut[i * 3 + 1] = cy;
      cut[i * 3 + 2] = cz;
    }

    const geo = base;
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#6e5d48"),
      metalness: 1,
      roughness: 0.6,
      flatShading: true,
      clearcoat: 0,
      envMapIntensity: 1.3,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const key = new THREE.PointLight(0xffd9a0, 40, 20);
    key.position.set(3, 3, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0xff9a70, 25, 20);
    rim.position.set(-4, -1, 2);
    scene.add(rim);

    const roughCol = new THREE.Color("#6e5d48");
    const cutCol = new THREE.Color("#f0dcae");

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let raf = 0;
    let smooth = 0;
    let rotY = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = clock.getDelta();
      const targetProgress = progressRef.current ?? 0;
      smooth += (targetProgress - smooth) * 0.06;
      const p = ease(clamp(smooth));

      for (let i = 0; i < count * 3; i++) {
        (pos.array as Float32Array)[i] = rough[i] + (cut[i] - rough[i]) * p;
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      geo.computeBoundingSphere();

      mat.roughness = 0.62 - 0.57 * p;
      mat.color.copy(roughCol).lerp(cutCol, p);

      rotY += dt * (0.35 + 0.25 * p);
      mesh.rotation.y = rotY + pointer.x * 0.35;
      mesh.rotation.x = 0.28 + pointer.y * 0.2;
      mesh.rotation.z = Math.sin(rotY * 0.5) * 0.06;
      mesh.position.y = Math.sin(rotY * 1.3) * 0.06;
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [progressRef]);

  return <div ref={mount} className="h-full w-full" />;
}

export default function Philosophy() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!section.current) return;
      const r = section.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.9 - r.top) / (vh * 0.9 + r.height * 0.1));
      progress.current = clamp((p - 0.15) / 0.65);
      if (bar.current) bar.current.style.transform = `scaleX(${progress.current})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      id="philosophy"
      ref={section}
      className="grain relative overflow-hidden bg-ink px-6 py-32 md:px-14 md:py-44"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 72% 48%, rgba(185,152,90,0.22), transparent 70%), radial-gradient(35% 40% at 0% 100%, rgba(90,20,32,0.5), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1500px] items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal>
            <p className="label mb-8 text-brass">the philosophy</p>
            <h2 className="display text-[clamp(3.6rem,9.5vw,10rem)] text-bone">
              Diamonds are made
              <br />
              <em className="text-gilt">in the rough.</em>
            </h2>
          </Reveal>

          <Reveal delay={200} className="mt-14 max-w-md">
            <p className="text-lg leading-relaxed text-ivory/65">
              Nothing worth keeping arrives finished. We begin with the uncut idea, then spend
              the time it deserves.
            </p>
            <a href="/philosophy" className="hair-link label mt-8 text-gilt">
              read the philosophy <Arrow />
            </a>
          </Reveal>

          <div className="mt-16 max-w-md">
            <div className="label mb-3 flex justify-between text-ivory/45">
              <span>uncut</span>
              <span>brilliant</span>
            </div>
            <div className="h-px w-full bg-ivory/15">
              <div
                ref={bar}
                className="h-px origin-left bg-gilt"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>

        <div className="relative h-[420px] md:col-span-5 md:h-[640px]">
          <Gem progressRef={progress} />
        </div>
      </div>
    </section>
  );
}
