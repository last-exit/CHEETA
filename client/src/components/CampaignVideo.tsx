import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Play only the visible campaign. Reduced motion uses its editorial still. */
export default function CampaignVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion) return;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [src, reducedMotion]);
  if (reducedMotion) return <img src={poster} alt="" className={className} />;
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
