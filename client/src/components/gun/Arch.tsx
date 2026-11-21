import type { ReactNode } from "react";

export type ArchKind = "a45" | "a23";
const ASPECT: Record<ArchKind, number> = { a45: 0.9, a23: 2 / 3 };

/**
 * A cusped (multifoil) Mughal arch, built from an equilateral pointed arch
 * whose edge is broken into outward-bulging lobes meeting at inward cusps.
 * Returned in objectBoundingBox units (0–1) so it can clip any element.
 */
function archPath(W: number, lobes = 6): string {
  const m = 0.05;
  const Wp = W - 2 * m;
  const R = Wp;
  const apexY = 0.025;
  const ys = apexY + 0.866 * R;
  const rad = (d: number) => (d * Math.PI) / 180;
  const P = (d: number) => ({ x: m + Wp + R * Math.cos(rad(d)), y: ys - R * Math.sin(rad(d)) });
  const N = (d: number) => ({ x: Math.cos(rad(d)), y: -Math.sin(rad(d)) });
  const mirror = (p: { x: number; y: number }) => ({ x: W - p.x, y: p.y });

  const end = 126;
  const step = (180 - end) / lobes;
  const angles = Array.from({ length: lobes + 1 }, (_, i) => 180 - i * step);

  const segs = [] as { c: { x: number; y: number }; p: { x: number; y: number } }[];
  for (let i = 0; i < lobes; i++) {
    const a = P(angles[i]);
    const b = P(angles[i + 1]);
    const n = N((angles[i] + angles[i + 1]) / 2);
    const chord = Math.hypot(b.x - a.x, b.y - a.y);
    const k = chord * 0.85;
    segs.push({
      c: { x: (a.x + b.x) / 2 + n.x * k, y: (a.y + b.y) / 2 + n.y * k },
      p: b,
    });
  }

  // the ogee tip
  const last = P(end);
  const tip = { x: W / 2, y: apexY };
  const nTip = N(123);
  const chordTip = Math.hypot(tip.x - last.x, tip.y - last.y);
  const tipC = {
    x: (last.x + tip.x) / 2 + nTip.x * chordTip * 0.55,
    y: (last.y + tip.y) / 2 + nTip.y * chordTip * 0.55,
  };

  // Walls run flush with the outermost bulge of the lowest lobe
  const P0 = P(180);
  const s0 = segs[0];
  const t0 = (P0.x - s0.c.x) / (s0.p.x - 2 * s0.c.x + P0.x);
  const bez = (a: number, b: number, c: number, t: number) => (1 - t) * (1 - t) * a + 2 * t * (1 - t) * b + t * t * c;
  const T = { x: bez(P0.x, s0.c.x, s0.p.x, t0), y: bez(P0.y, s0.c.y, s0.p.y, t0) };
  const C2 = { x: (1 - t0) * s0.c.x + t0 * s0.p.x, y: (1 - t0) * s0.c.y + t0 * s0.p.y };

  const x0 = T.x;
  const span = W - 2 * x0;
  const f = (p: { x: number; y: number }) => `${((p.x - x0) / span).toFixed(4)} ${p.y.toFixed(4)}`;
  let d = `M ${f({ x: T.x, y: 1 })} L ${f(T)}`;
  d += ` Q ${f(C2)} ${f(s0.p)}`;
  for (let i = 1; i < segs.length; i++) d += ` Q ${f(segs[i].c)} ${f(segs[i].p)}`;
  d += ` Q ${f(tipC)} ${f(tip)}`;
  d += ` Q ${f(mirror(tipC))} ${f(mirror(last))}`;
  for (let i = lobes - 1; i >= 1; i--) {
    d += ` Q ${f(mirror(segs[i].c))} ${f(mirror(P(angles[i])))}`;
  }
  d += ` Q ${f(mirror(C2))} ${f(mirror(T))}`;
  d += ` L ${f({ x: W - T.x, y: 1 })} Z`;
  return d;
}

const PATHS: Record<ArchKind, string> = {
  a45: archPath(ASPECT.a45),
  a23: archPath(ASPECT.a23),
};

export function ArchDefs() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden focusable="false">
      <defs>
        {(Object.keys(PATHS) as ArchKind[]).map((k) => (
          <clipPath key={k} id={`arch-${k}`} clipPathUnits="objectBoundingBox">
            <path d={PATHS[k]} />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}

export function Arch({
  kind,
  children,
  className = "",
  outline = true,
  echo = 14,
}: {
  kind: ArchKind;
  children: ReactNode;
  className?: string;
  outline?: boolean;
  echo?: number;
  lens?: boolean;
}) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: ASPECT[kind] }}>
      <div
        className="absolute inset-0"
        style={{ clipPath: `url(#arch-${kind})`, WebkitClipPath: `url(#arch-${kind})` }}
      >
        {children}
      </div>
      {outline && (
        <svg
          className="pointer-events-none absolute overflow-visible"
          style={{ left: -echo, top: -echo, width: `calc(100% + ${echo * 2}px)`, height: `calc(100% + ${echo * 2}px)` }}
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d={PATHS[kind]} fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </svg>
      )}
    </div>
  );
}
