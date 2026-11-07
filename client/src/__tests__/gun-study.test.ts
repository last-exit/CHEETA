import { MAHARAJAH_DETAILS } from "../components/GunCampaign";
import { GUN_JOURNEY } from "../lib/gunJourney";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { describe, expect, it, vi } from "vitest";
import CollectionDetail from "../pages/CollectionDetail";
import { GUN_STUDY, gunStudyFrame } from "../lib/gunStudy";

const media = vi.hoisted(() => ({ reduced: false }));
vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: (query: string) =>
    query.includes("prefers-reduced-motion") && media.reduced,
}));
vi.mock("wouter", async importOriginal => ({
  ...(await importOriginal<typeof import("wouter")>()),
  useParams: () => ({ id: "barrel" }),
}));

const campaign = () =>
  renderToStaticMarkup(
    createElement(
      Router,
      { ssrPath: "/collection/barrel" },
      createElement(CollectionDetail)
    )
  );

describe("Gun campaign", () => {
  it("opens with the founder film, continues through one palace scene, and continues into the frame and ornament", () => {
    const markup = campaign();
    expect(markup.match(/<video\b/g)).toHaveLength(2);
    expect(markup.match(/class="collection-film"/g)).toHaveLength(1);
    expect(markup).not.toContain('class="campaign-motion-chapter"');
    const film = markup.indexOf('class="collection-film"');
    const study = markup.indexOf('id="collectors-case"');
    const closing = markup.indexOf('data-campaign-chapter="the-outline"');
    expect(film).toBeLessThan(study);
    expect(study).toBeLessThan(closing);
    expect(markup).toContain("Maharajah");
    expect(markup).not.toContain("Eisa Saidi");
    expect(markup).not.toContain("gun-founder");
    expect(markup).toContain("The jeweller’s");
    expect(markup).toContain('role="tablist"');
    expect(markup).toContain("Eight sides.");
    expect(markup).toContain("Two barrels.");
    expect(markup).not.toContain('class="gun-study"');
    expect(markup).not.toContain("/products/");
    expect(markup).not.toContain("acquire");
    expect(markup).not.toContain("15,000");
    expect(markup).toContain("/collection/masquerade");
  });

  it("keeps every view available without pinning or autoplay for reduced motion", () => {
    media.reduced = true;
    try {
      const markup = campaign();
      expect(markup).toContain('data-static="true"');
      expect(markup).not.toContain("<video");
      expect(markup).toContain(GUN_JOURNEY.closing);
      expect(markup).toContain("Eight sides.");
      expect(markup).toContain("Two barrels.");
      expect(markup).toContain('class="gun-detail-loupe"');
    } finally {
      media.reduced = false;
    }
  });
});

describe("Maharajah source framing and scroll sequence", () => {
  it("keeps every crop inside the supplied launch image", () => {
    for (const view of [
      ...Object.values(GUN_STUDY.views),
      ...MAHARAJAH_DETAILS.map(detail => detail.view),
    ]) {
      expect(view.x).toBeGreaterThanOrEqual(0);
      expect(view.y).toBeGreaterThanOrEqual(0);
      expect(view.x + view.width).toBeLessThanOrEqual(GUN_STUDY.width);
      expect(view.y + view.height).toBeLessThanOrEqual(GUN_STUDY.height);
    }
  });

  it("holds the complete frame at entry and the engraving study at exit", () => {
    expect(gunStudyFrame(0)).toMatchObject({
      objectOpacity: 1,
      detailOpacity: 0,
    });
    expect(gunStudyFrame(0).objectY).toBeCloseTo(0);
    expect(gunStudyFrame(1)).toMatchObject({
      objectOpacity: 0,
      detailOpacity: 0,
      profileOpacity: 0,
      engravingOpacity: 1,
      detailX: 0,
      detailY: 0,
    });
    for (let p = 0; p <= 1; p += 0.01) {
      const state = gunStudyFrame(p);
      expect(
        state.objectOpacity +
          state.detailOpacity +
          state.profileOpacity +
          state.engravingOpacity
      ).toBeGreaterThan(0.5);
    }
  });

  it("clamps invalid measurements and reverses without accumulated motion", () => {
    expect(gunStudyFrame(-1)).toEqual(gunStudyFrame(0));
    expect(gunStudyFrame(2)).toEqual(gunStudyFrame(1));
    expect(gunStudyFrame(Number.NaN)).toEqual(gunStudyFrame(0));
    expect(gunStudyFrame(Infinity)).toEqual(gunStudyFrame(0));
    const prior = gunStudyFrame(0.41);
    gunStudyFrame(1);
    gunStudyFrame(0);
    expect(gunStudyFrame(0.41)).toEqual(prior);
  });
});
