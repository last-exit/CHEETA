# The case on the page

31 October 2026. Local preview: `/collection/barrel#collectors-case`.

## Current state

The dark room rectangle has been replaced by a transparent studio case on the actual warm-white page. The velvet tray contains three visible octagonal Maharajah frames: Ruby, Smoke and Amber. There is no control strip or caption underneath.

The glasses themselves are native buttons placed over their photographed positions. Hover or keyboard focus reveals their names. Selecting one moves the camera within the same image; selecting another redirects the current move. The targets follow the camera, retain 44px touch areas, and avoid expanding across other compartments when zoomed. The lid closes the case. An unboxed return arrow, clicking away from the lenses/lid, or Escape returns to the full case. A second Escape closes it. Arrow keys and Home/End compare the three pairs immediately.

The stage stays fixed. Instructions and selection announcements remain available to screen readers without adding visible subtext. Loading errors appear inside the stage. No catalogue, pricing, product identifier, route, cart or purchase behaviour changes.

**The replacement opening film is not generated yet.** Flow quoted 100 additional credits for exactly one silent eight-second 16:9 Veo 3.1 Quality film at 720p using the prepared closed/open studio images. A separate user approval is pending. The previous approval covered the earlier room film. No new paid Flow generation has been submitted during this pass.

`CASE_FILM_AVAILABLE` is therefore false. Opening and closing currently change between the studio stills; lens inspection retains its camera motion. The old room film is preserved, but is not used as an incompatible fallback behind the white case.

## Playback preparation

The existing forward/reverse playback path now supports a transparent studio matte. A small WebGL painter removes neutral white from the film and unmattes edge pixels onto the actual page colour; a 2D fallback is available. It keeps the prior canvas frame while reversing or seeking. Underlying stills are hidden only once a video frame is painted, preventing a duplicate closed-case silhouette from appearing through the transparent background.

A local four-second sample, made by encoding the new open studio image over warm white, exercised real video decoding and the WebGL painter without spending Flow credits. The first check exposed the duplicate silhouette; the corrected check showed one case with a clean background. This test movie is archived outside `public` and is not a substitute opening film. Its temporary paths and feature flag were reverted.

Before enabling the replacement film: obtain the pending approval, verify only the two new studio images are used, inspect all three pairs and hinge motion, remove audio, encode forward/reverse delivery files, derive exact start/end posters with matching matte removal, and recalibrate the three hit regions if the ending composition changes. Do not spend credits on alternatives without further authorization.

## Artwork

Built-in imagegen prepared the two transparent studio illustrations. The open tray uses the existing provisional ruby/smoke/amber octagonal previews. These are campaign illustrations pending product and packaging approval. They do not establish actual materials, included items or additional products.

Delivery: `client/public/campaigns/gun/collectors-case/closed-studio-v2.webp` and `open-studio-v2.webp`, both 1672 × 941 with real alpha, WebP quality 90 and alpha quality 100. The source collage, old film and earlier artwork remain intact. Exact prompts, sources, saved paths and the quoted film request are in `collector-case-studio-artwork-2026-10-31.json`.

## Verification

- Checked 1280 × 720 and 1480 × 1035 desktop layouts, plus 320 × 710 and 375 × 812 phones, without horizontal overflow or detached controls.
- At 320px, direct clicks on all three pairs and the return arrow retained the same 321.09px section height, 158.56px stage height and scroll position. Open-state touch targets measured approximately 66.21 × 44px; inspected targets approximately 172.15 × 61.84px.
- All three enlarged framings retain both lenses. The 1480px stage remains 720.37px high across every selection. Rapid input, arrows, End, Escape, return and focus restoration were exercised.
- Reduced motion was tested with a temporary fixture that preserved the hook order. Pointer selections committed immediately, with no video/canvas or zoom animation. The fixture was reverted.
- A real local video sample verified the transparent playback path and the still/video visibility handoff. No new paid film has been used for this test.
- Final type checking, production build, 66 tests in 11 files, formatting and whitespace checks pass. No final-browser errors were recorded.
- Screenshots and measurements: `/Users/fazalhaque/Downloads/cheeta-jewels(2)/collector-case-studio-review-2026-10-31/`.

Local work only. No GitHub push or deployment. The homepage, Masquerade and the rest of the Gun campaign remain unchanged.
