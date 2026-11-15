import Lenis from "lenis";
import React, { useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const smooth = useMediaQuery(
    "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
  );

  useEffect(() => {
    if (!smooth) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });
    let frame = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [smooth]);

  return <>{children}</>;
}
