import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import "./PalaceFolio.css";

const round = (value: number) => Math.round(value * 100) / 100;

/** A lancet petal along `angle`, from radius r0 to r1, at most `width` wide. */
function petal(angle: number, r0: number, r1: number, width: number) {
  const u = [Math.cos(angle), Math.sin(angle)];
  const n = [-u[1], u[0]];
  const at = (r: number, w: number) =>
    `${round(u[0] * r + n[0] * w)} ${round(u[1] * r + n[1] * w)}`;
  const length = r1 - r0;
  return (
    `M${at(r0, 0)} ` +
    `C${at(r0 + length * 0.25, width)} ${at(r0 + length * 0.62, width * 0.72)} ${at(r1, 0)} ` +
    `C${at(r0 + length * 0.62, -width * 0.72)} ${at(r0 + length * 0.25, -width)} ${at(r0, 0)}Z`
  );
}

/** A quarter rosette, built geometrically so it reads as a die-struck mark. */
const ROSETTE = (() => {
  // Five petals fanned inside the quarter, so nothing crosses the frame.
  const first = Math.PI / 16;
  const spread = (Math.PI / 2 - 2 * first) / 4;
  const angles = Array.from({ length: 5 }, (_, i) => first + i * spread);
  const major = angles.map(a => petal(a, 25, 48, 4.6));
  const minor = angles.slice(0, -1).map(a => petal(a + spread / 2, 25, 37, 2.6));
  const dots = angles.map(
    a => [round(Math.cos(a) * 54), round(Math.sin(a) * 54)] as const
  );
  return { petals: [...major, ...minor].join(" "), dots };
})();

function Corner({ position, fill }: { position: "tl" | "tr" | "br" | "bl"; fill: string }) {
  return (
    <svg
      className={`palace-folio-corner palace-folio-corner-${position}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <g fill={`url(#${fill})`}>
        <path d="M0 0 H17 A17 17 0 0 1 0 17 Z" />
        <path d="M0 20 A20 20 0 0 0 20 0 H22.6 A22.6 22.6 0 0 1 0 22.6 Z" />
        <path d={ROSETTE.petals} />
        {ROSETTE.dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" />
        ))}
      </g>
    </svg>
  );
}

/**
 * A page from a palace album on cotton paper: a blind-embossed margin, gold-foil
 * frames, struck gilt corners, a letterpressed folio number and inscription.
 */
export default function PalaceFolio({
  folio,
  inscription,
  className = "",
  children,
}: {
  folio: string;
  inscription?: string;
  className?: string;
  children: ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  const sheet = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  // The foil catches the light once, as the page arrives.
  useEffect(() => {
    const node = sheet.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sheet} className={`palace-folio ${className}`} data-lit={lit}>
      <svg className="palace-folio-defs" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`foil-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f7e4a8" />
            <stop offset="0.28" stopColor="#c99b4f" />
            <stop offset="0.55" stopColor="#efd590" />
            <stop offset="0.8" stopColor="#9c7434" />
            <stop offset="1" stopColor="#d8b46a" />
          </linearGradient>
        </defs>
      </svg>
      <span className="palace-folio-number" aria-hidden="true">
        {folio}
      </span>
      {inscription && (
        <span className="palace-folio-inscription" aria-hidden="true">
          {inscription}
        </span>
      )}
      <div className="palace-folio-panel">
        <Corner position="tl" fill={`foil-${id}`} />
        <Corner position="tr" fill={`foil-${id}`} />
        <Corner position="br" fill={`foil-${id}`} />
        <Corner position="bl" fill={`foil-${id}`} />
        {children}
      </div>
    </div>
  );
}
