# Masquerade campaign pilot

The user selected Masquerade as the first collection to develop: openwork, conceal/reveal and candlelit motion. Other collection designs remain unchanged. The existing opening film and portrait pair stay first.

## New sequence

A white sticky stage presents the isolated frame as a campaign object. Native scroll reveals the candlelit film through a widening central aperture. The frame and the word Seen leave as the film opens; Unseen appears over the closing film. Reverse scrolling reverses the same transition. A small film study and a tightly framed openwork photograph follow, then the existing final wide still and next collection link. There are no purchase controls or pause UI on the campaign page.

The scene has one clamped progress source, one scheduled animation frame, intersection/visibility gating, resize observation and full unmount cleanup. Navigation tone follows the actual revealed film region. Reduced motion replaces the sticky sequence with an ordinary document-flow frame image and campaign poster. Image failure releases the long sequence and shows the film fallback.

## Asset

`client/public/campaigns/masquerade/openwork-study.webp` is a provisional imagegen extraction/reconstruction from `client/public/stills/masquerade-still-3.jpg`. Prompt: isolate only the existing black cat-eye frame and openwork wings; preserve visible silhouette and filigree, remove model and skin including openwork gaps, retain dark lenses and candle reflections, invent no extra temples, engraving, stones, text or scenery; transparent background with no glow or shadow. Built-in imagegen used. Original generated PNG: `/Users/fazalhaque/.codex/generated_images/01a12ad8-09b2-7a80-89dc-f720d07a47c0/exec-c3108c0f-12c0-4baf-b69d-76d08fcee0a2.png`.

This is a campaign concept image, pending product approval. Existing film supplies all motion; no new video was generated. Film duration verified as 10 seconds. Chapter repeats seconds 1–7; detail study repeats seconds 7–end.

## Verification

Tests cover entry/exit, invalid measurements, overscroll, overlap to avoid an empty stage, deterministic reversal and reduced-motion static markup with a poster and no video element. Browser checks cover native forward/reverse scrolling, film/thumbnail loading, offscreen video pausing, crop, image inspection, navigation and footer reachability. 375×812 browser measurements show no horizontal overflow, no broken images and a reachable contact/privacy footer. Type checking and production build pass; all 31 tests pass.

Screenshots: `/Users/fazalhaque/Downloads/cheeta-jewels(2)/masquerade-review-2026-10-27/`.

Local only. No commit, GitHub push or deployment.
