# Masquerade: white sculptural campaign

Historical short composition. Superseded by `campaign-journeys-2026-10-27.md` after the client requested longer campaigns with substantive text.

The client selected a white sculptural direction: black openwork, precise light and restrained type.

## Final visible sequence

Opening campaign film, a smaller upright GT Sectra Book title, a contained pair of portraits, the Seen and Unseen frame-to-shadow reveal, then the next collection. The opening is the only video player. The masked ballroom and oversized detail inspector are off the page. The original photographs keep their grading; no background print, decorative dividers, extra slogans or interface panels were added.

Portraits are now at most 1040px across as a pair rather than full-bleed close-ups. Their dimensions reserve the crop before image decoding. The new reveal preserves the existing frame movement and reversible scroll timing. Unseen reveals a white studio shadow study and uses dark typography. The studio image fits inside the stage so the complete product survives different desktop aspect ratios. Reduced motion renders ordinary static images.

## New image and provenance

Built-in imagegen created a provisional studio study using `client/public/campaigns/masquerade/openwork-study.webp` as the eyewear reference.

Final asset: `client/public/campaigns/masquerade/shadow-study.webp` (1600×901).
Original: `/Users/fazalhaque/.codex/generated_images/01a12ad8-09b2-7a80-89dc-f720d07a47c0/exec-c9deb1ba-c500-45d0-91ef-1130192228f6.png` (1672×941).

Prompt: photograph the existing black cat-eye frame with its openwork wings on a matte warm-white studio surface. Use one precise directional light so the wing casts a physically plausible lace-like shadow. Preserve the reference silhouette, black material and dark lenses; invent no stones, engraving or logos. Complete frame inside a wide composition, product on the left, shadow across the surface, quiet lower-right space for separately rendered typography. No people, room, curtains, pedestal, marble, background print, graphic decoration, particles, glow or text.

This is a campaign concept image. Product geometry and materials still need approval against actual Masquerade photography before publishing. No real SKU or price was inferred from it.

## Verification

Type checking, production build and all 35 tests pass. The sequencing regression test renders the actual CollectionDetail page in an SSR router: one campaign video, one studio study, no ballroom and no detail inspector. Existing reduced-motion, scroll-boundary, collection and retail identity tests pass. Browser checks and comparison screenshots cover title/portrait scale, framing and the white reveal.

All work remains local. No commit, push or deployment.
