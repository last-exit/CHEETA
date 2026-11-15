import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { HouseFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import HomeCinema from "@/components/HomeCinema";
import HomeObjectStudy from "@/components/HomeObjectStudy";
import HomeMasquerade from "@/components/HomeMasquerade";
import { useEditorialMotion } from "@/hooks/useEditorialMotion";
import { readBrandAnchors } from "@/lib/brandChrome";
import { RETAIL_PREVIEW_PRODUCTS, RETAIL_PRODUCTS } from "@/data/retailCatalog";
import "./Home.css";

const featuredRetailPiece = RETAIL_PRODUCTS[0] ?? RETAIL_PREVIEW_PRODUCTS[0];

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
    <main ref={page} className="home-page home-editorial home-art-direction">
      <CheetahBar tone={lightPaw ? "light" : "dark"} />
      <HeaderWordmark dark={lightMonogram} />
      <h1 className="sr-only">Cheeta Jewels</h1>

      <HomeCinema onTone={setHeroLight} />

      <HomeObjectStudy />

      <HomeMasquerade />

      <section className="home-retail" aria-labelledby="home-retail-title">
        <Link href="/retail" className="home-retail-stage house-container">
          <div className="home-retail-type">
            <h2 id="home-retail-title">Retail</h2>
            <span className="home-campaign-action">
              explore retail
              <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
            </span>
          </div>
          {featuredRetailPiece && (
            <img
              className="home-retail-image"
              src={featuredRetailPiece.productImage}
              alt=""
              loading="lazy"
              decoding="async"
            />
          )}
        </Link>
      </section>

      <section className="home-house" aria-labelledby="home-house-title">
        <div className="home-house-stage house-container">
          <div className="home-house-type">
            <h2 id="home-house-title">
              Diamonds are made
              <br />
              <em>in the rough.</em>
            </h2>
            <Link href="/philosophy" className="home-campaign-action">
              the philosophy{" "}
              <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
            </Link>
          </div>
          <div data-editorial-reveal>
            <img
              className="home-house-sculpture"
              src="/philosophy/ivory-cheetah-v2.webp"
              alt="An ivory cheetah sculpture on an acanthus-carved plinth"
              width="1895"
              height="830"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <HouseFooter />
    </main>
  );
}
