# Masquerade ending and collection correction

Historical pass. Current art direction: `masquerade-sculptural-2026-10-27.md`.

## Client direction

Only The Gun Collection and The Masquerade are active. Maharajah is the octagonal frame in Gun. Savanah and Maharaja were removed from the active data, menu and homepage campaign cycle. The next-collection links form a two-campaign loop. Legacy Maharaja/Maharajah/Savanah/Savannah collection URLs replace their history entry with `/collection/barrel`. Gun's existing motion chapter now names the confirmed Maharajah frame. Retail IDs, prices, stored bag data and product imagery were not changed.

## Masquerade

The opening is the only campaign-film player. Seen and Unseen preserves its frame movement and widening reveal, but now opens into the masked room instead of replaying the film. The separate After dark section was removed so the room is shown once. The sequence is shorter: 220svh on desktop and 180svh on mobile. The frame detail study follows directly:

1. A white frame study with openwork, lens and bridge camera positions. These are crops of the same existing image, not invented detail. Mouse drag pans within source bounds. Arrow keys / Home / End select presets immediately. Pointer preset changes use an interruptible 650ms camera transition. Mobile preserves native vertical scrolling and uses the same native controls.
The masked-room asset now belongs to the Unseen reveal. Reduced motion shows the frame and room as ordinary static images, without pinning. The detail study leads to The Gun Collection.

## Edited asset and prompt

Built-in imagegen edited the existing `/manus-storage/cheeta-masquerade-eerie-audience_8a20891a.png`. Prompt: remove only the mismatched gold sunglasses on the central black pedestal, leave it empty, preserve the room, masked guests, curtains, mirrors, candles, framing and grading, and add no text, objects, glow or particles. This remains a provisional campaign image.

Website asset: `client/public/campaigns/masquerade/after-dark.webp`.
Original output: `/Users/fazalhaque/.codex/generated_images/01a12ad8-09b2-7a80-89dc-f720d07a47c0/exec-19193d72-d6df-40e0-bd27-6d06e979f035.png`.

## Verification

Type checking and production build pass. All 35 tests pass, including updated collection truth, source media existence, camera bounds, invalid coordinates, reproducible reset, and exactly one campaign video and one masked-room image across the page chapters. Browser checks confirmed the two-entry menu, four legacy redirects, Gun's Maharajah heading, camera choices, mouse panning and keyboard selection. At 375×812, the controls remain at least 44px in CSS sizing, there is no horizontal overflow and no broken imagery. Desktop/mobile screenshots are saved in `/Users/fazalhaque/Downloads/cheeta-jewels(2)/masquerade-ending-review-2026-10-27/`.

Local only. No commit, push or deployment.
