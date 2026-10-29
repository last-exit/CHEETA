# Campaign-led homepage

28 October 2026. Local proposal, using https://www.gentlemonster.com/int/en as the requested structural reference. The reference was inspected live: a large campaign opening, direct collection actions and image-led product presentation. Cheeta keeps its own navigation, typography, palette, campaign footage and imagery. No reference-site assets or promotional claims were copied.

29 October update: the separate reference passage described below is superseded by a single integrated Maharajah composition. All three guns can be selected above the eyewear. See `maharajah-composition-2026-10-29.md` for the implementation and provisional extraction provenance.

## Journey

1. Original founder campaign film with the Icon livin’ signature and original paw / CJ navigation.
2. Maharajah, the octagonal frame within The Gun Collection. A small reversible scroll movement presents the complete frame. One campaign link replaces the character roster, edition selector, prices and acquisition controls.
3. An archive passage within Maharajah uses all three new client-supplied photographs of historical gun references. One large view and two close studies show barrels and ornament. Their orientation and crops are handled in SVG layout; the underlying photographs are not retouched or reconstructed.
4. A full-width Masquerade campaign image and one collection link.
5. Eisa Saidi’s authentic portrait, the house catchphrase and a Philosophy link, followed by the warm-white Icon livin’ footer and privacy/contact links.

The previous homepage source is saved in `docs/archive/home-character-selector-2026-10-28.tsx.txt`. The separate CharacterSelect component, hooks, tests and fitting assets are preserved. Product IDs, prices, Retail and cart storage were not changed. Legacy #characters and #pieces anchors lead to the Maharajah study.

## Source media

The existing `/character-select/lens-ruby.webp` is a provisional generated frame preview, 768 × 512 pixels. It is framed with a viewBox that removes only transparent margins. The Masquerade exhibition image is also an existing provisional campaign concept, with provenance in `campaign-exhibition-2026-10-27.md`. No new image generation was used in this pass. Approved matching product photography is still needed before presenting the frame study as catalogue imagery.

New client-supplied sources, unchanged:

- `/Users/fazalhaque/Downloads/IMG_2643.heic`: photographed book reference attributed on the page to Pietro Manani.
- `/Users/fazalhaque/Downloads/IMG_2645.HEIC`: photographed Cominazzo-Mariani book reference.
- `/Users/fazalhaque/Downloads/IMG_2644.heic`: photographed Florentine book reference.

HEIC files were decoded with macOS sips into separate JPEG intermediates in `/Users/fazalhaque/Downloads/cheeta-jewels(2)/home-review-2026-10-28/source-previews/`. Their Display P3 colour space was converted to sRGB for consistent web display. Separate WebP delivery copies were made with cwebp at quality 86 and a maximum long edge of 2400px. Metadata is omitted. The three delivery assets total about 500KB and live in `client/public/campaigns/gun/references/`. No source photograph was overwritten, creatively colour-graded, inpainted or used to invent eyewear details. The reference pages are presented as source imagery; no production-date, manufacturing or historical ownership claims about Cheeta are derived from them.

## Interaction

Native scroll is the only clock for the short object study. Offscreen and hidden-document work is suspended, and observers/listeners are cleaned up on unmount. On phones and with reduced motion, the object study uses ordinary document flow with no pinning. Desktop-to-mobile resizing clears prior transform variables. The sole video uses the existing offscreen pausing and reduced-motion still treatment.

The later spacing pass on the same date removes the desktop scroll hold as well. Maharajah now uses ordinary document flow at every size, with only a small scroll-linked frame movement on wider screens. The archive images and Masquerade preview align to the same content width. See `home-spacing-2026-10-28.md` for the final measurements.

No new libraries, backend changes, route additions, cart writes, push or deployment.

## Verification

- Type checking and production build pass.
- 57 tests in 10 files pass, including the new homepage sequence, absence of purchase controls, all three reference sources, reduced-motion and compact layouts, legacy anchors, and bounded reversible object motion.
- Checked at 320 × 710, 375 × 812, 769 × 1024, 1280 × 720 and 1480 × 1034. No horizontal overflow or visible heading overflow. All three reference photographs render without the image-error fallback.
- Compact layouts are static and clear any prior desktop transform variables. The visible-film behaviour was checked while scrolling beyond the opening.
- Keyboard activation of the Maharajah campaign link opens the Gun route with its opening film and correct heading. Returning restores the homepage content.
- Screenshots and responsive measurements are saved in `/Users/fazalhaque/Downloads/cheeta-jewels(2)/home-review-2026-10-28/`.
