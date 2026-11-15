import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
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
        <div className="philosophy-spread house-container">
          <div className="philosophy-spread-opening">
            <h2 id="vintage-revival-title">Vintage revival</h2>
            <p className="philosophy-lead">
              Cheeta brings the shapes and details of the{" "}
              <em>seventies and nineties</em> into eyewear and jewellery.
            </p>
          </div>
          <figure className="philosophy-campaign">
            <div className="philosophy-campaign-frame">
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
            <figcaption>
              <p>
                Maharajah pairs ruby-toned octagonal lenses with temples inspired
                by vintage sporting guns.
              </p>
              <Link href="/collection/barrel">
                The Gun Collection
                <ArrowUpRight size={20} strokeWidth={1.25} aria-hidden="true" />
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <nav
        className="philosophy-end house-container"
        aria-label="Continue exploring"
      >
        <Link href="/collection/masquerade">
          The Masquerade
          <ArrowUpRight size={21} strokeWidth={1.25} aria-hidden="true" />
        </Link>
        <Link href="/founder">
          Meet Eisa Saidi
          <ArrowUpRight size={21} strokeWidth={1.25} aria-hidden="true" />
        </Link>
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
