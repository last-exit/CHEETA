const clamp = (value: number) => Math.max(0, Math.min(1, value));
const range = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

/** A reversible object-to-exhibition transition; hold the frame until the scene is ready. */
export function masqueradeReveal(progress: number, sceneReady = true) {
  const requested = clamp(Number.isFinite(progress) ? progress : 0);
  const p = sceneReady ? requested : Math.min(requested, 0.24);
  const opening = range(p, 0.3, 0.88);
  return {
    progress: p,
    sceneX: 50 * (1 - opening),
    sceneY: 12 * (1 - opening),
    objectOpacity: 1 - range(p, 0.3, 0.52),
    objectScale: 0.94 + 0.09 * range(p, 0, 0.52),
    objectRotation: -2 + 3 * range(p, 0, 0.52),
    seenOpacity: 1 - range(p, 0.24, 0.42),
    unseenOpacity: range(p, 0.72, 0.92),
  };
}
