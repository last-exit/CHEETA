# Interactive collector’s case

Superseded on 31 October by the transparent three-frame studio presentation. See [current studio notes](collector-case-studio-2026-10-31.md); the replacement film is awaiting separate approval.

30 October 2026. Local prototype: `/collection/barrel#collectors-case`.

## Motion

The case remains after the frame reference and before the founder’s closing photographs. Clicking it plays a continuous lid-opening film with a camera push towards the tray. Closing plays a locally encoded reverse; cancelling an opening reverses from the current frame. No photographic dissolves, automatic loops or visible video controls.

Selecting eyewear, case, cloth or booklet moves within the **same open-case photograph**, rather than replacing it with another angle. Magnification is capped at 2.6 to retain context and limit enlargement of the 720p source. Inspection takes 1.35 seconds, pullback 1.05 seconds, using the house ease-out curve. Rapid selections continue from the current transform and finish on the latest choice. Stage and caption dimensions stay fixed.

Invisible desktop compartment regions are paired with a persistent text index and 44px targets. Enter/Space, arrow keys, Home/End and Escape select immediately. Reduced motion omits the video/canvas and changes still framing immediately. Escape returns to the open case, then closes it. Focus returns to a stable control without scrolling. Native scrolling and pinch zoom remain available.

## Loading and recovery

Requested, decoded and presented state are separate. Only the latest decoded selection can commit. Images and the opening film preload near the chapter; the closing film downloads on demand. A single hidden native video paints into a canvas, retaining its frame while a reversed clip loads and seeks. Exact first/last frames form the still posters.

Playback pauses offscreen and when the document is hidden. Interruption and unmount clean up observers, listeners, timeouts, video callbacks and animations. Failed images retain the prior view with retry and stale-attempt protection. Failed video retains the committed still with retry or immediate still access.

## Artwork and cost

The user approved **one eight-second Veo Quality generation for 100 credits**. Flow job `mvva0rc0-06b6e7`, media `6f23e04e`, completed. No additional paid generation was made. Built-in imagegen prepared the closed start frame from the client collage; the earlier open-case image supplied the end reference. Exact prompts and provenance are in `collector-case-artwork-2026-10-30.json` and `collector-case-motion-2026-10-30.json`.

Source: 1280 × 720, 24fps, 190 frames. Local processing adds a camera push/pullback, removes audio, and encodes a reverse. The camera crop excludes spurious watches generated in the lid interior. The source, uncropped contact sheets and old still artwork remain in `/Users/fazalhaque/Downloads/cheeta-jewels(2)/collector-case-motion-review-2026-10-30/`.

**The film remains provisional campaign artwork.** It changes the clasp, engraving and eyewear outline in some intermediate frames. It is not verified packaging or product photography. Client approval or a controlled physical shoot is needed to make those details final. No material or included-item promises are added.

The four public assets are `opening-v1.mp4`, `closing-v1.mp4`, `closed-motion-v1.webp` and `open-motion-v1.webp`, under `client/public/campaigns/gun/collectors-case/`. The old six-photo prototype is archived outside the public directory. No runtime library was added.

## Verification

- All compartments, rapid input, opening reversal, open/close, Escape, arrow selection and focus restoration checked. Physical clicks at 1280 × 720 retained the same scroll position, 711.19px section height and 460.19px image height.
- Checked 320 × 710, 375 × 812, 1280 × 720 and 1480 × 1033 CSS viewports. No horizontal overflow; fixed stage dimensions; 44px targets with subpixel rounding.
- A temporary missing-video URL exercised failure, retry and still fallback. The closed case remained visible; fallback restored focus to the first object. The fixture was reverted.
- Reduced motion exercised through a temporary hook fixture plus server-rendered tests. The fixture was reverted. No video or canvas was present, and pointer selections were immediate.
- Offscreen playback held at 0.2439 seconds, then resumed on return. Screenshots and measurements are saved in the motion review directory.
- Final type checking, production build, 66 tests across 11 files and whitespace checks pass. No runtime dependency was added. Temporary fixture HMR produced hook-order warnings during QA; full reload after restoring the original hook cleared the fixture, and the final source uses a stable hook order.

No price, catalogue, purchase, route, cart-storage or public API changes. Homepage and Masquerade unchanged. Local only; no GitHub push or deployment.
