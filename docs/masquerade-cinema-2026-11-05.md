# Masquerade cinema

Implemented locally on 5–6 November 2026 at /collection/masquerade. No GitHub push or deployment.

## Experience

One continuous campaign film replaces the separate main-page image sections: the pale woman in black openwork eyewear begins in close portrait, then the camera moves back through the same Mughal-inspired gallery to reveal her full figure. Seen and Unseen appear at separate moments. The page ends with a short collection statement and an optional campaign photograph gallery. The original gallery assets and earlier campaign component remain available for rollback.

The film gives the appearance of a physical 3D camera move. It is rendered media, not an editable 3D character or product model. The woman, palace and generated eyewear depiction remain provisional campaign imagery pending approval.

## Motion and resilience

Native scroll is the sole playback clock. A sticky stage covers 340 viewport heights, with opening and closing holds. Frame-rounded seeking uses the latest requested position and coalesces requests while the decoder is busy. Copy and focal framing follow the frame actually painted, so delayed seeking cannot advance the captions ahead of the image. No autoplay, sound, pause controls, automatic cycling or scroll interception.

The first poster stays visible until a real decoded frame is painted. Loading begins near the viewport. Offscreen and hidden-page work pauses. Loading and seeking timeouts lead to static opening/closing images with retry; reduced motion uses the same images in ordinary flow without video or pinning. Phone crops retain both openwork wings; the source aspect ratio is preserved.

Existing navigation, photograph dialog and next-collection/footer links remain. The gallery now has a unique React key, fixing the previous duplicate-key state collision. Escape closes it and restores focus. No commerce, product IDs, cart storage, public APIs or dependencies changed. Prior local Gun work is preserved.

## Media and cost

Exactly one user-approved Veo 3.1 Quality film was generated for 100 Flow credits. Original: 1280×720, 24 fps, 190 frames, approximately 7.93 seconds. The delivered file stays at native resolution and has its audio removed. H.264 CRF 18, keyframes every six frames and faststart support reversible seeking; the two fallback posters are actual first/last film frames. The prepared image-generation keyframes are retained separately.

- Film: client/public/campaigns/masquerade/cinema/journey-v1.mp4
- Actual posters: client/public/campaigns/masquerade/cinema/opening-film-v1.webp and closing-film-v1.webp
- Generated treatment images: client/public/campaigns/masquerade/cinema/opening-v1.webp and closing-v1.webp
- Full generation prompts, source paths, approval and encoding provenance: masquerade-cinema-artwork-2026-11-05.json

## Verification

Type checking, production build, git diff --check and all 70 existing/new tests across 12 files pass. The actual film was checked at 1280×720, 1480×1034, 320px and 375px widths, plus the natural 399px preview. No horizontal overflow. Forward/reverse returns to the same scroll position and decoded time; rapid requests resolve to the latest frame. The phone opening retains both openwork wings. Gallery next/previous, Escape and focus restoration pass. Missing-source and reduced-motion fixtures were tested, then removed.

Review evidence is outside the repository at /Users/fazalhaque/Downloads/cheeta-jewels(2)/masquerade-film-review-2026-11-05/:

- film-contact-sheet.jpg: source-film inspection at four samples per second
- actual-film-checks.json: browser measurements and decoded-frame checks
- final-masquerade-opening.png and final-masquerade-reveal.png: natural preview captures
- desktop-1280-opening.png, desktop-1480-opening.png, mobile-320-opening.png and mobile-375-opening.png: size-check captures

IAB viewport overrides produced screenshot scaling artifacts; DOM viewport/crop/overflow measurements and natural-size captures were used for layout decisions. No source footage was upscaled. Local preview: http://localhost:3000/collection/masquerade.
