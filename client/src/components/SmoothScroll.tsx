import Lenis from "lenis";
import React, { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location] = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
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
    lenisRef.current = lenis;
    let frame = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [smooth]);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location]);
  return <>{children}</>;
}
