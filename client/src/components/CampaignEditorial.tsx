import { useState, type ReactNode } from "react";
import "./CampaignEditorial.css";

export function CampaignIntroduction({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <header
      className="campaign-editorial-intro house-container"
      data-campaign-chapter="introduction"
    >
      <h1>{title}</h1>
      <p>{children}</p>
    </header>
  );
}

export function CampaignNote({
  title,
  children,
  chapter,
}: {
  title: string;
  children: ReactNode;
  chapter: string;
}) {
  return (
    <section
      className="campaign-editorial-note house-container"
      data-campaign-chapter={chapter}
    >
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}

export function CampaignPhotograph({
  src,
  alt,
  width,
  height,
  label,
  inspect,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  inspect: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [failedRatio, setFailedRatio] = useState(width / height);
  return (
    <button
      type="button"
      className="campaign-photograph"
      aria-label={
        failed ? "Retry " + label.toLowerCase().replace(/^view /, "") : label
      }
      data-unavailable={failed}
      style={failed ? { aspectRatio: failedRatio } : undefined}
      onClick={() => {
        if (failed) {
          setAttempt(value => value + 1);
          setFailed(false);
        } else inspect();
      }}
    >
      {failed ? (
        <span className="campaign-photo-unavailable" role="status">
          <span>photograph unavailable</span>
          <span>retry photograph</span>
        </span>
      ) : (
        <img
          key={attempt}
          src={src}
          alt={alt}
          width={width}
          height={height}
          data-campaign-dark="true"
          loading="lazy"
          decoding="async"
          onError={event => {
            const rect = event.currentTarget.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0)
              setFailedRatio(rect.width / rect.height);
            setFailed(true);
          }}
        />
      )}
    </button>
  );
}

/** Frame an existing source image without generating or retouching its detail. */
export function CampaignCrop({
  src,
  width,
  height,
  crop,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  crop: { x: number; y: number; width: number; height: number };
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="campaign-editorial-crop"
      style={{
        aspectRatio: failed ? "auto" : `${crop.width} / ${crop.height}`,
      }}
    >
      {failed ? (
        <span role="status">image unavailable</span>
      ) : (
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          style={{
            width: `${(width / crop.width) * 100}%`,
            left: `${(-crop.x / crop.width) * 100}%`,
            top: `${(-crop.y / crop.height) * 100}%`,
          }}
        />
      )}
    </div>
  );
}
