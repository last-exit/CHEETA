export const MASQUERADE_DETAILS = [
  { id: "openwork", label: "openwork", box: [1020, 135, 580, 326] },
  { id: "lens", label: "lens", box: [190, 280, 710, 400] },
  { id: "bridge", label: "bridge", box: [600, 370, 450, 253] },
] as const;

/** Pan only across the existing campaign image, without synthesising detail. */
export function detailViewBox(index: number, dx = 0, dy = 0) {
  const detail = MASQUERADE_DETAILS[index] ?? MASQUERADE_DETAILS[0];
  const [x, y, width, height] = detail.box;
  return [
    Math.max(0, Math.min(1600 - width, x + (Number.isFinite(dx) ? dx : 0))),
    Math.max(0, Math.min(914 - height, y + (Number.isFinite(dy) ? dy : 0))),
    width,
    height,
  ];
}
