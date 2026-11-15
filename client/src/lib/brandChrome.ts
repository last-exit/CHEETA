type Point = { x: number; y: number };

/** Contrast samples follow the rendered marks, including phone safe-area offsets. */
export function readBrandAnchors(): { paw: Point; monogram: Point } {
  const center = (selector: string, fallback: Point): Point => {
    const rect = document.querySelector(selector)?.getBoundingClientRect();
    return rect && rect.width > 0 && rect.height > 0
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : fallback;
  };
  return {
    paw: center(".house-paw-artwork", { x: 40, y: 72 }),
    monogram: center(".house-wordmark-symbol", {
      x: window.innerWidth / 2,
      y: 48,
    }),
  };
}
