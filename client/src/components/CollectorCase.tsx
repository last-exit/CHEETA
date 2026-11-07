import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  GUN_JOURNEY,
  GUN_LENSES,
  gunCaseOpen,
  gunLensIndex,
} from "@/lib/gunJourney";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollCinema } from "@/hooks/useScrollCinema";
import "./CollectorCase.css";

/** One continuous scene, separate from the retail catalogue and bag. */
export default function CollectorCase() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 1023px)");
  const staticView = reduced || compact || !GUN_JOURNEY.available;
  const [attempt, setAttempt] = useState(0);
  const { root, player, screen, poster, painted, failed } = useScrollCinema(
    GUN_JOURNEY,
    staticView,
    attempt
  );
  const [lens, setLens] = useState(0);
  const [inspecting, setInspecting] = useState(false);
  const [immediate, setImmediate] = useState(false);
  const [endPainted, setEndPainted] = useState(false);
  const [stillReady, setStillReady] = useState(false);
  const [stillFailed, setStillFailed] = useState(false);
  const [near, setNear] = useState(false);
  const frameButton = useRef<HTMLButtonElement>(null);
  const restoreRetryFocus = useRef(false);
  const filterId = useId().replace(/:/g, "");
  const stillView = staticView || failed;
  const open = stillView ? stillReady : endPainted && stillReady;
  const ready = stillView ? stillReady : painted;
  const selected = GUN_LENSES[lens];
  const closing = `${GUN_JOURNEY.closing}${attempt ? `?attempt=${attempt}` : ""}`;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [root]);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    const image = new Image();
    setStillReady(false);
    setStillFailed(false);
    image.onload = async () => {
      try {
        await image.decode();
        if (!cancelled && image.naturalWidth) setStillReady(true);
      } catch {
        if (!cancelled) setStillFailed(true);
      }
    };
    image.onerror = () => {
      if (!cancelled) setStillFailed(true);
    };
    image.src = closing;
    return () => {
      cancelled = true;
      image.onload = image.onerror = null;
    };
  }, [near, closing]);

  useEffect(() => {
    const element = root.current,
      canvas = screen.current;
    if (!element || !canvas || stillView) return;
    const update = () => {
      const isOpen = gunCaseOpen(
        Number(element.dataset.progress),
        Number(canvas.dataset.time),
        player.current?.duration ?? 0
      );
      setEndPainted(isOpen);
      if (!isOpen) setInspecting(false);
    };
    const observer = new MutationObserver(update);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-progress"],
    });
    observer.observe(canvas, {
      attributes: true,
      attributeFilter: ["data-time"],
    });
    update();
    return () => observer.disconnect();
  }, [root, screen, player, stillView, attempt]);

  useEffect(() => {
    if (ready && restoreRetryFocus.current) {
      frameButton.current?.focus({ preventScroll: true });
      restoreRetryFocus.current = false;
    }
  }, [ready]);

  const inspect = (keyboard: boolean) => {
    if (!ready) return;
    setImmediate(keyboard || reduced);
    if (!open) {
      const element = root.current;
      if (!element) return;
      window.scrollTo({
        top:
          window.scrollY +
          element.getBoundingClientRect().top +
          (element.offsetHeight - window.innerHeight) * 0.9,
        behavior: keyboard || reduced ? "instant" : "smooth",
      });
      return;
    }
    setInspecting(value => !value);
  };
  const keys = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && inspecting) {
      event.preventDefault();
      event.stopPropagation();
      setImmediate(true);
      setInspecting(false);
      frameButton.current?.focus({ preventScroll: true });
    } else if (
      open &&
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(event.key)
    ) {
      event.preventDefault();
      event.stopPropagation();
      setImmediate(true);
      setLens(value => gunLensIndex(value, event.key));
    }
  };
  const retry = () => {
    restoreRetryFocus.current = true;
    setEndPainted(false);
    setInspecting(false);
    setAttempt(value => value + 1);
  };

  return (
    <>
      <section
        ref={root}
        id="collectors-case"
        className="collector-case"
        data-campaign-chapter="the-collectors-case"
        data-static={staticView}
        data-fallback={stillView}
        data-painted={painted && !stillView}
        data-inspecting={inspecting}
        data-immediate={immediate || reduced}
        data-open={open}
        data-lens={selected.id}
        style={
          { "--case-scroll": `${GUN_JOURNEY.scrollVh}svh` } as CSSProperties
        }
        aria-labelledby="collector-case-title"
        aria-describedby="collector-case-instructions"
        onKeyDown={keys}
      >
        <div
          className="collector-case-stage"
          data-campaign-dark={inspecting && !compact}
          aria-busy={!ready && !failed && !stillFailed}
        >
          <div className="collector-case-world">
            <img
              ref={poster}
              className="collector-case-poster"
              src={stillView ? closing : GUN_JOURNEY.opening}
              alt="A wood and brass collector’s case in a pale Mughal-inspired palace, holding one octagonal Maharajah frame"
              width={GUN_JOURNEY.width}
              height={GUN_JOURNEY.height}
              loading={near ? "eager" : "lazy"}
              decoding="async"
            />
            {!staticView && (
              <>
                <video
                  ref={player}
                  className="collector-case-source"
                  muted
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  tabIndex={-1}
                />
                <canvas
                  ref={screen}
                  className="collector-case-screen"
                  aria-hidden="true"
                />
              </>
            )}
            <svg
              className="collector-case-lens-tint"
              viewBox={`0 0 ${GUN_JOURNEY.width} ${GUN_JOURNEY.height}`}
              aria-hidden="true"
              data-visible={open && selected.id !== "ruby"}
              style={{ filter: selected.filter }}
            >
              <defs>
                <clipPath id={`${filterId}-lenses`}>
                  <path d={GUN_JOURNEY.lensMask} />
                </clipPath>
              </defs>
              <image
                href={near ? closing : undefined}
                width={GUN_JOURNEY.width}
                height={GUN_JOURNEY.height}
                clipPath={`url(#${filterId}-lenses)`}
              />
            </svg>
          </div>
          <button
            ref={frameButton}
            type="button"
            className="collector-case-inspect"
            aria-label={
              !open
                ? "Open the Maharajah case"
                : inspecting
                  ? "Return to the full case"
                  : "Look closer at Maharajah"
            }
            aria-pressed={inspecting}
            disabled={!ready}
            onFocus={event => {
              if (event.currentTarget.matches(":focus-visible"))
                setImmediate(true);
            }}
            onClick={event => inspect(event.detail === 0)}
          />
          <header className="collector-case-heading">
            <h2 id="collector-case-title">Maharajah</h2>
          </header>
          <div
            className="collector-case-selection"
            role="group"
            aria-label="Change the lenses"
            hidden={!open}
          >
            <button
              type="button"
              aria-label="Previous lens colour"
              onClick={event => {
                setImmediate(event.detail === 0);
                setLens(value => gunLensIndex(value, "ArrowLeft"));
              }}
            >
              <ArrowLeft size={19} strokeWidth={1.1} aria-hidden="true" />
            </button>
            <span aria-live="polite" aria-atomic="true">
              {selected.label}
            </span>
            <button
              type="button"
              aria-label="Next lens colour"
              onClick={event => {
                setImmediate(event.detail === 0);
                setLens(value => gunLensIndex(value, "ArrowRight"));
              }}
            >
              <ArrowRight size={19} strokeWidth={1.1} aria-hidden="true" />
            </button>
          </div>
          {(failed || stillFailed) && (
            <div className="collector-case-error" role="status">
              <span>
                {stillFailed
                  ? "the view couldn’t load"
                  : "the film couldn’t load"}
              </span>
              <button type="button" onClick={retry}>
                retry
              </button>
            </div>
          )}
        </div>
        <p id="collector-case-instructions" className="sr-only">
          Scroll to open the case, or activate it to open. One pair is shown at
          a time. Use the arrows in the scene to change the lenses. Select the
          frame for a closer view. Arrow keys, Home and End select lens colours;
          Escape returns to the full case.
        </p>
      </section>
    </>
  );
}
