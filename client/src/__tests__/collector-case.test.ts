import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { describe, expect, it, vi } from "vitest";
import {
  GUN_JOURNEY,
  GUN_LENSES,
  gunCaseOpen,
  gunLensIndex,
} from "../lib/gunJourney";
import GunCampaign from "../components/GunCampaign";

vi.mock("../hooks/useMediaQuery", () => ({ useMediaQuery: () => true }));
// A desktop frame may remain decoded when compact/reduced-motion takes over.
vi.mock("../hooks/useScrollCinema", () => ({
  useScrollCinema: () => ({
    root: { current: null },
    player: { current: null },
    screen: { current: null },
    poster: { current: null },
    painted: true,
    failed: false,
  }),
}));

describe("The single-case Gun journey", () => {
  it("waits for the actual final decoded frame before enabling the lens study", () => {
    expect(gunCaseOpen(0.7, 189 / 24, 190 / 24)).toBe(true);
    expect(gunCaseOpen(0.7, 187 / 24, 190 / 24)).toBe(false);
    expect(gunCaseOpen(0.5, 189 / 24, 190 / 24)).toBe(false);
    for (const invalid of [NaN, Infinity, -Infinity]) {
      expect(gunCaseOpen(invalid, 189 / 24, 190 / 24)).toBe(false);
      expect(gunCaseOpen(1, invalid, 190 / 24)).toBe(false);
      expect(gunCaseOpen(1, 7, invalid)).toBe(false);
    }
    expect(gunCaseOpen(1, 0, 0)).toBe(false);
  });
  it("uses a full scene with a finite opening and an open-case hold", () => {
    expect(GUN_JOURNEY.available).toBe(true);
    expect(GUN_JOURNEY.playback[1]).toBeLessThan(0.75);
    expect(GUN_JOURNEY.scrollVh).toBeLessThanOrEqual(300);
    expect(GUN_JOURNEY.width / GUN_JOURNEY.height).toBeCloseTo(16 / 9);
  });
  it("wraps focused lens selection and resolves rapid steps to the latest colour", () => {
    expect(gunLensIndex(0, "ArrowLeft")).toBe(2);
    expect(gunLensIndex(2, "ArrowRight")).toBe(0);
    expect(gunLensIndex(1, "Home")).toBe(0);
    expect(gunLensIndex(0, "End")).toBe(2);
    expect(gunLensIndex(1, "Tab")).toBe(1);
    let i = 0;
    for (let n = 0; n < 11; n++) i = gunLensIndex(i, "ArrowRight");
    expect(GUN_LENSES[i].id).toBe("amber");
  });
  it("keeps one pair in its complete scene and colours only the glass", () => {
    const markup = renderToStaticMarkup(
      createElement(
        Router,
        { ssrPath: "/collection/barrel" },
        createElement(GunCampaign)
      )
    );
    expect(markup).toContain(GUN_JOURNEY.closing);
    expect(markup).toContain('data-painted="false"');
    expect(markup).not.toContain("collector-case-chest");
    expect(markup).not.toContain("collector-case-piece");
    expect(markup).not.toContain("collector-case-frame");
    expect(markup).toContain('clip-path="url(');
    expect(markup).toContain("One pair is shown at a time");
    expect(markup).toContain('aria-label="Next lens colour"');
    expect(markup.indexOf('id="collectors-case"')).toBeLessThan(
      markup.indexOf('data-campaign-chapter="the-outline"')
    );
    expect(markup).toContain("available exclusively at our showroom");
    expect(markup).not.toMatch(
      /collectors-case\/|collector-case-index|collector-case-caption|<video|<dialog|add to bag|acquire|checkout|AED|15,000/i
    );
  });
});
