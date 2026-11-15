import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { InformationFooter } from "@/components/HouseFooter";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { readBrandAnchors } from "@/lib/brandChrome";
import "./Founder.css";

const film = "/philosophy/identity-passage.mp4";
const poster = "/philosophy/identity-film-poster.jpg";

function FounderFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [listening, setListening] = useState(false);
  const [failed, setFailed] = useState(false);
  const [requestedPlayback, setRequestedPlayback] = useState(false);
  const showVideo = !failed && (!reducedMotion || requestedPlayback);

  useEffect(() => {
    const player = video.current;
    if (!player || !showVideo) return;

    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && !reducedMotion) {
        void player.play().catch(() => {});
        return;
      }
      if (!visible || document.hidden) {
        player.pause();
        player.muted = true;
        setListening(false);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= 0.15;
        sync();
      },
      { threshold: 0.15 }
    );

    observer.observe(player);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      player.pause();
      player.muted = true;
    };
  }, [showVideo, reducedMotion]);

  useEffect(() => {
    if (showVideo && reducedMotion)
      video.current?.focus({ preventScroll: true });
  }, [showVideo, reducedMotion]);

  return (
    <figure className="founder-film">
      <div className="founder-film-picture" data-founder-media>
        {showVideo ? (
          <video
            ref={video}
            src={film}
            poster={poster}
            muted={reducedMotion || !listening}
            loop={!reducedMotion}
            controls={reducedMotion}
            playsInline
            preload="metadata"
            aria-label="Eisa Saidi in his own words"
            onError={() => {
              setFailed(true);
              setListening(false);
            }}
          />
        ) : (
          <img
            src={poster}
            alt="Eisa Saidi speaking in the Cheeta Jewels identity film"
            width="816"
            height="576"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      {failed ? (
        <button
          type="button"
          className="founder-action"
          onClick={() => setFailed(false)}
        >
          Retry film
        </button>
      ) : reducedMotion ? (
        !requestedPlayback && (
          <button
            type="button"
            className="founder-action"
            onClick={() => setRequestedPlayback(true)}
          >
            Show film controls
          </button>
        )
      ) : (
        <button
          type="button"
          className="founder-action"
          aria-label={listening ? "Mute film" : "Listen to the film"}
          onClick={() => {
            const player = video.current;
            if (!player) return;

            const unmute = player.muted;
            player.muted = !unmute;
            setListening(unmute);
            if (unmute) {
              void player.play().catch(() => {
                player.muted = true;
                setListening(false);
              });
            }
          }}
        >
          {listening ? "Mute film" : "Listen to the film"}
          {listening ? (
            <Volume2 size={16} aria-hidden="true" />
          ) : (
            <VolumeX size={16} aria-hidden="true" />
          )}
        </button>
      )}
    </figure>
  );
}

export default function Founder() {
  const page = useRef<HTMLElement>(null);
  const [lightPaw, setLightPaw] = useState(false);
  const [lightMonogram, setLightMonogram] = useState(false);

  useEffect(() => {
    let frame = 0;
    const media = Array.from(
      page.current?.querySelectorAll<HTMLElement>("[data-founder-media]") ?? []
    );
    const sync = () => {
      frame = 0;
      const rectangles = media.map(item => item.getBoundingClientRect());
      const isOverMedia = ({ x, y }: { x: number; y: number }) =>
        rectangles.some(
          rect =>
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        );
      const { paw, monogram } = readBrandAnchors();
      setLightPaw(isOverMedia(paw));
      setLightMonogram(isOverMedia(monogram));
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
    <main ref={page} className="founder-page founder-editorial">
      <CheetahBar tone={lightPaw ? "light" : "dark"} />
      <HeaderWordmark dark={lightMonogram} />

      <article aria-labelledby="founder-title">
        <header className="founder-masthead">
          <h1 id="founder-title">
            <span className="founder-name-line">
              <span>Eisa</span>
            </span>{" "}
            <span className="founder-name-line founder-name-surname">
              <span>Saidi</span>
            </span>
          </h1>
          <figure className="founder-portrait" data-founder-media>
            <img
              src="/philosophy/eisa-evening-portrait-v3.webp"
              alt="Eisa Saidi, founder of Cheeta Jewels"
              width="1202"
              height="1600"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </header>

        <section
          className="founder-story house-container"
          aria-label="Eisa Saidi’s story"
        >
          <blockquote>
            “Feeling out of place never stopped me from being who I was. And
            neither should it stop anyone.”
          </blockquote>
          <div className="founder-origins">
            <p>
              Saidi grew up in Dubai. At school, he wore his hair in braids even
              though he knew his classmates would mock him. Days later, they
              began wearing the same style.
            </p>
            <p>
              In the ring, Saidi went by “The Cheetah”. His boxing nickname gave
              Cheeta Jewels its name.
            </p>
          </div>
        </section>

        <section className="founder-voice house-container" aria-label="Film">
          <FounderFilm />
          <Link href="/philosophy" className="founder-action founder-next">
            Philosophy <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </article>
      <InformationFooter />
    </main>
  );
}
