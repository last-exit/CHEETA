import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { masqueradeReveal } from "@/lib/masqueradeReveal";
import { MASQUERADE_EXHIBITION } from "@/data/campaignExhibition";
import "./MasqueradeChapter.css";

const OBJECT = "/campaigns/masquerade/openwork-study.webp";
const SCENE = MASQUERADE_EXHIBITION.src;

export default function MasqueradeChapter() {
  const section = useRef<HTMLElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [failed, setFailed] = useState(false);
  const [sceneSrc, setSceneSrc] = useState<string>(SCENE);
  const [sceneReady, setSceneReady] = useState(false);
  const sceneFallback = () => {
    if (sceneSrc !== OBJECT) {
      setSceneReady(false);
      setSceneSrc(OBJECT);
    }
  };

  useEffect(() => {
    const root = section.current;
    if (!root || reduced) return;
    let frame = 0;
    let visible = false;
    const render = () => {
      const rect = root.getBoundingClientRect();
      const state = masqueradeReveal(
        failed ? 1 : -rect.top / Math.max(1, rect.height - innerHeight),
        sceneReady || failed
      );
      root.dataset.progress = state.progress.toFixed(3);
      root.style.setProperty("--scene-x", `${state.sceneX}%`);
      root.style.setProperty("--scene-y", `${state.sceneY}%`);
      root.style.setProperty("--object-opacity", String(state.objectOpacity));
      root.style.setProperty("--object-scale", String(state.objectScale));
      root.style.setProperty("--object-rotation", `${state.objectRotation}deg`);
      root.style.setProperty("--seen-opacity", String(state.seenOpacity));
      root.style.setProperty("--unseen-opacity", String(state.unseenOpacity));
    };
    const schedule = () => {
      if (!visible || document.hidden || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        render();
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const resize = new ResizeObserver(render);
    observer.observe(root);
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
  }, [reduced, failed, sceneReady]);

  if (reduced)
    return (
      <section
        className="masquerade-static house-container"
        aria-labelledby="masquerade-reveal-heading"
        data-campaign-chapter="seen-and-unseen"
      >
        <h2 id="masquerade-reveal-heading">Seen and unseen</h2>
        {!failed && (
          <img
            src={OBJECT}
            alt="The Masquerade frame and its openwork wings"
            width="1600"
            height="800"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
        <img
          src={sceneSrc}
          alt={
            sceneSrc === OBJECT
              ? "The Masquerade frame and its openwork wings"
              : MASQUERADE_EXHIBITION.alt
          }
          className="masquerade-static-shadow"
          width={MASQUERADE_EXHIBITION.width}
          height={MASQUERADE_EXHIBITION.height}
          loading="lazy"
          onError={sceneFallback}
        />
      </section>
    );

  return (
    <section
      ref={section}
      className="masquerade-reveal"
      data-fallback={failed}
      aria-labelledby="masquerade-reveal-heading"
      data-campaign-chapter="seen-and-unseen"
    >
      <div className="masquerade-reveal-stage">
        <h2 id="masquerade-reveal-heading" className="sr-only">
          Seen and unseen
        </h2>
        <span className="masquerade-seen" aria-hidden="true">
          Seen
        </span>
        {!failed && (
          <img
            className="masquerade-object"
            src={OBJECT}
            alt="The Masquerade frame and its openwork wings"
            width="1600"
            height="800"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
        <div className="masquerade-reveal-scene">
          <img
            src={sceneSrc}
            alt={
              sceneSrc === OBJECT
                ? "The Masquerade frame and its openwork wings"
                : MASQUERADE_EXHIBITION.alt
            }
            className="masquerade-shadow"
            width={MASQUERADE_EXHIBITION.width}
            height={MASQUERADE_EXHIBITION.height}
            loading="eager"
            fetchPriority="low"
            decoding="async"
            onLoad={() => {
              if (section.current) setSceneReady(true);
            }}
            onError={sceneFallback}
          />
        </div>
        <span className="masquerade-unseen" aria-hidden="true">
          Unseen
        </span>
      </div>
    </section>
  );
}
