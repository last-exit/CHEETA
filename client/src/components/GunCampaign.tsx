import { Link } from "wouter";
import type { CollectionData } from "@/data/collections";
import { CAMPAIGN_EDITORIAL } from "@/data/campaignEditorial";
import GunChapter from "@/components/GunChapter";
import { CampaignPhotograph } from "@/components/CampaignEditorial";
import {
  ExhibitionCover,
  ExhibitionEssay,
  ExhibitionPassage,
} from "@/components/CampaignExhibition";
import "./GunCampaign.css";

const copy = CAMPAIGN_EDITORIAL.barrel;
export default function GunCampaign({
  collection,
  inspect,
}: {
  collection: CollectionData;
  inspect: (index: number) => void;
}) {
  const photograph = (index: number, alt: string) => (
    <CampaignPhotograph
      src={collection.stills[index]}
      alt={alt}
      width={832}
      height={464}
      label={"View The Gun Collection photograph " + (index + 1)}
      inspect={() => inspect(index)}
    />
  );
  return (
    <div className="campaign-exhibition gun-exhibition">
      <ExhibitionCover
        title="The Gun Collection"
        lead="The Gun"
        name="Collection"
      />
      <section
        className="gun-founder-pair"
        aria-label="The Gun Collection campaign portraits"
        data-campaign-chapter="portraits"
      >
        {photograph(0, "Eisa Saidi on horseback, campaign photograph 1")}
        {photograph(1, "Eisa Saidi on horseback, campaign photograph 2")}
      </section>
      <ExhibitionPassage chapter="prologue" lead>
        {copy.introduction}
      </ExhibitionPassage>
      <GunChapter />
      <ExhibitionEssay title={copy.origin.title} chapter="the-reference">
        <p>{copy.origin.body}</p>
      </ExhibitionEssay>
      <section
        className="gun-founder-closing"
        data-campaign-chapter="the-campaign"
        aria-labelledby="gun-campaign-heading"
      >
        <h2
          id="gun-campaign-heading"
          className="exhibition-chapter-title house-container"
        >
          {copy.campaign.title}
        </h2>
        <div className="gun-founder-contact-sheet house-container">
          {photograph(
            2,
            "Eisa Saidi looking down towards the horse in the campaign"
          )}
          {photograph(
            3,
            "Eisa Saidi in the open landscape of The Gun Collection campaign"
          )}
        </div>
        <ExhibitionPassage chapter="the-landscape">
          {copy.campaign.body}
        </ExhibitionPassage>
      </section>
      <section
        className="gun-founder-signature house-container"
        data-campaign-chapter="founder"
        aria-labelledby="gun-eisa-heading"
      >
        <div className="gun-founder-signature-art">
          <h2 id="gun-eisa-heading" aria-label="Eisa Saidi">
            <span aria-hidden="true">Eisa</span>
            <span aria-hidden="true">Saidi</span>
          </h2>
          <img
            src="/philosophy/eisa-portrait.jpg"
            alt="Eisa Saidi in a monochrome portrait from his identity film"
            width="545"
            height="506"
            data-campaign-dark="true"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="gun-founder-signature-copy">
          <p>{copy.founder}</p>
          <Link href="/philosophy">
            the philosophy <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
