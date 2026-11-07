const base = "/campaigns/masquerade/cinema";

export interface CinemaAsset {
  available: boolean;
  src: string;
  opening: string;
  closing: string;
  fps: number;
  scrollVh: number;
  width: number;
  height: number;
  playback?: readonly [number, number];
  focalX?: number;
}

/** One inspected moving film. Original treatment keyframes remain in the archive. */
export const MASQUERADE_CINEMA: CinemaAsset = {
  available: true,
  src: `${base}/journey-scrub-v2.mp4`,
  opening: `${base}/opening-film-v1.webp`,
  closing: `${base}/closing-film-v1.webp`,
  fps: 24,
  scrollVh: 440,
  width: 1280,
  height: 720,
};

const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

export function cinemaFrame(
  value: number,
  playback: readonly [number, number] = [0.06, 0.94]
) {
  const p = clamp(Number.isFinite(value) ? value : 0);
  return {
    progress: p,
    media: range(p, playback[0], playback[1]),
    title: 1 - range(p, 0, 0.1),
    cues: range(p, 0.19, 0.25),
    seen: 1 - range(p, 0.28, 0.4),
    unseen: range(p, 0.68, 0.78),
    focalX: 0.69 - 0.07 * range(p, 0.2, 0.78),
  };
}

export function cinemaTime(
  progress: number,
  duration: number,
  fps = 24,
  playback?: readonly [number, number]
) {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  const frames = Math.max(0, Math.round(duration * fps) - 1);
  return Math.round(cinemaFrame(progress, playback).media * frames) / fps;
}

/** Copy and framing follow the frame actually drawn, including delayed seeks. */
export function cinemaProgress(
  time: number,
  duration: number,
  fps = 24,
  playback: readonly [number, number] = [0.06, 0.94]
) {
  if (!Number.isFinite(time) || !Number.isFinite(duration) || duration <= 0)
    return 0;
  const end = Math.max(0, Math.round(duration * fps) - 1) / fps;
  if (!end || time < 0.5 / fps) return 0;
  if (time >= end - 0.5 / fps) return 1;
  return playback[0] + (playback[1] - playback[0]) * clamp(time / end);
}

/** A crop, never a stretched frame; focal framing keeps the same woman visible. */
export function cinemaCrop(
  vw: number,
  vh: number,
  cw: number,
  ch: number,
  focalX: number
) {
  const sourceRatio = vw / vh,
    canvasRatio = cw / ch;
  const width = sourceRatio > canvasRatio ? vh * canvasRatio : vw;
  const height = sourceRatio > canvasRatio ? vh : vw / canvasRatio;
  return {
    x: clamp(vw * focalX - width / 2, 0, vw - width),
    y: (vh - height) / 2,
    width,
    height,
  };
}

/** A decoded frame has no extra detail beyond its native source resolution. */
export function cinemaSurface(
  width: number,
  height: number,
  dpr: number,
  sourceWidth: number,
  sourceHeight: number
) {
  const scale = Math.min(
    Math.max(1, dpr),
    2,
    sourceWidth / Math.max(1, width),
    sourceHeight / Math.max(1, height)
  );
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

export function cinemaPreview(search: string) {
  return new URLSearchParams(search).get("cinema") === "preview";
}
