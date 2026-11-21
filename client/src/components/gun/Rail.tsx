import { useEffect, useState } from "react";
import { pieces } from "./gunData";
import { useSectionTheme } from "./useGunReveal";

/** A quiet vertical marker showing which of the three pieces you are looking at. */
export default function Rail() {
  const [active, setActive] = useState(-1);
  const theme = useSectionTheme(() => window.innerHeight / 2, "rail");

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let found = -1;
      pieces.forEach((p, i) => {
        const el = document.getElementById(p.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) found = i;
      });
      setActive(found);
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
    };
  }, []);

  return (
    <div
      className={`fixed right-[clamp(1rem,2.4vw,2.6rem)] top-1/2 z-[55] hidden -translate-y-1/2 flex-col items-center gap-5 transition-[opacity,color] duration-700 md:flex ${
        active >= 0 ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${theme === "dark" ? "text-bone drop-shadow-[0_0_10px_rgba(26,15,11,0.45)]" : "text-ink"}`}
    >
      {pieces.map((p, i) => (
        <a
          key={p.id}
          href={`#${p.id}`}
          className="display flex flex-col items-center gap-3 text-[13px] italic tracking-normal"
          style={{ opacity: active === i ? 1 : 0.35, transition: "opacity .6s" }}
        >
          {p.numeral}
          <span
            className="block w-px bg-current"
            style={{ height: active === i ? 38 : 8, transition: "height .9s cubic-bezier(.19,1,.22,1)" }}
          />
        </a>
      ))}
    </div>
  );
}
