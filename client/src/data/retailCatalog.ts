export interface ProductItem {
  id: string;
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
