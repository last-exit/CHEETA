/**
 * Palace geometry: a cusped (multifoil) Mughal arch and an eight-point jali tile.
 * Paths are generated once, so the ornament stays precise at every size.
 */

const round = (value: number) => Math.round(value * 10000) / 10000;

/**
 * A cusped arch window in objectBoundingBox units (0–1), for use as an SVG clipPath.
 * `aspect` is the window's width ÷ height so the lobes stay circular at that size.
 */
export function cuspedArchPath({
  aspect = 4 / 3,
  spring = 0.62,
  lobes = 9,
  bulge = 0.5,
  sweep = 1,
  point = 0.3,
}: {
  aspect?: number;
  spring?: number;
  lobes?: number;
  bulge?: number;
  sweep?: 0 | 1;
  point?: number;
} = {}) {
  const W = 1000;
  const H = W / aspect;
  const a = W / 2;
  const s = H * spring;
  // Room for the outer lobes to bulge without leaving the window.
  const inset = W * 0.035;
  const rise = s - H * 0.045;

  // Shoulders rise vertically from the springing line and close to a point.
  const left: (readonly [number, number])[] = [];
  for (let i = 0; i <= lobes; i++) {
    const theta = ((i / lobes) * Math.PI) / 2;
    const x = inset + (a - inset) * (1 - Math.cos(theta));
    const k = (x - inset) / (a - inset);
    const y =
      s - rise * (1 - point) * Math.sin(theta) - rise * point * Math.pow(k, 2.4);
    left.push([x, y] as const);
  }
  const right = left
    .slice(0, -1)
    .reverse()
    .map(([x, y]) => [W - x, y] as const);

  const p = (x: number, y: number) => `${round(x / W)} ${round(y / H)}`;
  const lobe = (from: readonly [number, number], to: readonly [number, number], flag: number) => {
    const r = (Math.hypot(to[0] - from[0], to[1] - from[1]) / 2) / bulge;
    return `A ${round(r / W)} ${round(r / H)} 0 0 ${flag} ${p(to[0], to[1])}`;
  };

  const commands = [`M ${p(0, H)}`, `L ${p(0, s)}`, `L ${p(left[0][0], left[0][1])}`];
  for (let i = 1; i < left.length; i++) commands.push(lobe(left[i - 1], left[i], sweep));
  let previous = left[left.length - 1];
  for (const point of right) {
    commands.push(lobe(previous, point, sweep));
    previous = point;
  }
  commands.push(`L ${p(W, s)}`, `L ${p(W, H)}`, "Z");
  return commands.join(" ");
}

/** An eight-point star (two interlaced squares) centred in a square tile. */
export function jaliStarPath(tile: number, radius: number) {
  const c = tile / 2;
  const inner = radius * (Math.SQRT1_2 / Math.cos(Math.PI / 8));
  const points: string[] = [];
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? radius : inner;
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    points.push(
      `${round(c + r * Math.cos(angle))} ${round(c + r * Math.sin(angle))}`
    );
  }
  return `M ${points.join(" L ")} Z`;
}

/** The one window shape for portrait openings (width ÷ height 4 : 5). */
export const PORTRAIT_ARCH = { aspect: 4 / 5, spring: 0.36, lobes: 7 } as const;
