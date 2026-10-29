# Gun campaign, 27 October 2026

Historical first pass. Superseded by `campaign-journeys-2026-10-27.md` after the client requested a longer page with more collection text.

Local redesign of `/collection/barrel` only. Masquerade, the homepage, Retail, navigation structure, catalogue and cart storage are unchanged by this pass.

## Sequence

1. Existing founder film, once, with the existing offscreen/hidden-page playback handling and no pause interface.
2. The Gun Collection title and two founder stills. Preserve their 832 × 464 source framing instead of cropping them into tall portraits.
3. A dark Maharajah study: full object, then a paired front/detail composition with “Eight sides.” and “Two barrels.” Native scroll determines the transition in both directions. No looping second film, fake 3D rotation or pointer-following movement.
4. A source-sized closing founder still and Eisa Saidi's name, followed by the existing next-collection link and footer.

## Source and limits

`client/public/campaigns/gun/maharajah-launch-study.jpg` is the unchanged 1024 × 819 image extracted from page 5 of the supplied `CHEETAJEWELS presentation.pdf` in `Cheetah References`. The presentation source is a design study, not proof of manufactured finishes, materials, stock or engraving. Its provenance is visible as “a launch study”. No new manufacturing claims, prices or purchase actions were added. Front and paired-barrel views are crops defined in `client/src/lib/gunStudy.ts`; no detail was generated or retouched.

Older assets showing round/aviator frames, the corrupted `barrel-quad.png` website-header image, and `barrel-still-1.png` dot texture were excluded. The old founder film is only 832 × 464 and retains its original muted grading. Better approved footage remains the meaningful image-quality upgrade.

## Motion and resilience

Desktop uses one bounded scroll progress, transforms/opacity and a sticky stage. RAF work is gated by intersection and page visibility, with resize handling and full cleanup. The two detail captions share a baseline. Below 768px and with reduced motion, all three source views appear in normal flow without pinning. A source-load failure removes the pinned sequence and shows an unavailable message; the founder content and onward navigation remain accessible.

## Verification

- Type check and production build passed.
- All 40 tests passed, including Gun sequencing, source bounds, reversible scroll state, no empty transition, reduced-motion content and no campaign purchase actions. Existing Masquerade tests pass.
- Browser layout checks at 320, 375, approximately 768, 1280 × 720 and 1480 × 1034 showed no horizontal overflow. Mobile used the static study; larger layouts retained the pinned sequence. The two detail captions align on the same baseline.
- Enter opened the founder gallery, Right changed I to II, Escape closed it, restored the triggering button's focus and restored body scrolling. Page Down advanced the product study. Gun → Masquerade → back navigation worked with the previous motion component removed from the document.
- Temporarily withheld the source asset and reloaded: the missing-image state displayed its message and reduced the desktop section to about 329px with relative positioning, rather than leaving an empty pinned screen. Restored the asset and confirmed all three study views loaded again.
- Reduced motion was checked through rendered-content regression tests and the static CSS path; the computer's system motion setting was not changed.
- Browser review and screenshots are recorded outside the repository in `../gun-collection-review-2026-10-27/`.
- No push or deployment.
