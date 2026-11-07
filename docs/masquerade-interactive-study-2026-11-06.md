# Masquerade interactive study and continuity

Superseded in part by masquerade-showroom-2026-11-06.md: After dark now uses the complete original film, with a photographic detail and showroom invitation after it. The edited excerpt described below is archived locally.

The photograph conveyor has been removed. The campaign now runs from the scroll-controlled opening film into the openwork sculpture, then a short moving portrait from the original Masquerade campaign.

## Final presentation

- The opening stays in its own palace scene. The shutter clip, second room image and associated animation properties have been removed. Native scrolling carries the final shot into the page, with a soft lower edge.
- The interactive sculpture has no visible instructions, sliders, zoom buttons or reset button. Direct dragging and native keyboard controls remain. The only exceptional action is a retry if WebGL fails.
- The light completes one circuit in 96 seconds. Rendering stops offscreen and when the document is hidden. Reduced motion freezes the lighting and makes user-controlled changes immediate.
- A faint, stationary architectural backdrop at 7% opacity adds depth to the wine background. It is campaign imagery, not a repeating pattern.
- A short, centred GT Sectra passage bridges the sculpture and moving portrait, adding a measured pause without a large empty section.
- The cropped moving portrait after the sculpture has one heading, After dark. There are no playback controls, cards, borders or captions. The film edges dissolve into the same page background.

## Sculpture provenance

There is no supplied production 3D model. This is an original procedural campaign sculpture inspired by the black cat-eye frame and openwork reference, not a manufacturing or fit model. It has curved lenses, a bridge, temples and genuinely open three-dimensional metal cells. It contains no invented engraving and has no price, purchase action or cart handler. Two merged meshes keep draw calls bounded. Existing Three.js is reused; no dependency was added.

The sculpture loads as the section approaches. It keeps a static reference until the first real frame paints. Geometry, materials, reflection texture, WebGL context, observers, events and animation frame are released on unmount. Pointer capture is cleaned up by native release; vertical touch scrolling remains available through pan-y and pinch-zoom.

## Film excerpt

Source: client/public/videos/masquerade.mp4, the existing 1920 by 1080 campaign, 24 fps, ten seconds. The new asset uses only seconds 3 through 7. That extract is slowed to 80% speed and followed by its reverse, producing a ten-second seamless silent loop without a cut back to the beginning. It preserves source grading and resolution. The accompanying poster is the source frame at three seconds. No new generation or credits were used.

Files: campaigns/masquerade/cinema/after-dark-loop-v1.mp4 and after-dark-poster-v1.webp. CampaignVideo handles visibility, document hiding and reduced-motion poster substitution.

## Verification

- Type checking passed; 75 existing and new tests passed across 13 files.
- Browser inspection at natural 1600 by 900 desktop size, plus fixed-size component fixtures at 1280 by 720, 1480 by 1034, 768, 375 and 320 CSS pixels. The browser viewport override was ineffective, so temporary iframes supplied accurate responsive dimensions.
- Real pointer dragging changed the sculpture orientation without scrolling the page. Focused arrow keys, keyboard zoom and Escape reset were verified. A vertical native scroll over the small-screen scene moved the page without changing its pose. Touch hardware was not emulated; the touch-action and vertical gesture guard were inspected.
- Simulated unavailable WebGL displayed a static reference and retried successfully without changing stage height. Deliberate context loss released the canvas and recovered through retry.
- A forced reduced-motion browser fixture showed zero videos, stationary lighting and no continuing render loop. This was an application fixture, not a change to the system preference.
- The new portrait played silently in view. The opening film remained a paused scroll source. The shutter clip-path is none and the second room image is absent.
- Collection navigation removed the sculpture canvas. No uncaught browser error was observed.
- Temporary QA HTML files were removed before the production build. Changes remain local; no push or deployment.

The editorial bridge was checked in the live desktop composition. Its production build and 11 campaign checks passed after the copy and spacing change. Final review images are saved outside the repository in masquerade-3d-review-2026-11-06.
