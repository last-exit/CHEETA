export interface ProductItem {
  id: string;
  availability: "retail" | "showroom" | "unlisted" | "preview";
  name: string;
  category: "Eyewear" | "High Jewelry";
  slug: string;
  frame: string;
  lens: string;
  price: number;
  priceDisplay: string;
  productImage: string;
  altImage?: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "barrel-01",
    availability: "showroom",
    name: "The Gun Collection 01",
    category: "Eyewear",
    slug: "double-barrel-01",
    frame: "18K Brushed Gold",
    lens: "Custom Ruby Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    productImage: "/manus-storage/cheeta-double-barrel-hero_c55a3dea.png",
  },
  {
    id: "barrel-02",
    availability: "showroom",
    name: "The Gun Collection 02",
    category: "Eyewear",
    slug: "double-barrel-02",
    frame: "Gunmetal Obsidian",
    lens: "Polarized Smoke Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    productImage: "/manus-storage/cheeta-double-barrel-gunmetal.jpg",
  },
  {
    id: "barrel-03",
    availability: "showroom",
    name: "The Gun Collection 03",
    category: "Eyewear",
    slug: "double-barrel-03",
    frame: "Antique Bronze",
    lens: "Amber Gradient Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    productImage: "/manus-storage/cheeta-double-barrel-bronze.jpg",
  },
  {
    id: "emerald-signet",
    availability: "unlisted",
    name: "The Emerald Signet Ring",
    category: "High Jewelry",
    slug: "emerald-signet-ring",
    frame: "Solid 18K Yellow Gold",
    lens: "4.20 ct Muzo Emerald",
    price: 42000,
    priceDisplay: "AED 42,000",
    productImage: "/manus-storage/cheeta-emerald-ring_510231e1.png",
  },
  {
    id: "atrium-necklace",
    availability: "unlisted",
    name: "The Atrium Gold Necklace",
    category: "High Jewelry",
    slug: "atrium-gold-necklace",
    frame: "Solid 18K Gold",
    lens: "3.45 ct Pavé Diamonds",
    price: 68000,
    priceDisplay: "AED 68,000",
    productImage: "/manus-storage/cheeta-necklace-atrium_e7928040.png",
  },
];

export const RETAIL_PRODUCTS = PRODUCTS.filter(
  product => product.availability === "retail"
);

export const RETAIL_PREVIEW_PRODUCTS: ProductItem[] = [
  {
    id: "preview-amber-round",
    availability: "preview",
    name: "Amber round frame",
    category: "Eyewear",
    slug: "preview-amber-round",
    frame: "Round frame",
    lens: "Amber lenses",
    price: 5000,
    priceDisplay: "AED 5,000",
    productImage: "/products/savanah-1.jpg",
  },
  {
    id: "preview-green-signet",
    availability: "preview",
    name: "Green signet ring",
    category: "High Jewelry",
    slug: "preview-green-signet",
    frame: "Signet ring",
    lens: "Green centre stone",
    price: 5500,
    priceDisplay: "AED 5,500",
    productImage: "/manus-storage/cheeta-emerald-signet-bone.jpg",
  },
  {
    id: "preview-burgundy-aviator",
    availability: "preview",
    name: "Burgundy aviator",
    category: "Eyewear",
    slug: "preview-burgundy-aviator",
    frame: "Aviator frame",
    lens: "Burgundy lenses",
    price: 5250,
    priceDisplay: "AED 5,250",
    productImage: "/products/maharaja-1.jpg",
  },
  {
    id: "preview-drop-necklace",
    availability: "preview",
    name: "Green drop necklace",
    category: "High Jewelry",
    slug: "preview-drop-necklace",
    frame: "Collar necklace",
    lens: "Green drop pendant",
    price: 6000,
    priceDisplay: "AED 6,000",
    productImage: "/manus-storage/cheeta-atrium-necklace-bone.jpg",
  },
];

export function productForSlug(slug: string | undefined) {
  const canonicalSlug = slug?.replace(
    /^gun-collection-(0[1-3])$/,
    "double-barrel-$1"
  );
  return (
    PRODUCTS.find(product => product.slug === canonicalSlug) ??
    RETAIL_PREVIEW_PRODUCTS.find(product => product.slug === canonicalSlug)
  );
}
