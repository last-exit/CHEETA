/**
 * Interactive eyewear study with studio lighting and manual lens inspection.
 */
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { orbitStep } from "@/lib/eyewearMotion";

interface Eyewear3DModelProps {
  lensType: "ruby" | "obsidian" | "amber" | "emerald";
  frameType?: "gold" | "gunmetal" | "bronze";
  className?: string;
  autoRotate?: boolean;
}

export default function Eyewear3DModel({
  lensType = "ruby",
  frameType = "gold",
  className = "w-full h-full",
  autoRotate = true,
}: Eyewear3DModelProps) {
  const [hasWebGLError, setHasWebGLError] = React.useState(false);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const lensMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const frameMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const accentMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: -0.08, y: -0.32 });
  const currentRotationRef = useRef({ x: -0.08, y: -0.32 });

  // State for Explosion / Inspect Mode
  const [isExploded, setIsExploded] = React.useState(false);
  const [isOrbiting, setIsOrbiting] = React.useState(autoRotate);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const requestRenderRef = useRef<() => void>(() => {});
  const controlsRef = useRef({
    autoRotate,
    isOrbiting,
    isExploded,
    reducedMotion,
  });

  useEffect(() => setIsOrbiting(autoRotate), [autoRotate]);
  useEffect(() => {
    controlsRef.current = { autoRotate, isOrbiting, isExploded, reducedMotion };
    requestRenderRef.current();
  }, [autoRotate, isOrbiting, isExploded, reducedMotion]);

  const resetView = () => {
    setIsOrbiting(false);
    setIsExploded(false);
    targetRotationRef.current = { x: -0.08, y: -0.32 };
    requestRenderRef.current();
  };

  const partsRef = useRef({
    leftLens: null as THREE.Mesh | null,
    rightLens: null as THREE.Mesh | null,
    leftTempleGroup: null as THREE.Group | null,
    rightTempleGroup: null as THREE.Group | null,
    explosionProgress: 0,
  });

  // Map lens color & physical properties for genuine luxury sunglasses lenses
  const getLensProps = (type: string) => {
    switch (type) {
      case "ruby":
        return {
          color: 0x4a050e,
          transmission: 0.68,
          opacity: 0.88,
          roughness: 0.05,
          ior: 1.62,
          reflectivity: 0.95,
          attenuationColor: 0x8a0e1c,
          attenuationDistance: 0.6,
        };
      case "obsidian":
        return {
          color: 0x08090a,
          transmission: 0.3,
          opacity: 0.95,
          roughness: 0.04,
          ior: 1.58,
          reflectivity: 0.98,
          attenuationColor: 0x020204,
          attenuationDistance: 0.4,
        };
      case "amber":
        return {
          color: 0x6e380a,
          transmission: 0.72,
          opacity: 0.86,
          roughness: 0.06,
          ior: 1.58,
          reflectivity: 0.92,
          attenuationColor: 0xb86314,
          attenuationDistance: 0.7,
        };
      case "emerald":
        return {
          color: 0x06281c,
          transmission: 0.65,
          opacity: 0.88,
          roughness: 0.05,
          ior: 1.62,
          reflectivity: 0.95,
          attenuationColor: 0x0f5c43,
          attenuationDistance: 0.6,
        };
      default:
        return {
          color: 0x4a050e,
          transmission: 0.68,
          opacity: 0.88,
          roughness: 0.05,
          ior: 1.62,
          reflectivity: 0.95,
          attenuationColor: 0x8a0e1c,
          attenuationDistance: 0.6,
        };
    }
  };

  // Map frame types to solid gold / gunmetal / bronze PBR materials
  const getFrameProps = (type: string) => {
    switch (type) {
      case "gunmetal":
        return { color: 0x1a1c20, metalness: 0.96, roughness: 0.24 };
      case "bronze":
        return { color: 0x7a5b3a, metalness: 0.92, roughness: 0.32 };
      case "gold":
      default:
        return { color: 0xd4af37, metalness: 0.98, roughness: 0.15 };
    }
  };

  // Update lens materials dynamically
  useEffect(() => {
    const props = getLensProps(lensType);
    lensMaterialsRef.current.forEach(mat => {
      mat.color.setHex(props.color);
      mat.transmission = props.transmission;
      mat.opacity = props.opacity;
      mat.roughness = props.roughness;
      mat.ior = props.ior;
      mat.reflectivity = props.reflectivity;
      mat.attenuationColor.setHex(props.attenuationColor);
      mat.attenuationDistance = props.attenuationDistance;
      mat.needsUpdate = true;
    });
    requestRenderRef.current();
  }, [lensType]);

  // Update frame materials dynamically
  useEffect(() => {
    const props = getFrameProps(frameType);
    frameMaterialsRef.current.forEach(mat => {
      mat.color.setHex(props.color);
      mat.metalness = props.metalness;
      mat.roughness = props.roughness;
      mat.needsUpdate = true;
    });
    requestRenderRef.current();
  }, [frameType]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || hasWebGLError) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 500;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Luxury medium telephoto lens perspective)
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 4.6);

    // 3. Renderer with ACES Tone Mapping & Subpixel Antialiasing
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not supported or context unavailable:", e);
      setHasWebGLError(true);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Studio Environment Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.1);
    scene.add(ambientLight);

    // Key Light: High-angle warm spotlight creating gold bevel highlights
    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.8);
    keyLight.position.set(3.5, 4.5, 4.0);
    scene.add(keyLight);

    // Rim Light 1: Golden silhouette rim
    const rimLight1 = new THREE.DirectionalLight(0xd4af37, 3.0);
    rimLight1.position.set(-4.0, 2.5, -3.0);
    scene.add(rimLight1);

    // Rim Light 2: Crisp white fill reflection
    const rimLight2 = new THREE.DirectionalLight(0xffffff, 2.2);
    rimLight2.position.set(0, -3.5, 3.0);
    scene.add(rimLight2);

    // Top Studio Softbox
    const softbox = new THREE.PointLight(0xffffff, 2.0, 12);
    softbox.position.set(0, 3.0, 1.8);
    scene.add(softbox);

    // Atmospheric Warm Floor Glow
    const floorGlow = new THREE.PointLight(0x8a0e1c, 1.4, 8);
    floorGlow.position.set(0, -2.5, -1.0);
    scene.add(floorGlow);

    // 5. High-Precision PBR Materials
    const frameConfig = getFrameProps(frameType);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: frameConfig.color,
      metalness: frameConfig.metalness,
      roughness: frameConfig.roughness,
    });
    frameMaterialsRef.current = [goldMaterial];

    // Polished Accent Material (for screws, bridge pillars, and cheetah hinges)
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.1,
    });
    accentMaterialsRef.current = [accentMaterial];

    // Optical Mineral Glass with Fresnel Clearcoat
    const lensConfig = getLensProps(lensType);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: lensConfig.color,
      metalness: 0.05,
      roughness: lensConfig.roughness,
      transmission: lensConfig.transmission,
      transparent: true,
      opacity: lensConfig.opacity,
      reflectivity: lensConfig.reflectivity,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      ior: lensConfig.ior,
      attenuationColor: new THREE.Color(lensConfig.attenuationColor),
      attenuationDistance: lensConfig.attenuationDistance,
      side: THREE.DoubleSide,
    });
    lensMaterialsRef.current = [glassMaterial];

    const emeraldPivotMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f5c43,
      roughness: 0.1,
      metalness: 0.3,
    });

    // 6. Construct High-Jewelry Double Barrel Eyewear Model
    const eyewearGroup = new THREE.Group();
    modelGroupRef.current = eyewearGroup;

    const lensRadius = 0.56;
    const lensSpacing = 0.74;
    const rimWireRadius = 0.03;

    // Dual Circular Rims with Outer Stepped Chamfer
    const outerRimGeo = new THREE.TorusGeometry(
      lensRadius,
      rimWireRadius,
      24,
      72
    );
    const innerBevelGeo = new THREE.TorusGeometry(
      lensRadius - 0.015,
      rimWireRadius * 0.6,
      16,
      64
    );

    // Left Frame Assembly
    const leftRim = new THREE.Mesh(outerRimGeo, goldMaterial);
    leftRim.position.x = -lensSpacing;
    const leftInnerBevel = new THREE.Mesh(innerBevelGeo, goldMaterial);
    leftInnerBevel.position.set(-lensSpacing, 0, 0.01);
    eyewearGroup.add(leftRim);
    eyewearGroup.add(leftInnerBevel);

    // Right Frame Assembly
    const rightRim = new THREE.Mesh(outerRimGeo, goldMaterial);
    rightRim.position.x = lensSpacing;
    const rightInnerBevel = new THREE.Mesh(innerBevelGeo, goldMaterial);
    rightInnerBevel.position.set(lensSpacing, 0, 0.01);
    eyewearGroup.add(rightRim);
    eyewearGroup.add(rightInnerBevel);

    // Curved Mineral Lenses (Slight convex curvature for realistic glint)
    const lensGeo = new THREE.CylinderGeometry(
      lensRadius - 0.008,
      lensRadius - 0.008,
      0.024,
      64
    );
    lensGeo.rotateX(Math.PI / 2);

    const leftLens = new THREE.Mesh(lensGeo, glassMaterial);
    leftLens.position.x = -lensSpacing;
    partsRef.current.leftLens = leftLens;
    eyewearGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeo, glassMaterial);
    rightLens.position.x = lensSpacing;
    partsRef.current.rightLens = rightLens;
    eyewearGroup.add(rightLens);

    // Double Barrel Brow Bridge Architecture
    // Top Arch Rail
    const topBridgeCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-lensSpacing + lensRadius - 0.015, 0.26, 0.02),
      new THREE.Vector3(-0.2, 0.34, 0.12),
      new THREE.Vector3(0.2, 0.34, 0.12),
      new THREE.Vector3(lensSpacing - lensRadius + 0.015, 0.26, 0.02)
    );
    const topBridgeMesh = new THREE.Mesh(
      new THREE.TubeGeometry(topBridgeCurve, 36, 0.025, 16, false),
      goldMaterial
    );
    eyewearGroup.add(topBridgeMesh);

    // Bottom Nose Bridge Rail
    const bottomBridgeCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-lensSpacing + lensRadius - 0.015, 0.08, 0.02),
      new THREE.Vector3(-0.16, 0.12, 0.09),
      new THREE.Vector3(0.16, 0.12, 0.09),
      new THREE.Vector3(lensSpacing - lensRadius + 0.015, 0.08, 0.02)
    );
    const bottomBridgeMesh = new THREE.Mesh(
      new THREE.TubeGeometry(bottomBridgeCurve, 36, 0.022, 16, false),
      goldMaterial
    );
    eyewearGroup.add(bottomBridgeMesh);

    // Precision Vertical Reinforcement Columns
    const columnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.18, 16);
    const colLeft = new THREE.Mesh(columnGeo, goldMaterial);
    colLeft.position.set(-0.13, 0.2, 0.08);
    eyewearGroup.add(colLeft);

    const colRight = new THREE.Mesh(columnGeo, goldMaterial);
    colRight.position.set(0.13, 0.2, 0.08);
    eyewearGroup.add(colRight);

    // Nose Pads (Solid Gold teardrop pads)
    const padGeo = new THREE.SphereGeometry(0.035, 16, 16);
    padGeo.scale(0.6, 1.2, 0.4);
    const leftPad = new THREE.Mesh(padGeo, goldMaterial);
    leftPad.position.set(-0.18, 0.02, -0.06);
    leftPad.rotation.z = -0.3;
    eyewearGroup.add(leftPad);

    const rightPad = new THREE.Mesh(padGeo, goldMaterial);
    rightPad.position.set(0.18, 0.02, -0.06);
    rightPad.rotation.z = 0.3;
    eyewearGroup.add(rightPad);

    // Groups for explosion animation
    const leftTempleGroup = new THREE.Group();
    const rightTempleGroup = new THREE.Group();
    partsRef.current.leftTempleGroup = leftTempleGroup;
    partsRef.current.rightTempleGroup = rightTempleGroup;
    eyewearGroup.add(leftTempleGroup);
    eyewearGroup.add(rightTempleGroup);

    // Sleek Sculptural Temple Arms
    const templeRadius = 0.02;
    const leftTempleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-lensSpacing - lensRadius - 0.02, 0.1, 0),
      new THREE.Vector3(-lensSpacing - lensRadius - 0.06, 0.1, -0.3),
      new THREE.Vector3(-lensSpacing - lensRadius - 0.05, 0.08, -1.0),
      new THREE.Vector3(-lensSpacing - lensRadius - 0.02, -0.04, -1.7),
      new THREE.Vector3(-lensSpacing - lensRadius + 0.02, -0.18, -1.9),
    ]);
    const leftTemple = new THREE.Mesh(
      new THREE.TubeGeometry(leftTempleCurve, 48, templeRadius, 16, false),
      goldMaterial
    );
    leftTempleGroup.add(leftTemple);

    const rightTempleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(lensSpacing + lensRadius + 0.02, 0.1, 0),
      new THREE.Vector3(lensSpacing + lensRadius + 0.06, 0.1, -0.3),
      new THREE.Vector3(lensSpacing + lensRadius + 0.05, 0.08, -1.0),
      new THREE.Vector3(lensSpacing + lensRadius + 0.02, -0.04, -1.7),
      new THREE.Vector3(lensSpacing + lensRadius - 0.02, -0.18, -1.9),
    ]);
    const rightTemple = new THREE.Mesh(
      new THREE.TubeGeometry(rightTempleCurve, 48, templeRadius, 16, false),
      goldMaterial
    );
    rightTempleGroup.add(rightTemple);

    // Cheetah Head / Micro-Hinge Hardware
    const hingeBlockGeo = new THREE.BoxGeometry(0.06, 0.06, 0.08);
    const h1 = new THREE.Mesh(hingeBlockGeo, goldMaterial);
    h1.position.set(-lensSpacing - lensRadius - 0.03, 0.1, 0);
    leftTempleGroup.add(h1);

    const h2 = new THREE.Mesh(hingeBlockGeo, goldMaterial);
    h2.position.set(lensSpacing + lensRadius + 0.03, 0.1, 0);
    rightTempleGroup.add(h2);

    // Faceted Gemstone Pivot Studs
    const gemGeo = new THREE.OctahedronGeometry(0.035, 1);
    const g1 = new THREE.Mesh(gemGeo, emeraldPivotMaterial);
    g1.position.set(-lensSpacing - lensRadius - 0.045, 0.1, 0.045);
    leftTempleGroup.add(g1);

    const g2 = new THREE.Mesh(gemGeo, emeraldPivotMaterial);
    g2.position.set(lensSpacing + lensRadius + 0.045, 0.1, 0.045);
    rightTempleGroup.add(g2);

    // Turn around the centre of the whole frame, including the temples.
    const presentationGroup = new THREE.Group();
    eyewearGroup.position.z = 0.85;
    presentationGroup.add(eyewearGroup);
    modelGroupRef.current = presentationGroup;
    scene.add(presentationGroup);

    // Keep one renderer alive while changing colour, orbit or inspection mode.
    const domElem = renderer.domElement;
    let raf = 0;
    let disposed = false;
    let visible = false;
    let lastTime = performance.now();

    const schedule = () => {
      if (!disposed && visible && !document.hidden && !raf) {
        raf = requestAnimationFrame(animate);
      }
    };
    requestRenderRef.current = schedule;

    const stopOrbit = () => {
      controlsRef.current.isOrbiting = false;
      setIsOrbiting(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      stopOrbit();
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: event.clientX, y: event.clientY };
      container.setPointerCapture(event.pointerId);
      schedule();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      targetRotationRef.current.y +=
        (event.clientX - prevMousePosRef.current.x) * 0.0045;
      targetRotationRef.current.x = THREE.MathUtils.clamp(
        targetRotationRef.current.x +
          (event.clientY - prevMousePosRef.current.y) * 0.0045,
        -0.45,
        0.45
      );
      prevMousePosRef.current = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onPointerUp = () => {
      isDraggingRef.current = false;
      schedule();
    };
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("lostpointercapture", onPointerUp);

    function animate(now: number) {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      const delta = Math.max(0, Math.min((now - lastTime) / 1000, 0.05));
      lastTime = now;
      const controls = controlsRef.current;
      const orbiting =
        controls.autoRotate &&
        controls.isOrbiting &&
        !controls.reducedMotion &&
        !isDraggingRef.current;
      if (orbiting) targetRotationRef.current.y += orbitStep(delta);

      const blend = controls.reducedMotion ? 1 : 1 - Math.exp(-5 * delta);
      const rotation = currentRotationRef.current;
      const target = targetRotationRef.current;
      rotation.y += (target.y - rotation.y) * blend;
      rotation.x += (target.x - rotation.x) * blend;
      presentationGroup.rotation.set(rotation.x, rotation.y, 0);

      const parts = partsRef.current;
      const targetExpansion = controls.isExploded ? 1 : 0;
      parts.explosionProgress +=
        (targetExpansion - parts.explosionProgress) * blend;
      const progress = parts.explosionProgress;
      if (parts.leftLens && parts.rightLens) {
        parts.leftLens.position.z = progress * 0.6;
        parts.leftLens.position.x = -lensSpacing - progress * 0.1;
        parts.leftLens.rotation.y = progress * -0.15;
        parts.rightLens.position.z = progress * 0.6;
        parts.rightLens.position.x = lensSpacing + progress * 0.1;
        parts.rightLens.rotation.y = progress * 0.15;
      }
      if (parts.leftTempleGroup && parts.rightTempleGroup) {
        parts.leftTempleGroup.position.set(progress * -0.6, 0, progress * 0.2);
        parts.leftTempleGroup.rotation.y = progress * -0.25;
        parts.rightTempleGroup.position.set(progress * 0.6, 0, progress * 0.2);
        parts.rightTempleGroup.rotation.y = progress * 0.25;
      }
      renderer.render(scene, camera);
      const unsettled =
        Math.abs(target.y - rotation.y) +
          Math.abs(target.x - rotation.x) +
          Math.abs(targetExpansion - progress) >
        0.0001;
      if (orbiting || isDraggingRef.current || unsettled) schedule();
    }

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.position.set(
        0,
        0.1,
        Math.max(
          5.2,
          4.8 / (2 * Math.tan(THREE.MathUtils.degToRad(16)) * camera.aspect)
        )
      );
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      schedule();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      lastTime = performance.now();
      if (visible) schedule();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    visibilityObserver.observe(container);
    const onVisibility = () => {
      lastTime = performance.now();
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else schedule();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionPreference = () => {
      controlsRef.current.reducedMotion = motionQuery.matches;
      setReducedMotion(motionQuery.matches);
      if (motionQuery.matches) stopOrbit();
      schedule();
    };
    motionQuery.addEventListener("change", onMotionPreference);
    onMotionPreference();
    const onContextLost = (event: Event) => {
      event.preventDefault();
      setHasWebGLError(true);
    };
    domElem.addEventListener("webglcontextlost", onContextLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      requestRenderRef.current = () => {};
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionPreference);
      domElem.removeEventListener("webglcontextlost", onContextLost);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("lostpointercapture", onPointerUp);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>(accentMaterialsRef.current);
      scene.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material)
          ? object.material
          : [object.material]) {
          materials.add(material);
        }
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      scene.clear();
      modelGroupRef.current = null;
      lensMaterialsRef.current = [];
      frameMaterialsRef.current = [];
      accentMaterialsRef.current = [];
      partsRef.current = {
        leftLens: null,
        rightLens: null,
        leftTempleGroup: null,
        rightTempleGroup: null,
        explosionProgress: 0,
      };
      if (container.contains(domElem)) container.removeChild(domElem);
      renderer.dispose();
    };
  }, [hasWebGLError]);

  if (hasWebGLError) {
    return (
      <div
        className={`relative flex items-center justify-center p-6 ${className}`}
      >
        <span className="font-sans text-sm text-[#6A635D]" role="status">
          3d study unavailable
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mountRef}
        role="group"
        aria-label="3d eyewear viewer, use arrow keys to turn and home to reset"
        tabIndex={0}
        onKeyDown={event => {
          const steps: Record<string, [number, number]> = {
            ArrowLeft: [0, -0.12],
            ArrowRight: [0, 0.12],
            ArrowUp: [-0.08, 0],
            ArrowDown: [0.08, 0],
          };
          if (event.key === "Home") {
            event.preventDefault();
            resetView();
          } else if (event.key === "Escape") {
            setIsExploded(false);
            setIsOrbiting(false);
          } else if (steps[event.key]) {
            event.preventDefault();
            controlsRef.current.isOrbiting = false;
            setIsOrbiting(false);
            targetRotationRef.current.x = THREE.MathUtils.clamp(
              targetRotationRef.current.x + steps[event.key][0],
              -0.45,
              0.45
            );
            targetRotationRef.current.y += steps[event.key][1];
            requestRenderRef.current();
          }
        }}
        className="absolute inset-x-0 top-0 bottom-14 cursor-grab active:cursor-grabbing touch-pan-y"
      />
      <div className="frame-study-actions">
        {!reducedMotion && autoRotate && (
          <button
            type="button"
            onClick={() => setIsOrbiting(value => !value)}
            aria-pressed={isOrbiting}
          >
            {isOrbiting ? "pause orbit" : "resume orbit"}
          </button>
        )}
        <button
          type="button"
          aria-pressed={isExploded}
          onClick={() => {
            setIsOrbiting(false);
            setIsExploded(value => !value);
          }}
        >
          {isExploded ? "assemble" : "separate lenses"}
        </button>
        <button type="button" onClick={resetView}>
          reset view
        </button>
      </div>
    </div>
  );
}
