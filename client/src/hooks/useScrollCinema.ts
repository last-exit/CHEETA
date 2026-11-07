import { useEffect, useRef, useState } from "react";
import {
  cinemaCrop,
  cinemaFrame,
  cinemaProgress,
  cinemaSurface,
  cinemaTime,
  type CinemaAsset,
} from "@/lib/masqueradeCinema";

/** Paused video is a frame source. Scroll position is the only playback clock. */
export function useScrollCinema(
  asset: CinemaAsset,
  reduced: boolean,
  attempt: number
) {
  const root = useRef<HTMLElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const screen = useRef<HTMLCanvasElement>(null);
  const poster = useRef<HTMLImageElement>(null);
  const [painted, setPainted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const image = poster.current;
    if (!image) return;
    const fit = () => {
      const rect = image.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const vw = image.naturalWidth || 1672,
        vh = image.naturalHeight || 941;
      const crop = cinemaCrop(
        vw,
        vh,
        rect.width,
        rect.height,
        asset.focalX ?? cinemaFrame(0, asset.playback).focalX
      );
      image.style.objectPosition = `${vw > crop.width ? (100 * crop.x) / (vw - crop.width) : 50}% 50%`;
    };
    const observer = new ResizeObserver(fit);
    observer.observe(image);
    image.addEventListener("load", fit);
    fit();
    return () => {
      observer.disconnect();
      image.removeEventListener("load", fit);
    };
  }, [asset]);

  useEffect(() => {
    const element = root.current,
      video = player.current,
      canvas = screen.current;
    if (!element || !video || !canvas || reduced || !asset.available) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      setFailed(true);
      return;
    }
    let cancelled = false,
      broken = false,
      visible = false,
      started = false,
      progress = 0;
    let raf = 0,
      lastPaintedTime = -1,
      hasPainted = false,
      surfaceDirty = true;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    setFailed(false);
    setPainted(false);
    const stopTimeout = () => {
      if (timeout) clearTimeout(timeout);
    };
    const fail = () => {
      if (cancelled) return;
      stopTimeout();
      broken = true;
      video.pause();
      setFailed(true);
    };
    const draw = () => {
      if (
        cancelled ||
        broken ||
        !visible ||
        document.hidden ||
        video.readyState < 2 ||
        video.seeking
      )
        return;
      if (!surfaceDirty && lastPaintedTime === video.currentTime) return;
      if (surfaceDirty) {
        const rect = canvas.getBoundingClientRect();
        const size = cinemaSurface(
          rect.width,
          rect.height,
          window.devicePixelRatio || 1,
          video.videoWidth,
          video.videoHeight
        );
        if (canvas.width !== size.width || canvas.height !== size.height) {
          canvas.width = size.width;
          canvas.height = size.height;
        }
        surfaceDirty = false;
      }
      const { width, height } = canvas;
      const presented = cinemaFrame(
        cinemaProgress(
          video.currentTime,
          video.duration,
          asset.fps,
          asset.playback
        ),
        asset.playback
      );
      const crop = cinemaCrop(
        video.videoWidth,
        video.videoHeight,
        width,
        height,
        asset.focalX ?? presented.focalX
      );
      try {
        context.drawImage(
          video,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          width,
          height
        );
        canvas.dataset.time = video.currentTime.toFixed(4);
        element.style.setProperty("--seen", String(presented.seen));
        element.style.setProperty("--unseen", String(presented.unseen));
        lastPaintedTime = video.currentTime;
        if (!hasPainted) {
          hasPainted = true;
          setPainted(true);
        }
        stopTimeout();
      } catch {
        fail();
      }
    };
    const seek = () => {
      if (
        cancelled ||
        broken ||
        !visible ||
        document.hidden ||
        video.readyState < 1 ||
        video.seeking
      )
        return;
      const target = cinemaTime(
        progress,
        video.duration,
        asset.fps,
        asset.playback
      );
      if (Math.abs(video.currentTime - target) >= 0.5 / asset.fps) {
        stopTimeout();
        timeout = setTimeout(fail, 12000);
        video.currentTime = target;
      } else draw();
    };
    const render = () => {
      raf = 0;
      const rect = element.getBoundingClientRect();
      progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight))
      );
      const frame = cinemaFrame(progress, asset.playback);
      element.style.setProperty("--cinema-title", String(frame.title));
      element.style.setProperty("--cinema-cues", String(frame.cues));
      element.dataset.progress = frame.progress.toFixed(3);
      element.dataset.monogram = progress < 0.45 ? "light" : "dark";
      seek();
    };
    const schedule = () => {
      if (!visible || document.hidden || raf) return;
      raf = requestAnimationFrame(render);
    };
    const seeked = () => {
      stopTimeout();
      // The decoded frame is ready now. An extra RAF here delays every seek
      // and prevents the decoder from catching up during a quick reversal.
      draw();
      seek();
    };
    const start = () => {
      if (started || cancelled) return;
      started = true;
      video.src = `${asset.src}${attempt ? `?attempt=${attempt}` : ""}`;
      video.preload = "auto";
      timeout = setTimeout(fail, 15000);
      video.load();
    };
    const loaded = () => {
      stopTimeout();
      if (visible && video.readyState < 2) timeout = setTimeout(fail, 15000);
      schedule();
    };
    const visibility = () => {
      if (document.hidden) {
        stopTimeout();
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        if (started && visible && (video.seeking || video.readyState < 2)) {
          stopTimeout();
          timeout = setTimeout(fail, video.seeking ? 12000 : 15000);
        }
        schedule();
      }
    };
    video.addEventListener("loadeddata", loaded);
    video.addEventListener("loadedmetadata", loaded);
    video.addEventListener("seeked", seeked);
    video.addEventListener("error", fail);
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          preload.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        start();
        if (video.seeking || video.readyState < 2) {
          stopTimeout();
          timeout = setTimeout(fail, video.seeking ? 12000 : 15000);
        }
        schedule();
      } else {
        stopTimeout();
        video.pause();
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    const resized = () => {
      surfaceDirty = true;
      schedule();
    };
    const resize = new ResizeObserver(resized);
    preload.observe(element);
    observer.observe(element);
    resize.observe(canvas);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resized);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelled = true;
      stopTimeout();
      cancelAnimationFrame(raf);
      observer.disconnect();
      preload.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resized);
      document.removeEventListener("visibilitychange", visibility);
      video.removeEventListener("loadeddata", loaded);
      video.removeEventListener("loadedmetadata", loaded);
      video.removeEventListener("seeked", seeked);
      video.removeEventListener("error", fail);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [asset, reduced, attempt]);
  return { root, player, screen, poster, painted, failed };
}
