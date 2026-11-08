# Philosophy: vintage revival

This first editorial pass was superseded locally by the richer salon direction in [philosophy-salon-2026-11-08.md](./philosophy-salon-2026-11-08.md), following feedback that the composition remained too plain.

Local redesign following the supplied editorial reference and the client's Cheeta Pinterest board. The board was inspected in the signed-in Chrome session: engraved sporting metal, gilded frames, classical sculpture, saturated salons and cinematic vintage fashion were the useful cues. Its images were used as reference, not copied into the site. The page stays warm ivory with GT Sectra, the existing body fallback and muted bronze.

The opening is an editorial Philosophy masthead, the exact supplied “Diamonds are made in the rough” catchphrase and the client-supplied interactive diamond. Eisa Saidi's enlarged name leads an antique cameo portrait. The original monochrome photograph remains intact beneath a generated champagne-gold frame. Concise biography covers the school braids, boxing nickname and his father's antiques and paintings, using facts already present in the supplied material and existing Founder page. The identity film retains the source grading, captions and 24-second passage, now with a deliberate listen/mute action. It starts silent, loops, pauses and mutes offscreen. The cheetah eye, original horseback still and links into both active exclusive campaigns complete the story. The footer stays ivory.

## Media and provenance

- `public/philosophy/sculpture/diamond.glb`: byte-for-byte copy of the supplied 12,916-byte file. Embedded attribution identifies Diamond by Akshat, CC BY4.0. The licence/source links appear in a public artwork-credits disclosure and accompanying LICENSE.md. The model is a decorative sculpture, not a product or gemstone specification.
- `diamond-poster-v1.webp`: direct transparent WebGL render of the same supplied model, with the same opening pose. Used during loading or if graphics fail. No replacement geometry or product photography.
- `antique-cameo-v1.webp`: generated decorative frame; photographed-looking champagne gilt and floral carving. It makes no claim about a real object in the founder's collection. Source generated PNG: `/Users/fazalhaque/.codex/generated_images/01a12ad8-09b2-7a80-89dc-f720d07a47c0/exec-d6eaee69-dd06-4c73-b7e9-12a829ca9bbd.png`.
- Earlier rough-diamond image studies were superseded by the user's model and retained outside the public site in the review directory.

## Interaction and performance

The model uses the already-installed Three.js, loaded separately from the page composition. It preserves the supplied mesh and derives enclosing planes for internal refraction/reflection. A small procedural studio cube map supplies lighting; no HDR download, particles, artificial sparkle or pointer-following effect. The canvas caps DPR at1.5, rendering at up to30fps during a slow140-second orbit. Pointer drag and arrow keys change orientation; Home or Escape returns to the opening pose. Native vertical touch scrolling remains available. Reduced motion draws a single pose and responds immediately to deliberate keyboard changes. The renderer stops offscreen or when the document is hidden, and disposes GPU resources on route change. Graphics failure keeps the matching poster. No new dependency, backend, catalogue, price or cart-storage changes.

## Verification

Desktop and phone responsive checks, keyboard rotation/reset, source framing, film sound and offscreen pausing, reduced motion, graphics loss and campaign navigation were reviewed through the real local page. Temporary QA pages were removed before the production build. Type checking, the production build and all82 tests across14 files pass. The new tests cover the founder story/campaign routes, silent looping film, reduced-motion still and public attribution, and finite optical boundaries enclosing the actual supplied model. Existing collection, retail and character tests remain green.

Screenshots and the prior Philosophy source are in `../philosophy-editorial-review-2026-11-08/`. All changes remain local; no GitHub push or deployment.
