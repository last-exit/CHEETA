import CampaignVideo from "@/components/CampaignVideo";
import type { CollectionData } from "@/data/collections";

export default function CollectionCampaign({
  collection,
}: {
  collection: CollectionData;
}) {
  return (
    <section
      className="collection-film"
      aria-label={`${collection.title.toLowerCase()} campaign film`}
    >
      <CampaignVideo
        src={collection.video}
        poster={collection.stills[3]}
        className="collection-film-media"
      />
    </section>
  );
}
