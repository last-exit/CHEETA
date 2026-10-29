import { describe, expect, it } from "vitest";
import { MASQUERADE_DETAILS, detailViewBox } from "../lib/masqueradeDetails";

describe("Masquerade detail camera", () => {
  it("provides three distinct views of the existing image", () => {
    expect(MASQUERADE_DETAILS.map(detail => detail.id)).toEqual([
      "openwork",
      "lens",
      "bridge",
    ]);
    expect(
      new Set(
        MASQUERADE_DETAILS.map((_, index) => detailViewBox(index).join(" "))
      ).size
    ).toBe(3);
  });
  it("keeps panning within the source image at every camera size", () => {
    for (let index = 0; index < MASQUERADE_DETAILS.length; index++) {
      for (const offset of [-10000, 0, 10000]) {
        const [x, y, width, height] = detailViewBox(index, offset, offset);
        expect(x).toBeGreaterThanOrEqual(0);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(x + width).toBeLessThanOrEqual(1600);
        expect(y + height).toBeLessThanOrEqual(914);
      }
    }
  });
  it("recovers from invalid input without invalid SVG coordinates", () => {
    expect(detailViewBox(99)).toEqual(detailViewBox(0));
    expect(detailViewBox(1, NaN, Infinity)).toEqual(detailViewBox(1));
  });
  it("resets the camera reproducibly after panning or switching detail", () => {
    const original = detailViewBox(0);
    detailViewBox(0, -150, 200);
    detailViewBox(2, 15, -40);
    expect(detailViewBox(0, 0, 0)).toEqual(original);
  });
});
