import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { InformationLinks } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import CampaignVideo from "@/components/CampaignVideo";
import HomeObjectStudy from "@/components/HomeObjectStudy";
import { useCampaignFlow } from "@/hooks/useCampaignFlow";
import { COLLECTIONS } from "@/data/collections";
import { MASQUERADE_EXHIBITION } from "@/data/campaignExhibition";
import "./Home.css";

/** A campaign-led entrance to the house. Purchasing remains in Retail. */
export default function Home() {
  const page = useRef<HTMLElement>(null);
  const masquerade = useCampaignFlow<HTMLElement>();
  const [lightPaw, setLightPaw] = useState(true);
  const [lightMonogram, setLightMonogram] = useState(true);
  const [masqueradeFallback, setMasqueradeFallback] = useState(false);
  const gun = COLLECTIONS.barrel;

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
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!["#characters", "#pieces"].includes(hash)) return;
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main ref={page} className="home-page home-editorial">
      <CheetahBar tone={lightPaw ? "light" : "dark"} />
      <HeaderWordmark
        dark={lightMonogram}
        color={lightMonogram ? "#fafaf7" : "#6b1a2c"}
      />
      <h1 className="sr-only">Cheeta Jewels</h1>

      <section
        className="home-opening"
        aria-label="Cheeta Jewels campaign film"
        data-home-dark="true"
      >
        <CampaignVideo
          src={gun.video}
          poster={gun.stills[0]}
          className="home-opening-film"
        />
        <img
          src="/brand/icon-livin-white.png"
          alt="Icon livin’"
          className="home-opening-signature"
          fetchPriority="high"
        />
      </section>

      <HomeObjectStudy />

      <section
        ref={masquerade}
        className="home-masquerade"
        aria-labelledby="home-masquerade-title"
      >
        <Link
          href="/collection/masquerade"
          className="home-campaign-link"
          aria-label="Explore The Masquerade campaign"
        >
          <figure
            className="home-masquerade-world"
            data-home-dark={masqueradeFallback ? "true" : undefined}
          >
            <img
              src={
                masqueradeFallback
                  ? COLLECTIONS.masquerade.stills[3]
                  : MASQUERADE_EXHIBITION.src
              }
              alt={
                masqueradeFallback
                  ? "The Masquerade frame in candlelight"
                  : MASQUERADE_EXHIBITION.alt
              }
              width={MASQUERADE_EXHIBITION.width}
              height={MASQUERADE_EXHIBITION.height}
              loading="lazy"
              decoding="async"
              onError={() => setMasqueradeFallback(true)}
            />
          </figure>
          <div className="home-campaign-caption house-container">
            <h2 id="home-masquerade-title">The Masquerade</h2>
            <span className="home-campaign-action">
              view campaign{" "}
              <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
            </span>
          </div>
        </Link>
      </section>

      <section
        className="home-house house-container"
        aria-labelledby="home-house-title"
      >
        <figure className="home-house-portrait">
          <img
            src="/philosophy/eisa-portrait.jpg"
            alt="Eisa Saidi in a portrait from his identity film"
            width="545"
            height="506"
            loading="lazy"
            decoding="async"
            data-home-dark="true"
          />
          <figcaption>Eisa Saidi</figcaption>
        </figure>
        <div className="home-house-copy">
          <h2 id="home-house-title">
            Diamonds are made
            <br />
            in the <em>rough.</em>
          </h2>
          <Link href="/philosophy" className="home-house-link">
            the philosophy{" "}
            <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
          </Link>
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
