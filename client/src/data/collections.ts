/**
 * CHEETA JEWELS / ICON LIVIN : Editorial Collections Data
 * All collection content, media paths, color themes, and specifications.
 * Zero hardcoded values in presentation JSX components.
 */

export interface Chapter {
  cap: string;
  note: string;
}

export interface CollectionProduct {
  id: string;
  name: string;
  material: string;
  price: number;
  priceDisplay: string;
  quad: string;
}

export interface CollectionCredit {
  role: string;
  name: string;
}

export interface CollectionTheme {
  bg: string;
  ink: string;
  soft: string;
  accent: string;
  line: string;
  tint: string;
  isDark: boolean;
}

export interface LensOption {
  id: "ruby" | "obsidian" | "amber" | "emerald";
  label: string;
  hex: string;
}

export interface Model3DConfig {
  frameType: "gold" | "gunmetal" | "bronze";
  defaultLens: "ruby" | "obsidian" | "amber" | "emerald";
  availableLenses: LensOption[];
  title: string;
  subtitle: string;
}

export interface CollectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  secondary: string;
  label: string;
  pageTitle: string;
  intro: string; // 40-55 word all-caps brand voice paragraph
  statement: string; // Centered mid-page poetic line
  chapters: Chapter[];
  video: string;
  campaign: string;
  frames: string;
  stills: string[]; // Campaign portrait, second portrait, close-up, wide still
  theme: CollectionTheme;
  products: CollectionProduct[];
  credits: CollectionCredit[];
  modelConfig: Model3DConfig;
  nextId: string;
  nextName: string;
  nextCampaign: string;
}

