# Homepage redesign, 8 November 2026

> The body direction below is superseded by [the final composed-scene revision](homepage-art-direction-2026-11-08.md).

Implemented locally after the request to redesign everything below the opening video and Icon livin’. No commit, push or deployment accompanies this pass.

## Critique and direction

The previous body mixed an oversized centred product study, an unrelated founder spread and inconsistent campaign headings. Retail was difficult to discover. The references were reviewed at Gentle Monster’s international homepage and Cartier’s UAE homepage. The useful principles were clear campaign destinations, purposeful image proportions and a distinction between campaign storytelling and shopping.

The final body is an editorial sequence with distinct image scales, rather than another character selector or product grid:

1. The Gun Collection: title at upper left, three selectable antique gun references to its right, Maharajah beneath the gun. The Roman controls sit beside the gun, not beside the lens. Phones stack the gun, controls and eyewear. Full silhouettes remain visible.
2. The Masquerade: a full-width candlelit film still, with restrained overlaid GT Sectra and one campaign action. This replaces the pale exhibition composition and the abandoned portrait/product split.
3. Retail: a large emerald-and-gold editorial image with separate eyewear and jewellery entrances. No homepage prices or purchase controls.
4. Philosophy: the client’s “Diamonds are made in the rough” line, followed by the original Icon livin’ footer, privacy and contact. The founder spread is removed; a founder link awaits the dedicated page redesign.

The opening retains the full-screen film, script and original paw/navigation. The earlier requested click-to-change behaviour cycles Horseback, Masquerade, the confirmed King film and the collector’s case. Each film loops until another is chosen. There are no bottom controls, dots, automatic campaign rotation or extra captions. A small arrow appears on hover and keyboard focus is visible.

## Interaction and implementation

The incoming film stays hidden until its first decoded frame is ready. Failed loading retains the current film; keyboard R retries. Rapid input resolves to the latest request. Only the current and incoming/outgoing layers can coexist, and offscreen/hidden playback pauses. Enter/Space advance and arrow keys navigate. Reduced motion renders matching posters without video or transitions. Native phone scrolling remains intact.

Existing GT Sectra, DM Sans fallback, ivory, lens colours, navigation and accepted collection pages remain. No dependencies, product IDs, catalog prices, routes or cart storage were changed. The homepage has no exclusive-collection purchasing action.

## Media provenance and readiness

The new Masquerade feature and four film posters are direct ffmpeg frame extractions from existing project films. The Retail WebP is a format conversion of the existing emerald ring PNG. No new product detail, grading or generated photography was introduced. Existing gun extractions and Maharajah imagery retain their previous provisional status.

The current Retail catalog still contains Gun items and legacy high-jewellery prices. It does not yet represent the client’s intended accessible range. This pass adds navigation into that catalog without inventing cheaper SKUs or changing prices. Approved Retail products and separation of exclusive pieces remain a catalog task.

## Verification

- Reviewed fixed CSS widths 320, 375, 768, 1280 and 1480px. Corrected tablet/phone heading clearance from the fixed paw. No horizontal overflow at the checked widths.
- Verified all four films, pointer switching, immediate keyboard switching, rapid input, image/reference selection, looping/muted attributes and offscreen pausing.
- A temporary isolated development fixture verified real failed-video loading, previous-film retention, retry, and reduced-motion poster selection with zero mounted videos. Latest-request precedence and loading-state identity are covered by six new reducer tests.
- TypeScript passed. All 88 tests across 15 files passed. Production build passed with the existing shared Three.js chunk-size warning. Temporary review fixtures were removed from the source and build output.
- Screenshots and original component backups are outside the repository in ../homepage-implementation-review-2026-11-08/.

Local preview: http://127.0.0.1:3000/
