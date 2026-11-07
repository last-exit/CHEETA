import CampaignVideo from "@/components/CampaignVideo";
import "./MasqueradeCoda.css";

/** The complete original campaign, looping only while it is in view. */
export default function MasqueradeCoda({
  paused = false,
}: {
  paused?: boolean;
}) {
  return (
    <section
      className="masquerade-coda"
      data-campaign-chapter="after-dark"
      aria-labelledby="masquerade-coda-title"
    >
      <div className="masquerade-coda-bridge house-container">
        <p>
          The openwork gives the face a new outline. What lies behind the lenses
          remains hers.
        </p>
      </div>
      <figure
        className="masquerade-coda-film"
        aria-label="The Masquerade woman turns towards the candlelight"
      >
        <CampaignVideo
          src="/videos/masquerade.mp4"
          poster="/campaigns/masquerade-poster.jpg"
          paused={paused}
        />
      </figure>
      <div className="house-container masquerade-coda-title">
        <h2 id="masquerade-coda-title">
          After <em>dark.</em>
        </h2>
      </div>
    </section>
  );
}
