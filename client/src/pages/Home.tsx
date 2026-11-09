import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { InformationLinks } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import HomeCinema from "@/components/HomeCinema";
import HomeObjectStudy from "@/components/HomeObjectStudy";
import HomeMasquerade from "@/components/HomeMasquerade";
import "./Home.css";

/** A campaign-led entrance to the house. Purchasing remains in Retail. */
export default function Home() {
  const page = useRef<HTMLElement>(null);
  const [heroLight, setHeroLight] = useState(true);
  const [lightPaw, setLightPaw] = useState(true);
  const [lightMonogram, setLightMonogram] = useState(true);

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
      setLightPaw(dark(innerWidth < 768 ? 40 : 64, 72));
      setLightMonogram(dark(innerWidth / 2, 48));
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

  useEffect(() => {
    const hash = window.location.hash;
    if (!["#characters", "#pieces", "#masquerade"].includes(hash)) return;
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main ref={page} className="home-page home-editorial home-art-direction">
      <CheetahBar tone={lightPaw ? "light" : "dark"} />
      <HeaderWordmark
        dark={lightMonogram}
        color={lightMonogram ? "#fafaf7" : "#6b1a2c"}
      />
      <h1 className="sr-only">Cheeta Jewels</h1>

      <HomeCinema onTone={setHeroLight} />

      <HomeObjectStudy />

      <HomeMasquerade />

      <section className="home-retail" aria-labelledby="home-retail-title">
        <div className="home-retail-stage house-container">
          <div className="home-retail-type">
            <h2 id="home-retail-title">
              Jewellery
              <br />
              &amp; <em>eyewear.</em>
            </h2>
            <Link href="/retail" className="home-campaign-action">
              explore retail{" "}
              <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
            </Link>
          </div>
          <Link
            href="/retail"
            className="home-retail-image"
            aria-label="Explore Retail"
            data-home-dark="true"
          >
            <img
              src="/home/retail-jewellery.webp"
              alt="Gold and emerald jewellery from the current retail catalogue"
              width="1664"
              height="2080"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <nav
            className="home-retail-categories"
            aria-label="Retail categories"
          >
            <Link href="/retail?category=eyewear">
              eyewear{" "}
              <ArrowUpRight size={16} strokeWidth={1.2} aria-hidden="true" />
            </Link>
            <Link href="/retail?category=jewelry">
              jewellery{" "}
              <ArrowUpRight size={16} strokeWidth={1.2} aria-hidden="true" />
            </Link>
          </nav>
        </div>
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
      </section>

      <footer className="house-footer home-footer">
        <div className="house-container">
          <Link
            href="/"
            aria-label="Return to Cheeta Jewels"
            className="home-footer-signature"
          >
            <img
              src="/brand/icon-livin-black.png"
              alt="Icon livin’."
              width="1024"
              height="258"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <InformationLinks />
        </div>
      </footer>
    </main>
  );
}
