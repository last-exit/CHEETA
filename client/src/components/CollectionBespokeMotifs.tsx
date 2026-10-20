import React from "react";

interface CollectionBespokeMotifsProps {
  collectionId: string;
  className?: string;
}

/**
 * BESPOKE COLLECTION MOTIFS
 * High-agency, collection-specific background artwork tailored to each narrative:
 * 
 * 1. "barrel" (The Gun Collection): Precision firearm rifling spiral grooves, twin cylindrical barrel contours, and subtle predatory rifling marks.
 * 2. "maharaja" (The Maharaja): Sovereign Mughal Jali architectural latticework, royal palace arch profiles, and imperial rosette jewels.
 * 3. "masquerade" (The Masquerade): Venetian mask silhouette curves, dramatic baroque drapery contours, ruby mineral facets, and mask rosettes.
 * 4. "savanah" (The Savanah): Flowing savannah wind contours.
 * 
 * All rendered in 100% vector SVG at ultra-low baseline opacity (3% to 4%) with interactive discovery
 * hover warming (blooming to 16% opacity with golden tone) rewarding curious users who glide across negative space.
 */
export default function CollectionBespokeMotifs({
  collectionId,
  className = "",
}: CollectionBespokeMotifsProps) {
  const id = collectionId.toLowerCase();

  const hoverClass =
    "pointer-events-auto cursor-default hover:opacity-[0.16] hover:scale-[1.03] hover:text-[#B8860B] hover:drop-shadow-[0_0_14px_rgba(184,134,11,0.25)] transition-all duration-700 ease-out";

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* =================================================================== */}
      {/* 1. THE GUN COLLECTION (barrel)                                       */}
      {/* =================================================================== */}
      {(id === "barrel" || id === "gun") && (
        <>
          {/* Top-Right: Firearm Rifling Spiral Grooves */}
          <svg
            aria-label="The Gun Collection · Rifling Spiral & Rosette Touchmark"
            className={`absolute -top-16 -right-16 w-96 sm:w-[480px] h-auto opacity-[0.035] text-[#2A241D] ${hoverClass}`}
            viewBox="0 0 400 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            {/* Cylindrical rifling spiral curves */}
            <circle cx="200" cy="200" r="180" strokeDasharray="6 8" strokeWidth="0.8" />
            <circle cx="200" cy="200" r="140" strokeWidth="1" />
            <circle cx="200" cy="200" r="90" strokeWidth="1.2" />
            <circle cx="200" cy="200" r="40" strokeWidth="1.5" />
            {/* Rifling twist rays (spiral lands and grooves) */}
            <path d="M200,20 C230,80 250,140 200,200" />
            <path d="M380,200 C320,230 260,250 200,200" />
            <path d="M200,380 C170,320 150,260 200,200" />
            <path d="M20,200 C80,170 140,150 200,200" />
            <path d="M327,73 C280,120 230,160 200,200" strokeDasharray="3 5" />
            <path d="M73,327 C120,280 160,230 200,200" strokeDasharray="3 5" />
            {/* Precision Technical Reticle ticks */}
            <line x1="200" y1="5" x2="200" y2="35" strokeWidth="1.5" />
            <line x1="200" y1="365" x2="200" y2="395" strokeWidth="1.5" />
            <line x1="5" y1="200" x2="35" y2="200" strokeWidth="1.5" />
            <line x1="365" y1="200" x2="395" y2="200" strokeWidth="1.5" />
          </svg>

          {/* Mid-Left: Twin Barrel Browline Contour Lines with Rosette Flutes */}
          <svg
            aria-label="Twin Barrel Architectural Browline"
            className={`absolute top-[35%] -left-12 sm:left-4 w-72 sm:w-96 h-auto opacity-[0.03] text-[#D4AF37] ${hoverClass}`}
            viewBox="0 0 360 240"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            {/* Twin parallel barrel cylinders */}
            <line x1="20" y1="60" x2="340" y2="60" strokeWidth="2" />
            <line x1="20" y1="76" x2="340" y2="76" strokeWidth="1" strokeDasharray="8 6" />
            <line x1="20" y1="92" x2="340" y2="92" strokeWidth="2" />

            <line x1="20" y1="140" x2="340" y2="140" strokeWidth="2" />
            <line x1="20" y1="156" x2="340" y2="156" strokeWidth="1" strokeDasharray="8 6" />
            <line x1="20" y1="172" x2="340" y2="172" strokeWidth="2" />

            {/* Milled fluting ticks */}
            <line x1="80" y1="45" x2="80" y2="185" strokeWidth="0.8" />
            <line x1="180" y1="45" x2="180" y2="185" strokeWidth="1" />
            <line x1="280" y1="45" x2="280" y2="185" strokeWidth="0.8" />
          </svg>

          {/* Lower Ambient Technical Crosshairs & Rosette */}
          <svg
            aria-label="Cheeta Precision Reticle Mark"
            className={`absolute bottom-28 right-[10%] w-52 sm:w-64 h-auto opacity-[0.025] text-[#2A241D] ${hoverClass}`}
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="100" cy="100" r="70" strokeWidth="0.8" />
            <line x1="100" y1="10" x2="100" y2="190" strokeWidth="0.6" strokeDasharray="4 4" />
            <line x1="10" y1="100" x2="190" y2="100" strokeWidth="0.6" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.4" />
          </svg>
        </>
      )}

      {/* =================================================================== */}
      {/* 2. THE MAHARAJA COLLECTION (maharaja)                                */}
      {/* =================================================================== */}
      {id === "maharaja" && (
        <>
          {/* Top-Right: Sovereign Mughal Jali Architectural Lattice */}
          <svg
            aria-label="Sovereign Mughal Jali & Emerald Facet Lattice"
            className={`absolute -top-12 -right-12 w-88 sm:w-[460px] h-auto opacity-[0.038] text-[#0F5C43] ${hoverClass}`}
            viewBox="0 0 400 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            {/* Mughal Jali Octagonal geometric lattice pattern */}
            <path d="M100,50 L150,50 L185,85 L185,135 L150,170 L100,170 L65,135 L65,85 Z" />
            <path d="M230,50 L280,50 L315,85 L315,135 L280,170 L230,170 L195,135 L195,85 Z" />
            <path d="M100,180 L150,180 L185,215 L185,265 L150,300 L100,300 L65,265 L65,215 Z" />
            <path d="M230,180 L280,180 L315,215 L315,265 L280,300 L230,300 L195,265 L195,215 Z" />
            {/* Connecting diamond interlocks */}
            <polygon points="185,135 230,170 195,215 150,170" strokeDasharray="2 3" />
            <polygon points="315,135 360,170 325,215 280,170" strokeDasharray="2 3" />
            {/* Emerald faceted cuts */}
            <polygon points="125,90 145,110 125,130 105,110" strokeWidth="0.8" />
            <polygon points="255,90 275,110 255,130 235,110" strokeWidth="0.8" />
            {/* Central Rosette Spot */}
            <circle cx="125" cy="110" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="255" cy="110" r="3" fill="currentColor" opacity="0.6" />
          </svg>

          {/* Mid-Left: Palace Arched Curve Silhouette */}
          <svg
            aria-label="Mughal Sovereign Arch Curve"
            className={`absolute top-[40%] -left-8 sm:left-6 w-72 sm:w-88 h-auto opacity-[0.032] text-[#D4AF37] ${hoverClass}`}
            viewBox="0 0 320 320"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            {/* Cusped Mughal Arch curve */}
            <path d="M40,280 L40,160 C40,120 70,100 110,80 C140,65 160,20 160,20 C160,20 180,65 210,80 C250,100 280,120 280,160 L280,280" />
            <path d="M60,280 L60,165 C60,130 85,115 120,95 C145,80 160,45 160,45 C160,45 175,80 200,95 C235,115 260,130 260,165 L260,280" strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="160" cy="20" r="3" fill="currentColor" opacity="0.6" />
          </svg>
        </>
      )}

      {/* =================================================================== */}
      {/* 3. THE MASQUERADE COLLECTION (masquerade)                            */}
      {/* =================================================================== */}
      {id === "masquerade" && (
        <>
          {/* Top-Right: Venetian Mask Flowing Browline Contours */}
          <svg
            aria-label="Venetian Masquerade Contours"
            className={`absolute -top-12 -right-8 w-88 sm:w-[460px] h-auto opacity-[0.036] text-[#8A0E1C] ${hoverClass}`}
            viewBox="0 0 400 320"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            {/* Dramatic masquerade almond eye contour */}
            <path d="M40,180 C80,100 180,80 220,130 C260,180 340,160 380,80" />
            <path d="M40,180 C90,220 170,240 220,170 C270,110 330,120 380,80" strokeWidth="0.9" />
            {/* Baroque mask plume flourishes */}
            <path d="M220,130 C230,80 280,40 330,50 C370,60 380,110 340,130 C300,150 260,120 280,90" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M200,150 C180,90 120,60 70,80 C30,100 30,150 80,160" strokeWidth="0.8" />
            <circle cx="220" cy="130" r="3.5" fill="currentColor" opacity="0.6" />
          </svg>

          {/* Mid-Left: Ruby Mineral Facet Geometry */}
          <svg
            aria-label="Ruby Brilliant Facet Web"
            className={`absolute top-[38%] -left-10 sm:left-6 w-64 sm:w-80 h-auto opacity-[0.03] text-[#8A0E1C] ${hoverClass}`}
            viewBox="0 0 300 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {/* Brilliant oval facet web */}
            <polygon points="150,30 230,80 260,160 220,240 150,270 80,240 40,160 70,80" />
            <polygon points="150,70 200,100 220,160 190,210 150,230 110,210 80,160 100,100" strokeDasharray="3 4" strokeWidth="0.8" />
            <line x1="150" y1="30" x2="150" y2="70" />
            <line x1="230" y1="80" x2="200" y2="100" />
            <line x1="260" y1="160" x2="220" y2="160" />
            <line x1="220" y1="240" x2="190" y2="210" />
            <line x1="150" y1="270" x2="150" y2="230" />
            <line x1="80" y1="240" x2="110" y2="210" />
            <line x1="40" y1="160" x2="80" y2="160" />
            <line x1="70" y1="80" x2="100" y2="100" />
          </svg>
        </>
      )}

      {/* =================================================================== */}
      {/* 4. THE SAVANAH COLLECTION (savanah)                                 */}
      {/* =================================================================== */}
      {id === "savanah" && (
        <>
          {/* Mid-Left: Savannah Wind Contour Curves */}
          <svg
            aria-label="Savannah Wind & Dune Flow"
            className={`absolute top-[42%] -left-8 sm:left-4 w-72 sm:w-96 h-auto opacity-[0.03] text-[#C97D28] ${hoverClass}`}
            viewBox="0 0 360 220"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M20,60 C100,40 180,120 260,80 C310,55 340,70 360,90" />
            <path d="M20,95 C110,75 170,150 250,115 C300,90 330,105 360,125" strokeWidth="0.8" strokeDasharray="6 6" />
            <path d="M20,130 C90,110 190,180 270,150 C320,130 340,140 360,160" strokeWidth="1" />
          </svg>
        </>
      )}
    </div>
  );
}

