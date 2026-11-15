import CampaignVideo from "@/components/CampaignVideo";
import "./MasqueradeCoda.css";

/** The complete original campaign, looping only while it is in view. */
export default function MasqueradeCoda() {
  return (
    <section
      className="masquerade-coda"
      data-campaign-chapter="after-dark"
      aria-labelledby="masquerade-coda-title"
    >
      <h2
        id="masquerade-coda-title"
        className="masquerade-coda-credit house-container"
      >
        After <em>dark</em>
      </h2>
      <figure
        className="masquerade-coda-film"
        aria-label="The Masquerade woman turns towards the candlelight"
      >
        <CampaignVideo
          src="/videos/masquerade.mp4"
          poster="/campaigns/masquerade-poster.jpg"
        />
      </figure>
    </section>
  );
}
