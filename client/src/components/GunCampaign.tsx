import { useRef } from "react";
import { ArchDefs } from "./gun/Arch";
import Rail from "./gun/Rail";
import GunHero from "./gun/GunHero";
import GunManifesto from "./gun/GunManifesto";
import { ChapterOne, ChapterTwo, ChapterThree } from "./gun/GunChapters";
import GunDetails from "./gun/GunDetails";
import GunWorn from "./gun/GunWorn";
import CollectorCase from "@/components/CollectorCase";
import CollectionShowroom from "@/components/CollectionShowroom";
import { pieces } from "./gun/gunData";
import { useEditorialMotion } from "@/hooks/useEditorialMotion";
import "./GunCampaign.css";

export default function GunCampaign() {
  const presentation = useRef<HTMLDivElement>(null);
  useEditorialMotion(presentation);

  return (
    <div ref={presentation} className="gun-exhibition">
      <ArchDefs />
      <Rail />

      {/* Hero: Mughal Arch, Casket, Oxblood velvet, "The Collection / Maharaja" */}
      <GunHero />

      {/* The Smooth Animation of the Cheeta Glasses Case Opening */}
      <CollectorCase />

      {/* Manifesto: "Each lens takes the name of the pistol that stands beside it." */}
      <GunManifesto />

      {/* The Three Chapters: Faulad, Zar, Sim */}
      <ChapterOne piece={pieces[0]} />
      <ChapterTwo piece={pieces[1]} />
      <ChapterThree piece={pieces[2]} />

      {/* Under the Loupe Details: Koftgari & The Hinge */}
      <GunDetails />

      {/* Maharaja, Worn: Stills from the original horseback film */}
      <GunWorn />

      {/* Collection Showroom */}
      <CollectionShowroom collection="barrel" title="See Maharajah in person" />
    </div>
  );
}
