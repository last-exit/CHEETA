import { describe, expect, it } from "vitest";
import {
  createCampaignGallery,
  campaignGalleryReducer as reduce,
} from "../lib/campaignGallery";

describe("Campaign gallery image readiness", () => {
  it("keeps the current photograph while the next one decodes", () => {
    let state = createCampaignGallery(0, 4);
    state = reduce(state, { type: "ready", index: 0, attempt: 0 });
    state = reduce(state, { type: "step", delta: 1 });
    expect(state).toMatchObject({ requested: 1, displayed: 0 });
    state = reduce(state, { type: "ready", index: 1, attempt: 0 });
    expect(state.displayed).toBe(1);
  });
  it("resolves rapid navigation to the latest request even when images finish out of order", () => {
    let state = reduce(createCampaignGallery(0, 4), {
      type: "ready",
      index: 0,
      attempt: 0,
    });
    state = reduce(state, { type: "step", delta: 1 });
    state = reduce(state, { type: "step", delta: 1 });
    state = reduce(state, { type: "ready", index: 1, attempt: 0 });
    expect(state).toMatchObject({ requested: 2, displayed: 0 });
    state = reduce(state, { type: "ready", index: 2, attempt: 0 });
    expect(state.displayed).toBe(2);
    state = reduce(state, { type: "step", delta: -1 });
    expect(state.displayed).toBe(1);
  });
  it("preserves the last image on failure and ignores stale completion after retry", () => {
    let state = reduce(createCampaignGallery(0, 4), {
      type: "ready",
      index: 0,
      attempt: 0,
    });
    state = reduce(state, { type: "step", delta: 1 });
    state = reduce(state, { type: "failed", index: 1, attempt: 0 });
    expect(state.displayed).toBe(0);
    state = reduce(state, { type: "retry" });
    expect(state.failed[1]).toBe(false);
    expect(state.attempts[1]).toBe(1);
    expect(reduce(state, { type: "ready", index: 1, attempt: 0 })).toBe(state);
    state = reduce(state, { type: "ready", index: 1, attempt: 1 });
    expect(state.displayed).toBe(1);
  });
  it("wraps both ways and does not commit an unrequested preload", () => {
    let state = createCampaignGallery(0, 4);
    state = reduce(state, { type: "step", delta: -1 });
    expect(state.requested).toBe(3);
    state = reduce(state, { type: "ready", index: 0, attempt: 0 });
    expect(state.displayed).toBeNull();
    state = reduce(state, { type: "step", delta: 1 });
    expect(state).toMatchObject({ requested: 0, displayed: 0 });
  });
});
