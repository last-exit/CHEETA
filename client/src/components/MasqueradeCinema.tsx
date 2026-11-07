import { useState, type CSSProperties } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollCinema } from "@/hooks/useScrollCinema";
import { MASQUERADE_CINEMA, type CinemaAsset } from "@/lib/masqueradeCinema";
import "./MasqueradeCinema.css";

export default function MasqueradeCinema({
  asset = MASQUERADE_CINEMA,
}: {
  asset?: CinemaAsset;
}) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [attempt, setAttempt] = useState(0);
  const film = useScrollCinema(asset, reduced, attempt);
  const still = reduced || !asset.available || film.failed;
  return (
    <article
      className="masquerade-cinema"
      data-campaign-chapter="masquerade-film"
    >
      <section
        ref={film.root}
        className="masquerade-cinema-sequence"
        data-static={still}
        data-preview={!asset.available}
        data-monogram="light"
        style={{ "--cinema-height": `${asset.scrollVh}svh` } as CSSProperties}
        aria-labelledby="masquerade-cinema-title"
      >
        <div className="masquerade-cinema-stage" data-cinema-stage>
          <h1 id="masquerade-cinema-title">
            <span>The </span>
            <span>Masquerade</span>
          </h1>
          <div className="masquerade-cinema-frame" data-cinema-visual>
            <img
              ref={film.poster}
              className="masquerade-cinema-poster"
              src={asset.opening}
              alt="The Masquerade woman in black silk, her black hair in a tight bun, wearing the openwork frame in a candlelit Mughal-inspired palace"
              width={asset.width}
              height={asset.height}
              fetchPriority="high"
              decoding="async"
              data-hidden={film.painted && !still}
            />
            {!reduced && asset.available && (
              <>
                <video
                  ref={film.player}
                  preload="none"
                  muted
                  playsInline
                  disablePictureInPicture
                  aria-hidden="true"
                  tabIndex={-1}
                />
                <canvas
                  ref={film.screen}
                  data-painted={film.painted && !still}
                  aria-hidden="true"
                />
              </>
            )}
          </div>
          {!still && (
            <div className="masquerade-cinema-cues" aria-hidden="true">
              <span className="masquerade-cinema-seen">Seen</span>
              <span className="masquerade-cinema-unseen">Unseen</span>
            </div>
          )}
          {!asset.available && (
            <p className="masquerade-cinema-preview-label">film keyframes</p>
          )}
        </div>
        {still && (
          <figure className="masquerade-cinema-last">
            <img
              src={asset.closing}
              alt="The same woman revealed in full in the palace gallery, wearing the Masquerade frame and a long black gown"
              width={asset.width}
              height={asset.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        )}
      </section>
      <section
        className="masquerade-cinema-ending house-container"
        data-campaign-chapter="seen-and-unseen"
        aria-labelledby="masquerade-cinema-ending"
      >
        <h2 id="masquerade-cinema-ending">
          A mask, <em>left open.</em>
        </h2>
        <div>
          <p>
            Dark lenses hold the gaze in shadow. Candlelight traces the
            openwork, revealing a second silhouette around the face.
          </p>
          {film.failed && (
            <div className="masquerade-cinema-retry" role="status">
              <span>the film couldn’t load</span>
              <button
                type="button"
                onClick={() => setAttempt(value => value + 1)}
              >
                retry film
              </button>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
