# Masquerade continuity refinement

6 November 2026. Local only; no GitHub push, deployment, generated media or new dependencies.

The opening now presents the existing film edge to edge. The layered portrait/room collage and its feathered edges have been removed; the smaller title leaves the face and frame clear. The accepted palace movement and model-centred closing aperture remain. The room's lower edge blends into the page colour before the collection statement and photographs.

The same eight-second source film is retained. Camera motion now starts at 6% rather than 17% of the scroll sequence, and the sequence spans 440svh rather than 400svh. The moving portion occupies approximately 35% more scroll travel, giving it a slower pace without inventing footage or generating another clip.

Three original photographs continue the story: profile and frontal portraits in a level spread, then the raised-glass image as a larger closing photograph. Original aspect ratios, colours and full source framing are preserved. A small scroll-driven drift reuses the existing campaign hook; reduced motion and phones keep ordinary image placement. Each photograph opens its matching index in the existing four-image gallery.

A real continuity defect was also fixed: a pending seek timeout could expire after the film scrolled offscreen, switching a valid film into its shorter fallback layout and moving the page. Seek completion and offscreen observation now clear the timer. Returning to an unfinished request rearms the appropriate loading/seek timeout. A 14-second browser check confirmed identical scroll position, stage height and photograph position before and after waiting offscreen.

Validation: type checking, production build, git diff --check and all 71 tests across 12 files pass. The sequence test now verifies the original three still sources, their order after the film, and no duplication. Desktop gallery clicks for photographs I and III, Escape and focus return were checked. Responsive documents at 320, 375 and 768px confirmed loaded images, level portrait heights and no horizontal overflow. The temporary local iframe test page was removed after checking. Desktop was reviewed at 1600×900.

Evidence: /Users/fazalhaque/Downloads/cheeta-jewels(2)/masquerade-continuity-review-2026-11-06/:

- opening-desktop.png
- room-to-stills-desktop.png
- paired-portraits-desktop.png
- raised-glass-desktop.png
- offscreen-stability.json
- responsive-openings.png
- responsive-stills.png
- responsive-checks.json

The earlier local Gun changes remain intact. The source film, first/last film posters, original campaign images and generated-media provenance remain unchanged.
