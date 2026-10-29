# Maharajah: gun and frame

29 October 2026. Local homepage refinement.

Later homepage polish on the same date keeps this interaction and its assets, but staggers the gun above-left and the eyewear below-right. It also refines Masquerade and the closing sections. See `home-polish-2026-10-29.md` for the current composition.

## Composition

The historical gun references are now part of Maharajah's presentation. A complete gun appears above the octagonal frame, on the same warm-white background. The three reference illustrations are available through small I / II / III buttons. The separate archive heading, explanatory line and three rectangular book photographs have been removed from the homepage presentation. Original source assets remain in the project.

The objects have a small opposing scroll movement on wider screens. There is no scroll hold or automatic cycling. Phones and reduced-motion layouts use a static composition. Short desktop viewports scale both objects down together; the stage measures approximately 718px at 1280 × 720. The eyewear campaign link and accepted surrounding sections remain intact. No shopping action was added.

## Interaction and verification

- The reference switch uses an overlapping 280ms opacity transition. Arrow keys, Home and End select and focus the matching control without focus-driven scrolling. Keyboard selection removes the transition. Each control has a 44px target.
- Images decode before selection commits. The previous image remains visible while the requested one loads; latest input wins. An unavailable reference exposes a retry action without changing the stage's dimensions.
- A missing Florentine delivery asset was simulated locally, then restored. Selecting it kept Manani visible at the same 885px stage height. Retry loaded the requested Florentine illustration, removed the error action and retained the stage height. Rapid switching ended on the last requested reference.
- Checked at 320 × 710, 375 × 812, 1280 × 720 and 1480 × 1034. No horizontal overflow. All three assets decode and render. Eyewear remains below the gun; mobile controls use a separate row.
- Type checking, production build, 57 tests in 10 files and whitespace checks pass.
- Screenshots and measurements: `/Users/fazalhaque/Downloads/cheeta-jewels(2)/maharajah-design-review-2026-10-29/`.

## Image provenance and limitations

The built-in imagegen tool prepared three provisional transparent cutouts from the client's book-page photographs. This is an AI-assisted extraction and can reinterpret fine printed detail; these assets are not untouched archival reproductions or verified object photography. The original HEIC photographs and prior WebP book-page copies were not modified. The existing eyewear image also remains a provisional generated preview. Product approval is still required before using it as catalogue imagery.

Project delivery assets, each with real alpha transparency, optimized using cwebp quality 88 with lossless alpha:

- `/Users/fazalhaque/Downloads/cheeta-jewels(2)/cheetah final website 2.0/client/public/campaigns/gun/references/manani-cutout-v1.webp` (2149 × 732; 215KB).
- `/Users/fazalhaque/Downloads/cheeta-jewels(2)/cheetah final website 2.0/client/public/campaigns/gun/references/cominazzo-mariani-cutout-v1.webp` (2172 × 724; 305KB).
- `/Users/fazalhaque/Downloads/cheeta-jewels(2)/cheetah final website 2.0/client/public/campaigns/gun/references/florentine-cutout-v1.webp` (2172 × 724; 249KB).

Built-in outputs remain under `/Users/fazalhaque/.codex/generated_images/01a12ad8-09b2-7a80-89dc-f720d07a47c0/`: `exec-d732f66d-02f9-49e6-991f-6c32ee935134.png` (Manani), `exec-b56b3b19-a51b-453e-9e48-52186b72e5e2.png` (Cominazzo-Mariani), `exec-dd5c8245-8ccd-4131-afb6-6cedf0331846.png` (Florentine).

The same prompt was used in one built-in edit call per source, with transparent_background set to true and the respective `*-study.webp` as its edit target:

> Use case: background-extraction. Asset type: transparent archival object for a luxury eyewear editorial website. Edit target: the supplied photograph of a book page. Isolate ONLY the single complete antique pistol illustrated on the main book page. Remove paper, text, other images, page rules, furniture, laptop, hands and all page shadows. Rotate the isolated illustration so the barrel points horizontally RIGHT and the grip is on the LEFT, with its hammer above and trigger guard below. Show the complete original object, both tip and butt, with a little transparent margin. Wide landscape canvas. Preserve the source illustration's exact silhouette, barrel lengths, hammers, engraving, wood colour and metal tones as closely as possible; this is an extraction, not a new weapon design. Do not turn it into a new photograph or sharpen invented details. No added engraving, no new ornaments, no lighting effects, no shadow, no text, no background. Genuine alpha transparency, including inside the trigger guard.

No GitHub push or deployment. No route, catalogue, cart or public API changes.
