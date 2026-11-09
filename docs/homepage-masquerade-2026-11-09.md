# Homepage Masquerade: an invitation after dark

Only the homepage Masquerade presentation is changed. The opening cinema, Gun still-life selector, Retail, Philosophy closing and collection campaign pages remain as before this pass. Local only; no push or deployment.

The former split text/arched-still layout is replaced with a wide candlelit moving portrait, centred GT Sectra title and a separate invitation footer. “Seen. Unseen.” connects the entrance to the collection’s conceal/reveal idea. The short “an invitation after dark” line and campaign action stay outside the picture. No cutout ornaments, background patterns, rules or extra interface controls were added.

The existing /videos/masquerade.mp4 plays fully and loops. The matching existing /home/masquerade-campaign.webp is retained beneath it until playback begins, and remains on error or refused autoplay. Video is mounted only as the section approaches the viewport, pauses offscreen and while the document is hidden, stays muted and has no visible playback controls. Reduced motion uses only the still. The image area is reserved before media loads, with a wide desktop frame and portrait crop on phones. The new #masquerade homepage anchor opens directly on this chapter.

No new media was generated, no source grading changed and no product/cart data changed. Existing campaign media retains its previous provisional status.

Validation: TypeScript and production build pass; all 88 tests pass. Browser review at desktop 1280px and phone 375px confirmed bounded content, real muted/looped playback, the hero paused while this film plays, and the campaign destination. Mobile heading clearance from the fixed monogram was increased. Reduced-motion/server fallback remains covered by the existing homepage checks. Review images and original source backups are outside the repository in ../homepage-masquerade-review-2026-11-09/. Temporary review HTML is removed before building.
