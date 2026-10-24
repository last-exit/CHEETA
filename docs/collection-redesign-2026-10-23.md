# Collection journeys, 23 October 2026

Local work after the existing GitHub checkpoint. No push or deployment.

## Campaign structure

The collection pages remain editorial campaigns, with all selling in Retail. Each now follows an opening film, a collection introduction, paired portraits, a motion chapter, a closer still, a closing note and a final wide photograph. The next-campaign link and shared contact/privacy footer close the story.

- Masquerade: theatrical GT Sectra italic, burgundy text, a side-by-side story and moving portrait. An eye-shaped aperture opens with native scrolling.
- Maharaja: emerald typography and architectural framing. A centred octagonal moving study follows the chapter “Eight Sides”.
- Gun: a compact stacked title and a paired moving window above the story. The windows open together into the campaign frame.
- Savanah: warm typography, a wider text composition and a landscape film revealed from a narrow horizon.

The small films are excerpts of the existing campaign footage, not newly generated macro photography. Source grading is preserved. No product geometry, material specifications, prices or buying actions were introduced.

Gun's editorial text draws on the client-supplied launch presentation and writeup (double-barrel sporting-gun inspiration, engraved barrel-inspired temples, ruby-toned lenses and gemstone details). The other campaign texts describe the forms and settings visible in their existing imagery. These remain local editorial drafts rather than verified manufacturing histories. The older generated collection introductions and unverified credits are not displayed.

## Motion and photography

- One normalized scroll position drives each aperture in both directions. Desktop chapters use a short sticky stage; phone chapters stay in ordinary page flow.
- Rendering is scheduled at most once per animation frame, stops offscreen/when hidden and cleans up on route change. Media remain paused offscreen and have manual pause controls.
- Reduced motion removes clipping and pinning and shows the complete poster. No custom scrolling or new libraries were added.
- All four photographs remain in the main story. Clicking opens a native full-screen dialog with arrow controls, keyboard navigation, Escape, loading/error feedback and focus restoration.

## Verification

- All four collections checked at actual CSS widths 320, 375, 1280, 1480 and 1600px, plus a 960px tablet pass. No horizontal page overflow; all four photographs and no purchase controls remain.
- Forward/reverse reveal, opening film pause, excerpt playback, hidden/offscreen pausing, gallery arrow keys, Escape, focus return and body scroll restoration checked in the browser.
- Browser reduced-motion emulation was unavailable; the static poster/no-pin/no-clip paths were reviewed in source.
- Type checking, production build and all 18 existing tests passed.
- Screenshots are outside the repository in `../collection-redesign-review-2026-10-23/campaign-journey/`.

Approved matching product imagery, genuine GT America and business readiness dependencies remain documented in `presentation-readiness.md`.

## Founder film stills and uninterrupted playback

The Gun campaign now uses four unfiltered frames extracted directly from `client/public/videos/barrel.mp4`: 16.8s and 8.5s for the portrait pair, 13.3s for the closer still, and 4.5s for the wide closing image. Original frames remain intact for the gallery; portrait positioning centres the founder within the existing layout. The supplied campaign file is 832 × 464, so these are source-resolution captures, without invented detail or upscaling. Retail product photography is unchanged.

All collection opening films and motion chapters now have no visible or interactive play/pause controls, as requested. Automatic offscreen/background pausing and reduced-motion stills remain active.
