import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type {
  SculpturePose,
  createMasqueradeStudio,
} from "@/lib/masqueradeStudio";
import "./MasqueradeSculpture.css";

type Studio = ReturnType<typeof createMasqueradeStudio>;
const initial: SculpturePose = { x: 0.12, y: -0.28, zoom: 1, light: 36 };

export default function MasqueradeSculpture() {
  const mount = useRef<HTMLDivElement>(null);
  const studio = useRef<Studio | null>(null);
  const pose = useRef({ ...initial });
  const pointer = useRef<{
    id: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const motion = useRef(reduced);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    motion.current = reduced;
    studio.current?.reduced(reduced);
  }, [reduced]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let cancelled = false,
      starting = false;
    setState("loading");
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting || starting) return;
        starting = true;
        observer.disconnect();
        import("@/lib/masqueradeStudio")
          .then(module => {
            if (cancelled) return;
            try {
              studio.current = module.createMasqueradeStudio(
                host,
                () => {
                  studio.current?.dispose();
                  studio.current = null;
                  setState("failed");
                },
                motion.current,
                () => {
                  if (!cancelled) setState("ready");
                }
              );
              studio.current.pose(pose.current, true);
            } catch {
              studio.current?.dispose();
              studio.current = null;
              setState("failed");
            }
          })
          .catch(() => {
            if (!cancelled) setState("failed");
          });
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(host);
    return () => {
      cancelled = true;
      observer.disconnect();
      studio.current?.dispose();
      studio.current = null;
    };
  }, [attempt]);

  const change = (values: Partial<SculpturePose>, immediate = false) => {
    pose.current = {
      ...pose.current,
      ...values,
      x: Math.max(-0.7, Math.min(0.7, values.x ?? pose.current.x)),
      zoom: Math.max(0.8, Math.min(1.45, values.zoom ?? pose.current.zoom)),
    };
    studio.current?.pose(pose.current, immediate);
  };
  const reset = (immediate = false) => {
    pose.current = { ...initial };
    studio.current?.pose(initial, immediate || motion.current);
  };

  return (
    <section
      className="masquerade-sculpture"
      aria-labelledby="masquerade-sculpture-title"
      data-campaign-chapter="openwork-study"
    >
      <header className="masquerade-sculpture-heading house-container">
        <h2 id="masquerade-sculpture-title">
          Anatomy of <em>a disguise.</em>
        </h2>
      </header>
      <div
        className="masquerade-sculpture-stage"
        role="group"
        aria-label="Interactive Masquerade sculpture"
        aria-describedby="masquerade-sculpture-instructions"
        tabIndex={state === "ready" ? 0 : -1}
        data-state={state}
        onKeyDown={event => {
          const step = event.shiftKey ? 0.3 : 0.12;
          if (event.key === "ArrowLeft")
            change({ y: pose.current.y - step }, true);
          else if (event.key === "ArrowRight")
            change({ y: pose.current.y + step }, true);
          else if (event.key === "ArrowUp")
            change({ x: pose.current.x - step }, true);
          else if (event.key === "ArrowDown")
            change({ x: pose.current.x + step }, true);
          else if (event.key === "+" || event.key === "=")
            change({ zoom: pose.current.zoom + 0.1 }, true);
          else if (event.key === "-")
            change({ zoom: pose.current.zoom - 0.1 }, true);
          else if (event.key === "Home" || event.key === "Escape") reset(true);
          else return;
          event.preventDefault();
        }}
        onPointerDown={event => {
          if (state !== "ready" || !event.isPrimary || event.button !== 0)
            return;
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            moved: false,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
          if (event.pointerType === "mouse")
            event.currentTarget.focus({ preventScroll: true });
        }}
        onPointerMove={event => {
          const drag = pointer.current;
          if (!drag || drag.id !== event.pointerId) return;
          const dx = event.clientX - drag.x,
            dy = event.clientY - drag.y;
          if (!drag.moved && Math.hypot(dx, dy) < 5) return;
          if (
            !drag.moved &&
            event.pointerType === "touch" &&
            Math.abs(dy) > Math.abs(dx)
          )
            return;
          drag.moved = true;
          event.currentTarget.dataset.dragging = "true";
          change({
            y: pose.current.y + dx * 0.008,
            x: pose.current.x + dy * 0.005,
          });
          drag.x = event.clientX;
          drag.y = event.clientY;
        }}
        onLostPointerCapture={event => {
          pointer.current = null;
          delete event.currentTarget.dataset.dragging;
        }}
        onPointerUp={event => {
          pointer.current = null;
          delete event.currentTarget.dataset.dragging;
        }}
        onPointerCancel={event => {
          pointer.current = null;
          delete event.currentTarget.dataset.dragging;
        }}
      >
        <div ref={mount} className="masquerade-sculpture-canvas" />
        <img
          className="masquerade-sculpture-poster"
          src="/campaigns/masquerade/openwork-study.webp"
          alt="Black cat-eye eyewear surrounded by delicate openwork"
          loading="lazy"
          width="1600"
          height="914"
        />
      </div>
      <p className="sr-only" id="masquerade-sculpture-instructions">
        A sculptural interpretation of The Masquerade. Drag to rotate. With the
        sculpture focused, use the arrow keys to turn, plus and minus to zoom,
        and Home or Escape to reset. On touch screens, drag horizontally to turn
        and swipe vertically to scroll the page.
      </p>
      {state === "failed" && (
        <div
          className="masquerade-sculpture-retry house-container"
          role="status"
        >
          <button onClick={() => setAttempt(value => value + 1)}>
            retry interactive study
          </button>
        </div>
      )}
    </section>
  );
}
