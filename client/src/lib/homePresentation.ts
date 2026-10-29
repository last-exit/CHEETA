const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Native scroll provides a modest, reversible change in the object's viewpoint. */
export function homeObjectFrame(progress: number) {
  const p = clamp(Number.isFinite(progress) ? progress : 0);
  return {
    progress: p,
    scale: 0.94 + p * 0.1,
    rotate: -3 + p * 3.5,
    y: 24 - p * 44,
    titleY: 8 - p * 16,
  };
}

/** Existing campaign imagery. This is an internal presentation study, not a new SKU. */
export const HOME_MAHARAJAH = {
  src: "/character-select/lens-ruby.webp",
  width: 768,
  height: 512,
  viewBox: "0 110 768 270",
} as const;
