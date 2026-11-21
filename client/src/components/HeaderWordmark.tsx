import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { playMetallicClick } from "@/lib/soundEffects";

interface HeaderWordmarkProps {
  dark?: boolean;
  className?: string;
}

export default function HeaderWordmark({
  dark = false,
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
  const finalColor = dark ? "var(--house-on-inverse)" : "var(--house-accent)";

  return (
    <header
      data-visible={isVisible}
      aria-hidden={!isVisible}
      className={`house-wordmark fixed top-0 left-0 right-0 z-40 px-6 py-3 sm:py-4 flex items-center justify-center pointer-events-none select-none transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-3 pointer-events-none"
      } ${className}`}
    >
      <Link
        href="/"
        onClick={handleClick}
        className="house-wordmark-link pointer-events-auto flex items-center justify-center p-2 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none bg-transparent"
        tabIndex={isVisible ? 0 : -1}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
        aria-label="Cheeta Jewels home"
        title="Cheeta Jewels home"
      >
        {/* Dynamic-Colored Enlarged CJ Logo Monogram - Subtle & Free-Floating */}
        <div
          className="house-wordmark-symbol h-9 w-9 md:h-10 md:w-10 transition-all duration-500 shrink-0"
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
