import { describe, expect, it } from "vitest";
import {
  cinemaSelection,
  HOME_FILMS,
  INITIAL_CINEMA,
  nextHomeFilm,
} from "../lib/homeCinema";

describe("Homepage film selection", () => {
  it("cycles through the four approved films in either direction", () => {
    expect(HOME_FILMS.map(film => film.id)).toEqual([
      "horseback",
      "masquerade",
      "king",
      "case",
    ]);
    expect(nextHomeFilm(3)).toBe(0);
    expect(nextHomeFilm(0, -1)).toBe(3);
  });

  it("keeps the displayed film and its identity until the request is ready", () => {
    const pending = cinemaSelection(INITIAL_CINEMA, {
      type: "request",
      index: 1,
      immediate: false,
    });
    expect(pending.current).toBe(0);
    expect(pending.target).toBe(1);
    const committed = cinemaSelection(pending, {
      type: "ready",
      index: 1,
      request: pending.request,
    });
    expect(committed).toMatchObject({ current: 1, target: null, outgoing: 0 });
    expect(HOME_FILMS[committed.current].src).toBe("/videos/masquerade.mp4");
    expect(
      cinemaSelection(committed, { type: "settled", index: 1 }).outgoing
    ).toBeNull();
  });

  it("ignores stale readiness and failures after rapid input", () => {
    const first = cinemaSelection(INITIAL_CINEMA, {
      type: "request",
      index: 1,
      immediate: false,
    });
    const latest = cinemaSelection(first, {
      type: "request",
      index: 2,
      immediate: false,
    });
    expect(
      cinemaSelection(latest, {
        type: "ready",
        index: 1,
        request: first.request,
      })
    ).toEqual(latest);
    expect(
      cinemaSelection(latest, {
        type: "failed",
        index: 1,
        request: first.request,
      })
    ).toEqual(latest);
    expect(
      cinemaSelection(latest, {
        type: "ready",
        index: 2,
        request: latest.request,
      }).current
    ).toBe(2);
  });

  it("bounds interrupted transitions to the displayed film and newest target", () => {
    let state = cinemaSelection(INITIAL_CINEMA, {
      type: "request",
      index: 1,
      immediate: false,
    });
    state = cinemaSelection(state, {
      type: "ready",
      index: 1,
      request: state.request,
    });
    state = cinemaSelection(state, {
      type: "request",
      index: 3,
      immediate: false,
    });
    expect(state).toMatchObject({ current: 1, outgoing: null, target: 3 });
    // A timer from the interrupted fade cannot discard a newer transition.
    expect(cinemaSelection(state, { type: "settled", index: 0 })).toEqual(
      state
    );
  });

  it("retains the previous film on failure and allows a fresh retry", () => {
    let state = cinemaSelection(INITIAL_CINEMA, {
      type: "request",
      index: 2,
      immediate: false,
    });
    state = cinemaSelection(state, {
      type: "failed",
      index: 2,
      request: state.request,
    });
    expect(state).toMatchObject({ current: 0, target: null, error: 2 });
    const retry = cinemaSelection(state, {
      type: "request",
      index: 2,
      immediate: true,
    });
    expect(retry.request).toBeGreaterThan(state.request);
    expect(retry.error).toBeNull();
    expect(
      cinemaSelection(retry, {
        type: "ready",
        index: 2,
        request: retry.request,
      })
    ).toMatchObject({ current: 2, outgoing: null });
  });

  it("cancels a pending selection when input returns to the displayed film", () => {
    const pending = cinemaSelection(INITIAL_CINEMA, {
      type: "request",
      index: 1,
      immediate: false,
    });
    const cancelled = cinemaSelection(pending, {
      type: "request",
      index: 0,
      immediate: true,
    });
    expect(cancelled).toMatchObject({
      current: 0,
      target: null,
      outgoing: null,
    });
    expect(
      cinemaSelection(cancelled, {
        type: "ready",
        index: 1,
        request: pending.request,
      })
    ).toEqual(cancelled);
    expect(
      cinemaSelection(cancelled, {
        type: "request",
        index: 9,
        immediate: false,
      })
    ).toEqual(cancelled);
  });
});
