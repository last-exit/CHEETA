# Mobile refinement, 9 November 2026

Local source implementation following feedback on phone refinement and paw sizing. No push or deployment. This does not constitute visual approval of the preceding Gun redesign, which the user disliked.

## Header

The supplied paw is 167 × 206px, with visible alpha bounds 138 × 182px. The CJ asset is 600 × 600px, with visible alpha bounds 195 × 329px. Comparing their CSS boxes alone was misleading: their actual ink height and position differed.

Below 768px, the paw has a 28px artwork box inside a 44px control, producing approximately 25px of visible height. The CJ mask uses a 44px box, producing approximately 24px of visible height. Both controls share the same safe-area-aware vertical centre. The paw’s visible left edge aligns approximately with the 24px content gutter; its larger invisible hit area remains inside the viewport. Original artwork is unchanged.

The mobile menu begins below this shared header row and respects the top/bottom safe areas. Its native scrolling and focus handling remain. Header contrast on Home, Philosophy and collection pages now samples the actual rendered mark positions instead of fixed desktop/phone coordinates.

The hidden Home monogram no longer intercepts taps on the film or enter the keyboard focus order. Decorative duplicate paw images no longer repeat the brand announcement inside the labelled menu button.

## Layout

- Reduced the mobile Home Gun lead-in from 96px to 56px and Masquerade lead-in from 96px to 64px.
- Moderated mobile section-heading clamps and reduced the footer signature.
- Replaced the fixed 440px Home Retail image height with a 4:5 aspect ratio, preserving the existing image crop/position treatment.
- Added a consistent safe-area-aware content-start token to Retail, Product, Bag, information pages, Founder, House and Hayrat. Desktop dimensions and the opening hero composition are unchanged.

## Verification and limitations

Type checking, production build, whitespace checking and all 92 tests across 16 files pass. The four additional tests cover hidden/visible monogram focus and pointer semantics, actual control-coordinate sampling and missing-layout fallback. Existing campaign/case/reduced-motion assertions remain green. The development homepage returns HTTP200.

Screen verification remains pending. The Browser runtime still reports Local browser use is disabled in Work settings. No native desktop-controller tool is exposed in this chat, and the integration search produced no suitable desktop-control connection. No shell screenshot or alternate automation was used to bypass that restriction. Phone screenshots, on-device Safari testing and runtime visual comparisons are not claimed.

Original/generated media classifications and the commerce-readiness issues in the authenticity audit are unchanged.
