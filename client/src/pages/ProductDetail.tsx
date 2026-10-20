/**
 * RETAIL PDP : Individual Product Experience & Leopard Presentation
 * Pure luxury editorial with GT Sectra Display and GT America.
 */
import NumberFlow from "@number-flow/react";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import AcquisitionButton from "@/components/AcquisitionButton";
import HeaderWordmark from "@/components/HeaderWordmark";
import MacroJewelryLoupe from "@/components/MacroJewelryLoupe";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { collectionHeading } from "@/lib/collectionPresentation";
import { PRODUCTS } from "./Retail";
import { useBagConfirmation } from "@/hooks/useBagConfirmation";

export default function ProductDetail() {
  const confirmAddedToBag = useBagConfirmation();
  const { slug } = useParams<{ slug: string }>();
  const product =
    PRODUCTS.find(
      (p) =>
        p.slug === slug ||
        (slug?.startsWith("gun-collection") &&
          p.slug === slug.replace("gun-collection", "double-barrel")) ||
        (slug?.startsWith("double-barrel") &&
          p.slug === slug.replace("double-barrel", "gun-collection"))
    ) || PRODUCTS[0];
  const { addToCart, totalCount } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.productImage);

  const handleAdd = () => {
    playVaultAcquisition();
    addToCart({
      id: product.id,
      name: product.name,
      frame: product.frame,
      lens: product.lens,
      price: product.price,
      priceDisplay: product.priceDisplay,
      image: product.productImage,
    });
    confirmAddedToBag(product.name, product.priceDisplay);
  };

  const handleSelectImage = (img: string) => {
    playMetallicClick();
    setSelectedImage(img);
  };

  return (
    <main className="product-page min-h-screen w-full bg-[#F4F3EE] text-[#0B0B0C] selection:bg-[#0B0B0C] selection:text-[#F4F3EE]">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />


      <div className="product-shell max-w-6xl mx-auto px-6 md:px-20 py-24 md:py-36 pl-16 md:pl-28">
        {/* Navigation Breadcrumb */}
        <div className="product-breadcrumb mb-16 md:mb-24 flex items-center justify-between font-sans lowercase text-xs tracking-wider">
          <Link
            href="/retail"
            className="group inline-flex items-center gap-2 text-[#0B0B0C]/50 hover:text-[#0B0B0C] transition-colors"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            <span>retail</span>
          </Link>

          <Link
            href="/cart"
            className="text-[#0B0B0C]/50 hover:text-[#0B0B0C] transition-colors"
          >
            bag ({totalCount})
          </Link>
        </div>

        {/* 2-Column Minimalist PDP */}
        <div className="product-layout grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left: 4x Macro Inspection Stage */}
          <div className="lg:col-span-7 space-y-6">
            <div className="product-stage aspect-[4/3] relative flex items-center justify-center p-8 bg-[#EBEAE4]/40 overflow-hidden">
              <MacroJewelryLoupe
                imageSrc={selectedImage}
                altText={product.name}
                className="relative z-10 h-full w-full flex items-center justify-center"
                zoomLevel={3.5}
              />
            </div>

            {/* Thumbnail switcher if alternate image exists */}
            {product.altImage && (
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => handleSelectImage(product.productImage)}
                  className={`h-16 w-16 p-2 bg-[#EBEAE4] transition-all cursor-pointer ${
                    selectedImage === product.productImage ? "ring-1 ring-[#4A0E16]" : "opacity-50 hover:opacity-100"
                  }`}
                  aria-label="primary product view"
                >
                  <img src={product.productImage} alt="front view" className="h-full w-full object-contain" />
                </button>
                <button
                  onClick={() => handleSelectImage(product.altImage!)}
                  className={`h-16 w-16 p-2 bg-[#EBEAE4] transition-all cursor-pointer ${
                    selectedImage === product.altImage ? "ring-1 ring-[#4A0E16]" : "opacity-50 hover:opacity-100"
                  }`}
                  aria-label="alternate perspective view"
                >
                  <img src={product.altImage} alt="alternate view" className="h-full w-full object-contain" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Essential Information & Action */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-[#0B0B0C]">
                {collectionHeading(product.name)}
              </h1>
              <p className="font-sans lowercase text-xs tracking-wider text-[#0B0B0C]/60 mt-2">
                {product.frame} · {product.lens}
              </p>

              {/* Swiss Mechanical NumberFlow Price Display */}
              <div className="mt-8 flex items-baseline gap-2 font-serif text-3xl sm:text-4xl font-normal text-[#0B0B0C]">
                <span className="lowercase tracking-wide">aed</span>
                <NumberFlow value={product.price} format={{ useGrouping: true }} />
              </div>
            </div>

            {/* Acquisition Action */}
            <div className="pt-2 space-y-4">
              <AcquisitionButton onClick={handleAdd}>Acquire</AcquisitionButton>
            </div>
          </div>
        </div>

        {/* Leopard Packaging Section on PDP */}
        <div className="mt-24 md:mt-36 bg-[#141211] text-[#F4F3EE] shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center overflow-hidden">
          <div className="lg:col-span-7 p-8 md:p-12 space-y-3">
            <h3 className="font-serif capitalize text-2xl md:text-3xl font-normal text-[#F4F3EE]">
              the leopard velvet vault
            </h3>
            <p className="font-sans text-sm text-[#F4F3EE]/70 leading-relaxed max-w-md">
              Each acquisition is encased in handcrafted Italian leopard velvet with imperial burgundy silk and solid gold hardware.
            </p>
          </div>

          <div className="lg:col-span-5 h-full min-h-[240px] md:min-h-[300px] overflow-hidden">
            <img
              src="/manus-storage/cheeta-leopard-vault-box.jpg"
              alt="Italian Leopard Velvet Box with 18K Solid Gold Seal"
              className="h-full w-full object-cover filter contrast-[1.05]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
