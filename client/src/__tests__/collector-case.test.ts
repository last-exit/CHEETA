import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { describe, expect, it, vi } from "vitest";
import {
  COLLECTOR_CASE_ITEMS,
  COLLECTOR_CASE_VIEWS,
  collectorCaseReducer as reduce,
  createCollectorCase,
  caseCamera,
  reverseCaseTime,
} from "../lib/collectorCase";
import GunCampaign from "../components/GunCampaign";
import { COLLECTIONS } from "../data/collections";

vi.mock("../hooks/useMediaQuery", () => ({ useMediaQuery: () => true }));
const ready = (
  state: ReturnType<typeof createCollectorCase>,
  index: number,
  attempt = 0
) => reduce(state, { type: "ready", index, attempt });
const opened = () =>
  ready(
    reduce(ready(createCollectorCase(), 0), { type: "request", index: 1 }),
    1
  );

describe("Collector's case selection", () => {
  it("keeps the closed photograph until the open view is decoded", () => {
    const initial = ready(createCollectorCase(), 0);
    const requested = reduce(initial, { type: "request", index: 1 });
    expect(requested.displayed).toBe(0);
    expect(requested.requested).toBe(1);
    expect(ready(requested, 1).displayed).toBe(1);
  });
  it("commits only the last requested object when decodes finish out of order", () => {
    let state = reduce(opened(), { type: "request", index: 2 });
    state = reduce(state, { type: "request", index: 4 });
    state = ready(state, 2);
    expect(state.displayed).toBe(1);
    state = ready(state, 4);
    expect(state.displayed).toBe(4);
    expect(ready(state, 3).displayed).toBe(4);
  });
  it("keeps the prior view on failure and ignores responses from a prior retry", () => {
    let state = reduce(opened(), { type: "request", index: 4 });
    state = reduce(state, { type: "failed", index: 4, attempt: 0 });
    expect(state.displayed).toBe(1);
    expect(state.failed[4]).toBe(true);
    state = reduce(state, { type: "retry" });
    expect(state.attempts[4]).toBe(1);
    expect(state.failed[4]).toBe(false);
    expect(ready(state, 4, 0).displayed).toBe(1);
    expect(
      reduce(state, { type: "failed", index: 4, attempt: 0 }).failed[4]
    ).toBe(false);
    expect(ready(state, 4, 1).displayed).toBe(4);
  });
  it("returns to the open case and closes immediately once those views are cached", () => {
    let state = ready(reduce(opened(), { type: "request", index: 2 }), 2);
    expect(state.displayed).toBe(2);
    state = reduce(state, { type: "request", index: 1 });
    expect(state.displayed).toBe(1);
    expect(reduce(state, { type: "request", index: 0 }).displayed).toBe(0);
  });
  it("cancels an in-flight opening without a late response reopening the case", () => {
    let state = ready(createCollectorCase(), 0);
    state = reduce(state, { type: "request", index: 1 });
    state = reduce(state, { type: "request", index: 0 });
    expect(ready(state, 1).displayed).toBe(0);
  });
  it("rejects invalid views and keeps pointer regions inside the open photograph", () => {
    const state = opened();
    for (const index of [-1, 5, 6, Number.NaN, 1.5])
      expect(reduce(state, { type: "request", index })).toBe(state);
    for (const item of COLLECTOR_CASE_ITEMS) {
      expect(COLLECTOR_CASE_VIEWS[item.view].id).toBe(item.id);
      expect(item.region.left).toBeGreaterThanOrEqual(0);
      expect(item.region.top).toBeGreaterThanOrEqual(0);
      expect(item.region.left + item.region.width).toBeLessThanOrEqual(100);
      expect(item.region.top + item.region.height).toBeLessThanOrEqual(100);
    }
  });
  it("moves into the actual compartment without exposing empty image edges", () => {
    expect(caseCamera(0)).toEqual({ scale: 1, x: 0, y: 0 });
    expect(caseCamera(1)).toEqual({ scale: 1, x: 0, y: 0 });
    for (const item of COLLECTOR_CASE_ITEMS) {
      const frame = caseCamera(item.view);
      expect(frame.scale).toBeGreaterThan(1);
      expect(frame.scale).toBeLessThanOrEqual(2.6);
      expect(frame.x).toBeLessThanOrEqual(0);
      expect(frame.x + frame.scale).toBeGreaterThanOrEqual(1);
      expect(frame.y).toBeLessThanOrEqual(0);
      expect(frame.y + frame.scale).toBeGreaterThanOrEqual(1);
      const { left, top, width, height } = item.region;
      expect((left / 100) * frame.scale + frame.x).toBeGreaterThanOrEqual(0);
      expect(
        ((left + width) / 100) * frame.scale + frame.x
      ).toBeLessThanOrEqual(1);
      expect((top / 100) * frame.scale + frame.y).toBeGreaterThanOrEqual(0);
      expect(
        ((top + height) / 100) * frame.scale + frame.y
      ).toBeLessThanOrEqual(1);
      // Each inspection remains the same scene, with no photo replacement.
      expect(COLLECTOR_CASE_VIEWS[item.view].src).toBe(
        COLLECTOR_CASE_VIEWS[1].src
      );
    }
  });
  it("reverses the lid from the matching frame, including boundary inputs", () => {
    const duration = 190 / 24;
    expect(reverseCaseTime(0, duration)).toBeCloseTo(189 / 24);
    expect(reverseCaseTime(189 / 24, duration)).toBeCloseTo(0);
    expect(reverseCaseTime(3, duration)).toBeCloseTo(189 / 24 - 3);
    expect(reverseCaseTime(reverseCaseTime(3, duration), duration)).toBeCloseTo(
      3
    );
    expect(reverseCaseTime(999, duration)).toBe(0);
    expect(reverseCaseTime(-999, duration)).toBeCloseTo(189 / 24);
  });
  it("keeps the case inside Gun’s campaign without detached controls or commerce", () => {
    const markup = renderToStaticMarkup(
      createElement(
        Router,
        { ssrPath: "/collection/barrel" },
        createElement(GunCampaign, {
          collection: COLLECTIONS.barrel,
          inspect: () => {},
        })
      )
    );
    expect(
      markup.indexOf('data-campaign-chapter="the-reference"')
    ).toBeLessThan(markup.indexOf('id="collectors-case"'));
    expect(markup.indexOf('id="collectors-case"')).toBeLessThan(
      markup.indexOf('data-campaign-chapter="the-campaign"')
    );
    for (const view of COLLECTOR_CASE_VIEWS) expect(markup).toContain(view.src);
    expect(markup).toContain('id="collector-case-instructions"');
    expect(markup).toContain("select a pair of glasses directly inside it");
    expect(markup).not.toMatch(/collector-case-index|collector-case-caption/);
    expect(COLLECTOR_CASE_ITEMS.map(item => item.id)).toEqual([
      "ruby",
      "smoke",
      "amber",
    ]);
    expect(markup).not.toMatch(
      /<dialog|<video|add to bag|acquire|checkout|AED|15,000/i
    );
    expect(markup).toContain("The collector’s case.");
  });
});
