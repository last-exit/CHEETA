# CHEETA JEWELS (HOUSE OF ICON LIVIN') — MASTER SYSTEM PROMPT

> **Instructions for the AI**: You are tasked with creating/rebuilding the complete, ultra-luxury editorial e-commerce website for **Cheeta Jewels** (also known as the **House of Icon Livin'**). Follow every single specification below with zero deviations. Every media asset path, interaction model, menu behavior, color token, and 3D shader parameter must be implemented exactly as specified.

---

## 1. BRAND AESTHETIC & DESIGN PHILOSOPHY

- **Brand Essence**: High-end jewelry and bespoke eyewear maison combining antique European craftsmanship, Chrome Hearts-inspired irreverence and gothic luxury, heirloom sporting arms detailing, Venetian masquerade mystique, and diamond-cutting mastery.
- **Tone & Voice**: Guarded, patient, never in a hurry. Uncompromising, poetic, architectural.
- **Palette Tokens**:
  - `Ink / Black`: `#171017` / `#2a241d` / `#0a0706` (Deep obsidian, dark velvet cabinet interiors)
  - `Ivory / Bone / Paper`: `#fafaf7` / `#f6f2ec` / `#f4efe8` (Warm handmade paper, antique parchment)
  - `Gilt / Radiance`: `#d9bd82` / `#c5a86d` / `#f0dcae` (Burnished gold leaf, polished gold highlights)
  - `Brass`: `#b9985a` (Aged, hand-burnished antique metalwork)
  - `Umber`: `#221815` (Deep antique walnut wood)
  - `Oxblood / Maroon / Wine`: `#4a1019` / `#6b1a2c` / `#8b2e2b` (Royal wax, velvet drapery, ruby lenses)
- **Typography Matrix**:
  - **Display Headlines**: High-contrast luxury serif (`GT Sectra Display` / `Bodoni Moda` / `Didot`). Generous scale (`text-4xl` up to `text-[clamp(4.5rem,15vw,13rem)]`), tight tracking (`-0.02em` to `-0.045em`), with intentional italic accents on emphasis words (e.g. *Collection*, *Masquerade*, *patient,* *rough*).
  - **UI / Labels / Metadata**: Modern geometric sans-serif (`DM Sans` / `GT America` style). Generous tracking (`tracking-[0.18em]` to `tracking-[0.25em]`), small caps or lowercase precision (`text-xs` / `text-sm`), font-medium.
  - **Script / Wordmark**: Cursive Italian script signature (`Icon livin’`) or high-contrast italic serif.

---

## 2. EXACT ASSET DIRECTORY & PATH MAP

All media must reference these exact relative paths:

### Brand Marks & Logos
- `/brand/cheetah-paw.png` — Dark cheetah paw icon (for light paper backgrounds).
- `/brand/cheetah-paw-white.png` — White cheetah paw icon (for dark cinema/hero backgrounds).
- `/brand/cheeta-cj-transparent.png` — Dark CJ monogram.
- `/brand/cheeta-cj-transparent-white.png` — White CJ monogram.
- `/brand/icon-livin-black.png` — Black "Icon livin’" handwritten signature mark.
- `/brand/icon-livin-white.png` — White "Icon livin’" handwritten signature mark.
- `/brand/icon-livin-raw.png` — Raw high-resolution signature asset.
- `/brand/chrome-cross.png` — Gothic Chrome Hearts-inspired cross motif.

### Homepage Hero Film & Stills
- `/home/films/horseback.webp` (or `.mp4`) — Opening campaign film: rider on horseback in desert landscape.
- `/home/films/king.webp` — Maharaja in golden robes and octagonal ruby frames.
- `/home/films/case.webp` — Open velvet collector’s case revealing heirloom eyewear and pistols.
- `/home/films/masquerade.webp` — Dark candlelight masquerade silhouette.

### Chapter One (The Gun Collection)
- `/home/still-life/manani-v1.webp` — Still Life I: Octagonal ruby frame beneath the Manani antique pistol in ivory cabinet.
- `/home/still-life/cominazzo-mariani-v1.webp` — Still Life II: Double-barrel engraved temples beneath the gold Cominazzo-Mariani pistol.
- `/home/still-life/florentine-v1.webp` — Still Life III: Hand-burnished frame beneath the engraved Florentine pistol.

### Chapter Two (The Masquerade)
- `/home/masquerade-campaign.webp` — Venetian candlelight portrait: model in intricate black filigree eyewear with candle flame reflections.

### Retail Catalog & Products
- `/home/retail-jewellery.webp` (or `/manus-storage/cheeta-emerald-signet-still.jpg`) — High jewelry piece: 18K solid yellow gold Muzo emerald signet ring on black volcanic slate.
- `/manus-storage/cheeta-double-barrel-hero_c55a3dea.png` — Double Barrel 01 eyewear (18K Brushed Gold).
- `/manus-storage/cheeta-double-barrel-gunmetal.jpg` — Double Barrel 02 eyewear (Gunmetal Obsidian).
- `/manus-storage/cheeta-double-barrel-bronze.jpg` — Double Barrel 03 eyewear (Antique Bronze).
- `/products/savanah-1.jpg` — Amber round metal sunglasses.
- `/manus-storage/cheeta-emerald-signet-bone.jpg` — Emerald signet ring on ivory stone.
- `/products/maharaja-1.jpg` — Maharaja ruby aviator frame.
- `/manus-storage/cheeta-atrium-necklace-bone.jpg` — Atrium gold and diamond collar necklace.

### Philosophy & Sculpture
- `/philosophy/ivory-cheetah-v2.webp` — Marble/ivory carved cheetah sculpture resting on an ornate acanthus plinth.
- `/philosophy/ivory-salon-v2.webp` — Classical Parisian/Venetian ivory salon interior.
- `/philosophy/sculpture/diamond.glb` — Low-poly 3D diamond model.

---

## 3. MENU SYSTEM (`CheetahBar`) — MUST REMAIN EXACTLY AS SPECIFIED

The menu navigation bar is sacred and **must not be redesigned**. Implement it with these strict mechanics:

1. **Trigger Element (Top-Left)**:
   - Positioned fixed at `top-8 left-8 sm:top-12 sm:left-12 z-50`.
   - Displays the Cheetah Paw artwork with an ambient, continuous breathing animation (scale pulses subtly between `1.0` and `1.08` every 3 seconds).
   - Crossfades smoothly between `/brand/cheetah-paw-white.png` (when over the dark hero cinema) and `/brand/cheetah-paw.png` (when scrolling over light sections).
2. **Dropdown Behavior (Desktop)**:
   - **100% Fully Transparent**: No background box, no frosted glass rectangle, no borders, no Dubai atelier footer.
   - Drops down directly beneath the paw.
   - Triggers on hover (with a 250ms debounced exit timeout) or click.
   - Typography: Upright `GT Sectra Display` serif, first letter capitalized, zero em dashes.
   - Menu Items:
     1. **Collections** (Hovering reveals an indented sub-menu: *The Gun Collection* -> `/collection/barrel`, *The Masquerade* -> `/collection/masquerade`).
     2. **Retail** -> `/retail`
     3. **Hayrat** -> `/hayrat`
     4. **Philosophy** -> `/philosophy`
     5. **The Founder** -> `/founder`
3. **Mobile Drawer**:
   - Full-screen slide-in with dark/light background sync, large serif links, and close toggle.

---

## 4. HOMEPAGE ARCHITECTURE & SECTION SPECS

### 4.0 Floating Top Header (`Nav`)
- Appears only after scrolling past `window.innerHeight * 0.85` so the opening film hero stays pure and untouched.
- Slides down with `translateY(0)` and `backdrop-blur-md bg-ink/85 border-b border-gilt/18`.
- Contains the script mark `Icon livin’` on the left (spaced away from the paw trigger) and anchor links on the right: `collection`, `masquerade`, `retail`, `philosophy`.

### 4.1 Opening Film Cinema Hero (`HomeCinema`)
- Full viewport height (`100svh`, min 480px) with dark base background `#171512`.
- Displays cinematic video/stills cycling through the 4 campaign scenes (`horseback.webp`, `king.webp`, `case.webp`, `masquerade.webp`) with seamless opacity crossfades.
- Center features the white signature mark `/brand/icon-livin-white.png` (`width: min(38vw, 540px)`).
- Reports background tone (`dark`) to the top-left paw trigger.

### 4.2 Chapter One: The Gun Collection (`GunCollection`)
- Section `id="collection"`, dark background `#171017` with subtle grain and warm radial light pooling behind the cabinet.
- **Header**: Label `chapter one` in brass, headline `The Gun` / *Collection* in bone/gilt serif.
- **Copy**: *"Three still lifes. Each pairs an heirloom firearm with the frame it inspired, set like relics in a private cabinet."* with link `enter the collection ↗`.
- **Interactive 3D Coverflow**:
  - Interactive pointer-tracking stage: maps mouse coordinates to `rotateX(-py * 5deg)` and `rotateY(px * 9deg)` with `perspective: 1700px`.
  - Displays the 3 still lifes (`manani-v1.webp`, `cominazzo-mariani-v1.webp`, `florentine-v1.webp`) using 3D coverflow math:
    - Active item: `translateZ(0px) scale(1) opacity(1) brightness(1)` with warm gold box shadow `0 60px 120px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(217,189,130,0.35)`.
    - Adjacent items: `translateX(±62%) translateZ(-340px) rotateY(∓42deg) scale(0.86) opacity(0.42) brightness(0.55)`.
    - Mirror reflection below via `-webkit-box-reflect: below 10px linear-gradient(...)`.
    - Luminous light sheen sweeps across active still life (`@keyframes sheen`).
- **Caption Rail**:
  - Large Roman numeral (`text-6xl md:text-8xl italic text-brass/70 font-light`).
  - Piece name in display italic (`<em>{piece.name}</em>`) and specific pairing note.
  - Interactive Roman numeral tabs (`I`, `II`, `III`) with expanding underline indicators (`scaleX`), plus previous/next arrow controls.

### 4.3 Chapter Two: The Masquerade (`Masquerade`)
- Section `id="masquerade"`, deep oxblood radial background (`radial-gradient(70% 60% at 25% 40%, #4a1019 0%, #2a0c12 55%, #170709 100%)`).
- **Ghost Numeral**: Giant watermark `II` in background (`text-[34vw] select-none text-bone/[0.03] italic font-light`).
- **Layered 3D Parallax Arch** (wrapped in `Tilt max={9} perspective={1400}`):
  - **Back Plane** (`translateZ(-60px) translate(26px, 22px)`): Gilded arched outline (`rounded-t-full border border-gilt/50`).
  - **Mid Plane** (`translateZ(0)`): Arched portrait (`rounded-t-full overflow-hidden`, shadow `0 70px 120px -30px rgba(0,0,0,0.85)`):
    - Image: `/home/masquerade-campaign.webp`.
    - Candlelight flicker overlay: Dual radial glow with `mix-blend-screen` and `@keyframes flicker` (3.4s loop).
    - Bottom gradient vignette (`from-oxblood/70 via-transparent`).
  - **Front Plane** (`translateZ(70px)`): Dark plate badge `-left-4 bottom-12 border border-gilt/50 bg-ink/70 px-5 py-3 backdrop-blur-sm` reading `the campaign` in gilt text.
- **Content**: Headline `The` / *Masquerade*, copy *"A ball with no names. Lace cut in black lacquer, lenses dark as a closed door, and a room lit by nothing but wax."*, link `enter the campaign ↗` (`/collection/masquerade`).

### 4.4 Retail Section (`RetailSection`)
- Section `id="retail"`, warm ivory background (`#f6f2ec`) with subtle paper warmth radial gradient.
- **Unobstructed Headline**: Full word **"Retail"** rendered prominently in display serif (`text-[clamp(4.5rem,15vw,13rem)] leading-[0.95] text-ink`). **Must remain completely visible and never hidden or clipped behind cards**.
- **3D Tilted Product Card**:
  - Offset below headline (`mt-6 md:mt-8 ml-auto w-full md:w-[72%] lg:w-[65%]`).
  - Wrapped in `Tilt max={6} perspective={1400}`.
  - Back plane: Gilded brass border outline (`border border-brass/75` with `translateZ(-40px) translate(-22px, 22px)`).
  - Main frame: Aspect `3/2`, deep shadow `0 45px 90px -25px rgba(60,40,10,0.45)`, image `/home/retail-jewellery.webp` (solid gold emerald signet ring or fine eyewear).
  - Front badge: Gilded black box at bottom-right (`bg-[#0a0706] border border-gilt/40 px-5 py-2.5 text-gilt text-xs uppercase tracking-[0.22em]` reading `now in boutiques`).
- **Lower Editorial & Spec Table**:
  - Left column: *"The everyday edit. Wearable metal, made in small runs, finished by the same hands that cut the collection."* + link `EXPLORE RETAIL ↗` in tracked uppercase with hairline underline.
  - Right column: Clean spec table with horizontal line dividers (`border-t border-[#d8d0c2] py-5`):
    - `frame` (lowercase sans) ---------- *Antiqued brass, hand burnished* (italic serif)
    - `lens` (lowercase sans) ----------- *Amber gradient, ground in Japan* (italic serif)
    - `setting` (lowercase sans) -------- *Cut emerald at the hinge* (italic serif)

### 4.5 The Philosophy: Procedural 3D Gem (`PhilosophySection`)
- Section `id="philosophy"`, dark `#171017` with subtle grain.
- **Left Column**:
  - Label: `the philosophy` in brass.
  - Headline: `Diamonds are made` / *in the rough.*
  - Copy: *"Nothing worth keeping arrives finished. We begin with the uncut idea, then spend the time it deserves."* + link `read the philosophy ↗`.
  - Indicator: `uncut` to `brilliant` with live scroll-progress bar (`scaleX`).
- **Right Column (Procedural Three.js 3D Gem)**:
  - Procedural WebGL renderer with `ACESFilmicToneMapping` and `RoomEnvironment` PMREM environment reflections.
  - Geometry: `THREE.IcosahedronGeometry(1, 1).toNonIndexed()`.
  - Math: Computes two states for all vertices:
    - `rough` (uncut lump generated with deterministic 3D hash noise `hash3`).
    - `cut` (brilliant cut with flat table top `y > 0.52` and pavilion tapering to a sharp culet).
  - Scroll Interaction: Linearly interpolates vertex coordinates from `rough` to `cut` based on the section's scroll position.
  - Material Transitions: `THREE.MeshPhysicalMaterial` transforms roughness from `0.62` (matte rock) down to `0.05` (high-polish diamond), and color from `#6e5d48` (earthy bronze) to `#f0dcae` (radiant brilliant gold).
  - Mouse Interaction: Gentle continuous rotation coupled with mouse-pointer parallax tilt.

### 4.6 House of Icon Livin' Sculpture Section (`TigerSculptureSection`)
- Background: Warm ivory `#fafaf7` with top hairline divider `#ece6dc`.
- **Left Column**:
  - Subtitle: `house of icon livin'` in tracked wine/copper tone (`text-wine/80 tracking-[0.25em] text-xs md:text-sm lowercase`).
  - Headline: Display serif:
    ```
    Guarded,
    patient, never
    in a hurry.
    ```
    (with ***patient,*** in elegant italic serif).
- **Right Column**:
  - Image: `/philosophy/ivory-cheetah-v2.webp` (carved ivory cheetah resting on acanthus-carved plinth, positioned cleanly on the right).

### 4.7 House Footer (`HouseFooter`)
- Background `#fafaf7`, signature mark `/brand/icon-livin-black.png` on left, and uppercase/lowercase clean links on right: `privacy policy`, `contact`, `terms`, `care`.

---

## 5. TECHNICAL STACK & DEPENDENCY CONTRACT

Ensure your project dependencies and build configuration are set up as follows:
- **Framework**: React 19 + TypeScript + Vite.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), standardizing on custom tokens `--color-brass: #b9985a`, `--color-gilt: #d9bd82`, `--color-umber: #221815`, `--color-oxblood: #4a1019`, `--color-wine: #6b1a2c`.
- **3D Graphics**: `three` (v0.185+) with `RoomEnvironment` from `three/examples/jsm/environments/RoomEnvironment.js`.
- **Animation**: Framer Motion for menu and transitions; pointer-based 3D CSS transforms for card tilts and coverflow carousel.
- **Routing**: `wouter` (v3+).
- **Icons**: `lucide-react`.

---

## 6. VERIFICATION CHECKLIST BEFORE COMPLETION

1. [ ] Top-left cheetah paw pulses continuously and crossfades between white/dark paws over hero/light sections.
2. [ ] Cheetah dropdown menu is 100% transparent with upright serif typography and nested collection links.
3. [ ] Floating `Nav` appears only after scrolling 85% past the hero.
4. [ ] Gun Collection 3D coverflow rotates with mouse movements, has mirror reflections, light sheen, and functional Roman numeral selectors.
5. [ ] The Masquerade card exhibits true 3D parallax depth (`translateZ` layers) and flickering candlelight.
6. [ ] The word "Retail" is fully visible and never clipped or covered by the product card.
7. [ ] The procedural Three.js diamond morphs seamlessly from rough rock into a brilliant cut gem as the user scrolls.
8. [ ] The cheetah sculpture section displays "Guarded, *patient,* never in a hurry." with `/philosophy/ivory-cheetah-v2.webp`.
9. [ ] Zero missing assets, broken routes, or TypeScript compiler errors.
