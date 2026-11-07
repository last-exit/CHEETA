# Gun engraving background

Superseded later on 7 November by the client’s clarification. The actual empty page surface, including the footer, needed architectural light. See `gun-architectural-light-2026-11-07.md`. The description below is historical; its component and framing metadata have been removed.

Implemented the selected oversized-engraving direction on Gun first. One crop of the floral temple-end ornament in the existing launch reference becomes a pale gold impression along the left edge of the frame study and loupe chapters. It replaces the faint octagonal outline. The artwork recedes before the showroom section.

`GunEngravingImpression` uses an inline SVG luminance mask of `GUN_STUDY.src`, framed by `views.impression` (748, 590, 276 × 225). A monochrome mask and gentle tonal curve isolate the engraving from the source’s dark surroundings. The foreground photographs and source file are unchanged. No new engraving, raster asset or generated media was created.

Native scroll controls opacity and a small vertical offset through MotionValues. There is one impression, with no tiling, automatic cycling or added scroll space. The right-hand copy area remains clear. Phones use a lighter treatment; reduced motion uses fixed opacity and no extra movement. The layer is hidden from assistive technology, cannot receive focus and does not intercept pointer input. The existing films, case controls, loupe selection and showroom path are unchanged.

Verification: inspected at 1480 × 1034 and 375 × 812 CSS pixels; confirmed one decorative layer and no horizontal overflow. Verified changing opacity/position between the study and loupe. In a reduced-motion fixture at 1280 × 720, opacity stayed at 0.42 and transform stayed `none` while scrolling. The final standalone preview had no new console errors. Temporary fixtures were removed before the production build.

`pnpm check`, the existing 77 tests, `pnpm build` and `git diff --check` pass. The existing lazy Three.js chunk warning remains. No new dependency, catalogue, storage, checkout or route change was introduced. No GitHub push or deployment was performed.

Screenshots and the previous Gun presentation are in `../gun-engraving-review-2026-11-07/`. Main captures: `desktop-study-1480x1034.png`, `desktop-loupe-1480x1034.png`, `mobile-study-375.png`, `reduced-motion-1280x720.png` and `final-mobile.png`.

Preview: `http://localhost:3000/collection/barrel#maharajah-study`.
