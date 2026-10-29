import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { describe, expect, it, vi } from "vitest";
import CollectionDetail from "../pages/CollectionDetail";
import { COLLECTIONS } from "../data/collections";

const state = vi.hoisted(() => ({ id: "barrel", reduced: false }));
vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: (query: string) =>
    query.includes("prefers-reduced-motion") && state.reduced,
}));
vi.mock("wouter", async importOriginal => ({
  ...(await importOriginal<typeof import("wouter")>()),
  useParams: () => ({ id: state.id }),
}));

const render = (id: string) => {
  state.id = id;
  return renderToStaticMarkup(
    createElement(
      Router,
      { ssrPath: "/collection/" + id },
      createElement(CollectionDetail)
    )
  );
};

describe("Long-form collection campaigns", () => {
  for (const id of ["barrel", "masquerade"]) {
    it(
      id +
        " includes a complete story and every campaign still, with one opening film",
      () => {
        const markup = render(id);
        const paragraphs = [...markup.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
          .map(match => match[1].replace(/<[^>]*>/g, " "))
          .join(" ");
        expect(
          paragraphs.split(/\s+/).filter(Boolean).length
        ).toBeGreaterThanOrEqual(180);
        expect(
          markup.match(/data-campaign-chapter=/g)!.length
        ).toBeGreaterThanOrEqual(6);
        for (const still of COLLECTIONS[id].stills)
          expect(markup).toContain(still);
        expect(markup.match(/<video\b/g)).toHaveLength(1);
        expect(markup.indexOf('class="collection-film"')).toBeLessThan(
          markup.indexOf("<h1")
        );
        expect(markup).not.toMatch(/acquire|add to bag|AED|15,000/);
        expect(paragraphs).not.toContain("—");
        expect(paragraphs).not.toMatch(
          /titanium|handcrafted|limited edition|Cartier|Gentle Monster/i
        );
      }
    );
    it(
      id + " preserves the story and still gallery with reduced motion",
      () => {
        state.reduced = true;
        try {
          const markup = render(id);
          expect(markup).not.toContain("<video");
          for (const still of COLLECTIONS[id].stills)
            expect(markup).toContain(still);
          expect(markup).toContain(
            id === "barrel"
              ? 'data-static="true"'
              : 'class="masquerade-static house-container"'
          );
        } finally {
          state.reduced = false;
        }
      }
    );
  }
});