export const COLLECTIONS: Record<string, CollectionData> = {
  maharaja: {
    id: "maharaja",
    index: "01",
    eyebrow: "fw26 / chapter 01",
    title: "MAHARAJA",
    subtitle: "SOVEREIGN GEOMETRY IN 18K SOLID GOLD",
    cta: "View the Collection",
    secondary: "Acquire Edition",
    label: "01 / 04 : maharaja",
    pageTitle: "THE MAHARAJA COLLECTION",
    intro:
      "CARVED FROM ARCHITECTURAL JALI LATTICEWORK AND SOLID EIGHTEEN-KARAT GOLD, THE MAHARAJA SERIES CONFRONTS THE MONUMENTAL GRANDEUR OF THE RAJASTHAN COURTS. AN UNFLINCHING GEOMETRIC SILHOUETTE CRAFTED FOR THOSE WHO COMMAND OBSERVED SPACES WITH AUDACIOUS RESTRAINT, IMPERIAL PROPORTIONS, AND UNCOMPROMISING SIGHTLINES UNDER HARSH OPULENT LIGHT.",
    statement:
      "GOLD IS NOT AN ADORNMENT; IT IS AN ARCHITECTURAL MONOPOLY ON LIGHT.",
    chapters: [
      { cap: "CH. 01", note: "THE JALI SCREEN" },
      { cap: "CH. 02", note: "CHISELED 18K SYMMETRY" },
      { cap: "CH. 03", note: "IMPERIAL SIGHTLINES" },
      { cap: "CH. 04", note: "MONOLITH IN GOLD" },
    ],
    video: "/videos/maharaja.mp4",
    campaign: "/campaigns/maharaja-poster.jpg",
    frames: "/frames/maharaja-frames.jpg",
    stills: [
      "/stills/maharaja-still-1.jpg", // 3:4 portrait
      "/stills/maharaja-still-2.jpg", // 4:5 portrait
      "/stills/maharaja-still-3.jpg", // 4:3 landscape
      "/stills/maharaja-still-4.jpg", // 16:9 wide
    ],
    theme: {
      bg: "#FFFFFF",
      ink: "#000000",
      soft: "rgba(0,0,0,0.55)",
      accent: "#000000",
      line: "rgba(0,0,0,0.06)",
      tint: "#FAFAFA",
      isDark: false,
    },
    products: [
      {
        id: "maharaja-01",
        name: "maharaja i: the solid octagon",
        material: "18K Hand-Finished Gold · Amber Mineral Lenses",
        price: 18500,
        priceDisplay: "AED 18,500",
        quad: "/products/maharaja-1.jpg",
      },
      {
        id: "maharaja-02",
        name: "maharaja ii: jali screen aviator",
        material: "18K Solid Yellow Gold · Custom Gradient Optics",
        price: 19500,
        priceDisplay: "AED 19,500",
        quad: "/products/maharaja-2.jpg",
      },
      {
        id: "maharaja-03",
        name: "maharaja iii: chiseled pilot",
        material: "Chiseled 18K Gold · Emerald Cabochon Inlay",
        price: 21000,
        priceDisplay: "AED 21,000",
        quad: "/products/maharaja-3.jpg",
      },
      {
        id: "maharaja-04",
        name: "maharaja iv: imperial monolith",
        material: "18K Solid Rose Gold · Smoke Quartz Mineral Lenses",
        price: 22500,
        priceDisplay: "AED 22,500",
        quad: "/products/maharaja-4.jpg",
      },
    ],
    credits: [
      { role: "CREATIVE DIRECTION", name: "ICON LIVIN ATELIER" },
      { role: "HIGH JEWELRY SETTING", name: "DUBAI ATELIER ARCHIVE" },
      { role: "CINEMATOGRAPHY", name: "MARCUS AURELIUS VANE" },
      { role: "OPTICAL ARCHITECTURE", name: "CHEETA BESPOKE SALON" },
    ],
    modelConfig: {
      frameType: "gold",
      defaultLens: "ruby",
      availableLenses: [
        { id: "ruby", label: "Ruby Mineral", hex: "#8A0E1C" },
        { id: "amber", label: "Amber Honey", hex: "#B86314" },
        { id: "obsidian", label: "Obsidian Smoke", hex: "#1A1C20" },
      ],
      title: "18K Solid Gold Octagonal Chisel",
      subtitle:
        "Bespoke Jali Latticework & Cabochon Hinge · Drag to Rotate 360°",
    },
    nextId: "barrel",
    nextName: "THE GUN COLLECTION",
    nextCampaign: "/barrel/barrel-campaign.jpg",
  },

  masquerade: {
    id: "masquerade",
    index: "02",
    eyebrow: "atelier archive / chapter 02",
    title: "THE MASQUERADE",
    subtitle: "OBSIDIAN LACQUER & SCULPTED TITANIUM",
    cta: "View the Collection",
    secondary: "Acquire Edition",
    label: "THE MASQUERADE",
    pageTitle: "THE MASQUERADE COLLECTION",
    intro:
      "BORN WITHIN THE VEILED SANCTUARIES OF MIDNIGHT VENETIAN SALONS, THE MASQUERADE SERIES EMBODIES THE SUBVERSIVE DUALITY OF SHADOW AND OBSIDIAN LACQUER. HAND-POLISHED TITANIUM MERGES WITH BLACKOUT LENSES TO CONCEAL THE SOVEREIGN GAZE, TRANSFORMING EYEWEAR INTO AN IMPENETRABLE MASK OF ENIGMATIC POWER AND UNAPOLOGETIC SEDUCTION.",
    statement:
      "TO CONCEAL THE GAZE IS TO CONQUER THE ROOM BEFORE A WORD IS UTTERED.",
    chapters: [
      { cap: "CH. 01", note: "THE NOCTURNE VEIL" },
      { cap: "CH. 02", note: "POLISHED OBSIDIAN" },
      { cap: "CH. 03", note: "CONCEALED VISOR" },
      { cap: "CH. 04", note: "THE MIDNIGHT SOVEREIGN" },
    ],
    video: "/videos/masquerade.mp4",
    campaign: "/campaigns/masquerade-poster.jpg",
    frames: "/frames/masquerade-frames.jpg",
    stills: [
      "/stills/masquerade-still-1.jpg",
      "/stills/masquerade-still-2.jpg",
      "/stills/masquerade-still-3.jpg",
      "/stills/masquerade-still-4.jpg",
    ],
    theme: {
      bg: "#FFFFFF",
      ink: "#000000",
      soft: "rgba(0,0,0,0.55)",
      accent: "#000000",
      line: "rgba(0,0,0,0.06)",
      tint: "#FAFAFA",
      isDark: false,
    },
    products: [
      {
        id: "masquerade-01",
        name: "masquerade i: concealed visor",
        material: "Polished Black Titanium · Blackout Onyx Lenses",
        price: 16800,
        priceDisplay: "AED 16,800",
        quad: "/products/masquerade-1.jpg",
      },
      {
        id: "masquerade-02",
        name: "masquerade ii: obsidian round",
        material: "Gunmetal Titanium · Emerald Cabochon",
        price: 17500,
        priceDisplay: "AED 17,500",
        quad: "/products/masquerade-2.jpg",
      },
      {
        id: "masquerade-03",
        name: "masquerade iii: cat-eye nocturne",
        material: "Hammered Titanium & Plum Acetate",
        price: 19000,
        priceDisplay: "AED 19,000",
        quad: "/products/masquerade-3.jpg",
      },
      {
        id: "masquerade-04",
        name: "masquerade iv: carbon visor shield",
        material: "Forged Carbon & Crimson Enamel",
        price: 18200,
        priceDisplay: "AED 18,200",
        quad: "/products/masquerade-4.jpg",
      },
    ],
    credits: [
      { role: "CREATIVE DIRECTION", name: "ICON LIVIN ATELIER" },
      { role: "TITANIUM ENGINEERING", name: "SABATINI FORGE, MILANO" },
      { role: "CINEMATOGRAPHY", name: "VALENTINA MORETTI" },
      { role: "SOUND ARCHITECTURE", name: "CHEETA AMBIENT STUDIOS" },
    ],
    modelConfig: {
      frameType: "gunmetal",
      defaultLens: "obsidian",
      availableLenses: [
        { id: "obsidian", label: "Blackout Onyx", hex: "#1A1C20" },
        { id: "emerald", label: "Venetian Emerald", hex: "#0F5C43" },
        { id: "ruby", label: "Blood Ruby", hex: "#8A0E1C" },
      ],
      title: "Black Rhodium Obsidian Titanium",
      subtitle: "Concealed Visor Optics & Cabochon Hinge · Drag to Rotate 360°",
    },
    nextId: "barrel",
    nextName: "THE GUN COLLECTION",
    nextCampaign: "/barrel/barrel-campaign.jpg",
  },

  savanah: {
    id: "savanah",
    index: "03",
    eyebrow: "fw26 / chapter 03",
    title: "SAVANAH",
    subtitle: "DESERT BRONZE & TRANSLUCENT AMBER",
    cta: "View the Collection",
    secondary: "Acquire Edition",
    label: "03 / 04 : savanah",
    pageTitle: "THE SAVANAH COLLECTION",
    intro:
      "SCULPTED BY THE SCORCHING SOLITUDE OF ARABIAN DUNES, THE SAVANAH SERIES EXTRACTS PURE RADIANCE FROM SUN-BLEACHED ACETATE AND DESERT BRONZE. WARM OCHRE OPTICS CAPTURE THE DESERT HORIZON IN UNRIVALED CLARITY, OFFERING AN ANTHROPOLOGICAL MEDITATION ON NOMADIC ENDURANCE, BONE-WARMED STONE, AND PRISTINE ARCHITECTURAL FORM.",
    statement:
      "THE DESERT DOES NOT COMPROMISE WITH TIME, NOR DO THOSE WHO INHERIT ITS HORIZON.",
    chapters: [
      { cap: "CH. 01", note: "DUNE MIRAGE" },
      { cap: "CH. 02", note: "SUN-BLEACHED ACETATE" },
      { cap: "CH. 03", note: "THE OCHRE HORIZON" },
      { cap: "CH. 04", note: "NOMADIC SOLITUDE" },
    ],
    video: "/videos/savanah.mp4",
    campaign: "/campaigns/savanah-poster.jpg",
    frames: "/frames/savanah-frames.jpg",
    stills: [
      "/stills/savanah-still-1.jpg",
      "/stills/savanah-still-2.jpg",
      "/stills/savanah-still-3.jpg",
      "/stills/savanah-still-4.jpg",
    ],
    theme: {
      bg: "#E4D9BF",
      ink: "#2C2413",
      soft: "rgba(44,36,19,0.65)",
      accent: "#A9762C",
      line: "rgba(44,36,19,0.12)",
      tint: "rgba(44,36,19,0.04)",
      isDark: false,
    },
    products: [
      {
        id: "savanah-01",
        name: "savanah i: dune wire aviator",
        material: "Sand-Cast Bronze · Amber Mineral Lenses",
        price: 16500,
        priceDisplay: "AED 16,500",
        quad: "/products/savanah-1.jpg",
      },
      {
        id: "savanah-02",
        name: "savanah ii: sun-bleached honey",
        material: "Mazzucchelli Amber Acetate · Ochre Lenses",
        price: 17000,
        priceDisplay: "AED 17,000",
        quad: "/products/savanah-2.jpg",
      },
      {
        id: "savanah-03",
        name: "savanah iii: dune mirage titanium",
        material: "Matte Desert Titanium · Polarized Gold Lenses",
        price: 15800,
        priceDisplay: "AED 15,800",
        quad: "/products/savanah-3.jpg",
      },
      {
        id: "savanah-04",
        name: "savanah iv: nomadic billet shield",
        material: "Raw Billet Bronze · Sun-Warm Gradient Lenses",
        price: 18000,
        priceDisplay: "AED 18,000",
        quad: "/products/savanah-4.jpg",
      },
    ],
    credits: [
      { role: "CREATIVE DIRECTION", name: "ICON LIVIN ATELIER" },
      { role: "ACETATE MASTERY", name: "MAZZUCCHELLI 1849, ITALIA" },
      { role: "CINEMATOGRAPHY", name: "TARIQ AL-MANSOOR" },
      { role: "COLOR ARCHITECTURE", name: "DESERT MIRAGE LABS" },
    ],
    modelConfig: {
      frameType: "bronze",
      defaultLens: "amber",
      availableLenses: [
        { id: "amber", label: "Desert Ochre", hex: "#B86314" },
        { id: "obsidian", label: "Dune Smoke", hex: "#1A1C20" },
        { id: "ruby", label: "Sunset Ruby", hex: "#8A0E1C" },
      ],
      title: "Sand-Cast Patina Bronze Billet",
      subtitle:
        "Dune Mirage Silhouette & Bone-Warmed Metal · Drag to Rotate 360°",
    },
    nextId: "barrel",
    nextName: "THE GUN COLLECTION",
    nextCampaign: "/campaigns/barrel-poster.jpg",
  },

  barrel: {
    id: "barrel",
    index: "01",
    eyebrow: "atelier archive / chapter 01",
    title: "THE GUN COLLECTION",
    subtitle: "KNURLED GUNMETAL & 18K SOLID HARDWARE",
    cta: "View the Collection",
    secondary: "Acquire Edition",
    label: "THE GUN COLLECTION",
    pageTitle: "the gun collection",
    intro:
      "TEMPERED INSIDE THE SHADOWS OF CENTURY-OLD FRENCH CELLARS, THE GUN COLLECTION UNITES KNURLED GUNMETAL WITH CHARRED OAK PATINAS. ITS PROPRIETARY DUAL-CYLINDER CROSSBAR FORGES AN UNYIELDING INDUSTRIAL HORIZON, ECHOING THE RAW DISCIPLINE OF AGED GRAIN, SMOKED MINERAL OPTICS, AND TIME-HONORED COGNAC BRILLIANCE.",
    statement:
      "TIME IS MEASURED NOT IN SECONDS, BUT IN THE DEPTH OF THE WOOD AND THE METTLE OF THE TEMPLE.",
    chapters: [
      { cap: "CH. 01", note: "THE CHARRED OAK" },
      { cap: "CH. 02", note: "KNURLED GUNMETAL" },
      { cap: "CH. 03", note: "AGED CELLAR OPTICS" },
      { cap: "CH. 04", note: "THE DUAL HORIZON" },
    ],
    video: "/videos/barrel.mp4",
    campaign: "/barrel/barrel-campaign.jpg",
    frames: "/barrel/barrel-quad.png",
    stills: [
      "/stills/barrel-founder-portrait-1.jpg",
      "/stills/barrel-founder-portrait-2.jpg",
      "/stills/barrel-founder-detail.jpg",
      "/stills/barrel-founder-wide.jpg",
    ],
    theme: {
      bg: "#FFFFFF",
      ink: "#000000",
      soft: "rgba(0,0,0,0.55)",
      accent: "#000000",
      line: "rgba(0,0,0,0.06)",
      tint: "#FFFFFF",
      isDark: false,
    },
    products: [
      {
        id: "barrel-01",
        name: "the gun collection 01: brushed gold",
        material: "18K Brushed Gold · Custom Ruby Mineral Lenses",
        price: 15000,
        priceDisplay: "AED 15,000",
        quad: "/products/barrel-1.jpg",
      },
      {
        id: "barrel-02",
        name: "the gun collection 02: obsidian",
        material: "Gunmetal Obsidian · Polarized Smoke Mineral Lenses",
        price: 15000,
        priceDisplay: "AED 15,000",
        quad: "/products/barrel-2.jpg",
      },
      {
        id: "barrel-03",
        name: "the gun collection 03: antique bronze",
        material: "Antique Bronze · Amber Gradient Mineral Lenses",
        price: 15000,
        priceDisplay: "AED 15,000",
        quad: "/products/barrel-3.jpg",
      },
      {
        id: "barrel-04",
        name: "the gun collection 04: charred oak",
        material: "Charred Oak Acetate & Damascus Steel · Cognac Lenses",
        price: 19500,
        priceDisplay: "AED 19,500",
        quad: "/products/barrel-4.jpg",
      },
    ],
    credits: [
      { role: "CREATIVE DIRECTION", name: "ICON LIVIN ATELIER" },
      { role: "COOPERAGE & METALWORK", name: "BORDEAUX ATELIER" },
      { role: "CINEMATOGRAPHY", name: "JEAN-LUC DUPONT" },
      { role: "OPTICAL ARCHITECTURE", name: "CHEETA BESPOKE SALON" },
    ],
    modelConfig: {
      frameType: "gold",
      defaultLens: "ruby",
      availableLenses: [
        { id: "ruby", label: "Ruby Mineral", hex: "#8A0E1C" },
        { id: "obsidian", label: "Polarized Smoke", hex: "#1A1C20" },
        { id: "amber", label: "Amber Gradient", hex: "#B86314" },
      ],
      title: "The Gun Collection 01",
      subtitle:
        "Charred Oak Grain & Knurled Titanium Bridge · Drag to Rotate 360°",
    },
    nextId: "masquerade",
    nextName: "THE MASQUERADE",
    nextCampaign: "/campaigns/masquerade-poster.jpg",
  },
};

export const COLLECTION_ORDER = ["barrel", "masquerade"] as const;
export type CollectionId = (typeof COLLECTION_ORDER)[number];
