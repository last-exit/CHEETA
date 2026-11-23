import { useRef, type ReactNode } from "react";
import { Link } from "wouter";
import { InformationFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import HayratLoupe from "@/components/HayratLoupe";
import Ornament from "@/components/Ornament";
import { useEditorialMotion } from "@/hooks/useEditorialMotion";
import "./Hayrat.css";

const HAYRAT_SITE = "https://fine-arts.hayratdubai.com/";
const img = (name: string) => `/hayrat/${name}.webp`;

/** A painting in a moulded gilt frame, the way it would hang in the gallery. */
function Gilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`hayrat-gilt ${className}`.trim()}>
      <div className="hayrat-gilt-slip">{children}</div>
    </div>
  );
}

/** A gilt flourish for the corner of a card: a scrolling tendril with a leaf and a bud. */
function Corner({ at }: { at: "tl" | "br" | "tr" | "bl" }) {
  return (
    <svg className={`hayrat-corner hayrat-corner-${at}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M4 60C4 30 14 12 40 8c10-1.5 16 3 14 9-1.6 4.6-8 5-9.4 1-1-3 2-5 4.2-3.6" />
        <path d="M4 42C9 30 18 24 28 24" opacity="0.7" />
        <path d="M22 6c-6 1-10 4-12 9" opacity="0.7" />
      </g>
      <g fill="currentColor">
        <path d="M17 24c2-6 8-8.6 12-7.2-1.6 5.6-7 8.6-12 7.2Z" />
        <path d="M30 12.5c4.6-2.6 9.4-1.4 11 1-3.8 2.8-8.6 2.6-11-1Z" opacity="0.85" />
        <circle cx="4" cy="4" r="2.4" />
        <circle cx="10.5" cy="4" r="1.3" />
        <circle cx="4" cy="10.5" r="1.3" />
      </g>
    </svg>
  );
}

/** A small ivory card floating over a painting. Wording follows Hayrat's catalogue. */
function Card({ title, children, className = "" }: { title: string; children?: ReactNode; className?: string }) {
  return (
    <figcaption className={`hayrat-card ${className}`.trim()}>
      <span className="hayrat-card-title">{title}</span>
      {children}
    </figcaption>
  );
}

/**
 * A tribute to Hayrat Fine Arts, the Dubai gallery of Eisa Saidi's father,
 * composed as a collage of its own collection: the name set across one of its
 * carpets with a framed painting hung over the letters, then whole paintings
 * used as worlds, with labels and smaller works layered over their edges.
 */
export default function Hayrat() {
  const page = useRef<HTMLElement>(null);
  useEditorialMotion(page);

  return (
    <main ref={page} className="hayrat-page">
      <CheetahBar tone="light" />
      <HeaderWordmark dark />

      {/* The name across the carpet, a framed painting hung over its letters. */}
      <section className="hayrat-hero" aria-labelledby="hayrat-title">
        <div className="hayrat-hero-carpet" aria-hidden="true">
          <img src="/hayrat/carpet.webp" alt="" width="1920" height="1080" decoding="async" fetchPriority="high" />
        </div>
        <div className="hayrat-hero-over">
          <p>A tribute to</p>
          <Ornament className="hayrat-ornament" />
        </div>
        <h1 id="hayrat-title" className="hayrat-hero-name">
          <img src="/hayrat/hayrat-logo-ivory.webp" alt="Hayrat, fine gems and arts" width="1414" height="463" decoding="async" />
        </h1>
        <Gilt className="hayrat-hero-frame">
          <img
            src={img("vinoda-raga")}
            alt="Vinoda Raga: a noble figure on a striped carpet with two companions, within a red margin."
            width="1200"
            height="1200"
            decoding="async"
          />
        </Gilt>
        <div className="hayrat-hero-aside">
          <p>Jumeirah, Dubai</p>
          <a href={HAYRAT_SITE} className="house-cartouche" data-tone="gold" target="_blank" rel="noopener noreferrer">
            Visit the gallery
          </a>
        </div>
      </section>

      {/* A whole painting as the world, the gallery's words floating on it. */}
      <section className="hayrat-world" aria-labelledby="hayrat-world-title">
        <div className="hayrat-world-panel">
          <img
            src={img("jama-masjid")}
            alt="The Jama Masjid, its domes and minarets above a street of figures, horses and carts."
            width="1200"
            height="826"
            loading="lazy"
            decoding="async"
          />
        </div>
        <blockquote className="hayrat-card hayrat-world-quote" data-editorial-reveal>
          <Corner at="tl" />
          <Corner at="br" />
          <h2 id="hayrat-world-title">
            Where the beauty of art lies not only in its craft but in the
            centuries it has survived.
          </h2>
          <cite>Hayrat Fine Arts</cite>
        </blockquote>
        <div className="hayrat-card hayrat-world-note" data-editorial-reveal>
          <Corner at="tr" />
          <p>
            The gallery of Eisa Saidi’s father, where Mughal and Rajput
            paintings, carpets, glass and silver are kept.
          </p>
        </div>
        <figure className="hayrat-world-tag">
          <Card title="View of the Jama Masjid" />
        </figure>
        <Gilt className="hayrat-world-inset">
          <img src={img("holi")} alt="Holi in two registers: a royal figure drenched in colour above, women spraying coloured water below." width="1200" height="1497" loading="lazy" decoding="async" />
        </Gilt>
      </section>

      {/* Ragamala: the word itself filled with the painting, the folios hung either side. */}
      <section className="hayrat-raga" aria-labelledby="hayrat-raga-title">
        <Ornament className="hayrat-ornament" />
        <h2 id="hayrat-raga-title" className="hayrat-filled" style={{ backgroundImage: `url(${img("ragamala-1")})` }}>
          Ragamala
        </h2>
        <p className="hayrat-raga-sub">Paintings of the musical modes, each raga given a scene.</p>
        <div className="hayrat-raga-hang">
          <figure className="hayrat-raga-left">
            <Gilt>
              <HayratLoupe src={img("ragamala-1")} width={1200} height={1798} alt="A Ragamala folio: women in a palace chamber, a garden beyond." />
            </Gilt>
            <Card title="Ragamala series">
              <span>North Deccan, likely Aurangabad, about 1750</span>
              <span>Gouache on paper</span>
            </Card>
          </figure>
          <figure className="hayrat-raga-right">
            <Gilt>
              <HayratLoupe src={img("ragamala-2")} width={1200} height={1798} alt="A Ragamala folio: a noblewoman seated within a palace, an attendant beside her." />
            </Gilt>
            <Card title="Ragamala series">
              <span>North Deccan, likely Aurangabad, about 1750</span>
              <span>Gouache on paper</span>
            </Card>
          </figure>
        </div>
      </section>

      {/* The album, opened on its spread on the carpet. */}
      <section className="hayrat-album" aria-labelledby="hayrat-dashavatara">
        <div className="hayrat-spread">
          <HayratLoupe src={img("dashavatara-1")} width={1200} height={876} alt="A folio from a Dashavatara series: figures in a green landscape beneath trees." />
          <HayratLoupe src={img("dashavatara-2")} width={1200} height={858} alt="A folio from a Dashavatara series: a battle at the water's edge." />
        </div>
        <div className="hayrat-card hayrat-album-card" data-editorial-reveal>
          <Corner at="tl" />
          <Corner at="br" />
          <h2 id="hayrat-dashavatara" className="hayrat-card-title">Dashavatara series</h2>
          <span>Kangra, 1800s</span>
          <span>Gouache on paper, each leaf 7.8 × 6 cm</span>
        </div>
      </section>

      {/* Madinah as the second world, the objects set into it. */}
      <section className="hayrat-world hayrat-world-two" aria-labelledby="hayrat-objects">
        <div className="hayrat-world-panel">
          <img
            src={img("madinah")}
            alt="Al-Masjid an-Nabawi in Madinah with the Green Dome, a courtyard of worshippers before it."
            width="1200"
            height="819"
            loading="lazy"
            decoding="async"
          />
        </div>
        <figure className="hayrat-world-tag hayrat-world-tag-right">
          <Card title="Al-Masjid an-Nabawi, Madinah">
            <span>Before the modern renovations</span>
          </Card>
        </figure>
        <h2 id="hayrat-objects" className="hayrat-visually-hidden">Glass, silver and carpets</h2>
        <div className="hayrat-objects">
          {[
            { src: "glass", title: "Glass", alt: "A painted and gilded glass bottle." },
            { src: "carpet-piece", title: "Carpets, rugs and dhurries", alt: "A hand-woven carpet with a central medallion." },
            { src: "silver", title: "Silver", alt: "A chased silver ewer." },
          ].map(object => (
            <figure key={object.src} className="hayrat-object">
              <img src={img(object.src)} alt={object.alt} width="1200" height="1023" loading="lazy" decoding="async" />
              <Card title={object.title} />
            </figure>
          ))}
        </div>
      </section>

      {/* The masks, and the way on to The Masquerade. */}
      <section className="hayrat-close" aria-labelledby="hayrat-close-title">
        <Gilt className="hayrat-close-mask hayrat-close-mask-one">
          <img src="/hayrat/hayrat-mask-1.webp" alt="A dark sculpted mask with gold eyes against a terracotta wall" width="589" height="760" loading="lazy" decoding="async" />
        </Gilt>
        <div className="hayrat-close-text">
          <Ornament className="hayrat-ornament" />
          <h2 id="hayrat-close-title" className="hayrat-close-line">
            From sculpted masks to the openwork eyewear of The Masquerade.
          </h2>
          <Ornament className="hayrat-ornament hayrat-ornament-flip" />
        </div>
        <Gilt className="hayrat-close-mask hayrat-close-mask-two">
          <img src="/hayrat/hayrat-mask-2.webp" alt="A bronze-toned mask with a deeply sculpted brow and an open mouth" width="589" height="768" loading="lazy" decoding="async" />
        </Gilt>
        <div className="hayrat-links">
          <Link href="/collection/masquerade" className="house-cartouche" data-tone="gold">
            The Masquerade
          </Link>
          <a href={HAYRAT_SITE} className="house-cartouche" data-tone="gold" target="_blank" rel="noopener noreferrer">
            Visit Hayrat Fine Arts
          </a>
        </div>
      </section>

      <InformationFooter lace={false} />
    </main>
  );
}
