import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { Router } from "wouter";
import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";
import Philosophy from "../pages/Philosophy";
import { diamondPlanes } from "../lib/diamondOptics";

const media = vi.hoisted(() => ({ reduced: false }));
vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: () => media.reduced,
}));

const render = () =>
  renderToStaticMarkup(
    createElement(Router, { ssrPath: "/philosophy" }, createElement(Philosophy))
  );

describe("Philosophy revival", () => {
  it("retains the founder, supplied catchphrase and campaign routes without selling exclusive pieces", () => {
    const html = render();
    expect(html).toContain('id="philosophy-title"');
    const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
    expect(text).toContain("Diamonds are made in the rough.");
    expect(text).toContain("Eisa Saidi.");
    expect(html).toContain('href="/collection/barrel"');
    expect(html).toContain('href="/collection/masquerade"');
    expect(html).toContain('href="/contact"');
    expect(html).not.toMatch(/add to bag|acquire|checkout|AED|—/);
  });
  it("starts the real identity passage silent, loops it and exposes an explicit listen action", () => {
    const html = render();
    expect(html.match(/<video\b/g)).toHaveLength(1);
    expect(html).toContain('src="/philosophy/identity-passage.mp4"');
    expect(html).toMatch(/<video[^>]*muted=""[^>]*loop=""[^>]*playsInline=""/);
    expect(html).toContain("Listen to Eisa’s film");
    expect(html.match(/<video\b[^>]*>/)?.[0]).not.toMatch(
      /\s(?:controls|autoplay)(?:=|\s)/i
    );
  });
  it("substitutes the identity still under reduced motion and keeps the sculpture poster and provenance", () => {
    media.reduced = true;
    try {
      const html = render();
      expect(html).not.toContain("<video");
      expect(html).not.toContain("Listen to Eisa");
      expect(html).toContain("/philosophy/identity-film-poster.jpg");
      expect(html).toContain("/philosophy/sculpture/diamond-poster-v1.webp");
      expect(html).toContain("CC BY 4.0");
      expect(html).toContain("https://sketchfab.com/shooter24994");
    } finally {
      media.reduced = false;
    }
  });
  it("builds finite optical boundaries that enclose every vertex of the supplied diamond", () => {
    const file = readFileSync(
      new URL("../../public/philosophy/sculpture/diamond.glb", import.meta.url)
    );
    const jsonLength = file.readUInt32LE(12);
    const document = JSON.parse(file.subarray(20, 20 + jsonLength).toString());
    expect(document.asset.extras.license).toContain("CC-BY-4.0");
    const binary = file.subarray(28 + jsonLength);
    const accessor = document.accessors[0],
      view = document.bufferViews[accessor.bufferView];
    const positions = new Float32Array(accessor.count * 3);
    for (let i = 0; i < positions.length; i++)
      positions[i] = binary.readFloatLE(
        (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0) + i * 4
      );
    const indicesAccessor = document.accessors[3],
      indicesView = document.bufferViews[indicesAccessor.bufferView];
    const indices = Array.from({ length: indicesAccessor.count }, (_, i) =>
      binary.readUInt32LE(
        (indicesView.byteOffset ?? 0) +
          (indicesAccessor.byteOffset ?? 0) +
          i * 4
      )
    );
    const geometry = new THREE.BufferGeometry()
      .setAttribute("position", new THREE.BufferAttribute(positions, 3))
      .setIndex(indices);
    geometry.rotateX(-Math.PI / 2);
    geometry.center();
    const planes = diamondPlanes(geometry);
    expect(planes.length).toBeGreaterThan(4);
    expect(planes.length).toBeLessThanOrEqual(128);
    for (const plane of planes) {
      expect([plane.x, plane.y, plane.z, plane.w].every(Number.isFinite)).toBe(
        true
      );
      expect(Math.hypot(plane.x, plane.y, plane.z)).toBeCloseTo(1);
      expect(plane.w).toBeGreaterThan(0);
      for (let i = 0; i < positions.length; i += 3)
        expect(
          plane.x * positions[i] +
            plane.y * positions[i + 1] +
            plane.z * positions[i + 2]
        ).toBeLessThanOrEqual(plane.w + 1e-5);
    }
    geometry.dispose();
  });
});
