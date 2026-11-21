import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import CollectorCase from "@/components/CollectorCase";
import CollectionShowroom from "@/components/CollectionShowroom";
import MaharajahReferences from "@/components/MaharajahReferences";
import { useEditorialMotion } from "@/hooks/useEditorialMotion";
import "./GunCampaign.css";

export default function GunCampaign() {
  const presentation = useRef<HTMLDivElement>(null);
  useEditorialMotion(presentation);
  return (
    <div ref={presentation} className="gun-exhibition">
      <header
        className="gun-introduction house-container"
        data-campaign-chapter="prologue"
        data-editorial-reveal
      >
        <h1>The Gun Collection</h1>
        <p>Inspired by vintage double-barrel sporting guns.</p>
      </header>
      <CollectorCase />
      <figure
        className="gun-frame-detail house-container"
        data-campaign-chapter="frame-detail"
        aria-labelledby="gun-frame-detail-title"
      >
        <div className="gun-frame-detail-image">
          <img
            src="/stills/barrel-founder-portrait-2.jpg"
            alt="Side view of the Maharajah eyewear worn in the horseback film"
            width={832}
            height={464}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption>
          <h2 id="gun-frame-detail-title">Maharajah in profile</h2>
          <p>A still from the horseback film.</p>
        </figcaption>
      </figure>
      <details
        className="gun-design-references house-container"
        data-campaign-chapter="design-references"
      >
        <summary>
          Design references
          <ChevronDown size={20} strokeWidth={1.25} aria-hidden="true" />
        </summary>
        <p>
          Campaign studies of three antique designs that inspired Maharajah.
        </p>
        <MaharajahReferences />
      </details>
      <CollectionShowroom
        collection="barrel"
        title="See Maharajah in person"
        linkLabel="Arrange a showroom visit"
      />
    </div>
  );
}
