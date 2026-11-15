import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { describe, expect, it, vi } from "vitest";
import CollectionDetail from "../pages/CollectionDetail";
import { COLLECTIONS } from "../data/collections";
import { GUN_JOURNEY } from "../lib/gunJourney";
import { MASQUERADE_CINEMA } from "../lib/masqueradeCinema";
import MasqueradeCoda from "../components/MasqueradeCoda";

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
    it(id + " includes its campaign experience, with one opening film", () => {
      const markup = render(id);
      const cinema = id === "masquerade" && MASQUERADE_CINEMA.available;
      const paragraphs = [...markup.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
        .map(match => match[1].replace(/<[^>]*>/g, " "))
        .join(" ");
      if (cinema) {
        expect(markup).toContain('id="masquerade-coda-title"');
        expect(markup).not.toContain("campaign photographs");
        expect(markup).toContain(
          'aria-label="Interactive Masquerade sculpture"'
        );
        expect(markup).not.toContain('aria-roledescription="carousel"');
        expect(markup).not.toContain("masquerade-portrait-composition");
      } else if (id === "barrel") {
        expect(paragraphs).toContain("vintage double-barrel sporting guns");
        expect(markup).not.toContain("Eisa Saidi");
        expect(markup).not.toContain("gun-founder-contact-sheet");
        expect(markup).toContain(GUN_JOURNEY.opening);
        expect(markup).toContain('class="collector-case-screen"');
        expect(markup).toContain("See Maharajah in person");
        expect(markup).not.toContain("maharajah-front-v2.webp");
      }
      expect(markup.match(/<video\b/g)).toHaveLength(2);
      expect(
        markup.indexOf(
          cinema ? 'class="masquerade-cinema"' : 'class="collection-film"'
        )
      ).toBeLessThan(markup.indexOf("<h1"));
      expect(markup).not.toMatch(/acquire|add to bag|AED|15,000/);
      expect(paragraphs).not.toContain("—");
      expect(paragraphs).not.toMatch(
        /titanium|handcrafted|limited edition|Cartier|Gentle Monster/i
      );
    });
    it(id + " preserves the campaign with reduced motion", () => {
      state.reduced = true;
      try {
        const markup = render(id);
        expect(markup).not.toContain("<video");
        if (id === "masquerade" && MASQUERADE_CINEMA.available) {
          expect(markup).toContain(MASQUERADE_CINEMA.opening);
          expect(markup).toContain(MASQUERADE_CINEMA.closing);
          expect(markup).toContain('data-static="true"');
          expect(markup).not.toContain("campaign photographs");
          expect(markup).toContain(
            'aria-label="Interactive Masquerade sculpture"'
          );
          expect(markup).toContain("/campaigns/masquerade-poster.jpg");
          expect(markup).not.toContain('aria-label="Light position"');
          expect(markup).not.toContain('aria-roledescription="carousel"');
        } else {
          if (id === "barrel") {
            expect(markup).toContain(GUN_JOURNEY.closing);
            expect(markup).not.toContain("gun-founder");
          } else
            for (const still of COLLECTIONS[id].stills)
              expect(markup).toContain(still);
          expect(markup).toContain(
            id === "barrel"
              ? 'data-static="true"'
              : 'class="masquerade-static house-container"'
          );
        }
      } finally {
        state.reduced = false;
      }
    });
  }
});

describe("Masquerade showroom campaign", () => {
  it("plays the complete original After dark film with native looping", () => {
    const markup = renderToStaticMarkup(createElement(MasqueradeCoda));
    const video = markup.match(/<video\b[^>]*>/)?.[0] ?? "";
    expect(video).toContain('src="/videos/masquerade.mp4"');
    expect(video).toMatch(/\bloop(?:=|\s|>)/);
    expect(markup).not.toContain("after-dark-loop-v1.mp4");
    expect(video).not.toMatch(/controls=|autoplay=/);
  });
  it("leads from the sculpture and full film to the showroom without an online purchase path", () => {
    const markup = render("masquerade");
    const chapters = ["openwork-study", "after-dark", "the-showroom"];
    for (let index = 1; index < chapters.length; index++) {
      expect(
        markup.indexOf(`data-campaign-chapter="${chapters[index]}"`)
      ).toBeGreaterThan(
        markup.indexOf(`data-campaign-chapter="${chapters[index - 1]}"`)
      );
    }
    expect(markup).toContain("available exclusively at our showroom");
    expect(markup).toMatch(/href="\/contact\?collection=masquerade"[^>]*>[\s\S]*?arrange a visit/);
    expect(markup).not.toContain('data-campaign-chapter="the-openwork"');
    expect(markup).not.toMatch(/add to bag|acquire|checkout|AED|15,000/);
    expect(markup.indexOf('data-campaign-chapter="the-showroom"')).toBeLessThan(
      markup.indexOf('aria-label="Next collection"')
    );
  });
});
