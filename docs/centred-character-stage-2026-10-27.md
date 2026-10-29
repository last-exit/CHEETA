# Centred character fitting stage

Local-only implementation. No commit, push or deployment.

## Presentation

Centred model with a 36px GT Sectra collection title at the upper left and three photographic eyewear previews in a right-hand column. Character thumbnails retain natural colour; Roman numerals indicate selection. Fixed price/action space prevents layout reflow. Mobile stacks a horizontal lens row below the character roster. The hero, navigation, packaging and campaign pages are unchanged by this pass.

Character transitions overlap for 280ms. Keyboard changes are immediate. Close-up inspection transforms within a clipped, fixed image area. Reduced-motion preferences remove transform interpolation and use a short fade. Lens and character selection remain independent, with the original canonical retail IDs and prices.

## Provisional image provenance

Built-in imagegen was used. Reference: the octagonal gold frame in the top-right portrait of `client/public/character-select/noir.png`. The base packshot was generated, then isolated, then edited into Smoke and Amber variants. These are fitting previews, not approved catalogue photographs. All previews preserve a gold frame consistent with the fitting image; exact retail finishes, engraving and sizing remain an approval requirement.

Final website assets:
- `client/public/character-select/lens-ruby.webp`
- `client/public/character-select/lens-smoke.webp`
- `client/public/character-select/lens-amber.webp`

The original generated PNGs remain in `/Users/fazalhaque/.codex/generated_images/01a12ad8-09b2-7a80-89dc-f720d07a47c0/`. Delivery WebPs preserve alpha and are encoded at 768px wide, approximately 40–44KB each.

Prompt set:
1. Isolate a front-facing octagonal gold double-bridge frame from the top-right portrait, with ruby lenses, folded temples, restrained studio reflections, no model, text, invented engraving or scenery, and a transparent background.
2. Preserve the exact packshot and remove surrounding background, halo and shadow with transparent alpha.
3. Change only the ruby lenses to neutral charcoal Smoke; preserve gold frame geometry, perspective and framing.
4. Change only the ruby lenses to warm cognac Amber; preserve gold frame geometry, perspective and framing.

## Verification

- All nine character/lens combinations captured in full and close-up at DOM viewports 1280×720 and 1480×1034. No horizontal overflow; details URLs match each selected lens.
- 375px mobile layout inspected; all three preview images loaded. A final 320×710 DOM check confirmed no horizontal overflow, all six choice targets above 44px in both dimensions and all previews loaded.
- Arrow selection, vertical lens arrows, native keyboard activation and Escape checked.
- Image-loading tests used isolated local proxy origins, leaving localhost's bag untouched: a 12-second delayed character retained the previous model and disabled acquisition; a controlled 503 retained the previous image and lens, displayed Retry, and recovered on retry.
- Acquiring Smoke on character III produced canonical edition 02, gunmetal obsidian, AED15,000 in the isolated test bag. The test item was removed afterwards.
- Image area dimensions and page height stay fixed through inspection. Browser automation focus/scroll-into-view affected viewport scroll positions during some captures; do not interpret those as proof of unchanged scroll offset.
- Reduced-motion branches reviewed in source; system reduced-motion preference was not emulated in the browser.
- Type checking and the production build pass. All 31 tests pass, including the subsequent Masquerade pilot tests.

Screenshots: `/Users/fazalhaque/Downloads/cheeta-jewels(2)/centred-fitting-review-2026-10-27/`. A desktop baseline and desktop/mobile results are included. Explicit viewport screenshots can show browser capture scaling artefacts; DOM measurements were used to confirm actual viewport dimensions.
