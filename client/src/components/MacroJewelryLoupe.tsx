/** Inspect the existing product photograph with a pointer loupe or touch zoom. */
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MacroJewelryLoupeProps {
  imageSrc: string;
  altText: string;
  className?: string;
  zoomLevel?: number;
}

export default function MacroJewelryLoupe({
  imageSrc,
  altText,
  className = "",
  zoomLevel = 3.5,
}: MacroJewelryLoupeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
    percentX: 50,
    percentY: 50,
  });

  const touchLayout = useMediaQuery("(max-width: 767px), (pointer: coarse)");
  const [inspecting, setInspecting] = useState(false);
  useEffect(() => {
    setInspecting(false);
  }, [imageSrc]);
  useEffect(() => {
    if (!inspecting) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") setInspecting(false);
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [inspecting]);

  const loupeSize = 140; // Diameter of the loupe in pixels

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setCoords({ x, y, percentX, percentY });
  };

  if (touchLayout)
    return (
      <button
        type="button"
        className={`product-inspection ${className}`}
        aria-pressed={inspecting}
        aria-label={`${inspecting ? "full view" : "look closer"}: ${altText}`}
        onClick={() => setInspecting(value => !value)}
      >
        <span className="product-inspection-image">
          <img
            src={imageSrc}
            alt={altText}
            style={{ transform: inspecting ? "scale(1.8)" : "scale(1)" }}
          />
        </span>
        <span className="product-inspection-caption">
          {inspecting ? "full view −" : "look closer +"}
        </span>
      </button>
    );

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden cursor-crosshair select-none ${className}`}
    >
      {/* Base Product Image */}
      <img
        src={imageSrc}
        alt={altText}
        className="h-full w-full object-contain pointer-events-none drop-shadow-[0_25px_40px_rgba(0,0,0,0.07)]"
      />

      {/* Floating 4x Macro Inspection Loupe */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              left: coords.x - loupeSize / 2,
              top: coords.y - loupeSize / 2,
              width: loupeSize,
              height: loupeSize,
              pointerEvents: "none",
            }}
            className="rounded-full shadow-2xl overflow-hidden ring-2 ring-[#B8985F]/80 bg-[#F4F1E8] z-30"
          >
            {/* Magnified Image Background */}
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${imageSrc})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${zoomLevel * 100}%`,
                backgroundPosition: `${coords.percentX}% ${coords.percentY}%`,
              }}
              className="relative filter contrast-[1.08] brightness-[1.02]"
            >
              {/* Loupe Glass Glint & Optical Crosshair */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-full h-[0.5px] bg-[#6B1A2C]" />
                <div className="h-full w-[0.5px] bg-[#6B1A2C] absolute" />
              </div>
            </div>

            {/* Brass Outer Rim Bevel */}
            <div className="absolute inset-0 rounded-full border border-black/20 pointer-events-none" />
            <div className="absolute bottom-1 right-2 font-sans text-[8px] uppercase tracking-widest text-[#6B1A2C] font-semibold">
              4x
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Bottom Instruction */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-sans text-[11px] lowercase tracking-normal text-[#1A1410]/35 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
        hover to look closer
      </div>
    </div>
  );
}
