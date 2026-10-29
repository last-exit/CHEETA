import type { CollectionData } from "@/data/collections";
import { CAMPAIGN_EDITORIAL } from "@/data/campaignEditorial";
import { CampaignPhotograph } from "@/components/CampaignEditorial";
import { useCampaignFlow } from "@/hooks/useCampaignFlow";
import MasqueradeChapter from "@/components/MasqueradeChapter";
import "./CampaignExhibition.css";
import "./MasqueradeCampaign.css";

const copy = CAMPAIGN_EDITORIAL.masquerade;
export default function MasqueradeCampaign({
  collection,
  inspect,
}: {
  collection: CollectionData;
  inspect: (index: number) => void;
}) {
  const portraits = useCampaignFlow<HTMLElement>();
  const night = useCampaignFlow<HTMLElement>();
  const photograph = (
    index: number,
    alt: string,
    width: number,
    height: number
  ) => (
    <CampaignPhotograph
      src={collection.stills[index]}
      alt={alt}
      width={width}
      height={height}
      label={"View The Masquerade photograph " + (index + 1)}
      inspect={() => inspect(index)}
    />
  );
  return (
    <div className="campaign-exhibition masquerade-exhibition">
      <section
        ref={portraits}
        className="masquerade-portrait-story"
        data-campaign-chapter="portraits"
        aria-labelledby="masquerade-title"
      >
        <header className="masquerade-title house-container">
          <h1 id="masquerade-title" aria-label="The Masquerade">
            <span aria-hidden="true">The</span>
            <span aria-hidden="true">Masquerade</span>
          </h1>
        </header>
        <div className="masquerade-portrait-composition house-container">
          <div
            className="masquerade-portrait-introduction"
            data-campaign-chapter="prologue"
          >
            <p>{copy.introduction}</p>
          </div>
          <figure className="masquerade-portrait-main">
            {photograph(
              1,
              "The Masquerade campaign portrait, facing the light",
              864,
              1080
            )}
          </figure>
          <figure className="masquerade-portrait-profile">
            {photograph(
              0,
              "The Masquerade openwork frame seen in profile against candlelight",
              810,
              1080
            )}
          </figure>
        </div>
      </section>
      <MasqueradeChapter />
      <section
        className="masquerade-openwork-essay house-container"
        data-campaign-chapter="conceal-and-reveal"
        aria-labelledby="masquerade-openwork-title"
      >
        <h2 id="masquerade-openwork-title">
          A mask,
          <br />
          <em>left open.</em>
        </h2>
        <div>
          <p>{copy.openwork.body}</p>
          <p>{copy.silhouette.body}</p>
          <p className="masquerade-study-note">
            In this campaign study, the frame is imagined at architectural
            scale.
          </p>
        </div>
      </section>
      <section
        ref={night}
        className="masquerade-night-story"
        data-campaign-chapter="the-room"
        aria-labelledby="masquerade-night-title"
      >
        <figure
          className="masquerade-night-panorama"
          data-campaign-chapter="final-portrait"
        >
          {photograph(
            3,
            "Candlelight reflected across the lenses in the final Masquerade portrait",
            1920,
            1080
          )}
        </figure>
        <div className="masquerade-night-composition house-container">
          <figure className="masquerade-night-moment">
            {photograph(
              2,
              "A raised glass in the candlelit Masquerade campaign",
              1440,
              1080
            )}
          </figure>
          <div
            className="masquerade-night-copy"
            data-campaign-chapter="candlelight"
          >
            <h2 id="masquerade-night-title">
              After <em>dark.</em>
            </h2>
            <p>{copy.night.body}</p>
            <p data-campaign-chapter="the-campaign">{copy.campaign.body}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
