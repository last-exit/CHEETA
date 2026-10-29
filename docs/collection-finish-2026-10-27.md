# Collection presentation finish, 27 October 2026

Refines both longer campaign journeys locally. Content, film-first order, all four photographs, the Seen/Unseen and Maharajah sequences, product data and the original navigation are preserved.

## Visual finish

- A clearer hierarchy: collection titles remain dominant, secondary editorial headings use a quieter 44–64px range, and Eisa Saidi's name retains a larger display treatment.
- Shared spacing and column-gap tokens replace disconnected section dimensions. Paragraphs use a consistent reading width, 17px body text and the existing muted house colour; introductions remain 18px on desktop.
- Masquerade's portrait pair uses 4:5 framing so the second portrait's temple edges stay visible. The candlelit still and Gun's closing contact sheet have a deliberate, centred inset. No filters, synthetic detail, panels, textures or cutout shadows were added.
- Both campaigns end with the shared Icon livin’ footer, styled in warm white for these pages, alongside contact/privacy links. The next-collection link is quieter and retains a full-width keyboard target.
- Obsolete CSS for the retired campaign layout was removed. Gallery styling is now owned by the gallery component.

## Gallery and image resilience

The gallery decodes a photograph before committing it, retains the current image during loading, and uses overlapping 220ms opacity changes. Rapid input resolves to the latest requested image, including when decoding finishes out of order. Reduced motion removes the fades.

Failed photographs retain the last displayed image and offer retry. Attempt counters prevent an old decode from overriding a newer retry. Retry keeps keyboard focus on the close control; Escape returns focus to the original photograph and restores body scrolling. Images use scale-down framing rather than enlarging low-resolution sources beyond their native dimensions.

Inline campaign photographs also support retry, reserving their displayed aspect ratio after a failure. A failed studio crop releases its image space rather than leaving an empty oversized block.

## Verification

- Type checking, production build and all 48 tests passed. Four new gallery tests cover delayed decoding, rapid navigation, failure/retry and wraparound navigation.
- Native browser checks: rapid I → IV switching committed IV correctly; Escape restored the initial photograph button and body scrolling.
- Real missing-image test: withheld Masquerade photograph III temporarily, navigated to it, confirmed photograph II stayed visible, restored the source and retried successfully. Repeated at 320px and confirmed recovery left focus on Close photographs. The source and built asset are restored; no held test file remains.
- Both campaigns checked at 320, 375, 769, 1280 and 1480 CSS pixels. Headings fit; no horizontal overflow or image-unavailable placeholders were reported. The phone gallery's close/retry/navigation controls remain at least 44px and its error feedback fits within the viewport.
- Before/after captures, phone gallery proof and layout measurements are in `../collection-finish-review-2026-10-27/`.

## Remaining source limits

The Gun film/stills remain 832 × 464; approved sharper footage is still the main image-quality upgrade. The launch plate and provisional studio imagery were not retouched or represented as manufactured-product proof. The existing GT America/real checkout readiness requirements are unchanged.

No push or deployment.
