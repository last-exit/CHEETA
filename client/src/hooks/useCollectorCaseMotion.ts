import { useEffect, useRef, useState } from "react";
import {
  caseCameraTransform,
  caseCamera,
  CASE_FILM_AVAILABLE,
  COLLECTOR_CASE_FILMS,
  reverseCaseTime,
} from "@/lib/collectorCase";
import { useMediaQuery } from "./useMediaQuery";
import {
  createCaseFilmPainter,
  type CaseFilmPainter,
} from "@/lib/caseFilmPainter";

type Film = {
  direction: "opening" | "closing";
  time: number;
  duration: number;
};

/** The decoded selection and the presented view are deliberately separate:
 * a late load may prepare a view, but only the current motion can present it. */
export function useCollectorCaseMotion({
  target,
  requested,
  failed,
  immediate,
}: {
  target: number | null;
  requested: number;
  failed: boolean;
  immediate: boolean;
}) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const camera = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const committed = useRef<number | null>(null);
  const film = useRef<Film | null>(null);
  const inView = useRef(true);
  const [presented, setPresented] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "opening" | "closing" | "camera">(
    "idle"
  );
  const [painted, setPainted] = useState(false);
  const [motionFailed, setMotionFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const element = camera.current?.parentElement;
    const player = video.current;
    if (!element || !player || reduced || !CASE_FILM_AVAILABLE) return;
    const sync = () => {
      if (document.hidden || !inView.current) player.pause();
      else if (film.current && !player.ended)
        void player.play().catch(() => setMotionFailed(true));
    };
    // Preload before arrival, but play only while the stage is actually visible.
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !player.getAttribute("src")) {
          player.src = COLLECTOR_CASE_FILMS.opening;
          player.preload = "auto";
          player.load();
        }
        if (entry.isIntersecting) preload.disconnect();
      },
      { rootMargin: "320px" }
    );
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      sync();
    });
    preload.observe(element);
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      preload.disconnect();
      document.removeEventListener("visibilitychange", sync);
      player.pause();
    };
  }, [reduced]);

  useEffect(() => {
    const plane = camera.current;
    const player = video.current;
    const screen = canvas.current;
    let cancelled = false;
    let animation: Animation | undefined;
    let frame = 0;
    let videoFrame = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let clearPlayer = () => {};

    const commit = (view: number) => {
      if (cancelled) return;
      committed.current = view;
      setPresented(view);
      setPhase("idle");
      setPainted(false);
      film.current = null;
      if (plane) {
        plane.style.transform = caseCameraTransform(view);
        plane.style.setProperty("--case-zoom", String(caseCamera(view).scale));
      }
    };
    const reset = () => {
      film.current = null;
      setPainted(false);
      setPhase("idle");
      if (plane)
        plane.style.transform = caseCameraTransform(committed.current ?? 1);
    };
    const move = async (view: number) => {
      if (!plane || cancelled) return;
      setPhase("camera");
      const from = getComputedStyle(plane).transform;
      const to = caseCameraTransform(view);
      animation = plane.animate([{ transform: from }, { transform: to }], {
        duration: view === 1 ? 1050 : 1350,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      });
      try {
        await animation.finished;
        if (cancelled) return;
        plane.style.transform = to;
        animation.cancel();
      } catch {
        /* A newer request continues from the current camera position. */
      }
    };
    const playFilm = (direction: Film["direction"], view: number) => {
      if (!player || !screen || cancelled) return;
      const previous = film.current;
      let painter: CaseFilmPainter | undefined;
      const stopPaint = () => {
        if (timeout) clearTimeout(timeout);
        if (videoFrame) player.cancelVideoFrameCallback(videoFrame);
        cancelAnimationFrame(frame);
      };
      setPhase(direction);
      const fail = () => {
        if (cancelled) return;
        player.pause();
        stopPaint();
        reset();
        setMotionFailed(true);
      };
      const finish = () => {
        if (cancelled) return;
        stopPaint();
        commit(view);
      };
      const draw = () => {
        if (cancelled) return;
        if (player.readyState >= 2 && !player.seeking) {
          try {
            painter?.draw(player);
          } catch {
            fail();
            return;
          }
          setPainted(true);
          film.current = {
            direction,
            time: player.currentTime,
            duration: player.duration,
          };
        }
        if ("requestVideoFrameCallback" in player)
          videoFrame = player.requestVideoFrameCallback(draw);
        else frame = requestAnimationFrame(draw);
      };
      const begin = () => {
        if (cancelled) return;
        if (timeout) clearTimeout(timeout);
        // Seeking completes before we replace the retained canvas frame.
        film.current = {
          direction,
          time: player.currentTime,
          duration: player.duration,
        };
        draw();
        if (inView.current && !document.hidden) void player.play().catch(fail);
      };
      const loaded = () => {
        if (cancelled) return;
        const position = previous
          ? previous.direction === direction
            ? previous.time
            : reverseCaseTime(previous.time, player.duration)
          : 0;
        if (position > 0.02) {
          player.addEventListener("seeked", begin, { once: true });
          player.currentTime = position;
        } else begin();
      };
      player.addEventListener("loadeddata", loaded, { once: true });
      player.addEventListener("ended", finish, { once: true });
      player.addEventListener("error", fail, { once: true });
      clearPlayer = () => {
        player.removeEventListener("loadeddata", loaded);
        player.removeEventListener("seeked", begin);
        player.removeEventListener("ended", finish);
        player.removeEventListener("error", fail);
        painter?.dispose();
      };
      try {
        painter = createCaseFilmPainter(screen);
      } catch {
        fail();
        return;
      }
      timeout = setTimeout(fail, 15000);
      player.src = `${COLLECTOR_CASE_FILMS[direction]}${attempt ? `?attempt=${attempt}` : ""}`;
      player.preload = "auto";
      player.playbackRate = 1;
      player.load();
    };

    if (failed) {
      reset();
      return;
    }
    if (target === null) return;
    if (target === requested) {
      setMotionFailed(false);
      const from = committed.current;
      if (
        immediate ||
        reduced ||
        from === null ||
        (!CASE_FILM_AVAILABLE && (from === 0 || target === 0))
      )
        commit(target);
      else if (film.current || (from === 0) !== (target === 0)) {
        // Return from any compartment before lowering the lid.
        void (async () => {
          if (from !== null && from > 1 && target === 0) await move(1);
          if (!cancelled)
            playFilm(target === 0 ? "closing" : "opening", target);
        })();
      } else if (from !== target) {
        void move(target).then(() => {
          if (!cancelled) commit(target);
        });
      } else reset();
    }

    return () => {
      cancelled = true;
      if (animation && plane) {
        // Capture before cancelling to make rapid selections interruptible.
        plane.style.transform = getComputedStyle(plane).transform;
        animation.cancel();
      }
      if (player && film.current) {
        film.current.time = player.currentTime;
        player.pause();
      }
      clearPlayer();
      if (timeout) clearTimeout(timeout);
      if (videoFrame && player) player.cancelVideoFrameCallback(videoFrame);
      cancelAnimationFrame(frame);
    };
  }, [target, requested, failed, immediate, reduced, attempt]);

  return {
    camera,
    canvas,
    video,
    presented,
    phase,
    painted,
    reduced,
    videoEnabled: !reduced && CASE_FILM_AVAILABLE,
    motionFailed,
    retryMotion: () => setAttempt(value => value + 1),
  };
}
