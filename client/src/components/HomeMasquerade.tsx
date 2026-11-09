import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const film = "/videos/masquerade.mp4";
const poster = "/home/masquerade-campaign.webp";

/** An invitation into the campaign, with one continuous moving picture. */
export default function HomeMasquerade() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [near, setNear] = useState(false);
  const [painted, setPainted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const root = section.current;
    if (!root || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const player = video.current;
    if (!player || reduced || failed) return;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden) void player.play().catch(() => {});
      else player.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.08 }
    );
    observer.observe(player);
    player.addEventListener("loadeddata", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      player.removeEventListener("loadeddata", sync);
      document.removeEventListener("visibilitychange", sync);
      player.pause();
    };
  }, [near, reduced, failed]);

  return (
    <section
      ref={section}
      id="masquerade"
      className="home-masquerade"
      aria-labelledby="home-masquerade-title"
      data-home-dark="true"
      data-static={reduced || failed}
    >
      <header className="home-masquerade-heading house-container">
        <h2 id="home-masquerade-title">
          <span>The</span> <em>Masquerade</em>
        </h2>
      </header>
      <Link
        href="/collection/masquerade"
        className="home-masquerade-film"
        aria-label="Explore The Masquerade campaign"
      >
        <img
          src={poster}
          alt="The Masquerade woman in a candlelit salon, wearing the black openwork frame"
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
        />
        {near && !reduced && !failed && (
          <video
            ref={video}
            src={film}
            poster={poster}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
            data-painted={painted}
            onPlaying={() => setPainted(true)}
            onError={() => setFailed(true)}
          />
        )}
      </Link>
      <div className="home-masquerade-invitation house-container">
        <h3>
          Seen. <em>Unseen.</em>
        </h3>
        <div className="home-masquerade-entry">
          <p>an invitation after dark.</p>
          <Link href="/collection/masquerade" className="home-campaign-action">
            enter the masquerade{" "}
            <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
