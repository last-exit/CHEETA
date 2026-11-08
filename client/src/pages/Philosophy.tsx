import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { HouseFooter } from "@/components/HouseFooter";
import ScrollReveal from "@/components/ScrollReveal";
import PhilosophyDiamond from "@/components/PhilosophyDiamond";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import "./Philosophy.css";

const identity = {
  film: "/philosophy/identity-passage.mp4",
  poster: "/philosophy/identity-film-poster.jpg",
};

/** The supplied founder film, silent until deliberately invited to speak. */
function FounderFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [listening, setListening] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const player = video.current;
    if (reduced) setListening(false);
    if (!player || reduced) return;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden) void player.play().catch(() => {});
      else {
        player.pause();
        player.muted = true;
        setListening(false);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 }
    );
    observer.observe(player);
    player.addEventListener("loadeddata", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      player.removeEventListener("loadeddata", sync);
      document.removeEventListener("visibilitychange", sync);
      player.pause();
      player.muted = true;
    };
  }, [reduced]);

  return (
    <div className="philosophy-voice-player">
      <div className="philosophy-voice-frame">
        <div className="philosophy-voice-picture" data-philosophy-dark>
          {reduced || failed ? (
            <img
              src={identity.poster}
              alt="Eisa Saidi speaking in the supplied Cheeta identity film"
              width="816"
              height="576"
              loading="lazy"
            />
          ) : null}
          {!reduced && (
            <video
              ref={video}
              src={identity.film}
              poster={identity.poster}
              muted={!listening}
              loop
              playsInline
              preload="metadata"
              aria-label="Eisa Saidi in his own words"
              hidden={failed}
              onError={() => {
                setFailed(true);
                setListening(false);
              }}
            />
          )}
        </div>
        <img
          className="philosophy-voice-surround"
          src="/philosophy/ivory-film-surround-v3.webp"
          alt=""
          aria-hidden="true"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
        />
      </div>
      {!reduced && (
        <div className="philosophy-voice-action">
          {failed ? (
            <button
              type="button"
              onClick={() => {
                setFailed(false);
                video.current?.load();
              }}
            >
              retry film <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              aria-pressed={listening}
              aria-label={
                listening ? "Mute Eisa’s film" : "Listen to Eisa’s film"
              }
              onClick={() => {
                const player = video.current;
                if (!player) return;
                player.muted = !player.muted;
                setListening(!player.muted);
                if (!player.muted) void player.play().catch(() => {});
              }}
            >
              {listening ? "mute" : "listen"}
              {listening ? (
                <Volume2 size={16} aria-hidden="true" />
              ) : (
                <VolumeX size={16} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Philosophy() {
  const page = useRef<HTMLElement>(null);
  const [lightPaw, setLightPaw] = useState(false);
  const [lightMonogram, setLightMonogram] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let frame = 0;
    const sync = () => {
      frame = 0;
      const media = page.current?.querySelectorAll<HTMLElement>(
        "[data-philosophy-dark]"
      );
      const overImage = (x: number, y: number) =>
        Array.from(media ?? []).some(item => {
          const r = item.getBoundingClientRect();
          if (x < r.left || x > r.right || y < r.top || y > r.bottom)
            return false;
          if (item.hasAttribute("data-philosophy-oval")) {
            const dx = (x - r.left - r.width / 2) / (r.width / 2);
            const dy = (y - r.top - r.height / 2) / (r.height / 2);
            return dx * dx + dy * dy <= 1;
          }
          return true;
        });
      setLightPaw(overImage(window.innerWidth < 768 ? 40 : 64, 72));
      setLightMonogram(overImage(window.innerWidth / 2, 48));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <main ref={page} className="philosophy-page philosophy-revival">
      <CheetahBar tone={lightPaw ? "light" : "dark"} />
      <HeaderWordmark dark={lightMonogram} />

      <header className="philosophy-cover" aria-labelledby="philosophy-title">
        <img
          className="philosophy-salon"
          src="/philosophy/ivory-salon-v2.webp"
          alt=""
          aria-hidden="true"
          width="1586"
          height="992"
          fetchPriority="high"
          decoding="async"
        />
        <div className="philosophy-cover-type house-container">
          <h1 id="philosophy-title">Philosophy</h1>
          <h2 className="philosophy-credo">
            <span>Diamonds are made</span>{" "}
            <span>
              in the <em>rough.</em>
            </span>
          </h2>
          <a
            className="philosophy-enter"
            href="#eisa-saidi"
            aria-label="Discover Eisa Saidi’s story"
          >
            <ArrowDown size={18} strokeWidth={1.25} aria-hidden="true" />
          </a>
        </div>
        <PhilosophyDiamond />
      </header>

      <section
        id="eisa-saidi"
        className="philosophy-person"
        aria-labelledby="eisa-title"
      >
        <div className="philosophy-person-layout house-container">
          <ScrollReveal className="philosophy-person-masthead">
            <h2 id="eisa-title">
              Eisa <em>Saidi.</em>
            </h2>
            <span>ceo</span>
          </ScrollReveal>
          <div className="philosophy-person-spread">
            <figure className="philosophy-founder-portrait">
              <img
                src="/philosophy/eisa-evening-portrait-v3.webp"
                alt="Eisa Saidi, founder and CEO of Cheeta Jewels"
                width="1202"
                height="1600"
                loading="lazy"
                decoding="async"
                data-philosophy-dark
              />
            </figure>
            <ScrollReveal className="philosophy-person-story">
              <h3>
                What was mocked first
                <br />
                <em>was copied later.</em>
              </h3>
              <p>
                Eisa wore braids to school, despite the ridicule. The same look
                was later copied. That experience of standing apart is part of
                Cheeta’s beginning.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section
        className="philosophy-voice house-container"
        aria-labelledby="voice-title"
      >
        <div className="philosophy-voice-layout">
          <ScrollReveal className="philosophy-voice-heading">
            <h2 id="voice-title">
              In his
              <br />
              <em>own words.</em>
            </h2>
          </ScrollReveal>
          <FounderFilm />
        </div>
      </section>

      <section
        className="philosophy-instinct-spread house-container"
        aria-labelledby="instinct-title"
      >
        <ScrollReveal className="philosophy-instinct-copy">
          <h2 id="instinct-title">
            A name earned
            <br />
            in the <em>ring.</em>
          </h2>
          <p>
            Cheeta was Eisa’s boxing nickname. It became the name of the house.
          </p>
        </ScrollReveal>
        <figure className="philosophy-instinct-art">
          <img
            src="/philosophy/ivory-cheetah-v2.webp"
            alt="An ivory campaign sculpture of a reclining cheetah, above carved acanthus leaves"
            width="1895"
            height="830"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <section
        className="philosophy-inheritance house-container"
        aria-labelledby="inheritance-title"
      >
        <ScrollReveal className="philosophy-inheritance-copy">
          <h2 id="inheritance-title">
            An eye for
            <br />
            <em>another era.</em>
          </h2>
          <p>
            His father’s collection of antiques and paintings informs Cheeta’s
            visual world. That collecting heritage finds another expression in
            jewellery and eyewear.
          </p>
        </ScrollReveal>
        <figure className="philosophy-inheritance-image">
          <img
            src="/stills/barrel-founder-wide.jpg"
            alt="Eisa wearing Maharajah on horseback in The Gun Collection film"
            width="832"
            height="464"
            loading="lazy"
            decoding="async"
            data-philosophy-dark
          />
        </figure>
      </section>

      <section
        className="philosophy-colophon house-container"
        aria-labelledby="expression-title"
      >
        <ScrollReveal>
          <h2 id="expression-title">
            Jewellery,
            <br />
            <em>in another form.</em>
          </h2>
          <div className="philosophy-collection-links">
            <Link href="/collection/barrel">
              The Gun Collection{" "}
              <ArrowUpRight size={18} strokeWidth={1.25} aria-hidden="true" />
            </Link>
            <Link href="/collection/masquerade">
              The Masquerade{" "}
              <ArrowUpRight size={18} strokeWidth={1.25} aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="philosophy-closing-carving" aria-hidden="true">
          <svg
            viewBox="0 540 1895 290"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <image
              href="/philosophy/ivory-cheetah-v2.webp"
              width="1895"
              height="830"
            />
          </svg>
        </div>
      </section>
      <HouseFooter />
      <details className="philosophy-credits house-container">
        <summary>artwork credits</summary>
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
    </main>
  );
}
