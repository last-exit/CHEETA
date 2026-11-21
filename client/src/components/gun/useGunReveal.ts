import { useEffect, useRef, useState } from "react";

/** Flips to true once the element scrolls into view (once). */
export function useReveal<T extends HTMLElement>(threshold = 0.15, margin = "0px 0px -6% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, margin]);

  return [ref, seen] as const;
}

/** Which section (marked with data-nav="light|dark") sits under a given y position. */
export function useSectionTheme(yOf: () => number, attr: "nav" | "rail" = "nav") {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const fn = useRef(yOf);
  fn.current = yOf;

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = fn.current();
      const els = document.querySelectorAll<HTMLElement>("[data-nav]");
      for (const el of Array.from(els)) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) {
          const v = (attr === "rail" ? el.dataset.rail : undefined) ?? el.dataset.nav;
          setTheme(v === "dark" ? "dark" : "light");
          return;
        }
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [attr]);

  return theme;
}
