# Masquerade portrait ribbon

6 November 2026. Local only. No GitHub push, deployment, new media generation, dependencies, public routes or commerce changes. The accepted opening film, its scroll pacing and closing aperture are unchanged.

The campaign-photograph link and static spread have been replaced by one horizontal procession of four original photographs. Every tile is square, with individual focal framing. The ribbon moves at a restrained 22 CSS pixels per second while visible. Visitors can drag with a mouse, use native horizontal scrolling/swiping, or navigate with the arrow keys, Home, End and Enter. A drag never also opens a photograph.

The loop uses identical inert copies with enough width for the current viewport. Scroll positions rebase onto the same image in either direction. Only one set of four buttons is exposed to keyboard and assistive technology. Clicking a visible repeated copy maps to the original image index in the existing gallery. The loop preserves its phase while inspection opens/closes.

Automatic motion stops offscreen, on hidden documents, on hover, with keyboard focus and while the gallery is open. It stays off with reduced motion; manual navigation remains available. Images preload/decode as the ribbon approaches the viewport, and pointer, observer, timer and animation resources are cleaned up on unmount. Native vertical page scrolling remains available over the strip.

Existing curtain/mirror artwork appears faintly behind the section. Very low-opacity image reflections continue the palace-floor motif. No particles, flicker, decorative borders, synthetic sound, control panels or replacement imagery were added. The collection paragraph is now more specific to the black openwork and concealed gaze; a restrained closing line reads “In the company of shadows.”

Validation: type checking, production build, git diff --check and all 74 tests in 13 files pass. New tests cover fractional loop boundaries, large/reverse gestures, clone-to-original selection, gaps and invalid measurements. Existing campaign/reduced-motion tests verify the removed link, retained film and one accessible image set.

Browser checks at native 1600×900 verified mouse dragging across a loop boundary without opening a dialog, first-to-last keyboard wrapping, Enter opening photograph IV, a repeated copy opening photograph I, Escape/focus restoration, automatic movement and stationary keyboard focus. A timed observation measured approximately 22 pixels/second. Responsive documents at 320, 375 and 768px showed square images and no page overflow. A 2474px document confirmed repeated-set sizing and no page overflow. Native horizontal scrolling inside the 320px document changed the ribbon position while the page's vertical scroll stayed identical.

A temporary browser fixture forced the reduced-motion query in the application context: the ribbon stayed at its initial phase with the body focused and the document visible, then moved manually by keyboard. All temporary fixture files and tabs were removed before the final build.

Evidence: /Users/fazalhaque/Downloads/cheeta-jewels(2)/masquerade-ribbon-review-2026-11-06/ contains final-ribbon-desktop.png, responsive-ribbon.png and checks.json. The earlier local Gun changes remain intact.
