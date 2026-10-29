# Campaign continuity

28 October 2026. Local iteration based on the three supplied Lumen editorial references.

The references informed the photographic hierarchy, overlapping image planes and continuity of white space. Their brand, eyewear, grain, grid lines and promotional claims were not copied into Cheeta.

## Current presentation

Masquerade keeps its opening film. Its title, introduction and two portraits now form a single editorial composition: one dominant front portrait, a smaller profile crossing its edge and one readable passage in the open space. The photographs have a small, reversible drift driven by native scroll. The portrait-to-object interval is shorter, while the accepted Seen/Unseen exhibition reveal remains.

The closing sequence combines the wide candlelit photograph, an overlapping raised-glass photograph and the collection story in a single spread. It replaces the separate photograph, heading and paragraph rows. No images were generated or retouched for this iteration; existing source grading and the four campaign stills remain.

The current local tracked route had reverted to the old generic collection composition and the dev server was stopped. CollectionDetail is connected again to MasqueradeCampaign and GunCampaign. Its unused generic presentation CSS was replaced with focused film, navigation, image-button and footer styles. The next-collection loop and menu contain only Gun and Masquerade, consistent with the client's clarification. Legacy collection URLs resolve to the Gun campaign; catalogue/product records were preserved.

## Motion and access

- The new photographic movement uses transforms only. One requestAnimationFrame update is scheduled per visible section; rendering stops offscreen or when the document is hidden. Observers, listeners and frames are cleaned up on unmount.
- Native scroll remains the source of truth. There is no wheel interception, automatic cycling, pointer-following effect or additional pinned stage.
- Phones and reduced-motion users see a static composition. They retain all images, collection copy, navigation and gallery access.
- The campaign gallery uses the existing tested readiness reducer. It retains the displayed image until the latest request has decoded, ignores stale load attempts, exposes retry, restores focus and body scrolling on close, and fades images without enlarging them beyond their source dimensions.
- The paw and monogram tone are updated once per animation frame to remain readable over the campaign photographs.

The previous gallery installation artwork remains provisional imagined scenography. Its provenance and exact generation prompt are in campaign-exhibition-2026-10-27.md. No new product geometry, manufacturing claims, scarcity claims or service promises were added.

No backend, cart-storage, product ID, price or public API changes. No GitHub push or deployment.

## Verification

- Type checking and production build pass.
- All 50 existing tests in 9 files pass, including the campaign journeys, gallery readiness, Gun study and Masquerade reveal checks.
- Masquerade checked at 320, 375, 769, 1280 and 1480 CSS pixels. Visible headings fit, all four photograph controls remain available and there is no horizontal overflow or failed photograph placeholder.
- Native keyboard gallery navigation was checked with rapid forward/back input. The displayed photograph matched the requested numeral. Escape closed the dialog, restored the original photograph button's focus and released the body scroll lock.
- Static mobile layouts remove the photographic transforms. Reduced-motion rendering remains covered by the existing campaign tests.
- Screenshots and responsive measurements are saved in `/Users/fazalhaque/Downloads/cheeta-jewels(2)/campaign-continuity-review-2026-10-28/`.
