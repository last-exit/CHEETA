export const ORBIT_SECONDS = 120;

export function orbitStep(deltaSeconds: number) {
  const delta = Number.isFinite(deltaSeconds)
    ? Math.max(0, Math.min(deltaSeconds, 0.05))
    : 0;
  return (Math.PI * 2 * delta) / ORBIT_SECONDS;
}
