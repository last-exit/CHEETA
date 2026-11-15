# Gun refinement and campaign copy

Local implementation following the source-document review and client feedback that the Gun page should be simpler and cleaner. The user also requested GSAP scroll triggers. No GitHub push or deployment.

## Composition

The opening campaign film and the interactive one-pair case are retained. The botanical crest, separate Eight sides / Two barrels chapter and circular detail loupe are removed. One Maharajah spread now places the full front view beside two rectangular reference crops, with short descriptive captions. Tablet and phone layouts place the complete frame above the two details. No new imagery, frame geometry, photography, product data, prices or purchasing behaviour were introduced.

The existing front image and launch collage remain provisional. Cropping those references does not establish physical-product accuracy. Approved sample photography is still required; this pass does not resolve the generated Retail inventory or production checkout blockers recorded in the authenticity audit.

## Motion

Added GSAP 3.15.1 and lazy-loaded ScrollTrigger in `useEditorialMotion`. It coordinates the collection introduction, Maharajah heading/detail entrances and showroom invitation. The complete frame has a small reversible vertical movement on desktop. There is no new pinned scene, synthetic scrolling, animated background, pointer-following movement or automatic product cycling. The existing case controller and Lenis behaviour are unchanged.

Motion is scoped to the mounted Gun presentation with `gsap.context` and `gsap.matchMedia`. Reduced motion removes these animations, and phone layouts omit the image drift. Route changes revert the GSAP contexts and listeners. Content is visible before the optional animation modules load; module failure restores ordinary page flow. Image/font loading refreshes trigger measurements.

Primary implementation references: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ and https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/.

## Copy

The Gun introduction and captions now name the reference and visible details directly. Shared collection endings use Visit the showroom and Arrange a visit. Masquerade keeps Seen / Unseen and the accepted interaction, with shorter factual descriptions. Philosophy retains the chosen catchphrase, Eisa’s portrait/film and supplied school story. Its boxing-name and vintage-design passages are shorter; the unsourced father-collection statement is removed from Philosophy and Founder. Legacy Film no longer claims a documented inaugural shoot or unverified crew/music credits, and the atelier image no longer has false founder/workbench alternative text. No new biographical or manufacturing claims were added.

## Verification

- Type checking and production build pass; all 88 existing tests across 15 files pass after adapting the old chapter/copy assertions to the new presentation.
- Crop bounds remain checked against the existing source dimensions. Purchase-free campaign ordering, case controls, source-media availability and reduced-motion static markup remain covered.
- Existing production warning: the shared Three.js chunk exceeds the build size guidance. GSAP and ScrollTrigger are separate lazy chunks.
- Desktop/mobile visual verification and live GSAP interaction checks are **pending**. The browser runtime reports Local browser use is disabled in Work settings, including after the user said they would enable it. No screenshots of the changed page were captured, and browser behaviour is not claimed as tested.
- Local server: http://127.0.0.1:3000/collection/barrel. The app open request was queued; that is not evidence of a completed visual review.

Preserved the homepage hero, navigation, accepted case mechanics, collection routing, media source files, retail catalog IDs/prices and cart storage.
