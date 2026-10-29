import { describe, expect, it } from "vitest";
import {
  FITTING_CHARACTERS,
  FITTING_LENSES,
  fittingProduct,
  fittingReducer,
  initialFittingState,
} from "../lib/characterFitting";

const loaded = () =>
  fittingReducer(initialFittingState, { type: "ready", index: 0 });

describe("character fitting", () => {
  it("starts with a bare character and no purchasable selection", () => {
    expect(initialFittingState.lens).toBeNull();
    expect(fittingProduct(null)).toBeUndefined();
    expect(initialFittingState.pending).toBe(true);
  });
  it("equips each lens without moving or replacing the character", () => {
    for (const option of FITTING_LENSES) {
      const next = fittingReducer(loaded(), { type: "lens", lens: option.id });
      expect(next.character).toBe(0);
      expect(next.lens).toBe(option.id);
      expect(next.ready[0]).toBe(true);
    }
  });
  it("preserves the current lens when changing character", () => {
    let state = fittingReducer(loaded(), { type: "lens", lens: "amber" });
    state = fittingReducer(state, { type: "ready", index: 1 });
    state = fittingReducer(state, { type: "character", index: 1 });
    expect(state.character).toBe(1);
    expect(state.lens).toBe("amber");
    expect(fittingProduct(state.lens)?.id).toBe("barrel-03");
  });
  it("keeps the displayed character until the requested image has decoded", () => {
    const state = fittingReducer(loaded(), { type: "character", index: 2 });
    expect(state.character).toBe(0);
    expect(state.requested).toBe(2);
    expect(state.pending).toBe(true);
    const next = fittingReducer(state, { type: "ready", index: 2 });
    expect(next.character).toBe(2);
    expect(next.pending).toBe(false);
  });
  it("ignores a stale image completion after rapid character changes", () => {
    let state = fittingReducer(loaded(), { type: "character", index: 2 });
    state = fittingReducer(state, { type: "character", index: 1 });
    state = fittingReducer(state, { type: "ready", index: 2 });
    expect(state.character).toBe(0);
    expect(state.pending).toBe(true);
    state = fittingReducer(state, { type: "ready", index: 1 });
    expect(state.character).toBe(1);
    expect(state.pending).toBe(false);
  });
  it("retains the prior character and lens when the requested image fails", () => {
    let state = fittingReducer(loaded(), { type: "lens", lens: "ruby" });
    state = fittingReducer(state, { type: "character", index: 1 });
    state = fittingReducer(state, { type: "failed", index: 1 });
    expect(state.character).toBe(0);
    expect(state.lens).toBe("ruby");
    expect(state.error).toBe(true);
    state = fittingReducer(state, { type: "character", index: 0 });
    expect(state.error).toBe(false);
    expect(state.pending).toBe(false);
  });
  it("unequips without replacing the character or leaving a purchase identity", () => {
    let state = fittingReducer(loaded(), { type: "lens", lens: "smoke" });
    state = fittingReducer(state, { type: "lens", lens: null });
    expect(state.character).toBe(0);
    expect(fittingProduct(state.lens)).toBeUndefined();
  });
  it("maps lens controls, details and acquisition to the same canonical retail item", () => {
    expect(FITTING_CHARACTERS).toHaveLength(3);
    expect(FITTING_LENSES.map(item => fittingProduct(item.id)?.id)).toEqual([
      "barrel-01",
      "barrel-02",
      "barrel-03",
    ]);
    expect(FITTING_LENSES.map(item => fittingProduct(item.id)?.price)).toEqual([
      15000, 15000, 15000,
    ]);
    expect(FITTING_LENSES.map(item => fittingProduct(item.id)?.slug)).toEqual([
      "double-barrel-01",
      "double-barrel-02",
      "double-barrel-03",
    ]);
  });
});
