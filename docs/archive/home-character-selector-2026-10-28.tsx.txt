/**
 * HOMEPAGE : CHEETA JEWELS / ICON LIVIN
 * - Hero: Pure campaign cinema with ONLY handwritten script "Icon livin'" logo
 * - Zero clutter on hero: NO "The Gun Collection" written, NO 01/02 counter
 * - Character Select (Lookbook) appears upon scrolling down
 * - All typography: GT Sectra Display & GT America with zero fake-monospace tracking
 * - Official CJ logo floating sidebar trigger
 */
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "wouter";
import { HouseFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import AcquisitionButton from "@/components/AcquisitionButton";
import HeaderWordmark from "@/components/HeaderWordmark";
import CampaignVideo from "@/components/CampaignVideo";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS } from "@/data/retailCatalog";
import { COLLECTIONS, COLLECTION_ORDER } from "@/data/collections";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { usePortraitSelection } from "@/hooks/usePortraitSelection";
import { useBagConfirmation } from "@/hooks/useBagConfirmation";

interface ModelCharacter {
  id: string;
  romanNumeral: string;
  name: string;
  frame: string;
  lens: string;
  price: number;
  priceDisplay: string;
  modelImage: string;
  slug: string;
}

const CHARACTERS: ModelCharacter[] = [
  {
    id: "barrel-01",
    romanNumeral: "I",
    name: "The gun collection",
    frame: "18K Brushed Gold",
    lens: "Custom Ruby Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    modelImage: "/manus-storage/model-cutout-01-transparent.png",
    slug: "double-barrel-01",
  },
  {
    id: "barrel-02",
    romanNumeral: "II",
    name: "The gun collection",
    frame: "Gunmetal Obsidian",
    lens: "Polarized Smoke Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    modelImage: "/manus-storage/model-cutout-02-transparent.png",
    slug: "double-barrel-02",
  },
  {
    id: "barrel-03",
    romanNumeral: "III",
    name: "The gun collection",
    frame: "Antique Bronze",
    lens: "Amber Gradient Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    modelImage: "/manus-storage/model-cutout-03-transparent.png",
    slug: "double-barrel-03",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Home() {
  const confirmAddedToBag = useBagConfirmation();
  const {
    index: selectedIdx,
    pending: selectionPending,
    error: portraitError,
    select: selectPortrait,
    sectionRef,
  } = usePortraitSelection(CHARACTERS.map(character => character.modelImage));
  const [heroSlide, setHeroSlide] = useState(0);
  const { addToCart } = useCart();
  const campaign = COLLECTIONS[COLLECTION_ORDER[heroSlide]];
  const current = CHARACTERS[selectedIdx];

  const handleSwitchVideo = () => {
    try {
      playMetallicClick();
    } catch {}
    setHeroSlide(prev => (prev + 1) % COLLECTION_ORDER.length);
  };

  const handleAddToCart = (item: ModelCharacter) => {
    try {
      playVaultAcquisition();
    } catch {}
    const canonical = PRODUCTS.find(product => product.id === item.id);
    addToCart({
      id: item.id,
      name: canonical?.name ?? item.name,
      frame: item.frame,
      lens: item.lens,
      price: item.price,
      priceDisplay: item.priceDisplay,
      image: canonical?.productImage ?? item.modelImage,
    });
    confirmAddedToBag(canonical?.name ?? item.name, item.priceDisplay);
  };

  const handleSelectCharacter = (idx: number) => {
    try {
      playMetallicClick();
    } catch {}
    void selectPortrait(idx);
  };

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash === "#characters"
    ) {
      const el = document.getElementById("characters");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "instant", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <main className="home-page relative w-full min-h-screen bg-[#FAFAF7] text-[#2A241D] selection:bg-[#2A241D] selection:text-[#FAFAF7]">
      {/* Floating Official CJ Logo Sidebar Trigger */}
      <CheetahBar dark />

      {/* Persistent Floating CJ Monogram (blends on scroll, color-matched to active character) */}
      <HeaderWordmark
        color={
          selectedIdx === 0
            ? "#8A0E1C"
            : selectedIdx === 1
              ? "#2A241D"
              : "#B8860B"
        }
      />

      {/* ========================================================================= */}
      {/* 1. HERO : STRIPPED FULL-BLEED CAMPAIGN CINEMA                             */}
      {/* ========================================================================= */}
      <section
        onClick={handleSwitchVideo}
        className="home-campaign relative h-screen w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center p-6 select-none cursor-pointer"
        title="Click anywhere to switch campaign film"
      >
        {/* Campaign Cinema Videos */}
        <CampaignVideo
          key={campaign.id}
          src={campaign.video}
          poster={campaign.stills[0]}
          className="absolute inset-0 h-full w-full object-cover object-center   pointer-events-none"
        />

        {/* Center: STRIPPED : ONLY Handwritten "Icon livin'" Script Logo */}
        <div className="relative z-20 w-full max-w-[340px] sm:max-w-[440px] md:max-w-[540px] flex items-center justify-center pointer-events-none">
          <motion.img
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            src="/brand/icon-livin-white.png"
            alt="Icon livin'"
            className="w-full h-auto object-contain filter "
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CHARACTER SELECT (LOOKBOOK) : REVEALED UPON SCROLLING                  */}
      {/* ========================================================================= */}
      <section
        id="characters"
        ref={sectionRef}
        aria-busy={selectionPending}
        className="relative min-h-screen w-full py-24 md:py-36 px-6 md:px-20 pl-16 md:pl-28 flex flex-col justify-center select-none overflow-hidden transition-colors duration-1000"
        style={{
          backgroundColor:
            selectedIdx === 0
              ? "#FDF9F9" // Ruby subtle tint
              : selectedIdx === 1
                ? "#F5F5F5" // Obsidian subtle tint
                : "#FCF9F2", // Amber subtle tint
        }}
      >
        {/* Subtle Background Character Design (Watermark) */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${current.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-0"
          >
            <span className="font-serif text-[40vw] text-[#2A241D] leading-none text-center">
              {current.romanNumeral}
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left: Model Silhouette Floating Naturally */}
            <div className="home-portrait lg:col-span-7 relative h-[480px] md:h-[660px] flex items-center justify-center">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  className="absolute inset-0 h-full w-full flex items-center justify-center"
                >
                  <img
                    src={current.modelImage}
                    alt={current.name}
                    className="max-h-full max-w-full object-contain pointer-events-none "
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Product Info in GT Sectra & GT America */}
            <div className="home-character-info lg:col-span-5 flex flex-col justify-center space-y-7">
              <div>
                <span className="edition-number font-serif text-xl text-[#6B1A2C] block mb-2 font-normal ">
                  {current.romanNumeral}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#2A241D] leading-[1.08]">
                  {current.name}
                </h2>

                {/* Swiss Watch NumberFlow Price */}
                <div className="mt-8 flex items-baseline gap-2 price font-serif text-2xl font-normal text-[#2A241D]">
                  <span className="lowercase tracking-wide">aed</span>
                  <NumberFlow
                    value={current.price}
                    format={{ useGrouping: true }}
                  />
                </div>
              </div>

              {/* Silhouette Switcher */}
              <div
                className="home-editions flex items-center gap-6 font-sans text-sm pt-6"
                role="group"
                aria-label="Edition selection"
                onKeyDown={event => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
                    return;
                  event.preventDefault();
                  const next =
                    (selectedIdx +
                      (event.key === "ArrowRight" ? 1 : -1) +
                      CHARACTERS.length) %
                    CHARACTERS.length;
                  event.currentTarget
                    .querySelectorAll<HTMLButtonElement>("button[aria-pressed]")
                    [next]?.focus();
                  handleSelectCharacter(next);
                }}
              >
                {CHARACTERS.map((char, idx) => {
                  const isSelected = selectedIdx === idx;
                  return (
                    <button
                      key={char.id}
                      aria-pressed={isSelected}
                      aria-label={`edition ${char.romanNumeral}`}
                      onClick={() => handleSelectCharacter(idx)}
                      className={`group flex items-center gap-2 cursor-pointer transition-all ${
                        isSelected
                          ? "text-[#2A241D] font-semibold"
                          : "text-[#2A241D]/35 hover:text-[#2A241D]"
                      }`}
                    >
                      <span className="font-serif text-base">
                        {char.romanNumeral}
                      </span>
                    </button>
                  );
                })}

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleSelectCharacter(
                        (selectedIdx - 1 + CHARACTERS.length) %
                          CHARACTERS.length
                      )
                    }
                    className="p-2 text-[#2A241D]/40 hover:text-[#2A241D] transition-colors cursor-pointer active:scale-95"
                    aria-label="Previous edition"
                  >
                    ←
                  </button>
                  <button
                    onClick={() =>
                      handleSelectCharacter(
                        (selectedIdx + 1) % CHARACTERS.length
                      )
                    }
                    className="p-2 text-[#2A241D]/40 hover:text-[#2A241D] transition-colors cursor-pointer active:scale-95"
                    aria-label="Next edition"
                  >
                    →
                  </button>
                </div>
              </div>

              {portraitError && (
                <p role="status" className="font-sans text-xs text-[#6A635D]">
                  {portraitError}
                </p>
              )}
              {/* Acquisition & Details Action */}
              <div className="pt-2 flex items-center gap-6">
                <AcquisitionButton
                  disabled={selectionPending}
                  onClick={() => handleAddToCart(current)}
                >
                  acquire
                </AcquisitionButton>

                <Link
                  href={`/product/${current.slug}`}
                  className="font-sans lowercase text-xs text-[#2A241D]/55 hover:text-[#2A241D] transition-colors py-2"
                >
                  details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. THE LEOPARD VELVET VAULT                                               */}
        {/* ========================================================================= */}
        <div className="home-presentation max-w-6xl mx-auto w-full mt-28 md:mt-40 overflow-hidden bg-[#141211] text-[#FAFAF7]  grid grid-cols-1 lg:grid-cols-12 items-center rounded-sm">
          <div className="lg:col-span-6 p-8 md:p-14 space-y-4">
            <h3 className="font-serif normal-case text-3xl sm:text-4xl font-normal tracking-tight text-white">
              The leopard velvet vault
            </h3>
          </div>

          <div className="lg:col-span-6 h-full min-h-[280px] md:min-h-[360px] overflow-hidden">
            <img
              src="/manus-storage/cheeta-leopard-vault-box.jpg"
              alt="Cheeta Jewels velvet presentation box"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover filter "
            />
          </div>
        </div>

        {/* Editorial Gateways */}
        <div className="home-gateways max-w-6xl mx-auto w-full mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 ">
          <Link href="/collection/barrel" className="group block">
            <span className="font-serif text-2xl sm:text-3xl font-normal text-[#2A241D] group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              The Gun Collection{" "}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>

          <Link href="/philosophy" className="group block">
            <span className="font-serif text-2xl sm:text-3xl font-normal text-[#2A241D] group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              The philosophy{" "}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </div>
      </section>

      <HouseFooter />
    </main>
  );
}
