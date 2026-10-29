import { describe, it, expect } from "vitest";
import { COLLECTIONS, COLLECTION_ORDER } from "../data/collections";

describe("ICON LIVIN Dedicated Collections Specification", () => {
  it("should contain the active collections in COLLECTION_ORDER", () => {
    expect(COLLECTION_ORDER).toEqual(["barrel", "masquerade"]);
    expect(COLLECTIONS.barrel.title).toBe("THE GUN COLLECTION");
    expect(COLLECTIONS.masquerade.title).toBe("THE MASQUERADE");
  });

  it("should enforce pure white canvas palettes across all collections", () => {
    expect(COLLECTIONS.barrel.theme.bg).toBe("#FFFFFF");
    expect(COLLECTIONS.barrel.theme.ink).toBe("#000000");
    expect(COLLECTIONS.masquerade.theme.bg).toBe("#FFFFFF");
    expect(COLLECTIONS.masquerade.theme.ink).toBe("#000000");
    expect(COLLECTIONS.maharaja.theme.bg).toBe("#FFFFFF");
    expect(COLLECTIONS.maharaja.theme.ink).toBe("#000000");
  });

  it("should enforce 40-55 word all-caps intro paragraphs", () => {
    COLLECTION_ORDER.forEach(id => {
      const col = COLLECTIONS[id];
      const words = col.intro.trim().split(/\s+/);

      expect(words.length).toBeGreaterThanOrEqual(40);
      expect(words.length).toBeLessThanOrEqual(55);
      expect(col.intro).toBe(col.intro.toUpperCase());
    });
  });

  it("should form an unbroken collection loop in nextId sequence", () => {
    expect(COLLECTIONS.barrel.nextId).toBe("masquerade");
    expect(COLLECTIONS.masquerade.nextId).toBe("barrel");
  });

  it("should provide 4 honest products per collection with materials and prices", () => {
    COLLECTION_ORDER.forEach(id => {
      const col = COLLECTIONS[id];
      expect(col.products).toHaveLength(4);

      col.products.forEach(product => {
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.material).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.priceDisplay).toMatch(/^AED\s[\d,]+$/);
        expect(product.quad).toBeTruthy();
      });
    });
  });

  it("should include 4 editorial stills, 4 chapters, and credits for each collection", () => {
    COLLECTION_ORDER.forEach(id => {
      const col = COLLECTIONS[id];
      expect(col.stills).toHaveLength(4);
      expect(col.chapters).toHaveLength(4);
      expect(col.credits.length).toBeGreaterThanOrEqual(4);
      expect(col.video).toMatch(/^\/videos\/.+\.mp4$/);
      expect(col.campaign).toBeTruthy();
      expect(col.frames).toBeTruthy();
      expect(col.statement).toBeTruthy();
    });
  });
});
