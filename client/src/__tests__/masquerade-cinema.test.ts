import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import MasqueradeCinema from "../components/MasqueradeCinema";
import {
  MASQUERADE_CINEMA,
  cinemaFrame,
  cinemaTime,
  cinemaProgress,
  cinemaCrop,
  cinemaSurface,
  cinemaPreview,
} from "../lib/masqueradeCinema";

const media = vi.hoisted(() => ({ reduced: false }));
vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: () => media.reduced,
}));

describe("Masquerade cinematic sequence", () => {
  it("caps the drawing surface to real source detail while retaining the viewport aspect ratio", () => {
    for (const [width, height, dpr] of [
      [1480, 1034, 2],
      [1280, 720, 2],
      [375, 600, 3],
      [320, 512, 1],
    ]) {
      const surface = cinemaSurface(width, height, dpr, 1280, 720);
      expect(surface.width).toBeLessThanOrEqual(1280);
      expect(surface.height).toBeLessThanOrEqual(720);
      expect(surface.width / surface.height).toBeCloseTo(width / height, 2);
      expect(surface.width).toBeLessThanOrEqual(width * dpr);
      expect(surface.height).toBeLessThanOrEqual(height * dpr);
    }
    expect(cinemaSurface(1280, 720, 2, 1280, 720)).toEqual({
      width: 1280,
      height: 720,
    });
  });
  it("holds the opening and closing frames, clamps overscroll, and reproduces a prior point exactly", () => {
    expect(cinemaTime(0, 8)).toBe(0);
    expect(cinemaTime(0.06, 8)).toBe(0);
    expect(cinemaTime(1, 8)).toBe(191 / 24);
    expect(cinemaTime(0.95, 8)).toBe(191 / 24);
    expect(cinemaTime(Infinity, 8)).toBe(0);
    expect(cinemaTime(NaN, 8)).toBe(0);
    expect(cinemaTime(0.5, NaN)).toBe(0);
    expect(cinemaTime(0.5, 0)).toBe(0);
    const prior = cinemaTime(0.43, 8);
    cinemaTime(0.9, 8);
    cinemaTime(0.02, 8);
    expect(cinemaTime(0.43, 8)).toBe(prior);
    let last = -1;
    for (let p = 0; p <= 1; p += 0.01) {
      const time = cinemaTime(p, 8);
      expect(time).toBeGreaterThanOrEqual(last);
      expect(time).toBeLessThan(8);
      last = time;
    }
  });
  it("supports an earlier open-frame hold without changing the Masquerade clock", () => {
    const playback = [0.08, 0.68] as const;
    expect(cinemaTime(0.08, 190 / 24, 24, playback)).toBe(0);
    expect(cinemaTime(0.68, 190 / 24, 24, playback)).toBe(189 / 24);
    expect(cinemaTime(0.9, 190 / 24, 24, playback)).toBe(189 / 24);
    for (const p of [0.16, 0.31, 0.53]) {
      const time = cinemaTime(p, 190 / 24, 24, playback);
      expect(cinemaProgress(time, 190 / 24, 24, playback)).toBeCloseTo(p, 2);
    }
    expect(cinemaTime(0.68, 190 / 24)).toBeLessThan(189 / 24);
  });
  it("uses separate Seen/Unseen moments and keeps a valid focal point throughout", () => {
    expect(cinemaFrame(0)).toMatchObject({ seen: 1, unseen: 0 });
    expect(cinemaFrame(1)).toMatchObject({ seen: 0, unseen: 1 });
    for (let p = 0; p <= 1; p += 0.01) {
      const f = cinemaFrame(p);
      expect(f.seen * f.unseen).toBe(0);
      expect(f.focalX).toBeGreaterThan(0.6);
      expect(f.focalX).toBeLessThan(0.71);
    }
  });
  it("uses the whole scroll for one film without a shutter or a second room reveal", () => {
    expect(cinemaFrame(0)).toMatchObject({
      media: 0,
      title: 1,
      cues: 0,
    });
    expect(cinemaTime(0.055, 190 / 24)).toBe(0);
    expect(cinemaFrame(0.25)).toMatchObject({
      title: 0,
      cues: 1,
    });
    expect(cinemaFrame(1)).toMatchObject({
      media: 1,
      title: 0,
      cues: 1,
    });
    expect(cinemaTime(0.83, 190 / 24)).toBeLessThan(189 / 24);
    expect(cinemaTime(0.94, 190 / 24)).toBe(189 / 24);
    expect(cinemaFrame(1)).not.toHaveProperty("leave");
    const middle = cinemaFrame(0.5);
    cinemaFrame(1);
    expect(cinemaFrame(0.5)).toEqual(middle);
  });
  it("keeps the caption and crop synchronized with a decoded frame after delayed seeking", () => {
    for (const requested of [0, 0.19, 0.36, 0.63, 0.81, 1]) {
      const decoded = cinemaTime(requested, 190 / 24);
      const presented = cinemaFrame(cinemaProgress(decoded, 190 / 24));
      const expected = cinemaFrame(requested);
      expect(presented.focalX).toBeCloseTo(expected.focalX, 2);
      expect(presented.seen).toBeCloseTo(expected.seen, 1);
      expect(presented.unseen).toBeCloseTo(expected.unseen, 1);
    }
    expect(cinemaProgress(NaN, 8)).toBe(0);
    expect(cinemaProgress(2, 0)).toBe(0);
  });
  it("crops with the correct aspect ratio at desktop and phone sizes without stretching", () => {
    for (const [w, h] of [
      [320, 710],
      [375, 812],
      [768, 1024],
      [1280, 720],
      [1480, 1034],
    ]) {
      for (const p of [0, 0.5, 1]) {
        const crop = cinemaCrop(1280, 720, w, h, cinemaFrame(p).focalX);
        expect(crop.width / crop.height).toBeCloseTo(w / h);
        expect(crop.x).toBeGreaterThanOrEqual(0);
        expect(crop.y).toBeGreaterThanOrEqual(0);
        expect(crop.x + crop.width).toBeLessThanOrEqual(1280.0001);
        expect(crop.y + crop.height).toBeLessThanOrEqual(720.0001);
      }
    }
  });
  it("keeps both openwork wings in the opening phone crop", () => {
    for (const [width, height] of [
      [320, 710],
      [375, 812],
      [399, 792],
    ]) {
      const movieWidth = width;
      const movieHeight = Math.min(height - 112, movieWidth * 1.6);
      const crop = cinemaCrop(
        1280,
        720,
        movieWidth,
        movieHeight,
        cinemaFrame(0).focalX
      );
      expect(crop.x).toBeLessThan(678);
      expect(crop.x + crop.width).toBeGreaterThan(1085);
    }
  });
  it("does not fetch a missing movie or pin a slideshow when a film is not available", () => {
    const html = renderToStaticMarkup(
      createElement(MasqueradeCinema, {
        asset: { ...MASQUERADE_CINEMA, available: false },
      })
    );
    expect(html).toContain('data-preview="true"');
    expect(html).toContain('data-static="true"');
    expect(html).toContain(MASQUERADE_CINEMA.opening);
    expect(html).toContain(MASQUERADE_CINEMA.closing);
    expect(html).not.toContain("<video");
    expect(html).not.toContain(MASQUERADE_CINEMA.src);
    expect(cinemaPreview("?cinema=preview")).toBe(true);
    expect(cinemaPreview("")).toBe(false);
  });
  it("renders one film source and retains the opening poster until a decoded frame is painted", () => {
    const html = renderToStaticMarkup(
      createElement(MasqueradeCinema, {
        asset: { ...MASQUERADE_CINEMA, available: true },
      })
    );
    expect(html.match(/<video\b/g)).toHaveLength(1);
    expect(html).toContain('preload="none"');
    expect(html).toContain('data-hidden="false"');
    expect(html).toContain('data-painted="false"');
    expect(html).not.toContain("masquerade-cinema-room");
    expect(html).not.toContain("after-dark.webp");
    expect(html).toContain('class="masquerade-cinema-frame"');
    expect(html).not.toMatch(/autoplay|loop=|controls=/i);
    expect(html).not.toMatch(/add to bag|acquire|AED|pause|checkout/);
  });
  it("provides the full story in ordinary flow with reduced motion", () => {
    media.reduced = true;
    try {
      const html = renderToStaticMarkup(
        createElement(MasqueradeCinema, {
          asset: { ...MASQUERADE_CINEMA, available: true },
        })
      );
      expect(html).not.toContain("<video");
      expect(html).not.toContain("<canvas");
      expect(html).toContain('data-static="true"');
      expect(html).toContain(MASQUERADE_CINEMA.closing);
      expect(html).not.toContain("campaign photographs");
      expect(html).toContain("Candlelight traces the openwork");
    } finally {
      media.reduced = false;
    }
  });
});
