import {
  useEffect,
  useReducer,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ArrowLeft } from "lucide-react";
import { useCollectorCaseMotion } from "@/hooks/useCollectorCaseMotion";
import {
  COLLECTOR_CASE_ITEMS,
  COLLECTOR_CASE_VIEWS,
  collectorCaseReducer,
  createCollectorCase,
} from "@/lib/collectorCase";
import "./CollectorCase.css";

export default function CollectorCase() {
  const [state, dispatch] = useReducer(
    collectorCaseReducer,
    undefined,
    createCollectorCase
  );
  const [immediate, setImmediate] = useState(false);
  const alive = useRef(true);
  const itemButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const openingButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const errorRetry = useRef<HTMLButtonElement>(null);
  const restoreItem = useRef<number | null>(null);
  const restoreClosed = useRef(false);
  const motion = useCollectorCaseMotion({
    target: state.displayed,
    requested: state.requested,
    failed: state.failed[state.requested],
    immediate,
  });
  const displayed = motion.presented;
  const hasOpened = displayed !== null && displayed > 0;
  const travelling = motion.phase !== "idle";
  const lidMoving = motion.phase === "opening" || motion.phase === "closing";
  const pending = displayed !== state.requested || travelling;
  const failed = state.failed[state.requested];
  const inspecting = state.requested > 1;
  const item = COLLECTOR_CASE_ITEMS.find(entry => entry.view === displayed);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  useEffect(() => {
    if (
      displayed === 1 &&
      state.requested === 1 &&
      !travelling &&
      restoreItem.current !== null
    ) {
      itemButtons.current[restoreItem.current]?.focus({ preventScroll: true });
      restoreItem.current = null;
    }
    if (
      displayed === 0 &&
      state.requested === 0 &&
      !travelling &&
      restoreClosed.current
    ) {
      openingButton.current?.focus({ preventScroll: true });
      restoreClosed.current = false;
    }
    if (displayed === 0 && state.requested > 0)
      backButton.current?.focus({ preventScroll: true });
    if (
      (failed || motion.motionFailed) &&
      document.activeElement === document.body
    )
      errorRetry.current?.focus({ preventScroll: true });
  }, [displayed, state.requested, failed, travelling, motion.motionFailed]);

  const request = (index: number, keyboard = false) => {
    setImmediate(keyboard);
    dispatch({ type: "request", index });
  };
  const open = (keyboard: boolean) => {
    restoreItem.current = 0;
    request(1, keyboard);
  };
  const inspect = (index: number, keyboard = false) => {
    restoreItem.current = null;
    itemButtons.current[index]?.focus({ preventScroll: true });
    request(COLLECTOR_CASE_ITEMS[index].view, keyboard);
  };
  const back = (keyboard: boolean) => {
    restoreItem.current = Math.max(
      0,
      COLLECTOR_CASE_ITEMS.findIndex(entry => entry.view === state.requested)
    );
    request(1, keyboard);
  };
  const close = (keyboard: boolean) => {
    restoreItem.current = null;
    restoreClosed.current = true;
    request(0, keyboard);
  };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % COLLECTOR_CASE_ITEMS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next =
        (index + COLLECTOR_CASE_ITEMS.length - 1) % COLLECTOR_CASE_ITEMS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = COLLECTOR_CASE_ITEMS.length - 1;
    else return;
    event.preventDefault();
    event.stopPropagation();
    inspect(next, true);
  };
  const retry = () => {
    if (state.requested > 1 && hasOpened) {
      const index = COLLECTOR_CASE_ITEMS.findIndex(
        entry => entry.view === state.requested
      );
      itemButtons.current[index]?.focus({ preventScroll: true });
    } else heading.current?.focus({ preventScroll: true });
    dispatch({ type: "retry" });
  };

  return (
    <section
      id="collectors-case"
      className="collector-case house-container"
      data-campaign-chapter="the-collectors-case"
      data-view={COLLECTOR_CASE_VIEWS[displayed ?? 0].id}
      data-motion={motion.phase}
      data-film-active={motion.painted}
      data-immediate={immediate}
      aria-labelledby="collector-case-title"
      onKeyDown={event => {
        if (event.key !== "Escape" || state.requested === 0) return;
        event.preventDefault();
        event.stopPropagation();
        if (inspecting) back(true);
        else close(true);
      }}
    >
      <header className="collector-case-heading">
        <h2 ref={heading} id="collector-case-title" tabIndex={-1}>
          The collector’s case.
        </h2>
      </header>
      <p id="collector-case-instructions" className="sr-only">
        Open the case, then select a pair of glasses directly inside it. Use
        arrow keys to compare ruby, smoke and amber. Escape returns to the case,
        then closes it.
      </p>
      <div
        id="collector-case-stage"
        className="collector-case-stage"
        aria-describedby="collector-case-instructions"
        aria-busy={pending && !failed && !motion.motionFailed}
      >
        {inspecting && hasOpened && (
          <button
            type="button"
            className="collector-case-return-surface"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => back(false)}
          />
        )}
        {COLLECTOR_CASE_VIEWS.map((view, index) => {
          const attempt = state.attempts[index];
          return (
            <div
              key={`${view.id}-${attempt}`}
              ref={index === 1 ? motion.camera : undefined}
              className={`collector-case-image${index === 1 ? " collector-case-camera" : ""}`}
              data-active={
                index === 0 ? displayed === 0 : index === 1 && hasOpened
              }
              data-kind={view.id}
              aria-hidden={
                index === 0 ? displayed !== 0 : index !== 1 || !hasOpened
              }
            >
              <img
                src={attempt ? `${view.src}?attempt=${attempt}` : view.src}
                alt={view.alt}
                width={view.width}
                height={view.height}
                loading="lazy"
                decoding="async"
                onLoad={async event => {
                  const image = event.currentTarget;
                  try {
                    await image.decode();
                  } catch {
                    /* Cached image may remain usable. */
                  }
                  if (alive.current && image.complete && image.naturalWidth)
                    dispatch({ type: "ready", index, attempt });
                }}
                onError={() => {
                  if (alive.current)
                    dispatch({ type: "failed", index, attempt });
                }}
              />
              {index === 0 && displayed === 0 && !travelling && (
                <button
                  ref={openingButton}
                  type="button"
                  className="collector-case-open-surface"
                  aria-label="Open the collector’s case"
                  disabled={pending}
                  onClick={event => open(event.detail === 0)}
                >
                  <span className="collector-case-hint">open</span>
                </button>
              )}
              {index === 1 && hasOpened && !lidMoving && (
                <>
                  <button
                    ref={!inspecting ? backButton : undefined}
                    type="button"
                    className="collector-case-lid"
                    aria-label="Close the collector’s case"
                    onClick={event => close(event.detail === 0)}
                  >
                    <span className="collector-case-hint">close</span>
                  </button>
                  <div
                    className="collector-case-hotspots"
                    role="group"
                    aria-label="Glasses inside the case"
                  >
                    {COLLECTOR_CASE_ITEMS.map((entry, itemIndex) => (
                      <button
                        key={entry.id}
                        ref={node => {
                          itemButtons.current[itemIndex] = node;
                        }}
                        type="button"
                        aria-label={`Inspect ${entry.label.toLowerCase()} Maharajah`}
                        aria-pressed={state.requested === entry.view}
                        aria-controls="collector-case-stage"
                        data-lens={entry.id}
                        className="collector-case-glasses"
                        style={{
                          left: `${entry.region.left}%`,
                          top: `${entry.region.top + entry.region.height / 2}%`,
                          width: `${entry.region.width}%`,
                          height: `${entry.region.height}%`,
                        }}
                        onKeyDown={event => navigate(event, itemIndex)}
                        onClick={event =>
                          inspect(itemIndex, event.detail === 0)
                        }
                      >
                        <span className="collector-case-hint">
                          {entry.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
        {motion.videoEnabled && (
          <>
            <video
              ref={motion.video}
              className="collector-case-player"
              preload="none"
              muted
              playsInline
              disablePictureInPicture
              aria-hidden="true"
              tabIndex={-1}
            />
            <canvas
              ref={motion.canvas}
              className="collector-case-film"
              width={1280}
              height={720}
              data-active={motion.painted}
              aria-hidden="true"
            />
          </>
        )}
        {motion.phase === "opening" && (
          <button
            ref={backButton}
            type="button"
            className="collector-case-cancel-opening"
            aria-label="Close the collector’s case"
            onClick={event => close(event.detail === 0)}
          />
        )}
        {inspecting && hasOpened && !lidMoving && (
          <button
            ref={backButton}
            type="button"
            className="collector-case-back"
            aria-label="Return to the collector’s case"
            onClick={event => back(event.detail === 0)}
          >
            <ArrowLeft size={22} strokeWidth={1.2} aria-hidden="true" />
            <span className="collector-case-back-label">return</span>
          </button>
        )}
        {(failed || motion.motionFailed) && (
          <div className="collector-case-error" role="status">
            <span>
              {motion.motionFailed
                ? "animation unavailable"
                : "view unavailable"}
            </span>
            <button
              ref={errorRetry}
              type="button"
              onClick={motion.motionFailed ? motion.retryMotion : retry}
            >
              retry
            </button>
            {motion.motionFailed && (
              <button type="button" onClick={() => setImmediate(true)}>
                view without motion
              </button>
            )}
          </div>
        )}
        {displayed === null && !failed && (
          <span className="collector-case-loading">loading the case</span>
        )}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {pending
          ? motion.phase === "opening"
            ? "Opening the case"
            : motion.phase === "closing"
              ? "Closing the case"
              : "Loading the view"
          : item
            ? item.title
            : hasOpened
              ? "Case open. Select a pair of glasses."
              : "Case closed."}
      </div>
    </section>
  );
}
