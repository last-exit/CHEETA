import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HOME_MAHARAJAH, homeObjectFrame } from "@/lib/homePresentation";
import HomeMaharajahReferences from "@/components/HomeMaharajahReferences";

export default function HomeObjectStudy() {
  const section = useRef<HTMLElement>(null);
  const motion = useMediaQuery(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
  );
  const [failed, setFailed] = useState(false);
  const staticStudy = !motion || failed;

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    if (staticStudy) {
      for (const property of [
        "--object-scale",
        "--object-rotate",
        "--object-y",
        "--object-title-y",
      ])
        root.style.removeProperty(property);
      root.dataset.progress = "0";
      return;
    }
    let frame = 0;
    let visible = false;
    const render = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const state = homeObjectFrame(
        (innerHeight - rect.top) / Math.max(1, rect.height + innerHeight)
      );
      root.style.setProperty("--object-scale", String(state.scale));
      root.style.setProperty("--object-rotate", `${state.rotate}deg`);
      root.style.setProperty("--object-y", `${state.y}px`);
      root.style.setProperty("--object-title-y", `${state.titleY}px`);
      root.dataset.progress = state.progress.toFixed(3);
    };
    const schedule = () => {
      if (visible && !document.hidden && !frame)
        frame = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "100px 0px" }
    );
    const resize = new ResizeObserver(schedule);
    observer.observe(root);
    resize.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [staticStudy]);

  return (
    <section
      ref={section}
      id="characters"
      className="home-object-study"
      data-static={staticStudy}
      aria-labelledby="home-maharajah-title"
    >
      <span id="pieces" className="home-hash-alias" aria-hidden="true" />
      <div className="home-object-stage">
        <HomeMaharajahReferences />
        <Link
          href="/collection/barrel"
          className="home-object-link"
          aria-label="Explore Maharajah in The Gun Collection"
        >
          <h2 id="home-maharajah-title">Maharajah</h2>
          <div className="home-object-art">
            {failed ? (
              <span className="home-object-unavailable" role="status">
                the frame study is unavailable
              </span>
            ) : (
              <svg
                viewBox={HOME_MAHARAJAH.viewBox}
                role="img"
                aria-label="Maharajah campaign study: octagonal ruby lenses in a gold frame"
                className="home-object-frame"
              >
                <image
                  href={HOME_MAHARAJAH.src}
                  width={HOME_MAHARAJAH.width}
                  height={HOME_MAHARAJAH.height}
                  onError={() => setFailed(true)}
                />
              </svg>
            )}
          </div>
          <div className="home-campaign-caption">
            <span>The Gun Collection</span>
            <span className="home-campaign-action">
              view campaign{" "}
              <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
