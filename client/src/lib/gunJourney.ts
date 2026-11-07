import type { CinemaAsset } from "./masqueradeCinema";

const base = "/campaigns/gun/cinema";

/** A single filmed scene. The eyewear never becomes a separate moving layer. */
export const GUN_JOURNEY = {
  available: true,
  src: `${base}/case-opening-v2.mp4`,
  opening: `${base}/closed-film-v2.webp`,
  closing: `${base}/open-film-v2.webp`,
  width: 1280,
  height: 720,
  fps: 24,
  scrollVh: 300,
  playback: [0.08, 0.68],
  focalX: 0.5,
  // Glass only, excluding the octagonal gold rims and cabochons.
  lensMask:
    "M478 418L510 385H564L595 415V465L566 496H508L478 464Z M682 417L713 385H768L799 417V464L768 496H715L683 465Z",
} as const satisfies CinemaAsset & {
  lensMask: string;
};

export const GUN_LENSES = [
  { id: "ruby", label: "Ruby", filter: "none" },
  { id: "smoke", label: "Smoke", filter: "saturate(0) brightness(.56)" },
  {
    id: "amber",
    label: "Amber",
    filter: "hue-rotate(52deg) saturate(.9) brightness(1.2)",
  },
] as const;

/** Enable the colour study only after the final frame has actually painted. */
export function gunCaseOpen(progress: number, time: number, duration: number) {
  if (![progress, time, duration].every(Number.isFinite) || duration <= 0)
    return false;
  const lastFrame =
    (Math.round(duration * GUN_JOURNEY.fps) - 1) / GUN_JOURNEY.fps;
  return (
    progress >= GUN_JOURNEY.playback[1] &&
    time >= lastFrame - 0.5 / GUN_JOURNEY.fps
  );
}

export function gunLensIndex(current: number, key: string) {
  if (key === "Home") return 0;
  if (key === "End") return GUN_LENSES.length - 1;
  if (key === "ArrowRight" || key === "ArrowDown")
    return (current + 1) % GUN_LENSES.length;
  if (key === "ArrowLeft" || key === "ArrowUp")
    return (current + GUN_LENSES.length - 1) % GUN_LENSES.length;
  return current;
}
