/**
 * CENTERED CJ LOGO HEADER
 * Floating header that redirects to homepage ("/") with soft metallic click.
 * Art-directed jewel color based on each specific collection/page destination.
 * Stays visible at top while providing a frosted white blend with scrolling content.
 */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { playMetallicClick } from "@/lib/soundEffects";

interface HeaderWordmarkProps {
  dark?: boolean;
  color?: string;
  className?: string;
}

// Map every page destination to its distinct luxury jewelry color
export function getPageColor(pathname: string, isDark: boolean): string {
  // Pure dark cinema mode (e.g. /film)
  if (isDark || pathname === "/film") {
    return "#FFFFFF"; // Platinum White on black cinema
  }

  // The Collections
  if (pathname === "/collection/barrel") {
    return "#D4AF37"; // 18K Brushed Gold (The Gun Collection)
  }
  if (pathname === "/collection/masquerade") {
    return "#8A0E1C"; // Venetian Crimson Ruby (The Masquerade)
  }
  if (pathname === "/collection/maharaja") {
    return "#0F5C43"; // Royal Muzo Emerald (The Maharaja)
  }
  if (pathname === "/collection/savanah") {
    return "#C97D28"; // Warm Safari Amber / Tiger Eye (The Savanah)
  }
  if (pathname.startsWith("/collection")) {
    return "#D4AF37"; // 18K Sovereign Gold
  }

  // Retail & Eyewear Atelier
  if (pathname.startsWith("/retail") || pathname.startsWith("/eyewear")) {
    return "#B8860B"; // Champagne Atelier Antique Gold
  }

  // Product Details (aware of variant minerals)
  if (pathname.startsWith("/product")) {
    if (
      pathname.includes("01") ||
      pathname.includes("ruby") ||
      pathname.includes("masquerade")
    ) {
      return "#8A0E1C"; // Ruby Mineral
    }
    if (
      pathname.includes("02") ||
      pathname.includes("obsidian") ||
      pathname.includes("smoke")
    ) {
      return "#2A241D"; // Gunmetal Obsidian
    }
    if (
      pathname.includes("03") ||
      pathname.includes("bronze") ||
      pathname.includes("amber")
    ) {
      return "#B86314"; // Honey Amber Bronze
    }
    return "#D4AF37"; // 18K Gold
  }

  // Philosophy / Story
  if (pathname.startsWith("/philosophy") || pathname.startsWith("/story")) {
    return "#8A0E1C"; // Imperial Burgundy
  }

  // Hayrat Foundation
  if (pathname.startsWith("/hayrat")) {
    return "#0F5C43"; // Muzo Colombian Emerald Green
  }

  // The Founder
  if (pathname.startsWith("/founder")) {
    return "#B86314"; // Warm Amber Honey
  }

  // The House
  if (pathname.startsWith("/house")) {
    return "#8C5A2B"; // Bespoke Saddle Cognac
  }

  // Cart / The Vault
  if (pathname.startsWith("/cart")) {
    return "#D4AF37"; // 18K Vault Sovereign Gold
  }

  // Customer Care & Service
  if (
    pathname.startsWith("/shipping") ||
    pathname.startsWith("/returns") ||
    pathname.startsWith("/care") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/accessibility")
  ) {
    return "#3D352E"; // Obsidian Charcoal
  }

  // Default Home
  return "#2A241D";
}

export default function HeaderWordmark({
  dark = false,
  color,
  className = "",
}: HeaderWordmarkProps) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      // On home page, reveal as user scrolls past hero towards character select
      const threshold = isHomePage
        ? Math.min(220, window.innerHeight * 0.3)
        : 20;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleClick = (e: React.MouseEvent) => {
    try {
      playMetallicClick();
    } catch {}
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // On home, reveal when scrolling down into character select; on subpages, always present
  const isVisible = isHomePage ? scrolled : true;
  const finalColor = color || getPageColor(location, dark);

  return (
    <header
      className={`house-wordmark fixed top-0 left-0 right-0 z-40 px-6 py-3 sm:py-4 flex items-center justify-center pointer-events-none select-none transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-3 pointer-events-none"
      } ${className}`}
    >
      <Link
        href="/"
        onClick={handleClick}
        className={`pointer-events-auto flex items-center justify-center p-2 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none bg-transparent`}
        aria-label="Cheetah Jewels - Return to Home"
        title="Cheetah Jewels - Return to Home"
      >
        {/* Dynamic-Colored Enlarged CJ Logo Monogram - Subtle & Free-Floating */}
        <div
          className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 transition-all duration-500 shrink-0"
          style={{
            backgroundColor: finalColor,
            maskImage: `url(/brand/cheeta-cj-transparent.png)`,
            WebkitMaskImage: `url(/brand/cheeta-cj-transparent.png)`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </Link>
    </header>
  );
}
