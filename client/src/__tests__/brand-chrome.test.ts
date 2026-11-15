import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { afterEach, describe, expect, it, vi } from "vitest";
import HeaderWordmark from "../components/HeaderWordmark";
import { readBrandAnchors } from "../lib/brandChrome";

afterEach(() => vi.unstubAllGlobals());

describe("Floating brand controls", () => {
  it("does not let the hidden Home monogram intercept the film or keyboard focus", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/" }, createElement(HeaderWordmark))
    );
    expect(html).toContain('data-visible="false"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toMatch(/tabindex="-1"/i);
    expect(html).toContain("pointer-events:none");
  });

  it("keeps the visible monogram available as a Home link on other pages", () => {
    const html = renderToStaticMarkup(
      createElement(
        Router,
        { ssrPath: "/retail" },
        createElement(HeaderWordmark)
      )
    );
    expect(html).toContain('data-visible="true"');
    expect(html).toContain('href="/"');
    expect(html).toMatch(/tabindex="0"/i);
    expect(html).toContain("pointer-events:auto");
  });

  it("samples each rendered control after safe-area and layout offsets", () => {
    vi.stubGlobal("window", { innerWidth: 375 });
    vi.stubGlobal("document", {
      querySelector: (selector: string) => ({
        getBoundingClientRect: () =>
          selector.includes("paw")
            ? { left: 12, top: 59, width: 44, height: 44 }
            : { left: 165.5, top: 59, width: 44, height: 44 },
      }),
    });
    expect(readBrandAnchors()).toEqual({
      paw: { x: 34, y: 81 },
      monogram: { x: 187.5, y: 81 },
    });
  });

  it("has stable contrast samples before either mark has a layout box", () => {
    vi.stubGlobal("window", { innerWidth: 320 });
    vi.stubGlobal("document", { querySelector: () => null });
    expect(readBrandAnchors()).toEqual({
      paw: { x: 40, y: 72 },
      monogram: { x: 160, y: 48 },
    });
  });
});
