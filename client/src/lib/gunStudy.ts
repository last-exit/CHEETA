const clamp = (value: number) => Math.max(0, Math.min(1, value));
const range = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

/** Unaltered views from the image embedded on page 5 of the launch presentation. */
export const GUN_STUDY = {
  src: "/campaigns/gun/maharajah-launch-study.jpg",
  width: 1024,
  height: 819,
  views: {
    object: { x: 0, y: 0, width: 1024, height: 376 },
    front: { x: 0, y: 386, width: 502, height: 190 },
    barrels: { x: 0, y: 588, width: 502, height: 227 },
    profile: { x: 514, y: 386, width: 510, height: 190 },
    engraving: { x: 514, y: 588, width: 510, height: 227 },
  },
} as const;

/** Native scroll is the only clock; returning to a position restores its exact view. */
export function gunStudyFrame(progress: number) {
  const p = clamp(Number.isFinite(progress) ? progress : 0);
  return {
    progress: p,
    objectOpacity: 1 - range(p, 0.14, 0.25),
    objectY: -40 * range(p, 0.06, 0.27),
    detailOpacity: range(p, 0.18, 0.29) * (1 - range(p, 0.42, 0.53)),
    detailX: 72 * (1 - range(p, 0.18, 0.39)),
    detailY: 24 * (1 - range(p, 0.18, 0.39)),
    profileOpacity: range(p, 0.46, 0.58) * (1 - range(p, 0.7, 0.81)),
    profileY: 24 * (1 - range(p, 0.46, 0.65)),
    engravingOpacity: range(p, 0.74, 0.87),
    engravingY: 24 * (1 - range(p, 0.74, 0.94)),
  };
}
