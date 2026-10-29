import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { describe, expect, it, vi } from "vitest";
import Home from "../pages/Home";
import { homeObjectFrame } from "../lib/homePresentation";

const media = vi.hoisted(() => ({ reduced: false, desktop: true }));
vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: (query: string) => {
    if (query.includes("no-preference")) return media.desktop && !media.reduced;
    if (query.includes("prefers-reduced-motion")) return media.reduced;
    if (query.includes("max-width")) return !media.desktop;
    return media.desktop;
  },
}));

const render = () =>
  renderToStaticMarkup(
    createElement(Router, { ssrPath: "/" }, createElement(Home))
  );

describe("Campaign-led homepage", () => {
  it("leads from one opening film to Gun, Masquerade and the house philosophy", () => {
    const markup = render();
    expect(markup.match(/<video\b/g)).toHaveLength(1);
    expect(markup).toContain('href="/collection/barrel"');
    expect(markup).toContain('href="/collection/masquerade"');
    expect(markup).toContain('href="/philosophy"');
    expect(markup.indexOf('class="home-opening"')).toBeLessThan(
      markup.indexOf('id="characters"')
    );
    expect(markup.indexOf('id="characters"')).toBeLessThan(
      markup.indexOf('class="home-masquerade"')
    );
    expect(markup).toContain('href="/privacy"');
    expect(markup).toContain('href="/contact"');
  });
  it("has no fitting controls or purchase actions on the homepage", () => {
    const markup = render();
    expect(markup).not.toMatch(
      /acquire|add to bag|15,000|unequip|Edition selection|Choose a character/i
    );
    expect(markup).not.toMatch(/\/collection\/(?:maharaja|savanah)/);
    expect(markup).toContain('id="pieces"');
    expect(markup.match(/<h1\b/g)).toHaveLength(1);
  });
  it("integrates all three gun references above the eyewear within Maharajah", () => {
    const markup = render();
    for (const source of [
      "manani-cutout-v1.webp",
      "cominazzo-mariani-cutout-v1.webp",
      "florentine-cutout-v1.webp",
    ])
      expect(markup).toContain(source);
    expect(markup.indexOf('id="characters"')).toBeLessThan(
      markup.indexOf('id="home-reference-object"')
    );
    expect(markup.indexOf('id="home-reference-object"')).toBeLessThan(
      markup.indexOf('class="home-object-art"')
    );
    expect(markup).toContain('aria-label="Gun references"');
    expect(markup.match(/aria-controls="home-reference-object"/g)).toHaveLength(
      3
    );
    expect(markup).not.toContain("The reference.");
    expect(markup).not.toContain("A study of barrels and ornament.");
  });
  it("provides an ordinary-flow object study and a still opening with reduced motion", () => {
    media.reduced = true;
    try {
      const markup = render();
      expect(markup).not.toContain("<video");
      expect(markup).toContain('class="home-object-study" data-static="true"');
      expect(markup).toContain("Maharajah");
      expect(markup).toContain("The Masquerade");
    } finally {
      media.reduced = false;
    }
  });
  it("keeps the campaign links available in the compact static presentation", () => {
    media.desktop = false;
    try {
      const markup = render();
      expect(markup).toContain('class="home-object-study" data-static="true"');
      expect(markup).toContain(
        'aria-label="Explore Maharajah in The Gun Collection"'
      );
      expect(markup).toContain('aria-label="Explore The Masquerade campaign"');
    } finally {
      media.desktop = true;
    }
  });
});

describe("Homepage object motion", () => {
  it("clamps invalid and overscroll measurements to valid viewpoints", () => {
    expect(homeObjectFrame(Number.NaN)).toEqual(homeObjectFrame(0));
    expect(homeObjectFrame(Infinity)).toEqual(homeObjectFrame(0));
    expect(homeObjectFrame(-1)).toEqual(homeObjectFrame(0));
    expect(homeObjectFrame(2)).toEqual(homeObjectFrame(1));
  });
  it("reproduces the same view when scrolling back, within a restrained transform range", () => {
    const first = homeObjectFrame(0.4);
    homeObjectFrame(0.97);
    expect(homeObjectFrame(0.4)).toEqual(first);
    for (let p = 0; p <= 1; p += 0.01) {
      const state = homeObjectFrame(p);
      expect(state.scale).toBeGreaterThanOrEqual(0.94);
      expect(state.scale).toBeLessThanOrEqual(1.04);
      expect(Math.abs(state.rotate)).toBeLessThanOrEqual(3);
      expect(Math.abs(state.y)).toBeLessThanOrEqual(24);
    }
  });
});
