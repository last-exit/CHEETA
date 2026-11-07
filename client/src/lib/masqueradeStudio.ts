import * as THREE from "three";
import {
  createMasqueradeSculpture,
  disposeSculpture,
} from "./masqueradeSculpture";

export type SculpturePose = {
  x: number;
  y: number;
  zoom: number;
  light: number;
};
export const INITIAL_POSE: SculpturePose = {
  x: 0.12,
  y: -0.28,
  zoom: 1,
  light: 36,
};

/** One quiet lighting circuit in 96 seconds; hidden time never catches up. */
export function sculptureLightStep(seconds: number, reduced: boolean) {
  if (reduced || !Number.isFinite(seconds)) return 0;
  return (Math.max(0, Math.min(seconds, 0.05)) * Math.PI * 2) / 96;
}

export function constrainPose(pose: SculpturePose): SculpturePose {
  const valid = (value: number, fallback: number) =>
    Number.isFinite(value) ? value : fallback;
  return {
    x: THREE.MathUtils.clamp(valid(pose.x, INITIAL_POSE.x), -0.7, 0.7),
    y:
      THREE.MathUtils.euclideanModulo(
        valid(pose.y, INITIAL_POSE.y) + Math.PI,
        Math.PI * 2
      ) - Math.PI,
    zoom: THREE.MathUtils.clamp(valid(pose.zoom, 1), 0.8, 1.45),
    light: THREE.MathUtils.clamp(valid(pose.light, 36), 0, 100),
  };
}

export function createMasqueradeStudio(
  mount: HTMLElement,
  onLost: () => void,
  reduced: boolean,
  onPaint: () => void
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  mount.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
  camera.position.set(0, 0, 6.6);
  camera.lookAt(0, 0, 0);

  // Real reflection cards create long highlights across the curved black metal.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(0x151115);
  const cards: THREE.Mesh[] = [];
  const card = (
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    color: THREE.Color
  ) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    );
    mesh.position.set(x, y, z);
    mesh.lookAt(0, 0, 0);
    studio.add(mesh);
    cards.push(mesh);
  };
  card(-4, 4, 4, 3, 9, new THREE.Color().setRGB(4, 3.3, 2.7));
  card(5, 1, 2, 1, 8, new THREE.Color().setRGB(3, 3.3, 4));
  card(0, 6, -2, 8, 2, new THREE.Color().setRGB(2.8, 2.5, 2.4));
  card(-2, -3, -5, 5, 0.7, new THREE.Color().setRGB(1.3, 0.65, 0.5));
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, 0.035);
  scene.environment = environment.texture;
  cards.forEach(mesh => {
    mesh.geometry.dispose();
    (mesh.material as THREE.Material).dispose();
  });
  pmrem.dispose();
  const ambient = new THREE.HemisphereLight(0xd8c8bb, 0x180b12, 1.1);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffdfbd, 5);
  const rim = new THREE.DirectionalLight(0xc3ccdf, 3);
  rim.position.set(2, 3, -4);
  scene.add(key, rim);
  const sculpture = createMasqueradeSculpture();
  scene.add(sculpture);
  let target = { ...INITIAL_POSE },
    current = { ...INITIAL_POSE };
  let visible = false,
    disposed = false,
    motionReduced = reduced,
    frame = 0,
    lastTime = 0;
  let renders = 0,
    lightPhase = 0;

  const paint = (now: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min((now - lastTime) / 1000 || 1 / 60, 0.05);
    lastTime = now;
    const ease = motionReduced ? 1 : 1 - Math.exp(-16 * dt);
    for (const property of ["x", "y", "zoom", "light"] as const) {
      let delta = target[property] - current[property];
      if (property === "y")
        delta = Math.atan2(Math.sin(delta), Math.cos(delta));
      current[property] += delta * ease;
      if (motionReduced) current[property] = target[property];
    }
    sculpture.rotation.set(current.x, current.y, 0);
    // Fit the complete sculpture at narrow widths, with the same perspective.
    const widthFit =
      1 +
      4.9 /
        (0.82 * 2 * Math.tan(THREE.MathUtils.degToRad(15.5)) * camera.aspect);
    camera.position.z = Math.max(6.6, widthFit) / current.zoom;
    lightPhase += sculptureLightStep(dt, motionReduced);
    const angle = (current.light / 100 - 0.5) * Math.PI * 1.5 + lightPhase;
    key.position.set(Math.sin(angle) * 6, 3, Math.cos(angle) * 6);
    scene.environmentRotation.set(0, angle * 0.65, 0);
    try {
      renderer.render(scene, camera);
    } catch {
      onLost();
      return;
    }
    canvas.dataset.pose = [current.x, current.y, current.zoom, current.light]
      .map(n => n.toFixed(3))
      .join(",");
    canvas.dataset.renders = String(++renders);
    canvas.dataset.light = angle.toFixed(5);
    if (renders === 1) onPaint();
    if (!motionReduced) request();
  };
  const request = () => {
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(paint);
  };
  const resize = () => {
    const { width, height } = mount.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    request();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(mount);
  const syncVisibility = () => {
    const rect = mount.getBoundingClientRect();
    const wasVisible = visible;
    visible =
      rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
    canvas.dataset.active = String(visible && !document.hidden);
    if (visible && !wasVisible) {
      lastTime = 0;
      request();
    } else if (!visible) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
  const visibility = new IntersectionObserver(syncVisibility);
  visibility.observe(mount);
  window.addEventListener("scroll", syncVisibility, { passive: true });
  const documentVisibility = () => {
    canvas.dataset.active = String(visible && !document.hidden);
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else {
      lastTime = 0;
      request();
    }
  };
  const lost = (event: Event) => {
    event.preventDefault();
    onLost();
  };
  canvas.addEventListener("webglcontextlost", lost);
  document.addEventListener("visibilitychange", documentVisibility);
  resize();
  syncVisibility();

  return {
    pose(next: SculpturePose, immediate = false) {
      target = constrainPose(next);
      if (immediate || motionReduced) current = { ...target };
      request();
    },
    reduced(value: boolean) {
      motionReduced = value;
      request();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("scroll", syncVisibility);
      document.removeEventListener("visibilitychange", documentVisibility);
      canvas.removeEventListener("webglcontextlost", lost);
      disposeSculpture(sculpture);
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
