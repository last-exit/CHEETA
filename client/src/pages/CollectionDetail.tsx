/**
 * Shared collection presentation: campaign imagery, frame study and editions.
 * Product metadata and cart identity stay in the existing collection catalogue.
 */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import CampaignVideo from "@/components/CampaignVideo";
import CheetahBar from "@/components/CheetahBar";
import AcquisitionButton from "@/components/AcquisitionButton";
import HeaderWordmark from "@/components/HeaderWordmark";
import Eyewear3DModel from "@/components/Eyewear3DModel";
import ScrollReveal from "@/components/ScrollReveal";
import { collectionHeading } from "@/lib/collectionPresentation";
import { COLLECTIONS, CollectionProduct } from "@/data/collections";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { useBagConfirmation } from "@/hooks/useBagConfirmation";

export default function CollectionDetail() {
  const confirmAddedToBag = useBagConfirmation();
  const params = useParams<{ id: string }>();
  const rawId = (params.id || "barrel").toLowerCase();
  const collectionId = rawId === "gun" ? "barrel" : rawId;
  const collection = COLLECTIONS[collectionId] || COLLECTIONS.barrel;
  const { addToCart } = useCart();

  // 3D Model interactive state
  const [activeLens, setActiveLens] = useState<
    "ruby" | "obsidian" | "amber" | "emerald"
  >(collection.modelConfig.defaultLens);
  const [activeFrame, setActiveFrame] = useState<
    "gold" | "gunmetal" | "bronze"
  >(collection.modelConfig.frameType);

  // Sync state when collection changes
  useEffect(() => {
    setActiveLens(collection.modelConfig.defaultLens);
    setActiveFrame(collection.modelConfig.frameType);
    window.scrollTo(0, 0);
  }, [
    collectionId,
    collection.modelConfig.defaultLens,
    collection.modelConfig.frameType,
  ]);

  const handleEnquire = (product: CollectionProduct) => {
    try {
      playVaultAcquisition();
    } catch {}
    addToCart({
      id: product.id,
      name: product.name,
      frame: product.material,
      lens: "Custom Mineral Lenses",
      price: product.price,
      priceDisplay: product.priceDisplay,
      image: product.quad,
    });
    confirmAddedToBag(
      collectionHeading(product.name),
      product.priceDisplay.toLowerCase()
    );
  };

  const handleAcquireBespoke = () => {
    try {
      playVaultAcquisition();
    } catch {}
    const frameName =
      activeFrame === "gold"
        ? "18K Brushed Gold"
        : activeFrame === "gunmetal"
          ? "Gunmetal Obsidian"
          : "Antique Bronze";
    const lensName =
      activeLens === "ruby"
        ? "Custom Ruby Mineral Lenses"
        : activeLens === "obsidian"
          ? "Polarized Smoke Mineral Lenses"
          : activeLens === "amber"
            ? "Amber Honey Mineral Lenses"
            : "Emerald Beryl Mineral Lenses";

    addToCart({
      id: `${collection.id}-bespoke-${activeFrame}-${activeLens}`,
      name: `${collection.title} Bespoke 3D Edition`,
      frame: frameName,
      lens: lensName,
      price: 18000,
      priceDisplay: "AED 18,000",
      image: collection.frames,
    });
    confirmAddedToBag(
      collectionHeading(`${collection.title} bespoke edition`),
      "aed 18,000"
    );
  };

  // Safe product mapping
  const p1 = collection.products[0];
  const p2 = collection.products[1];
  const p3 = collection.products[2];
  const p4 = collection.products[3];

  return (
    <div className="collection-page relative w-full min-h-screen bg-[#F9F6F0] text-[#2A241D] selection:bg-[#2A241D] selection:text-[#F9F6F0] overflow-hidden">
      {/* Official CJ Logo Sidebar Trigger */}
      <CheetahBar dark />

      {/* Centered Transparent Cheeta Jewels Header Wordmark */}
      <HeaderWordmark dark={false} />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC FILM HERO : DISSOLVING INTO WARM LUXURY BEIGE                */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[70svh] md:h-[82svh] overflow-hidden bg-black select-none">
        <CampaignVideo
          key={collection.video}
          src={collection.video}
          poster={collection.stills[0]}
          className="w-full h-full object-cover object-center pointer-events-none brightness-[0.85] contrast-[1.08]"
        />

        {/* Seamless Dissolve into warm beige #F9F6F0 */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 md:h-56 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #F9F6F0 100%)",
          }}
        />
      </section>

      {/* ========================================================================= */}
      {/* 2. COLLECTION MANIFESTO : TIGHTENED EDITORIAL RHYTHM                      */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 pt-10 md:pt-16 pb-12 md:pb-16 max-w-5xl mx-auto text-center select-none">
        <ScrollReveal>
          <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] font-normal leading-[1.05] tracking-tight text-[#2A241D]">
            {collectionHeading(collection.pageTitle)}
          </h1>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. EDITORIAL STILL LIFE : GENTLE MONSTER UNBOXED PHOTOGRAPHY SPREAD      */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-12 md:py-20 max-w-7xl mx-auto select-none">
        {/* Lead Hero Plate : Unboxed Borderless Editorial Photography */}
        <ScrollReveal className="w-full flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden shadow-[0_20px_50px_rgba(42,36,29,0.07)]">
              <img
                src={collection.stills[0]}
                alt={`${collectionHeading(collection.title)} editorial portrait`}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetric Offset Duet : Unboxed Architectural Crops */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 mt-16 md:mt-24 items-start">
          <ScrollReveal delay={90} className="col-span-1 md:col-span-7">
            <div className="w-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_20px_45px_rgba(42,36,29,0.06)]">
                <img
                  src={collection.stills[1]}
                  alt={`${collectionHeading(collection.title)} detail`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={180}
            className="col-span-1 md:col-span-5 md:mt-24"
          >
            <div className="w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-[0_20px_45px_rgba(42,36,29,0.06)]">
                <img
                  src={collection.stills[2]}
                  alt={`${collectionHeading(collection.title)} architectural angle`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE 360° INSPECTION : UNBOXED FLOATING VIRTUAL VITRINE                 */}
      {/* ========================================================================= */}
      <section
        id="frame-study"
        className="relative w-full px-6 sm:px-12 md:px-20 py-10 md:py-12 max-w-6xl mx-auto"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
            Frame study
          </h2>
          <span className="font-sans text-xs text-[#2A241D]/65">
            drag or use arrow keys to turn
          </span>
        </div>
        <Eyewear3DModel
          key={collection.id}
          frameType={activeFrame}
          lensType={activeLens}
          fallbackImage={collection.frames}
          className="w-full h-[340px] sm:h-[min(58svh,520px)]"
        />
        <div className="collection-study-options">
          <div
            className="collection-lenses"
            role="group"
            aria-label="lens colour"
          >
            {collection.modelConfig.availableLenses.map(lens => (
              <button
                key={lens.id}
                type="button"
                aria-pressed={activeLens === lens.id}
                onClick={() => setActiveLens(lens.id)}
              >
                {lens.id}
              </button>
            ))}
          </div>
          <AcquisitionButton onClick={handleAcquireBespoke}>
            acquire bespoke · aed 18,000
          </AcquisitionButton>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EYEWEAR EDITIONS : GENTLE MONSTER BOXLESS GALLERY                      */}
      {/* ========================================================================= */}
      <section
        id="frames"
        className="relative w-full px-6 sm:px-12 md:px-20 pt-16 md:pt-24 pb-28 md:pb-36 max-w-7xl mx-auto select-none"
      >
        {/* Curatorial Header */}
        <div className="pb-6 mb-14 md:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#2A241D] tracking-tight">
            {collectionHeading(`${collection.title} editions`)}
          </h2>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* PIECE 01: THE FLAGSHIP SILHOUETTE (ASYMMETRIC MONUMENTAL SPOTLIGHT)   */}
        {/* --------------------------------------------------------------------- */}
        {p1 && (
          <ScrollReveal className="w-full mb-24 md:mb-36">
            <div
              className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center cursor-pointer"
              onClick={() => handleEnquire(p1)}
            >
              {/* Left / Center: Unboxed Eyewear Floating Free */}
              <div className="lg:col-span-7 relative flex items-center justify-center py-8 sm:py-14">
                <img
                  src={p1.quad}
                  alt={collectionHeading(p1.name)}
                  loading="lazy"
                  className="w-full max-w-xl max-h-[380px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] filter drop-shadow-[0_24px_38px_rgba(42,36,29,0.12)] group-hover:drop-shadow-[0_32px_48px_rgba(42,36,29,0.18)]"
                />
              </div>

              {/* Right: Editorial Narrative Floating Beside */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4 px-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#2A241D] tracking-tight leading-snug  transition-colors">
                  {collectionHeading(p1.name)}
                </h3>

                <div className="pt-2 flex items-baseline gap-2 font-serif text-2xl text-[#2A241D]">
                  <span>{p1.priceDisplay.toLowerCase()}</span>
                </div>

                <div className="pt-3">
                  <AcquisitionButton
                    onClick={e => {
                      e.stopPropagation();
                      handleEnquire(p1);
                    }}
                  >
                    Acquire Edition
                  </AcquisitionButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* PIECES 02 & 03: ASYMMETRIC SCULPTURAL DUET (OFFSET RUNWAY)            */}
        {/* --------------------------------------------------------------------- */}
        {(p2 || p3) && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start mb-24 md:mb-36">
            {/* Piece 02: Offset Left */}
            {p2 && (
              <ScrollReveal delay={80} className="col-span-1 md:col-span-6">
                <div
                  className="group flex flex-col cursor-pointer"
                  onClick={() => handleEnquire(p2)}
                >
                  {/* Floating Frame */}
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center py-6 sm:py-10">
                    <img
                      src={p2.quad}
                      alt={collectionHeading(p2.name)}
                      loading="lazy"
                      className="w-full max-w-md max-h-[300px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] filter drop-shadow-[0_20px_35px_rgba(42,36,29,0.11)] group-hover:drop-shadow-[0_28px_45px_rgba(42,36,29,0.16)]"
                    />
                  </div>

                  {/* Metadata Floating Beneath */}
                  <div className="mt-4 flex flex-col space-y-1.5 px-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2A241D] tracking-tight  transition-colors">
                      {collectionHeading(p2.name)}
                    </h3>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-serif text-lg text-[#2A241D]">
                        {p2.priceDisplay.toLowerCase()}
                      </span>
                      <AcquisitionButton
                        onClick={e => {
                          e.stopPropagation();
                          handleEnquire(p2);
                        }}
                      >
                        Acquire
                      </AcquisitionButton>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Piece 03: Offset Right with Vertical Stagger */}
            {p3 && (
              <ScrollReveal
                delay={160}
                className="col-span-1 md:col-span-6 md:mt-24"
              >
                <div
                  className="group flex flex-col cursor-pointer"
                  onClick={() => handleEnquire(p3)}
                >
                  {/* Floating Frame */}
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center py-6 sm:py-10">
                    <img
                      src={p3.quad}
                      alt={collectionHeading(p3.name)}
                      loading="lazy"
                      className="w-full max-w-md max-h-[300px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] filter drop-shadow-[0_20px_35px_rgba(42,36,29,0.11)] group-hover:drop-shadow-[0_28px_45px_rgba(42,36,29,0.16)]"
                    />
                  </div>

                  {/* Metadata Floating Beneath */}
                  <div className="mt-4 flex flex-col space-y-1.5 px-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2A241D] tracking-tight  transition-colors">
                      {collectionHeading(p3.name)}
                    </h3>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-serif text-lg text-[#2A241D]">
                        {p3.priceDisplay.toLowerCase()}
                      </span>
                      <AcquisitionButton
                        onClick={e => {
                          e.stopPropagation();
                          handleEnquire(p3);
                        }}
                      >
                        Acquire
                      </AcquisitionButton>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* PIECE 04: THE ARCHIVAL MONOLITH (CENTERED SCULPTURAL FINALE)          */}
        {/* --------------------------------------------------------------------- */}
        {p4 && (
          <ScrollReveal delay={120} className="w-full flex justify-center">
            <div
              className="group w-full max-w-3xl flex flex-col items-center text-center cursor-pointer"
              onClick={() => handleEnquire(p4)}
            >
              {/* Floating Frame */}
              <div className="relative w-full aspect-[16/9] flex items-center justify-center py-6 sm:py-12">
                <img
                  src={p4.quad}
                  alt={collectionHeading(p4.name)}
                  loading="lazy"
                  className="w-full max-w-lg max-h-[340px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] filter drop-shadow-[0_24px_38px_rgba(42,36,29,0.12)] group-hover:drop-shadow-[0_32px_48px_rgba(42,36,29,0.18)]"
                />
              </div>

              {/* Metadata Floating Beneath */}
              <div className="mt-4 flex flex-col items-center space-y-2 px-4 max-w-xl">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2A241D] tracking-tight  transition-colors">
                  {collectionHeading(p4.name)}
                </h3>
                <div className="pt-2 flex items-center gap-4">
                  <span className="font-serif text-xl text-[#2A241D]">
                    {p4.priceDisplay.toLowerCase()}
                  </span>
                  <AcquisitionButton
                    onClick={e => {
                      e.stopPropagation();
                      handleEnquire(p4);
                    }}
                  >
                    Acquire Edition
                  </AcquisitionButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 7. NEXT COLLECTION PORTAL                                                  */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[60svh] overflow-hidden select-none bg-black">
        <Link
          href={`/collection/${collection.nextId}`}
          onClick={() => {
            try {
              playMetallicClick();
            } catch {}
          }}
          className="group block relative w-full h-full cursor-pointer"
          aria-label={`Go to next collection: ${collectionHeading(collection.nextName)}`}
        >
          <img
            src={collection.nextCampaign}
            alt={`Next collection: ${collectionHeading(collection.nextName)}`}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.7]"
          />

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-700 flex flex-col items-center justify-center text-center p-6 text-white">
            <span className="font-sans text-xs text-white/70 mb-3 block font-normal lowercase tracking-[0.2em]">
              next destination
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,6vw,5rem)] font-normal tracking-tight leading-none">
              {collectionHeading(collection.nextName)}
            </h2>
            <div className="mt-5 flex items-center gap-2 font-sans text-xs text-white font-medium lowercase tracking-wider">
              <span>enter collection</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
