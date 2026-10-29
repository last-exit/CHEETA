# Campaign exhibition direction

27 October 2026. Local design proposal; not client-approved artwork or a production release.

## Presentation

The campaign pages now use large typographic covers, uninterrupted portrait pairs and short curatorial passages instead of repeating split heading-and-paragraph rows. The opening films, original navigation, warm white palette, GT Sectra, all four campaign stills on each page and substantive collection text remain.

The Masquerade sequence is: opening film, cover, paired portraits, prologue, Seen/Unseen reveal into an imagined exhibition, openwork essay, candlelight photograph, final portrait and house footer. The exhibition is campaign scenography, not a claim that a physical exhibition or monumental product exists. The reveal holds its object view until the new scene loads, and retains the original cutout if the scene fails.

The Gun sequence is: original founder film, cover, paired founder stills, prologue, four-part Maharajah study, origin essay, landscape stills, Eisa Saidi portrait/signature and house footer. The study moves from the whole octagonal frame to eight sides / two barrels, profile and temple detail. All crops come from the existing launch plate; no new product details were generated for Gun.

Both pages remain campaigns with no price or acquisition actions. Retail IDs, prices, cart storage, backend and public APIs were not changed. No push or deployment was performed.

## New artwork provenance

- Tool: built-in image generation (`image_gen.imagegen`), image-edit mode with one local reference. No CLI generation.
- Reference: `client/public/campaigns/masquerade/openwork-study.webp`, used for the existing black mask's silhouette and branching wings. The reference is itself provisional generated imagery.
- Original output: `/Users/fazalhaque/.codex/generated_images/01a12ad8-09b2-7a80-89dc-f720d07a47c0/exec-414d8c26-c649-48b2-bf06-9fbcf9b3c382.png`.
- Delivered website asset: `client/public/campaigns/masquerade/exhibition-study-v1.webp`.
- Actual dimensions: 1672 × 941 pixels. Delivery file: 1,251,908 bytes.
- The original PNG was preserved. A lossless WebP conversion was made for delivery; decoded RGB pixels were verified identical. No creative retouch or replacement of existing assets was performed.
- Status: provisional imagined exhibition. It is not approved catalogue photography or evidence of a manufactured product or real venue. The page explicitly calls it a campaign study imagined at architectural scale.

### Exact generation prompt

Use case: ads-marketing. Asset type: wide 16:9 luxury eyewear campaign set photograph for Cheeta Jewels, a provisional imagined exhibition. Input image 1 is the shape reference for the black openwork mask; retain its recognisable cat-eye outline and branching lace-like wings. Create a photographic, monumental-scale installation of this same mask in a completely empty warm-white gallery with a smooth plaster floor and tall unadorned walls. The black mask is approximately five metres wide, standing upright on the right half of the room at a slight three-quarter angle, with its dark lens shapes and intricate open wings clearly legible. One tiny adult visitor, seen only from behind in a plain tailored black coat, stands well to the left facing the work; this gives scale and is not a portrait or a model wearing a product. Leave generous clean white space in the upper left for website typography. Low camera, 35mm architectural editorial photograph, subtle natural perspective, one broad raking daylight source from the upper left, physically believable cast shadow, rich real black surfaces, quiet warm white. It should feel like a privately commissioned fashion exhibition, radically spare and tactile. Do not add ornament to the mask, invented engraving, pedestals, display cases, columns, plants, furniture, stone veining, gold trim, spotlights, visible wires, fog, grain, particles, glow, graphics, typography or logos. The image is campaign scenography, not a catalogue photograph. High detail, 2048x1152 landscape framing.

## Verification

- Type checking: `pnpm check`, passed.
- Existing and updated tests: `pnpm exec vitest run`, 49 tests in 9 files passed.
- Production build: `pnpm build`, passed.
- Whitespace check: `git diff --check`, passed.
- Both pages inspected at 320 × 710, 375 × 812, 769 × 1024, 1280 × 720 and 1480 × 1034. Covers and chapter headings fit; no horizontal overflow or failed photograph placeholders were found.
- Native scroll still drives both studies. Small screens use static study layouts, and the existing reduced-motion paths remain. The revised reveal is tested for a scene that has not finished loading.
- Campaign gallery loading, latest-request precedence, retry handling and purchase-free journeys remain covered by the existing tests.
- Screenshots and responsive measurements: `/Users/fazalhaque/Downloads/cheeta-jewels(2)/campaign-exhibition-review-2026-10-27/`.

The framing and typography in this proposal supersede the earlier compositions in `campaign-journeys-2026-10-27.md` and `collection-finish-2026-10-27.md`. Their source-media notes and prior gallery checks still apply. Genuine GT America files and approved matching product imagery remain separate readiness requirements; DM Sans remains the accurately named temporary body fallback.
