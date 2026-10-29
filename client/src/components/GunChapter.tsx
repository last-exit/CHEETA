import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GUN_STUDY, gunStudyFrame } from "@/lib/gunStudy";
import { CAMPAIGN_EDITORIAL } from "@/data/campaignEditorial";
import "./GunChapter.css";

export function GunStudyView({
  view,
  alt,
  unavailable,
}: {
  view: keyof typeof GUN_STUDY.views;
  alt: string;
  unavailable: () => void;
}) {
  const crop = GUN_STUDY.views[view];
  return (
    <div
      className="gun-study-crop"
      style={{ aspectRatio: `${crop.width} / ${crop.height}` }}
    >
      <img
        src={GUN_STUDY.src}
        alt={alt}
        width={GUN_STUDY.width}
        height={GUN_STUDY.height}
        loading="lazy"
        decoding="async"
        onError={unavailable}
        style={{
          width: `${(GUN_STUDY.width / crop.width) * 100}%`,
          left: `${(-crop.x / crop.width) * 100}%`,
          top: `${(-crop.y / crop.height) * 100}%`,
        }}
      />
    </div>
  );
}

export default function GunChapter() {
  const section = useRef<HTMLElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 767px)");
  const [failed, setFailed] = useState(false);
  const staticStudy = reduced || compact || failed;

  useEffect(() => {
    const root = section.current;
    if (!root || staticStudy) return;
    let frame = 0;
    let visible = false;
    const render = () => {
      const rect = root.getBoundingClientRect();
      const state = gunStudyFrame(
        -rect.top / Math.max(1, rect.height - window.innerHeight)
      );
      root.style.setProperty(
        "--gun-object-opacity",
        String(state.objectOpacity)
      );
      root.style.setProperty("--gun-object-y", `${state.objectY}px`);
      root.style.setProperty(
        "--gun-detail-opacity",
        String(state.detailOpacity)
      );
      root.style.setProperty("--gun-detail-x", `${state.detailX}px`);
      root.style.setProperty("--gun-detail-y", `${state.detailY}px`);
      root.style.setProperty(
        "--gun-profile-opacity",
        String(state.profileOpacity)
      );
      root.style.setProperty("--gun-profile-y", `${state.profileY}px`);
      root.style.setProperty(
        "--gun-engraving-opacity",
        String(state.engravingOpacity)
      );
      root.style.setProperty("--gun-engraving-y", `${state.engravingY}px`);
      root.dataset.progress = state.progress.toFixed(3);
    };
    const schedule = () => {
      if (!visible || document.hidden || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        render();
      });
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const resize = new ResizeObserver(schedule);
    intersection.observe(root);
    resize.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    render();
    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [staticStudy]);

  return (
    <section
      ref={section}
      className="gun-study"
      data-static={staticStudy}
      data-unavailable={failed}
      aria-labelledby="gun-study-heading"
      data-campaign-chapter="maharajah"
      style={{ "--gun-object-opacity": 1 } as CSSProperties}
    >
      <div className="gun-study-stage" data-campaign-dark="true">
        <div className="gun-study-object">
          {!failed && (
            <GunStudyView
              view="object"
              alt="Maharajah launch study: octagonal ruby-coloured lenses and engraved temples"
              unavailable={() => setFailed(true)}
            />
          )}
          <h2 id="gun-study-heading">Maharajah</h2>
        </div>
        {!failed ? (
          <div className="gun-study-pair">
            <figure>
              <GunStudyView
                view="front"
                alt="Front view of the octagonal Maharajah frame in the launch study"
                unavailable={() => setFailed(true)}
              />
              <figcaption>
                <span className="gun-study-number" aria-hidden="true">
                  8
                </span>
                <span className="gun-study-number-label" aria-hidden="true">
                  sides
                </span>
                <span className="sr-only">Eight sides.</span>
              </figcaption>
            </figure>
            <figure>
              <GunStudyView
                view="barrels"
                alt="Close view of the paired barrel forms and engraving in the Maharajah launch study"
                unavailable={() => setFailed(true)}
              />
              <figcaption>
                <span className="gun-study-number" aria-hidden="true">
                  2
                </span>
                <span className="gun-study-number-label" aria-hidden="true">
                  barrels
                </span>
                <span className="sr-only">Two barrels.</span>
              </figcaption>
            </figure>
          </div>
        ) : (
          <p className="gun-study-unavailable" role="status">
            the launch study is unavailable
          </p>
        )}
        {!failed && (
          <div className="gun-study-profile">
            <GunStudyView
              view="profile"
              alt="Side profile of Maharajah in the original launch study"
              unavailable={() => setFailed(true)}
            />
            <div>
              <h3>In profile.</h3>
              <p>{CAMPAIGN_EDITORIAL.barrel.profile}</p>
            </div>
          </div>
        )}
        {!failed && (
          <div className="gun-study-engraving">
            <GunStudyView
              view="engraving"
              alt="Engraved ornament at the end of the Maharajah temple in the launch study"
              unavailable={() => setFailed(true)}
            />
            <h3>{CAMPAIGN_EDITORIAL.barrel.detail.title}</h3>
            <p>{CAMPAIGN_EDITORIAL.barrel.detail.body}</p>
          </div>
        )}
        {!failed && <p className="gun-study-credit">a launch study</p>}
      </div>
    </section>
  );
}
