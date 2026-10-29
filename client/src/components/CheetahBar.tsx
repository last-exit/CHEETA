/**
 * CHEETAH BAR: Chrome Hearts Inspired Transparent Dropdown
 *
 * - Triggered by the Cheetah Paw Logo (top-left)
 * - Drops down directly beneath the Cheetah Paw
 * - 100% TRANSPARENT (no background, no translucent box, no border)
 * - No top header clutter inside the menu
 * - No bottom lines or dubai atelier footer
 * - Strictly the 4 items with first letter capitalized:
 *     1. Collections (hover reveals sub-collections)
 *     2. Retail
 *     3. Hayrat
 *     4. Philosophy
 * - Upright GT Sectra Display
 * - Zero em dashes anywhere
 */

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { playMetallicClick } from "@/lib/soundEffects";

interface CheetahBarProps {
  dark?: boolean;
  tone?: "light" | "dark";
}

const COLLECTIONS_LIST = [
  { name: "The Gun Collection", href: "/collection/barrel" },
  { name: "The Masquerade", href: "/collection/masquerade" },
];

const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

export default function CheetahBar({ dark = false, tone }: CheetahBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const menuHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const mobile = useMediaQuery("(max-width: 767px)");
  const canHover =
    useMediaQuery("(hover: hover) and (pointer: fine)") && !mobile;
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(
    () => () => {
      if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
      if (menuHoverTimeoutRef.current)
        clearTimeout(menuHoverTimeoutRef.current);
    },
    []
  );

  useEffect(() => {
    if (!isOpen || !mobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(
        dropdownRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ??
          []
      ).filter(element => element.getClientRects().length > 0);
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen, mobile]);

  const isHome = location === "/";

  // Auto-close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setCollectionsExpanded(false);
  }, [location]);

  // Keyboard shortcut: Escape to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  // Dynamic scroll detection: fade text and paw from white into deep black (#2A241D)
  // as user scrolls down from the dark hero cinema into the light character select region.
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isHome && !dark) {
      setScrollProgress(1);
      return;
    }
    if (!isHome && dark && location === "/film") {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Start fading immediately as user leaves hero top (scrollY >= 40)
      // and complete the fade to black well before character select reaches under menu (scrollY <= 360)
      const start = 40;
      const end = Math.min(360, window.innerHeight * 0.42);
      const progress = Math.min(
        1,
        Math.max(0, (scrollY - start) / (end - start))
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, dark, location]);

  const progress = tone ? (tone === "light" ? 0 : 1) : scrollProgress;

  // Calculate dynamic RGB color for text:
  // Starts at pure white rgb(255, 255, 255) at scrollY=0
  // Fades continuously to rich obsidian rgb(42, 36, 29) as you scroll down
  const r = Math.round(255 - progress * (255 - 42));
  const g = Math.round(255 - progress * (255 - 36));
  const b = Math.round(255 - progress * (255 - 29));
  const dynamicTextColor =
    mobile && isOpen ? "#2a241d" : `rgb(${r}, ${g}, ${b})`;
  const dynamicSubTextColor =
    mobile && isOpen
      ? "#6a635d"
      : `rgba(${r}, ${g}, ${b}, ${0.72 - progress * 0.05})`;

  // Hover triggers for paw and dropdown menu
  const handleMouseEnter = () => {
    if (!canHover) return;
    if (menuHoverTimeoutRef.current) {
      clearTimeout(menuHoverTimeoutRef.current);
      menuHoverTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    if (menuHoverTimeoutRef.current) {
      clearTimeout(menuHoverTimeoutRef.current);
    }
    // Generous 380ms grace window ensures smooth, natural mouse navigation without abrupt drops
    menuHoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setCollectionsExpanded(false);
    }, 380);
  };

  const toggleMenu = () => {
    try {
      playMetallicClick();
    } catch {}
    setIsOpen(prev => !prev);
  };

  const handleMouseEnterCollections = () => {
    if (!canHover) return;
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setCollectionsExpanded(true);
  };

  const handleMouseLeaveCollections = () => {
    if (!canHover) return;
    hoverTimeoutRef.current = window.setTimeout(() => {
      setCollectionsExpanded(false);
    }, 240);
  };

  const handleLinkClick = () => {
    try {
      playMetallicClick();
    } catch {}
    setIsOpen(false);
    setCollectionsExpanded(false);
  };

  const isCurrentRoute = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={mobile && isOpen ? "dialog" : undefined}
      aria-modal={mobile && isOpen ? true : undefined}
      aria-label={mobile && isOpen ? "Navigation" : undefined}
      className="house-navigation fixed top-8 left-8 sm:top-12 sm:left-12 z-50 select-none bg-transparent"
    >
      {/* =================================================================== */}
      {/* 1. CHEETAH PAW LOGO (Hover Dropdown Trigger & Scroll Crossfade)     */}
      {/* =================================================================== */}
      {mobile && isOpen && (
        <div className="house-navigation-backdrop" aria-hidden="true" />
      )}
      <button
        ref={triggerRef}
        onClick={event => {
          if (canHover && event.detail > 0) setIsOpen(true);
          else toggleMenu();
        }}
        onMouseEnter={handleMouseEnter}
        aria-label={isOpen ? "close navigation menu" : "open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="house-navigation-panel"
        className="house-navigation-trigger group relative flex items-center justify-center p-2.5 -ml-2.5 bg-transparent cursor-pointer focus:outline-none transition-transform duration-300 active:scale-95"
      >
        <div className="relative h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 flex items-center justify-center">
          {/* White Paw (for dark hero cinema) */}
          <motion.img
            src="/brand/cheetah-paw-white.png"
            alt="Cheetah Jewels"
            style={{ opacity: mobile && isOpen ? 0 : 1 - progress }}
            animate={{ scale: reducedMotion || mobile ? 1 : [1, 1.08, 1] }}
            transition={{
              scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }}
            className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none  transition-transform duration-300 group-hover:scale-115"
          />

          {/* Dark Paw (fades in as user scrolls down into character select region) */}
          <motion.img
            src="/brand/cheetah-paw.png"
            alt="Cheetah Jewels"
            style={{ opacity: mobile && isOpen ? 1 : progress }}
            animate={{ scale: reducedMotion || mobile ? 1 : [1, 1.08, 1] }}
            transition={{
              scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }}
            className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none  transition-transform duration-300 group-hover:scale-115"
          />
        </div>
        {mobile && isOpen && (
          <span className="house-navigation-close">close</span>
        )}
      </button>

      {/* =================================================================== */}
      {/* 2. TRANSPARENT DROP DOWN (Directly beneath cheetah paw logo)        */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: TRANSITION_EASE }}
            onMouseEnter={handleMouseEnter}
            className="house-navigation-panel pt-3 sm:pt-4 bg-transparent p-0 text-left w-max relative"
          >
            <nav
              id="house-navigation-panel"
              aria-label="Main navigation"
              className="relative z-10 flex flex-col space-y-3 sm:space-y-4"
            >
              {/* 1. Collections (Hover dropdown for sub-collections) */}
              <div
                className="flex flex-col"
                onMouseEnter={handleMouseEnterCollections}
                onMouseLeave={handleMouseLeaveCollections}
              >
                <button
                  type="button"
                  aria-expanded={collectionsExpanded}
                  aria-controls="house-collections"
                  onClick={() => {
                    try {
                      playMetallicClick();
                    } catch {}
                    setCollectionsExpanded(prev => !prev);
                  }}
                  className="flex items-center justify-between group cursor-pointer focus:outline-none w-max"
                >
                  <span
                    style={{ color: dynamicTextColor }}
                    className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 group-hover:translate-x-1"
                  >
                    Collections
                  </span>
                </button>

                {/* Sub-collections dropdown */}
                <AnimatePresence>
                  {collectionsExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: TRANSITION_EASE }}
                      id="house-collections"
                      className="house-collections pl-4 py-2 flex flex-col space-y-2 overflow-hidden"
                    >
                      {COLLECTIONS_LIST.map(col => {
                        const isActive = isCurrentRoute(col.href);
                        return (
                          <Link
                            key={col.href}
                            href={col.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={handleLinkClick}
                            style={{
                              color: isActive
                                ? dynamicTextColor
                                : dynamicSubTextColor,
                            }}
                            className="font-sans text-xs sm:text-sm tracking-wide transition-all duration-150 hover:translate-x-1 hover:opacity-100"
                          >
                            <span>{col.name}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. Retail */}
              <div>
                <Link
                  href="/retail"
                  aria-current={isCurrentRoute("/retail") ? "page" : undefined}
                  onClick={handleLinkClick}
                  style={{ color: dynamicTextColor }}
                  className="inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 hover:translate-x-1"
                >
                  <span>Retail</span>
                </Link>
              </div>

              {/* 3. Hayrat */}
              <div>
                <Link
                  href="/hayrat"
                  aria-current={isCurrentRoute("/hayrat") ? "page" : undefined}
                  onClick={handleLinkClick}
                  style={{ color: dynamicTextColor }}
                  className="inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 hover:translate-x-1"
                >
                  <span>Hayrat</span>
                </Link>
              </div>

              {/* 4. Philosophy */}
              <div>
                <Link
                  href="/philosophy"
                  aria-current={
                    isCurrentRoute("/philosophy") ? "page" : undefined
                  }
                  onClick={handleLinkClick}
                  style={{ color: dynamicTextColor }}
                  className="inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 hover:translate-x-1"
                >
                  <span>Philosophy</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
