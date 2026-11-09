import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  cinemaSelection,
  HOME_FILMS,
  INITIAL_CINEMA,
  nextHomeFilm,
} from "@/lib/homeCinema";

type Film = (typeof HOME_FILMS)[number];

function CinemaLayer({
  film,
  mode,
  visible,
  reduced,
  ready,
  failed,
}: {
  film: Film;
  mode: "current" | "pending" | "outgoing";
  visible: boolean;
  reduced: boolean;
  ready: () => void;
  failed: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const player = video.current;
    if (!player || reduced || unavailable) return;
    let frame = 0;
    let animation = 0;
    let cancelled = false;
    const present = () => {
      if (mode !== "pending" || cancelled) return;
      if ("requestVideoFrameCallback" in player)
        frame = player.requestVideoFrameCallback(() => {
          if (!cancelled) ready();
        });
      else
        animation = requestAnimationFrame(() => {
          if (!cancelled) ready();
        });
    };
    const sync = () => {
      if (visible && !document.hidden && mode !== "outgoing") {
        if (
          mode === "pending" &&
          player.readyState >= 2 &&
          !frame &&
          !animation
        )
          present();
        void player.play().catch(() => {
          // A still remains available when a browser refuses automatic playback.
          if (!cancelled && mode === "pending" && player.readyState >= 2)
            ready();
        });
      } else player.pause();
    };
    player.addEventListener("loadeddata", sync);
    player.addEventListener("canplay", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelled = true;
      if (frame) player.cancelVideoFrameCallback(frame);
      cancelAnimationFrame(animation);
      player.removeEventListener("loadeddata", sync);
      player.removeEventListener("canplay", sync);
      document.removeEventListener("visibilitychange", sync);
      player.pause();
    };
  }, [mode, visible, reduced, unavailable, ready]);
  return (
    <div className="home-cinema-layer" data-mode={mode} aria-hidden="true">
      <img
        src={film.poster}
        alt=""
        width="1280"
        height="720"
        fetchPriority={mode === "current" ? "high" : "auto"}
        onLoad={event => {
          if (reduced && mode === "pending")
            void event.currentTarget.decode().then(ready, failed);
        }}
        onError={() => {
          if (reduced && mode === "pending") failed();
        }}
      />
      {!reduced && !unavailable && (
        <video
          ref={video}
          src={film.src}
          poster={film.poster}
          muted
          loop
          playsInline
          preload="auto"
          onError={() => {
            setUnavailable(true);
            if (mode === "pending") failed();
          }}
        />
      )}
    </div>
  );
}

export default function HomeCinema({
  onTone,
}: {
  onTone: (light: boolean) => void;
}) {
  const [selection, dispatch] = useReducer(cinemaSelection, INITIAL_CINEMA);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hero = useRef<HTMLElement>(null);
  const latest = useRef(0);
  const [visible, setVisible] = useState(true);
  const film = HOME_FILMS[selection.current];
  useEffect(() => {
    onTone(film.light);
  }, [film.light, onTone]);
  useEffect(() => {
    const root = hero.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (selection.target === null) return;
    const { target: index, request } = selection;
    const timeout = setTimeout(
      () => dispatch({ type: "failed", index, request }),
      12000
    );
    return () => clearTimeout(timeout);
  }, [selection.target, selection.request]);
  useEffect(() => {
    if (selection.outgoing === null) return;
    const timeout = setTimeout(
      () => dispatch({ type: "settled", index: selection.current }),
      450
    );
    return () => clearTimeout(timeout);
  }, [selection.current, selection.outgoing]);
  useEffect(() => {
    if (!visible) return;
    const poster = new Image();
    poster.src = HOME_FILMS[nextHomeFilm(selection.current)].poster;
    void poster.decode().catch(() => {});
  }, [selection.current, visible]);
  const ready = useCallback(() => {
    if (selection.target !== null)
      dispatch({
        type: "ready",
        index: selection.target,
        request: selection.request,
      });
  }, [selection.target, selection.request]);
  const failed = useCallback(() => {
    if (selection.target !== null)
      dispatch({
        type: "failed",
        index: selection.target,
        request: selection.request,
      });
  }, [selection.target, selection.request]);
  const select = (direction: number, immediate = false) => {
    latest.current = nextHomeFilm(latest.current, direction);
    dispatch({
      type: "request",
      index: latest.current,
      immediate: immediate || reduced,
    });
  };
  const indices = [
    selection.outgoing,
    selection.current,
    selection.target,
  ].filter((value): value is number => value !== null);
  return (
    <section
      ref={hero}
      className="home-opening"
      aria-label="Cheeta Jewels campaign films"
      data-home-dark={film.light ? "true" : undefined}
      data-film={film.id}
      data-pending={selection.target !== null}
      data-immediate={selection.immediate}
      data-phase={
        selection.target !== null
          ? "loading"
          : selection.outgoing !== null
            ? "fading"
            : "idle"
      }
    >
      {indices.map(index => (
        <CinemaLayer
          key={HOME_FILMS[index].id}
          film={HOME_FILMS[index]}
          mode={
            index === selection.current
              ? "current"
              : index === selection.target
                ? "pending"
                : "outgoing"
          }
          visible={visible}
          reduced={reduced}
          ready={ready}
          failed={failed}
        />
      ))}
      <button
        type="button"
        className="home-cinema-switch"
        aria-label="Next campaign film"
        aria-describedby="home-cinema-instructions"
        aria-busy={selection.target !== null}
        onClick={event => select(1, event.detail === 0)}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            select(event.key === "ArrowLeft" ? -1 : 1, true);
          } else if (
            event.key.toLowerCase() === "r" &&
            selection.error !== null
          ) {
            latest.current = selection.error;
            dispatch({
              type: "request",
              index: selection.error,
              immediate: true,
            });
          }
        }}
      >
        <span id="home-cinema-instructions" className="sr-only">
          Click or tap to change film. Enter or Space advances. Arrow keys
          select previous or next. Scroll to explore.
        </span>
      </button>
      <img
        src={`/brand/icon-livin-${film.light ? "white" : "black"}.png`}
        alt="Icon livin’"
        className="home-opening-signature"
        width="1024"
        height="258"
        fetchPriority="high"
      />
      <span className="sr-only" role="status" aria-live="polite">
        {selection.error !== null
          ? "Film unavailable. The previous film remains visible. Select another film or press R to retry."
          : `${film.title} film selected.`}
      </span>
    </section>
  );
}
