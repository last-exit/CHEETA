import { describe, expect, it } from "vitest";
import { orbitStep, ORBIT_SECONDS } from "../lib/eyewearMotion";

describe("eyewear orbit timing", () => {
  it.each([30, 60, 144])("takes two minutes for a full turn at %i fps", fps => {
    let angle = 0;
    for (let frame = 0; frame < fps * ORBIT_SECONDS; frame++) {
      angle += orbitStep(1 / fps);
    }
    expect(angle).toBeCloseTo(Math.PI * 2, 8);
  });

  it("does not jump forward after a suspended tab resumes", () => {
    expect(orbitStep(20)).toBe(orbitStep(0.05));
    expect(orbitStep(20)).toBeLessThan(0.003);
  });

  it("ignores invalid or backwards timestamps", () => {
    expect(orbitStep(-1)).toBe(0);
    expect(orbitStep(Number.NaN)).toBe(0);
    expect(orbitStep(Number.POSITIVE_INFINITY)).toBe(0);
  });
});
