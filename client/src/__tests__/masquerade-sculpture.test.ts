import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";
import {
  createMasqueradeSculpture,
  disposeSculpture,
} from "../lib/masqueradeSculpture";
import {
  constrainPose,
  INITIAL_POSE,
  sculptureLightStep,
} from "../lib/masqueradeStudio";

describe("Masquerade interactive sculpture", () => {
  it("moves the light slowly and stops for reduced motion or invalid time", () => {
    expect(sculptureLightStep(1 / 60, false) * 60 * 96).toBeCloseTo(
      Math.PI * 2
    );
    expect(sculptureLightStep(0.05, true)).toBe(0);
    expect(sculptureLightStep(NaN, false)).toBe(0);
    expect(sculptureLightStep(-1, false)).toBe(0);
    expect(sculptureLightStep(400, false)).toBe(
      sculptureLightStep(0.05, false)
    );
  });
  it("builds real, finite, three-dimensional geometry with bounded draw calls", () => {
    const sculpture = createMasqueradeSculpture();
    expect(sculpture.children).toHaveLength(2);
    const bounds = new THREE.Box3().setFromObject(sculpture);
    const size = bounds.getSize(new THREE.Vector3());
    expect(size.x).toBeGreaterThan(4.7);
    expect(size.y).toBeGreaterThan(2);
    expect(size.z).toBeGreaterThan(2);
    for (const child of sculpture.children as THREE.Mesh[]) {
      const positions = child.geometry.getAttribute("position");
      expect(positions.count).toBeGreaterThan(1000);
      expect(Array.from(positions.array).every(Number.isFinite)).toBe(true);
    }
    disposeSculpture(sculpture);
  });
  it("releases every mesh and material when leaving the collection", () => {
    const sculpture = createMasqueradeSculpture();
    const resources = (sculpture.children as THREE.Mesh[]).flatMap(mesh => [
      mesh.geometry,
      ...(Array.isArray(mesh.material) ? mesh.material : [mesh.material]),
    ]);
    const disposals = resources.map(resource => vi.spyOn(resource, "dispose"));
    disposeSculpture(sculpture);
    disposals.forEach(dispose => expect(dispose).toHaveBeenCalledOnce());
  });
  it("allows full turns while keeping zoom, tilt and lighting within usable limits", () => {
    expect(
      constrainPose({ x: 8, y: Math.PI * 8 + 0.6, zoom: 20, light: -40 })
    ).toEqual({
      x: 0.7,
      y: expect.closeTo(0.6),
      zoom: 1.45,
      light: 0,
    });
    expect(
      constrainPose({ x: -8, y: -Math.PI * 8 - 0.6, zoom: -20, light: 300 })
    ).toEqual({
      x: -0.7,
      y: expect.closeTo(-0.6),
      zoom: 0.8,
      light: 100,
    });
    expect(
      constrainPose({ x: NaN, y: Infinity, zoom: NaN, light: NaN })
    ).toEqual({
      ...INITIAL_POSE,
      y: expect.closeTo(INITIAL_POSE.y),
    });
  });
});
