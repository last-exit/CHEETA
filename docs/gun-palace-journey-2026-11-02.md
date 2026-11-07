# Gun: one case, one frame

Local review, 2 November 2026. This supersedes the three-pair studio case direction. No GitHub push or deployment.

## Experience

The founder’s existing opening film remains first. A short collection introduction leads into one pale Mughal-inspired palace setting. Native scrolling approaches the open case, lifts one Maharajah frame from its undivided velvet tray, then moves towards its paired barrel hinge. Returning to the same scroll position restores the same composition. The sequence ends with Eisa Saidi’s original campaign photographs and the house footer.

The old separate black product study and second monochrome founder feature are removed from the active page. All four founder stills remain inspectable. Homepage, navigation, Masquerade, routes, retail data, prices, cart and checkout are unchanged.

## Interaction

- Exactly one case and one pair are visible. The lens arrows sit inside the scene. No product choices or thumbnails beneath it.
- Ruby, Smoke and Amber are colour studies applied only inside the lenses. Every selection keeps identical frame geometry and ornament. These are campaign previews, not a new catalogue definition.
- Click the frame to inspect; click it again or press Escape to return. Arrow keys and Home/End select colours when a scene control has focus. Native page scrolling remains available outside those controls.
- The scroll sequence uses transforms and native sticky positioning, without a render loop, wheel capture, fake grain or UI sound. Pointer inspection uses an interruptible 1100ms transform. Keyboard and reduced-motion changes are immediate.
- Below 768px and under reduced motion, the case is in normal document flow and all three short passages are readable below it. Inspection does not change the stage dimensions. Controls have 44px targets; the tilted image hit area compensates for its projected size.
- Images preload as the section approaches. Decoding must finish before interaction. A failed image keeps the setting and text available, disables inspection, and provides retry. Late responses from an earlier attempt cannot update a newer one. Retry restores focus to the frame without scrolling.

## Artwork and limits

Built-in image generation produced the palace, empty case layer and transparent front view using the existing case identity and Maharajah launch plate. All original outputs are retained. Final delivery assets are in `client/public/campaigns/gun/palace/`; exact prompts, source paths and encoding are in `gun-palace-artwork-2026-11-02.json`.

These are provisional generated campaign assets, not verified product/packaging photography. The setting is Mughal-inspired scenography, not a claim of a real location. The animation is a layered approach/lift/close-up, not a generated physical lid-opening film. No new Flow job was submitted and no additional Flow credits were spent. The earlier pending studio request specifies three pairs and is obsolete; do not generate it.

The new Masquerade direction is recorded for a separate pass: one pale Victorian woman with black hair tightly gathered into a bun, used consistently as the face of that journey. Masquerade has not been changed in this pass.

## Verification

- Type check and production build passed; 62 existing/updated tests passed in 11 files.
- Browser checks: approximately 320×710, 375×811, 1280×720 and 1480×1034. No horizontal overflow. Exact CSS measurements and screenshots are saved outside the repository in `../gun-palace-review-2026-11-02/`.
- Direct pointer inspection and lens changes preserve scroll position and stage height. Arrow/End selection and Escape restore the expected state and focus. Native forward/reverse scrolling changes the same scene.
- A temporary missing-frame fixture produced the error state and disabled inspection; restoring the asset and selecting retry restored the scene. The fixture was removed. Reduced-motion rendering is also covered by the campaign tests.
- Original media remain available; no runtime dependency was added. The prior video/matte-player implementation and its three-pair metadata were retired from source.

Browser screenshot capture under an explicit viewport override has a known panel scaling issue; DOM viewport measurements are retained alongside the images. The final preview uses the browser’s natural viewport.
