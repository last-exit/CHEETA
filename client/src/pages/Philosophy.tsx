import { useRef } from "react";
import Lace from "@/components/Lace";
import Ornament from "@/components/Ornament";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { HouseFooter } from "@/components/HouseFooter";
import PhilosophyDiamond from "@/components/PhilosophyDiamond";
import { useEditorialMotion } from "@/hooks/useEditorialMotion";
import "./Philosophy.css";

export default function Philosophy() {
  const page = useRef<HTMLElement>(null);
  useEditorialMotion(page);

  return (
    <main ref={page} className="philosophy-page philosophy-revival">
      <CheetahBar tone="dark" />
      <HeaderWordmark />

      <header className="philosophy-cover">
        <h1 id="philosophy-title" className="philosophy-credo">
          <span>Diamonds</span>{" "}
          <span>are made in</span>{" "}
          <span>the <em>rough.</em></span>
        </h1>
        <div className="philosophy-room">
          <img
            className="philosophy-salon"
            src="/philosophy/ivory-salon-v2.webp"
            alt=""
            width="1586"
            height="992"
            fetchPriority="high"
            decoding="async"
          />
          <PhilosophyDiamond />
        </div>
      </header>

      <section
        id="wearable-art"
        className="philosophy-essay"
        aria-labelledby="vintage-revival-title"
      >
        <Lace hang="up" />
        <div className="philosophy-spread house-container">
          <div className="philosophy-spread-opening">
            <div className="philosophy-title">
              <Ornament className="house-heading-ornament" />
              <h2 id="vintage-revival-title">Vintage revival</h2>
            </div>
            <p className="philosophy-lead">
              Cheeta brings the shapes and details of the{" "}
              <em>seventies and nineties</em> into eyewear and jewellery.
            </p>
          </div>
          <figure className="philosophy-campaign">
            {/* The film still, set in a carved ivory surround like the salon above. */}
            <div className="philosophy-surround">
              <div className="philosophy-surround-opening">
                <img
                  src="/stills/barrel-founder-wide.jpg"
                  alt="The ruby octagonal frames worn on horseback in the Gun Collection film"
                  width="832"
                  height="464"
                  loading="lazy"
                  decoding="async"
                  data-editorial-camera
                />
              </div>
              <img
                className="philosophy-surround-frame"
                src="/philosophy/ivory-film-surround-v3.webp"
                alt=""
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <p>
                Maharajah pairs ruby-toned octagonal lenses with temples inspired
                by vintage sporting guns.
              </p>
              <Link href="/collection/barrel" className="house-cartouche">
                The Gun Collection
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <nav
        className="philosophy-end house-container"
        aria-label="Continue exploring"
      >
        <Ornament className="philosophy-end-ornament" />
        {/* A cameo from The Masquerade, in an oval carved frame. */}
        <Link href="/collection/masquerade" className="philosophy-cameo" aria-label="The Masquerade">
          <span className="philosophy-cameo-portrait">
            <img
              src="/stills/masquerade-still-2.jpg"
              alt=""
              width="864"
              height="1080"
              loading="lazy"
              decoding="async"
            />
          </span>
          <img
            className="philosophy-cameo-frame"
            src="/philosophy/antique-cameo-v1.webp"
            alt=""
            width="1122"
            height="1402"
            loading="lazy"
            decoding="async"
          />
        </Link>
        <div className="philosophy-end-links">
          <Link href="/collection/masquerade" className="house-cartouche">
            The Masquerade
          </Link>
          <Link href="/founder" className="house-cartouche">
            Meet Eisa Saidi
          </Link>
        </div>
      </nav>
      <details className="philosophy-credits house-container">
        <summary>Diamond credit</summary>
        <p>
          <a
            href="https://sketchfab.com/3d-models/diamond-9f060239b2604a50a2db83877c161b3e"
            target="_blank"
            rel="noreferrer"
          >
            Diamond
          </a>{" "}
          by{" "}
          <a
            href="https://sketchfab.com/shooter24994"
            target="_blank"
            rel="noreferrer"
          >
            Akshat
          </a>
          ,{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY 4.0
          </a>
          . Materials, lighting and presentation adapted for Cheeta Jewels.
        </p>
      </details>
      <HouseFooter />
    </main>
  );
}
