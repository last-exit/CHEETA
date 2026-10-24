import { useEffect, useId, useRef } from "react";
import CampaignVideo from "@/components/CampaignVideo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { CollectionData } from "@/data/collections";
import type { CampaignStory } from "@/data/campaignStories";

/** Native scrolling drives the aperture; the short film plays independently inside it. */
export default function CampaignMotionChapter({
  collection,
  story,
}: {
  collection: CollectionData;
  story: CampaignStory;
}) {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const left = useRef<SVGRectElement>(null);
  const right = useRef<SVGRectElement>(null);
  const clipId = `campaign-aperture-${useId().replace(/:/g, "")}`;
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const root = section.current;
    const visual = media.current;
    if (!root || !visual) return;
    let frame = 0;
    let active = false;
    const render = () => {
      const rect = root.getBoundingClientRect();
      const rawProgress =
        window.innerWidth <= 767
          ? (window.innerHeight * 0.85 - rect.top) / (window.innerHeight * 0.7)
          : -rect.top / Math.max(1, rect.height - window.innerHeight);
      const progress = reduced ? 1 : Math.max(0, Math.min(1, rawProgress));
      root.dataset.progress = progress.toFixed(3);
      if (reduced) {
        visual.style.clipPath = "none";
        return;
      }
      if (story.aperture === "eye") {
        visual.style.clipPath = `ellipse(${48 + 46 * progress}% ${26 + 68 * progress}% at 50% 50%)`;
      } else if (story.aperture === "octagon") {
        const c = 32 - 28 * progress;
        visual.style.clipPath = `polygon(${c}% 0, ${100 - c}% 0, 100% ${c}%, 100% ${100 - c}%, ${100 - c}% 100%, ${c}% 100%, 0 ${100 - c}%, 0 ${c}%)`;
      } else if (story.aperture === "horizon") {
        visual.style.clipPath = `inset(${42 * (1 - progress)}% 0)`;
      } else {
        visual.style.clipPath = `url(#${clipId})`;
        const margin = 0.12 * (1 - progress);
        const gap = 0.16 * (1 - progress);
        for (const [element, x] of [
          [left.current, margin],
          [right.current, 0.5 + gap / 2],
        ] as const) {
          element?.setAttribute("x", String(x));
          element?.setAttribute("y", String(margin));
          element?.setAttribute("width", String(0.5 - margin - gap / 2));
          element?.setAttribute("height", String(1 - margin * 2));
          element?.setAttribute("rx", String(0.18 * (1 - progress)));
        }
      }
    };
    const schedule = () => {
      if (active && !document.hidden && !frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          render();
        });
    };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(root);
    const resize = new ResizeObserver(() => {
      render();
    });
    resize.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", render);
    document.addEventListener("visibilitychange", schedule);
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", render);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [reduced, story.aperture, clipId]);

  return (
    <section
      ref={section}
      className="campaign-motion-chapter"
      aria-labelledby={`motion-heading-${collection.id}`}
    >
      <div className="campaign-motion-stage house-container">
        <div className="campaign-motion-copy">
          <h2 id={`motion-heading-${collection.id}`}>{story.chapter}</h2>
        </div>
        <div className="campaign-motion-composition">
          {story.aperture === "paired" && (
            <svg
              width="0"
              height="0"
              aria-hidden="true"
              className="campaign-clip-definition"
            >
              <defs>
                <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                  <rect ref={left} x="0" y="0" width=".5" height="1" />
                  <rect ref={right} x=".5" y="0" width=".5" height="1" />
                </clipPath>
              </defs>
            </svg>
          )}
          <div
            ref={media}
            className="campaign-motion-media"
            style={
              story.aperture === "paired"
                ? { clipPath: `url(#${clipId})` }
                : undefined
            }
          >
            <CampaignVideo
              src={collection.video}
              poster={collection.stills[2]}
              segment={story.segment}
              className="campaign-motion-film"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
