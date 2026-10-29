# Homepage composition polish

29 October 2026. Local refinement of the complete homepage after the integrated Maharajah study.

## Changes

- Maharajah now uses a staggered editorial composition. The gun sits above and to the left; the larger eyewear sits below and to the right. Its title occupies the space beside the frame, and the I / II / III controls sit alongside the gun. The glasses are the main visual focus. Phones use a stacked composition with a separate control row.
- Masquerade uses the full page width. On desktop, its title and campaign action sit in the floor area of the existing image. Mobile uses a 4:3 crop aligned to keep both openwork wings visible, with text beneath the image. The dark fallback image receives light caption text on desktop.
- The closing Philosophy passage places the catchphrase on the left and the larger founder portrait on the right. Phones use quote, portrait and name in sequence.
- The homepage footer uses the original handwritten Icon livin’ brand asset, with privacy/contact links aligned beside it on desktop and beneath it on phones. The shared footer component on other pages is unchanged.

The opening film, paw navigation, GT Sectra, house palette, copy, campaign routes and product data are preserved. No new bitmap media, libraries, patterns, dividers, shadows or shopping controls were added. The provisional gun extractions, eyewear preview and Masquerade installation retain the approval limitations recorded in `maharajah-composition-2026-10-29.md` and `campaign-exhibition-2026-10-27.md`.

## Verification

- Inspected 320 × 710, 375 × 812, 769 × 1024, 1280 × 720 and 1480 × 1034. No horizontal overflow or overflowing headings. Existing images load successfully, and the gun controls retain 44px targets.
- Keyboard reference switching wraps from III to I, restores focus to I and removes the opacity transition for that input. Compact layouts use the static frame treatment.
- `pnpm check` and 57 tests in 10 files pass. The production build and whitespace checks pass.
- Screenshots and responsive measurements are in `/Users/fazalhaque/Downloads/cheeta-jewels(2)/home-polish-review-2026-10-29/`. The previous composition is recorded in `/Users/fazalhaque/Downloads/cheeta-jewels(2)/maharajah-design-review-2026-10-29/`.

No push or deployment. The development server runs on port 3000.
