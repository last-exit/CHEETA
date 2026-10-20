import React from "react";

interface HayratBespokeMotifsProps {
  className?: string;
}

/**
 * BESPOKE HAYRAT BACKGROUND MOTIFS
 * Handcrafted vector artwork celebrating Hayrat ~Fine Gems & Arts~:
 * 1. Precision gemological facet geometries (emerald-cut octagons, diamond kite facets, optical pavilion angles).
 * 2. Antique art arabesque curves and master jewelers' compass arcs.
 * 3. Subtle connecting gem lattice.
 * 
 * Rendered at ultra-low baseline opacity (3% to 4%) with interactive discovery
 * hover warming (blooming to 16% opacity with golden sheen) rewarding curious users.
 */
export default function HayratBespokeMotifs({ className = "" }: HayratBespokeMotifsProps) {
  const hoverClass =
    "pointer-events-auto cursor-default hover:opacity-[0.16] hover:scale-[1.03] hover:text-[#D4AF37] hover:drop-shadow-[0_0_14px_rgba(212,175,55,0.25)] transition-all duration-700 ease-out";

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Top-Right: Master Gemological Facet Grid (Emerald & Brilliant Cuts) */}
      <svg
        aria-label="Hayrat Gemological Facet Grid"
        className={`absolute -top-16 -right-16 w-96 sm:w-[520px] h-auto opacity-[0.038] text-[#254B38] ${hoverClass}`}
        viewBox="0 0 450 450"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {/* Step-cut Emerald Geometry */}
        <polygon points="120,40 330,40 390,100 390,260 330,320 120,320 60,260 60,100" />
        <polygon points="145,65 305,65 355,115 355,245 305,295 145,295 95,245 95,115" strokeDasharray="4 4" strokeWidth="0.8" />
        <polygon points="175,95 275,95 315,135 315,225 275,265 175,265 135,225 135,135" strokeWidth="0.9" />

        {/* Miter facet corner lines */}
        <line x1="120" y1="40" x2="175" y2="95" />
        <line x1="330" y1="40" x2="275" y2="95" />
        <line x1="390" y1="100" x2="315" y2="135" />
        <line x1="390" y1="260" x2="315" y2="225" />
        <line x1="330" y1="320" x2="275" y2="265" />
        <line x1="120" y1="320" x2="175" y2="265" />
        <line x1="60" y1="260" x2="135" y2="225" />
        <line x1="60" y1="100" x2="135" y2="135" />

        {/* Master Gemological Compass Arcs */}
        <circle cx="225" cy="180" r="160" strokeDasharray="3 6" strokeWidth="0.6" />
        <circle cx="225" cy="180" r="12" strokeWidth="1" />
        <line x1="225" y1="10" x2="225" y2="350" strokeDasharray="6 6" strokeWidth="0.5" />
        <line x1="55" y1="180" x2="395" y2="180" strokeDasharray="6 6" strokeWidth="0.5" />

      </svg>

      {/* Mid-Left: Antique Art Filigree & Arabesque Scrollwork */}
      <svg
        aria-label="Hayrat Thirty-Year Antique Arabesque"
        className={`absolute top-[36%] -left-12 sm:left-2 w-80 sm:w-[420px] h-auto opacity-[0.035] text-[#D4AF37] ${hoverClass}`}
        viewBox="0 0 380 340"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      >
        {/* Flowing classical scrollwork celebrating thirty years of antique collecting */}
        <path d="M40,280 C60,200 130,160 190,190 C250,220 280,180 270,120 C260,60 190,50 150,90 C110,130 130,180 180,170 C220,160 230,120 200,105" />
        <path d="M60,300 C80,220 160,190 220,220 C280,250 320,200 300,130 C280,70 210,70 170,110" strokeWidth="0.75" strokeDasharray="5 5" />
        {/* Antique rosette finials */}
        <circle cx="200" cy="105" r="3.5" fill="currentColor" opacity="0.5" />
        <circle cx="180" cy="170" r="2.5" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Lower-Right: Brilliant Diamond Facet Web & Gratitude Rosette */}
      <svg
        aria-label="Brilliant Cut Diamond & Gratitude Touchmark"
        className={`absolute bottom-20 right-[8%] w-72 sm:w-96 h-auto opacity-[0.032] text-[#254B38] ${hoverClass}`}
        viewBox="0 0 320 320"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {/* Radiant Round Brilliant Pavilion & Crown lines */}
        <circle cx="160" cy="160" r="140" strokeWidth="0.8" />
        <circle cx="160" cy="160" r="90" strokeDasharray="4 4" strokeWidth="0.7" />
        <polygon points="160,30 250,70 290,160 250,250 160,290 70,250 30,160 70,70" />
        <polygon points="160,70 220,100 250,160 220,220 160,250 100,220 70,160 100,100" strokeWidth="0.8" />
        {/* Star Facet rays */}
        <line x1="160" y1="30" x2="160" y2="70" />
        <line x1="250" y1="70" x2="220" y2="100" />
        <line x1="290" y1="160" x2="250" y2="160" />
        <line x1="250" y1="250" x2="220" y2="220" />
        <line x1="160" y1="290" x2="160" y2="250" />
        <line x1="70" y1="250" x2="100" y2="220" />
        <line x1="30" y1="160" x2="70" y2="160" />
        <line x1="70" y1="70" x2="100" y2="100" />
      </svg>
    </div>
  );
}

