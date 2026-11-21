import { useEffect, useRef } from "react";

/** Fills its (relative) parent with an image that drifts slowly against the scroll. */
export default function Parallax({
  src,
  alt,
  speed = 0.08,
  position = "50% 50%",
  className = "",
}: {
  src: string;
  alt: string;
  speed?: number;
  position?: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrap.current;
      const i = img.current;
      if (!w || !i) return;
      const r = w.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      const offset = r.top + r.height / 2 - vh / 2;
      const limit = r.height * 0.035;
      const y = Math.max(-limit, Math.min(limit, -offset * speed));
      i.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={wrap} className={`zoom absolute inset-0 overflow-hidden ${className}`}>
      <img
        ref={img}
        src={src}
        alt={alt}
        draggable={false}
        className="absolute left-0 w-full select-none object-cover will-change-transform"
        style={{ top: "-4%", height: "108%", objectPosition: position }}
      />
    </div>
  );
}
