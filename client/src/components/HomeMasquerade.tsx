import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Lace from "./Lace";
import { cuspedArchPath, PORTRAIT_ARCH } from "@/lib/palaceGeometry";

/** Placeholder campaign portraits until the commissioned photographs arrive. */
const FIGURES = [
  { src: "/stills/masquerade-still-1.jpg", alt: "A masked guest in profile.", place: "side" },
  { src: "/stills/masquerade-still-3.jpg", alt: "A masked guest by candlelight.", place: "centre" },
  { src: "/stills/masquerade-still-2.jpg", alt: "A masked guest facing the light.", place: "side" },
] as const;

const ARCH = cuspedArchPath(PORTRAIT_ARCH);

/**
 * The Masquerade as a dark palace hall. Three masked guests stand in its
 * arches and the visitor carries the only candle: the light follows the
 * pointer, so a face is seen only where one looks. Without a pointer the
 * candle drifts along the arcade by itself; with reduced motion it stays still.
 */
export default function HomeMasquerade() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.still = "true";
      return;
    }

    let frame = 0;
    let visible = false;
    let pointer: { x: number; y: number } | null = null;
    const light = { x: 0.5, y: 0.5 };

    const tick = (t: number) => {
      frame = 0;
      if (!visible) return;
      const target = pointer ?? {
        x: 0.5 + 0.34 * Math.sin(t / 4200),
        y: 0.48 + 0.12 * Math.sin(t / 2900 + 1.1),
      };
      light.x += (target.x - light.x) * 0.075;
      light.y += (target.y - light.y) * 0.075;
      // A candle never burns quite still.
      const flicker = 1 + 0.025 * Math.sin(t / 97) + 0.018 * Math.sin(t / 53 + 2);
      el.style.setProperty("--lx", `${(light.x * 100).toFixed(2)}%`);
      el.style.setProperty("--ly", `${(light.y * 100).toFixed(2)}%`);
      el.style.setProperty("--flicker", flicker.toFixed(3));
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const move = (event: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer = { x: (event.clientX - r.left) / r.width, y: (event.clientY - r.top) / r.height };
    };
    const leave = () => {
      pointer = null;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });

    observer.observe(el);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section id="masquerade" className="home-masquerade" data-home-dark="true" aria-labelledby="home-masquerade-title">
      <Lace hang="down" />
      <img className="house-flower home-flower-hyacinth" src="/mughal/flower-hyacinth.webp" alt="" loading="lazy" decoding="async" />
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="home-defs">
        <clipPath id="masquerade-arch" clipPathUnits="objectBoundingBox">
          <path d={ARCH} />
        </clipPath>
      </svg>
      <div className="home-masquerade-inner" data-editorial-reveal>
        <p className="panel-kicker">The Masquerade</p>
        <h2 id="home-masquerade-title" className="panel-title">
          To see, <em>and not be seen.</em>
        </h2>
      </div>

      <div ref={stage} className="home-masquerade-hall">
        <ul className="home-masquerade-arcade" data-editorial-reveal>
          {FIGURES.map(figure => (
            <li key={figure.src} className="home-masquerade-niche" data-place={figure.place}>
              <span className="home-masquerade-opening">
                <img src={figure.src} alt={figure.alt} loading="lazy" decoding="async" />
              </span>
              <svg className="home-masquerade-gilt" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path d={ARCH} vectorEffect="non-scaling-stroke" />
              </svg>
            </li>
          ))}
        </ul>
        <span className="home-masquerade-dark" aria-hidden="true" />
        <span className="home-masquerade-word" aria-hidden="true">
          Masquerade
        </span>
      </div>

      <div className="home-masquerade-inner home-masquerade-after" data-editorial-reveal>
        <p className="panel-copy">
          In the old palaces, carved stone screens let the women of the court
          watch without being seen. The Masquerade is worn the same way.
        </p>
        <Link href="/collection/masquerade" className="panel-button">
          Enter the collection
        </Link>
      </div>
    </section>
  );
}
