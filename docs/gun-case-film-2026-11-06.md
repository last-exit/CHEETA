# Gun case film

The Gun campaign now uses one continuous physical opening film in the pale palace. It replaces the independently transformed palace, chest and eyewear PNGs. The original founder opening and four founder photographs remain in place. No retail catalogue, cart, price, route or public API changes were made.

## Presentation and interaction

- One box, one octagonal Maharajah pair, resting inside the burgundy tray.
- Native, reversible scroll controls a silent 190-frame film. An early end hold leaves time for direct interaction. Activating the closed case advances the native scroll position to its open hold.
- Colour controls sit in the scene and become available only when the last film frame has actually painted and the matching image has decoded. Ruby, Smoke and Amber change the glass alone. Reversing the film hides the tint immediately while retaining the selected colour for reopening.
- Inspection enlarges the complete filmed scene. It does not lift, rotate or move a separate eyewear cutout. A fixed click area prevents focus or transformed geometry from shifting the page. Escape restores the full scene. Keyboard interactions are immediate.
- Below 1024px and with reduced motion, the open case is shown in ordinary flow with lens selection and inspection. Reduced motion makes the close-up immediate, without a zoom animation. No film is fetched in these modes.
- A failed film retains the reserved section height and offers the open poster and Retry. Retry restores focus once the view is ready. Preload/decode cleanup prevents stale image completion after retry or unmount.
- The campaign ends with the shared showroom invitation linking to Contact. Exclusive collections have no online purchase action.

## Media

Exactly one approved 100-credit Veo Quality generation was submitted. The new film was reviewed as a contact sheet, at its full final frame and through forward/reverse browser playback. It maintains one octagonal pair, rear-hinged lid movement and the palace composition. The original audio stream was removed. The runtime file is native 1280 × 720, 24fps, 7.9167 seconds, with frequent keyframes for seeking, faststart and no added colour grading or upscaling.

Generated imagery remains provisional pending product approval. Small generated reflection/detail changes remain; this is a campaign depiction, not manufacturing photography. The earlier film that morphed to aviator frames is not used. Source assets, recorded briefs, approved prompt, quote and encoding details are in `gun-case-film-artwork-2026-11-06.json`.

## Verification

- Inspected at 1280 × 720 and 1480 × 1034, with complete lenses and temple details in both full and close-up framing.
- Checked 320px, 375px and 768px layouts: no horizontal overflow; full case framing; 44px lens controls. The compact view preserves native scrolling.
- Tested pointer inspection with unchanged scroll position and section height, Escape, focused arrow/Home/End colour selection, repeated selection, reverse scrolling and rapid forward/backward input resolving to the latest frame.
- Simulated a failed first film load and a two-second image decode delay in temporary fixtures. Controls stayed protected until decoded; Retry recovered the actual film, restored focus and retained the section height. Fixtures were removed before the build.
- Checked reduced motion: no video/canvas, no sticky pin, zero transition duration; inspection still works.
- Verified the showroom link reaches Contact with the supplied email and phone. Verified the unchanged Masquerade opening still decodes through the shared cinema hook. No runtime errors appeared in the Gun page console.
- `pnpm check`, `pnpm exec vitest run` (77 tests in 13 files), `pnpm build` and `git diff --check` pass. The existing lazy Three.js chunk size warning remains nonblocking.

Screenshots and original-film archive: `../gun-case-film-review-2026-11-06/`. The main preview is `gun-final-desktop.png`; sized captures include the full/close-up desktop views and 320/375/768px layouts. The pre-change implementation is preserved in that directory's `previous/` folder.

Local preview: `http://localhost:3000/collection/barrel#collectors-case`. No commit, push or deployment was performed.
