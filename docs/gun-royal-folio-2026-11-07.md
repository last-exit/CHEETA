# Maharajah, a jeweller’s view

The Gun campaign now centres on the eyewear. The founder heading, biography passage, Philosophy link and four-image portrait grid are removed. The original opening campaign film and the accepted physical case-opening film remain unchanged. Philosophy has not been edited.

The page continues on warm white with a small gold botanical ornament, a large front view of Maharajah and an octagonal line drawing that reveals once as it enters view. This is followed by a circular jeweller’s loupe. Three accessible tabs show the paired barrels, side profile and floral engraving from the existing launch reference, with concise product-specific copy. The loupe uses overlapping 280ms fades, immediate keyboard changes, Arrow/Home/End selection and fixed space for the passages. There is no automatic cycling, portrait carousel, product purchase action or added library. The showroom invitation remains the closing action.

Gold is local to the Gun presentation (`#86682F`). The botanical ornament is decorative, not a new house logo. The typography, navigation and shared footer remain. Navigation contrast follows the actual circular area of the dark loupe rather than treating its white corners as dark. Deep links now open the frame and detail chapters at `#maharajah-study` and `#maharajah-details`.

The front cutout is a provisional generated campaign interpretation of the launch reference. A first extraction based on the old cutout was rejected because it retained extra rim cabochons. The selected image uses the launch front view as its reference, without those extra gems. It remains subject to product approval. Macro views use the existing source image without added grading, sharpening or invented detail. Sources, prompts and processing are recorded in `gun-royal-folio-artwork-2026-11-07.json`.

## Verification

- Reviewed the real page at desktop and phone sizes, with exact embedded checks at 1280 × 720, 1480 × 1034, 375 × 812 and 320 × 710 CSS pixels. The phone layouts have no horizontal overflow or broken images.
- Tested all detail views, keyboard selection, corresponding visible panels and stable section height. Touch targets measured about 64 × 54px on phones. Existing reduced-motion campaign assertions remain green; the new outline and loupe also use the motion preference.
- Verified the existing case film still decodes, opens through native scroll/keyboard activation, supports inspection and returns with Escape. Fixed a responsive regression where a previously painted desktop frame could hide the static poster after the video was removed. A regression assertion now covers that state.
- The embedded test harness logged one transient MutationObserver error during frame navigation. It did not recur in a fresh standalone Gun page through detail selection, case opening, inspection, Escape and viewport changes; the standalone console was clean. No speculative application change was made for that harness observation.
- `pnpm check`, all 77 tests across 13 files, `pnpm build` and `git diff --check` pass. The existing lazy Three.js chunk warning is unchanged. Temporary test files were removed before the production build.

Review captures and the previous Gun implementation are in `../gun-royal-folio-review-2026-11-07/`. Main captures: `desktop-study-1480x1034.png`, `desktop-loupe-1480x1034.png`, phone loupe checks and `final-mobile-study.png`.

Local preview: `http://localhost:3000/collection/barrel#maharajah-study`. No commit, GitHub push or deployment was performed. Catalogue IDs, stored prices, Retail and checkout behaviour are unchanged.
