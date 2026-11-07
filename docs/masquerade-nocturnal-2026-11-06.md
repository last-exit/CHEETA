# The Masquerade: nocturnal campaign

Local presentation revision, 6 November 2026. The collection has its own near-black, oxblood and bone palette. GT Sectra, original navigation, campaign-only scope and the existing film are retained. No paid generation, GitHub push, deployment, catalog changes or new dependencies in this pass.

## Sequence

One 400svh native-scroll stage controls three visual states. It opens with the portrait at the right of a candlelit room and a large two-line title. The portrait expands across the stage while the camera moves through the palace. At the end, a vertical aperture closes around the model, revealing the room, its mirrors, red curtains and still figures behind her. The same room anchors the opening and ending; it is not another repeated image chapter. Seen and Unseen remain separate moments.

The supplied Surfaces recording informs the connected changes in image scale. The eurware editorial recording informs the continuous relationship between moving portrait and typography. These are composition/motion references; their models and products are not used as Cheeta imagery.

- Reference recording: /Users/fazalhaque/Desktop/Recording 2026-11-01 at 21.26.03.mp4
- Editorial reference: /Users/fazalhaque/Downloads/eurwareeditorial.mp4
- Existing room artwork: client/public/campaigns/masquerade/after-dark.webp
- Existing film: client/public/campaigns/masquerade/cinema/journey-v1.mp4
- Original film approval, prompts and generated-media provenance: masquerade-cinema-artwork-2026-11-05.json

The visual grade is local CSS; source media is unchanged. Soft edge masks seat the opening portrait in the room, then resolve to a fully visible film as it expands. Phone edge feathering stays outside the openwork wings. The shutter centre is calculated from the source focal point and actual crop, so it follows the model at different aspect ratios. It uses clipping and geometry rather than a scene crossfade. No flickering, automatic cycling, sound or pause controls.

## Continuity and access

The dark palette carries through the short collection statement, photograph link, next-collection navigation and house footer. It is scoped to the Masquerade cinema. Leaving for Gun restores the warm-white palette, including the HTML background. Paw and monogram stay light in this campaign; the original mobile navigation retains its legible white overlay.

The underlying controller still keeps the poster until a decoded frame is drawn, coalesces seeks to the latest scroll position, pauses offscreen work, and supports retry. Reduced motion uses static posters in normal flow. Failure resets stage geometry and title visibility. Gallery next/previous, Escape and focus restoration remain intact. Purchases remain outside this page.

## Validation

Type checking, production build and all 71 tests across 12 files passed. Tests cover forward/reverse mapping, portrait crop at 320/375px, distinct Seen/Unseen moments, the three stage states, poster retention, reduced motion and the single-film/single-room composition. Focused tests were repeated after updating the final room expectation.

The latest dark composition was visually inspected at native 1600×900 and 399×792. No horizontal overflow. Film expansion, model-centred shutter, room reveal, gallery navigation, Escape/focus restoration, dark footer and route theme cleanup were verified in the browser. A temporary missing-video fixture confirmed an unpinned static fallback and a fresh retry request; it was removed and the real film repainted successfully. Explicit IAB viewport overrides stopped affecting current tabs during this pass, so the latest native-size checks are distinguished from the earlier 1280/1480 and 320/375 measurements of the shared geometry.

Review evidence: /Users/fazalhaque/Downloads/cheeta-jewels(2)/masquerade-cohesion-review-2026-11-06/. Final screenshots: final-night-opening.png, night-shutter-desktop.png and night-room-desktop.png. Reference contact sheets and browser observations are in the same directory. All prior local Gun changes are preserved.
