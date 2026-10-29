# Character fitting, 26 October 2026

Local prototype following the client's clarification that the homepage should behave like a game character selector: select a model, then equip eyewear on that same stationary model.

## Interaction

- Three model choices are independent of the Ruby, Smoke and Amber lens choices.
- The initial model has no eyewear. Selecting a lens equips it; unequip returns to the same bare face.
- A chosen lens carries across character changes. Magnification stays inside the fixed image area; Escape returns to the full character view.
- The body is always rendered from the same bare-character cell. A separate registered eye-region layer supplies the eyewear. Native SVG masks confine lens recolouring to the optical area, preserving the frame and facial detail.
- Keyboard arrows, Home and End operate within the focused character or lens group. Native activation, pressed states, visible focus and touch targets remain. Reduced motion removes the equipment movement and camera transition.
- Images preload and decode near the section. The prior character stays visible while the latest requested image loads; stale completions cannot replace it. Loading errors offer retry. Acquisition is disabled until a lens and ready character are available.
- Details, price and bag identity come from the same canonical retail item, independently of the model. No catalog, price, storage or checkout changes.

The hero, original navigation, packaging composition, footer and collection pages are unchanged. The homepage uses a new local character component, hook, presentation metadata and stylesheet. No new library is introduced.

## Preview assets and limits

The existing supplied website portraits had eyewear baked into the photographs. New fitting sprites were generated from those portraits, with the founder film's octagonal silhouette as a shape reference. The ivory figure uses a separately generated alpha mask so the original clean photograph supplies the visible pixels. No generated clothing is offered as a product.

These are **generated fitting previews**, not approved technical product renders or an accurate virtual sizing system. The interactive prototype uses one octagonal frame with lens tinting; exact frame finishes, engraving, gemstone details and lens transmission need client-approved matching product imagery before publication. Existing retail photography remains unchanged, including the previously recorded readiness concerns. This pass does not certify physical product fidelity.

Previous public checkpoint: `606426f661ea0239e0068d659b7e274a2290083e`. This new exploration remains local; no push or deployment is requested.

## Verification, completed 27 October 2026

- Type checking, production build and all 26 tests pass (18 existing, eight fitting-state tests).
- All nine model/lens combinations were inspected in the browser, with the appropriate details slug for each lens and a stable bare-character image source across lens changes.
- Native character/lens arrow navigation and Escape from inspection were verified.
- At actual CSS widths 375px and 320px, there was no horizontal overflow; the lens controls and model remained in the same viewport. The viewport override was reset.
- An acquisition test equipped Smoke on character II, added canonical `barrel-02` at AED 15,000 and opened the bag from the toast. The test item was removed, restoring the pre-existing Edition 01 item and quantity.
- Race, load failure/retry, lens persistence and unequip behavior have state-machine test coverage. Network failure and OS reduced-motion settings were not emulated through the browser; the preference behavior was reviewed in source.
- Comparison screenshots are outside the repository in `../character-fitting-review-2026-10-26/`.

Only the original homepage presentation was replaced; the hero, packaging, footer and other pages remain intact. No commit, push or deployment was made for this exploration.
