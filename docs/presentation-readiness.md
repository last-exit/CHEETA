# Presentation readiness, 20 October 2026

Pre-cleanup GitHub checkpoint: `01ae77a8660f7d9b0c39a4896c8047b3dbeba499` on `origin/main`.
The cleanup after this checkpoint is local and has not been pushed.

## Asset dependencies

- GT Sectra is present. Genuine GT America files are not present. DM Sans is now explicitly the temporary body fallback, rather than being relabelled as GT America. Supply licensed GT America webfonts before typeface sign-off.
- The client confirmed an octagonal Edition I from the launch documents. Existing homepage portraits and primary retail images include round frames. These are retained as existing draft assets; they do not establish product accuracy. Matching approved campaign portraits and product photographs are required before publishing.
- Primary retail images for `barrel-01`, `barrel-02` and `barrel-03` now supply the corresponding collection product view and bag image too. IDs and prices are unchanged. Cart identity no longer changes depending on the page used to add the same piece.
- The previous alternate eyewear/ring/necklace images showed different forms or settings. They have been removed from product selection rather than presented as alternative views of the same item.
- The round procedural 3D model is not an accurate model of any SKU. The client requested campaign-only collection pages on 23 October; the study and all edition purchase controls have now been removed from those pages. The underlying component remains available for future concept work.
- Hayrat uses the supplied logo and two existing museum photographs. Their limited source resolution remains; no detail has been invented.
- The new brand-identity film is 816 × 576 and 90.32 seconds long. A full-resolution master is preferable for the later Philosophy story pass. The existing homepage opening remains.

## Business readiness outside this presentation pass

- The bag's existing checkout is a local simulation, not payment processing or an actual order submission. Real checkout integration remains required. Do not represent its confirmation as a fulfilled order.
- Privacy and terms copy require client/legal review against actual operations before publishing. This cleanup does not certify those policies. Unverified concierge addresses and response-time promises have been removed; shipping/returns now direct enquiries to the supplied contact details instead of promising unconfirmed fulfilment terms.
- Public contact supplied by the user: mohammadfazalhaque@gmail.com; +971528038612.

No new products, product specifications, synthetic photographs, public APIs or cart-storage migrations are introduced by this pass.

## Verification

- TypeScript checking, production build and all 18 existing tests passed.
- Primary routes were checked at 320, 375, 768, 1280 and 1480px. A 768px edition-pair grid overflow was corrected and rechecked on all four collection routes.
- The 58 referenced media paths checked returned HTTP 200.
- Browser checks covered rapid portrait switching, focused arrow-key selection, displayed-edition bag identity, quantity changes/removal, Retail filter/layout restoration, tap inspection and Escape, and mobile menu focus containment.
- The concept study appears after editions and exposes only study controls, with no purchase action. Initial WebGL failure now has a text-only status; forced WebGL failure and OS reduced-motion preferences were not emulated in this browser. Those paths were reviewed in code; physical-device/Safari testing remains.
- Comparison screenshots are outside the repository in the sibling `brand-cleanup-review-2026-10-20` directory.
