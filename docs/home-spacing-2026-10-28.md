# Homepage spacing refinement

28 October 2026. Local only. This pass responds to uneven whitespace and oversized elements on the homepage.

## Changes

- Removed Maharajah's 145svh scroll hold and fixed-height stages. It now takes only the space its content needs. The small frame movement follows the section's entry and exit without pinning.
- Reduced the Maharajah heading, archive heading, Philosophy quote and footer signature. The eyewear occupies a larger share of its section.
- Aligned the reference photographs and Masquerade image to the same maximum 1280px content width. Tightened the detail crops while preserving the supplied photographs.
- Reduced stacked section padding and caption gaps. Philosophy uses a 360px portrait column with a real 64px gap to its text on desktop.
- Preserved image space for unavailable assets, native scrolling, 44px campaign actions, compact layouts and reduced-motion treatment.

The opening film, navigation, copy, source images, routes, campaign pages and purchase behaviour are unchanged.

## Measurements

At a 1600 × 900 CSS viewport:

| Area | Before height | After height |
| --- | ---: | ---: |
| Opening | 900px | 900px |
| Maharajah | 1305px | 658px |
| Reference photographs | 1074px | 932px |
| Masquerade | 897px | 804px |
| Philosophy | 719px | 507px |
| Footer | 498px | 332px |
| Complete page | 5394px | 4133px |

The page is approximately 23% shorter at this viewport. This includes smaller type and imagery as well as reduced spacing; it is not a measurement of blank space alone.

## Verification

- `pnpm check`, `pnpm build`, and `git diff --check` pass.
- Existing Vitest suite: 57 tests in 10 files pass.
- Checked 320 × 710, 375 × 812, 769 × 1024, 1280 × 720 and 1480 × 1034. No horizontal overflow or overflowing headings. All three reference photographs render without their failure fallback.
- Desktop study height follows its content. Compact layouts clear desktop transforms and use a static frame.
- Desktop and phone screenshots, before/after measurements and responsive checks are in `/Users/fazalhaque/Downloads/cheeta-jewels(2)/home-spacing-review-2026-10-28/`.

No push or deployment. The existing generated frame preview and Masquerade concept image still require product approval, as recorded in the original homepage notes.
