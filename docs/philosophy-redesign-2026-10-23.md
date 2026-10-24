# Philosophy editorial redesign, 23 October 2026

Local exploration following approval of the collection journeys. The original navigation, shared footer, warm white palette and GT Sectra typography remain. DM Sans remains the explicit temporary body fallback. No collection, retail, cart or route changes are part of this pass.

## Story and art direction

The previous archive grid and unverified jewellery specifications are replaced by an editorial founder story: individuality, the boxing nickname behind Cheeta, and jewellery expressed through eyewear. Source facts are drawn from the supplied brand presentation/writeup and the client's identity film. New headings are editorial copy, not attributed verbatim quotations.

- Opening: typographic spread beside a monochrome founder portrait, followed by the school braids story.
- Film: a muted 30–54s passage from the supplied 90.32s identity film. Original framing, source colour and embedded captions are retained. No play/pause controls. Automatic offscreen/background pausing remains.
- Instinct: native scrolling opens a cropped window into the existing cheetah gaze image. Position drives the same crop forward and backwards. No scroll trapping, timers, particles, patterned backgrounds or added photographic filters.
- Expression: a short transition into the Gun campaign using an existing founder film still. No prices, speculative product specifications or acquisition actions.

## Media provenance

`public/philosophy/identity-passage.mp4` is a lossless passthrough extract of seconds 30–54 from the supplied `WhatsApp Video 2026-10-20 at 17.08.12.mp4` (816 × 576). Only the 24-second passage is served, rather than downloading the entire 90-second film. The poster is its 50s frame. The opening portrait is its 26s monochrome frame, cropped to remove the embedded subtitle and preserve the face, without retouching or invented detail. The existing gaze photo and Gun founder still retain their source grading.

A full-resolution film master is still desirable. This redesign does not certify the source imagery or the wider site's product fidelity.

## Access and implementation

The eye reveal is unpinned and shown in full on small screens, short landscape viewports and reduced-motion preferences. The shared campaign video supplies a static poster for reduced motion. All story text remains semantic HTML and accessible without motion. Original navigation and the collection/contact/privacy links remain native links, with visible keyboard focus.

The page has its own stylesheet. Obsolete Philosophy-only layout rules were removed from shared styles; Founder rules and unrelated page styles remain.

## Verification

Type checking, the production build and all 18 existing tests passed. Browser checks covered 320px and 375px phones, the 768px breakpoint vicinity, 1280 × 720 and 1480 × 1034 desktop layouts, plus the normal 1600 × 900 preview. No horizontal overflow was found. All three editorial photographs loaded. The 24-second passage decodes at its original 816 × 576 resolution; offscreen pausing and absent playback controls were checked. Forward/reverse reveal crops were verified against native scroll position, and Enter on the collection link reached the Gun campaign. The viewport override was reset afterward.

Reduced-motion and short-landscape alternatives were reviewed in source; OS motion preferences were not changed for this pass. Screenshots are outside the repository in `../philosophy-redesign-review-2026-10-23/`. No push or deployment was made.

## Copy reduction and catchphrase

The opening now leads with the client-supplied catchphrase, “Diamonds are made in the rough.” Supporting Philosophy copy is reduced to a single short statement per section; secondary film captions and the repeated founder credit are removed. The same copy pass shortens all four campaign introductions and motion descriptions, removes closing-image subtext, and reduces promotional copy on Home, Hayrat, House, Founder, Film and product packaging. Product specifications, prices, shopping controls and legal/contact content remain intact. Original brand artwork and the Icon livin’ footer remain.

The headline was checked at 320px without overflow, and the desktop composition was captured in `../copy-polish-review-2026-10-23/`. Type checking, the production build and all 18 existing tests pass. Changes remain local.

## Remove editorial microcopy

The client subsequently asked to remove small descriptive subtext altogether. Philosophy no longer shows the eyebrow, opening tagline, chapter labels or supporting descriptions. The founder credit is now a prominent GT Sectra “Eisa Saidi, ceo” (36px desktop, 26px mobile), following the client's confirmation of his role. The catchphrase remains unchanged.

Collection introductions, motion descriptions, “in motion” labels, next-campaign micro-labels and photograph hover captions were removed. The heading-only Gun and Savanah chapters were rebalanced. The Home edition subtitle, Hayrat note, and small House/Founder/Film labels were also removed; Hayrat's logo is centred above the mask pair. Functional links, prices, controls, product detail specifications and accessible image descriptions remain.
