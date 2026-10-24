import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Play only the visible campaign. Reduced motion uses its editorial still. */
export default function CampaignVideo({
  src,
  poster,
  className,
  paused = false,
  segment,
}: {
  src: string;
  poster: string;
  className?: string;
  paused?: boolean;
  segment?: { start: number; end: number };
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion) return;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && !paused)
        void video.play().catch(() => {});
      else video.pause();
    };
    const start = () =>
      Math.min(segment?.start ?? 0, Math.max(0, (video.duration || 0) - 0.1));
    const seekToStart = () => {
      if (segment && Number.isFinite(video.duration))
        video.currentTime = start();
    };
    const repeatSegment = () => {
      if (!segment || !Number.isFinite(video.duration)) return;
      const end = Math.min(segment.end, video.duration - 0.04);
      if (video.currentTime >= end || video.currentTime < start() - 0.1)
        seekToStart();
    };
    const restart = () => {
      seekToStart();
      sync();
    };
    video.addEventListener("loadedmetadata", seekToStart);
    video.addEventListener("timeupdate", repeatSegment);
    video.addEventListener("ended", restart);
    if (
      video.readyState >= 1 &&
      segment &&
      (video.currentTime < start() ||
        video.currentTime >= Math.min(segment.end, video.duration - 0.04))
    )
      seekToStart();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.removeEventListener("loadedmetadata", seekToStart);
      video.removeEventListener("timeupdate", repeatSegment);
      video.removeEventListener("ended", restart);
      video.pause();
    };
  }, [src, reducedMotion, paused, segment?.start, segment?.end]);
  if (reducedMotion) return <img src={poster} alt="" className={className} />;
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop={!segment}
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
