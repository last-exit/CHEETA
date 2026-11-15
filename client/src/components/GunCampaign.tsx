import { useRef } from "react";
import CollectorCase from "@/components/CollectorCase";
import CollectionShowroom from "@/components/CollectionShowroom";
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
      <section
        id="maharajah-details"
        className="gun-frame-study house-container"
        aria-labelledby="gun-frame-title"
      >
        <header>
          <h2 id="gun-frame-title">Maharajah, worn</h2>
          <p>Stills from the original horseback film.</p>
        </header>
        <figure className="gun-frame-worn">
          <img
            src="/stills/barrel-founder-wide.jpg"
            alt="Maharajah worn on horseback in the Gun Collection film"
            width={832}
            height={464}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="gun-frame-angles">
          <figure>
            <img
              src="/stills/barrel-founder-portrait-1.jpg"
              alt="Front view of the octagonal lenses worn in the campaign"
              width={832}
              height={464}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure>
            <img
              src="/stills/barrel-founder-portrait-2.jpg"
              alt="Side view of the Maharajah frame worn in the campaign"
              width={832}
              height={464}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>
      <CollectionShowroom collection="barrel" title="See Maharajah in person" />
    </div>
  );
}
