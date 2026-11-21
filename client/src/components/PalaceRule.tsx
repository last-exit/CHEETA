import { useEffect, useId, useRef, useState } from "react";
import { jaliStarPath } from "@/lib/palaceGeometry";
import "./Jharokha.css";

const STAR = jaliStarPath(24, 11.5);
const INNER = jaliStarPath(24, 5.2);

/**
 * A gold-foil rule centred on a struck jali star, used between chapters. The
 * foil catches the light once as the rule arrives.
 */
export default function PalaceRule() {
  const id = useId().replace(/:/g, "");
  const rule = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const node = rule.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rule} className="palace-rule" data-lit={lit} aria-hidden="true">
      <span />
      <svg viewBox="0 0 24 24" focusable="false">
        <defs>
          <linearGradient id={`rule-foil-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f7e4a8" />
            <stop offset="0.3" stopColor="#c99b4f" />
            <stop offset="0.55" stopColor="#f1d896" />
            <stop offset="0.82" stopColor="#94702f" />
            <stop offset="1" stopColor="#d8b46a" />
          </linearGradient>
        </defs>
        <path
          d={`${STAR} ${INNER}`}
          fill={`url(#rule-foil-${id})`}
          fillRule="evenodd"
        />
        <circle cx="12" cy="12" r="1.9" fill={`url(#rule-foil-${id})`} />
      </svg>
      <span />
    </div>
  );
}
