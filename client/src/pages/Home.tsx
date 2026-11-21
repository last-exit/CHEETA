import React, { useEffect, useRef, useState } from "react";
import { HouseFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import HomeCinema from "@/components/HomeCinema";
import GunCollection from "@/components/GunCollection";
import Masquerade from "@/components/Masquerade";
import RetailSection from "@/components/RetailSection";
import PhilosophySection from "@/components/PhilosophySection";
import TigerSculptureSection from "@/components/TigerSculptureSection";
import { useEditorialMotion } from "@/hooks/useEditorialMotion";
import { readBrandAnchors } from "@/lib/brandChrome";
import "./Home.css";

/** A campaign-led entrance to the house. Purchasing remains in Retail. */
export default function Home() {
  const page = useRef<HTMLElement>(null);
  const [heroLight, setHeroLight] = useState(true);
  const [lightPaw, setLightPaw] = useState(true);
  const [lightMonogram, setLightMonogram] = useState(true);
  useEditorialMotion(page);

  useEffect(() => {
    const root = page.current;
    let frame = 0;
    const sync = () => {
      frame = 0;
      const media = root?.querySelectorAll<HTMLElement>(
        '[data-home-dark="true"]'
      );
      const dark = (x: number, y: number) =>
        Array.from(media ?? []).some(item => {
          const r = item.getBoundingClientRect();
          return r.left <= x && r.right >= x && r.top <= y && r.bottom >= y;
        });
      const { paw, monogram } = readBrandAnchors();
      setLightPaw(dark(paw.x, paw.y));
      setLightMonogram(dark(monogram.x, monogram.y));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    root?.addEventListener("load", schedule, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root?.removeEventListener("load", schedule, true);
    };
  }, [heroLight]);

  return (
    <main id="top" ref={page} className="home-page home-editorial home-art-direction">
      <CheetahBar tone={lightPaw ? "light" : "dark"} />
      <HeaderWordmark dark={lightMonogram} />
      <h1 className="sr-only">Cheeta Jewels</h1>

      {/* Opening Film Hero */}
      <HomeCinema onTone={setHeroLight} />

      {/* Chapter One: The Gun Collection */}
      <GunCollection />

      {/* Chapter Two: The Masquerade */}
      <Masquerade />

      {/* Retail Presentation */}
      <RetailSection />

      {/* The Philosophy: Diamonds are made in the rough */}
      <PhilosophySection />

      {/* House of Icon Livin': Guarded, patient, never in a hurry */}
      <TigerSculptureSection />

      <HouseFooter />
    </main>
  );
}
