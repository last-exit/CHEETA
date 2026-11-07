import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import CollectionDetail from "../pages/CollectionDetail";
import { Router } from "wouter";
import { renderToStaticMarkup } from "react-dom/server";
import MasqueradeChapter from "../components/MasqueradeChapter";

const media = vi.hoisted(() => ({ reduced: true }));
vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: () => media.reduced,
}));
vi.mock("wouter", async importOriginal => ({
  ...(await importOriginal<typeof import("wouter")>()),
  useParams: () => ({ id: "masquerade" }),
}));
import { masqueradeReveal } from "../lib/masqueradeReveal";
import { MASQUERADE_CINEMA } from "../lib/masqueradeCinema";

describe("Masquerade scroll reveal", () => {
  it("reserves a complete object at entry and the exhibition at exit", () => {
    expect(masqueradeReveal(0)).toMatchObject({
      sceneX: 50,
      objectOpacity: 1,
      seenOpacity: 1,
      unseenOpacity: 0,
    });
    expect(masqueradeReveal(1)).toMatchObject({
      sceneX: 0,
      sceneY: 0,
      objectOpacity: 0,
      seenOpacity: 0,
      unseenOpacity: 1,
    });
  });
  it("holds the visible frame while the exhibition image is not ready", () => {
    expect(masqueradeReveal(0.95, false)).toMatchObject({
      objectOpacity: 1,
      sceneX: 50,
      unseenOpacity: 0,
    });
    expect(masqueradeReveal(0.95, true)).toMatchObject({
      objectOpacity: 0,
      sceneX: 0,
      unseenOpacity: 1,
    });
  });
  it("clamps overscroll and invalid measurements instead of emitting invalid CSS", () => {
    expect(masqueradeReveal(-1)).toEqual(masqueradeReveal(0));
    expect(masqueradeReveal(2)).toEqual(masqueradeReveal(1));
    expect(masqueradeReveal(Number.NaN)).toEqual(masqueradeReveal(0));
    expect(masqueradeReveal(Infinity)).toEqual(masqueradeReveal(0));
  });
  it("opens the study before fading away the object, avoiding a blank stage", () => {
    for (let p = 0; p <= 1; p += 0.01) {
      const frame = masqueradeReveal(p);
      if (frame.objectOpacity < 1) expect(frame.sceneX).toBeLessThan(50);
      if (frame.objectOpacity === 0) expect(frame.sceneX).toBeLessThan(32);
      expect(frame.sceneY).toBeGreaterThanOrEqual(0);
    }
  });
  it("returns exactly the same frame when scrolling back to a prior position", () => {
    const initial = masqueradeReveal(0.43);
    masqueradeReveal(0.96);
    masqueradeReveal(0.13);
    expect(masqueradeReveal(0.43)).toEqual(initial);
  });
});

describe("Masquerade reduced motion", () => {
  it("provides the object and exhibition in ordinary flow without autoplay or pinning", () => {
    const markup = renderToStaticMarkup(createElement(MasqueradeChapter));
    expect(markup).toContain('class="masquerade-static house-container"');
    expect(markup).toContain("Seen and unseen");
    expect(markup).toContain("openwork-study.webp");
    expect(markup).toContain("exhibition-study-v1.webp");
    expect(markup).not.toContain("<video");
    expect(markup).not.toContain("masquerade-reveal-stage");
  });
});

describe("Masquerade campaign sequencing", () => {
  it("continues one film into an interactive sculpture without a photograph carousel", () => {
    media.reduced = false;
    try {
      const markup = renderToStaticMarkup(
        createElement(
          Router,
          { ssrPath: "/collection/masquerade" },
          createElement(CollectionDetail)
        )
      );
      expect(markup.match(/<video\b/g)).toHaveLength(
        MASQUERADE_CINEMA.available ? 2 : 1
      );
      if (MASQUERADE_CINEMA.available) {
        expect(markup).toContain('class="masquerade-cinema"');
        expect(markup).toContain(MASQUERADE_CINEMA.opening);
        expect(markup).not.toContain("masquerade-portrait-composition");
        expect(markup).not.toContain("exhibition-study-v1.webp");
        expect(markup).not.toContain("masquerade-cinema-room");
        expect(markup).toContain(
          'aria-label="Interactive Masquerade sculpture"'
        );
        expect(markup).toContain(
          "A sculptural interpretation of The Masquerade"
        );
        expect(markup).not.toContain('aria-roledescription="carousel"');
        expect(markup).not.toContain("campaign photographs");
        expect(markup.indexOf('class="masquerade-sculpture"')).toBeGreaterThan(
          markup.indexOf("</canvas>")
        );
        expect(markup.indexOf('class="masquerade-coda"')).toBeGreaterThan(
          markup.indexOf('class="masquerade-sculpture"')
        );
        expect(markup).toContain("/videos/masquerade.mp4");
        expect(markup).toContain("available exclusively at our showroom");
        expect(markup).not.toContain("masquerade-sculpture-controls");
        expect(markup).not.toContain("masquerade-sculpture-hint");
      } else
        expect(
          markup.match(
            /<img[^>]+src="\/campaigns\/masquerade\/exhibition-study-v1.webp"/g
          )
        ).toHaveLength(1);
      expect(markup).not.toContain("shadow-study.webp");
      expect(markup).not.toContain("campaign-editorial-note");
      expect(markup).not.toContain("In detail");
      expect(markup).not.toContain("masquerade-study-choices");
      expect(markup).toContain("Unseen");
      expect(markup).toContain("/collection/barrel");
    } finally {
      media.reduced = true;
    }
  });
});
