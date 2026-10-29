import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** A small, reversible photographic drift derived only from native scroll. */
export function useCampaignFlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const motion = useMediaQuery(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
  );
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!motion) {
      root.style.setProperty("--campaign-flow", "0");
      return;
    }
    let frame = 0;
    let visible = false;
    const render = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          (innerHeight - rect.top) / Math.max(1, innerHeight + rect.height)
        )
      );
      root.style.setProperty("--campaign-flow", String(progress * 2 - 1));
    };
    const schedule = () => {
      if (visible && !document.hidden && !frame)
        frame = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "100px 0px" }
    );
    const resize = new ResizeObserver(schedule);
    observer.observe(root);
    resize.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [motion]);
  return ref;
}
