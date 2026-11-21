import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { describe, expect, it, vi } from "vitest";
import Home from "../pages/Home";

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
  it("shows the three selectable Maharajah cabinet compositions and the collection link", () => {
    const markup = render();
    for (const image of [
      "manani-v1",
      "cominazzo-mariani-v1",
      "florentine-v1",
    ]) {
      expect(markup).toContain(`/home/still-life/${image}.webp`);
    }
    expect(markup).toContain('aria-label="Antique design references"');
    expect(
      markup.match(/aria-controls="maharajah-reference-object"/g)
    ).toHaveLength(3);
    expect(markup).toMatch(
      /href="\/collection\/barrel"[^>]*>Explore The Gun Collection/
    );
  });
  it("shows the cabinet and campaign links with reduced motion", () => {
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
  it("keeps the campaign links available in the compact presentation", () => {
    media.desktop = false;
    try {
      const markup = render();
      expect(markup).toContain('class="home-object-study" data-static="true"');
      expect(markup).toContain('href="/collection/barrel"');
      expect(markup).toContain('href="/collection/masquerade"');
      expect(markup).toContain('id="home-masquerade-title"');
    } finally {
      media.desktop = true;
    }
  });
});
