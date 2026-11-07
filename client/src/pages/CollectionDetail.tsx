import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "wouter";
import CampaignImageDialog from "@/components/CampaignImageDialog";
import MasqueradeCampaign from "@/components/MasqueradeCampaign";
import MasqueradeCinema from "@/components/MasqueradeCinema";
import MasqueradeSculpture from "@/components/MasqueradeSculpture";
import MasqueradeCoda from "@/components/MasqueradeCoda";
import MasqueradeCloseup from "@/components/MasqueradeCloseup";
import CollectionShowroom from "@/components/CollectionShowroom";
import { MASQUERADE_CINEMA, cinemaPreview } from "@/lib/masqueradeCinema";
import GunCampaign from "@/components/GunCampaign";
import GunArchitecture from "@/components/GunArchitecture";
import CollectionCampaign from "@/components/CollectionCampaign";
import { HouseFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { collectionTitle } from "@/lib/collectionPresentation";
import { COLLECTIONS } from "@/data/collections";
import "./CollectionDetail.css";

export default function CollectionDetail() {
  const params = useParams<{ id: string }>();
  const rawId = (params.id || "barrel").toLowerCase();
  const collection =
    COLLECTIONS[rawId === "masquerade" ? "masquerade" : "barrel"];
  const next = COLLECTIONS[collection.nextId];
  const opening = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLElement>(null);
  const [activePhotograph, setActivePhotograph] = useState<number | null>(null);
  const [lightPaw, setLightPaw] = useState(true);
  const [lightMonogram, setLightMonogram] = useState(true);
  const title = collectionTitle(collection.title);
  const cinematic =
    collection.id === "masquerade" &&
    (MASQUERADE_CINEMA.available ||
      cinemaPreview(
        typeof window === "undefined" ? "" : window.location.search
      ));

  useEffect(() => {
    setActivePhotograph(null);
    window.scrollTo(0, 0);
    let frame = 0;
    const syncNavigation = () => {
      frame = 0;
      const filmBottom = opening.current?.getBoundingClientRect().bottom ?? 0;
      const cinema = page.current?.querySelector<HTMLElement>(
        "[data-cinema-visual]"
      );
      const cinemaRect = cinema?.getBoundingClientRect();
      const cinemaAt = (x: number, y: number) =>
        Boolean(
          cinemaRect &&
            cinemaRect.left <= x &&
            cinemaRect.right >= x &&
            cinemaRect.top <= y &&
            cinemaRect.bottom >= y
        );
      const lightCinema =
        cinema?.closest<HTMLElement>(".masquerade-cinema-sequence")?.dataset
          .monogram === "light";
      const images = Array.from(
        page.current?.querySelectorAll<HTMLElement>(
          '[data-campaign-dark="true"]'
        ) ?? []
      );
      const onDarkImage = (x: number, y: number) =>
        images.some(image => {
          if (
            image instanceof HTMLImageElement &&
            (!image.complete || !image.naturalWidth)
          )
            return false;
          const rect = image.getBoundingClientRect();
          if (image.dataset.campaignShape === "circle") {
            const dx = (x - rect.left - rect.width / 2) / (rect.width / 2);
            const dy = (y - rect.top - rect.height / 2) / (rect.height / 2);
            return dx * dx + dy * dy <= 1;
          }
          return (
            rect.left <= x &&
            rect.right >= x &&
            rect.top <= y &&
            rect.bottom >= y
          );
        });
      setLightPaw(
        cinemaAt(window.innerWidth < 768 ? 40 : 64, 72)
          ? window.innerWidth < 768 && lightCinema
          : filmBottom > 72 ||
              onDarkImage(window.innerWidth < 768 ? 40 : 64, 72)
      );
      setLightMonogram(
        cinemaAt(window.innerWidth / 2, 48)
          ? lightCinema
          : filmBottom > 48 || onDarkImage(window.innerWidth / 2, 48)
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(syncNavigation);
    };
    syncNavigation();
    const anchorId = window.location.hash.slice(1);
    const anchorFrame = [
      "collectors-case",
      "maharajah-study",
      "maharajah-details",
      "collection-next",
    ].includes(anchorId)
      ? requestAnimationFrame(() => {
          document
            .getElementById(anchorId)
            ?.scrollIntoView({ behavior: "instant", block: "start" });
        })
      : 0;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    page.current?.addEventListener("load", schedule, true);
    const root = page.current;
    const toneObserver = new MutationObserver(schedule);
    if (root)
      toneObserver.observe(root, {
        subtree: true,
        attributes: true,
        attributeFilter: ["data-campaign-dark"],
      });
    return () => {
      toneObserver.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(anchorFrame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root?.removeEventListener("load", schedule, true);
    };
  }, [collection.id, cinematic]);

  return (
    <main ref={page} className={`collection-page collection-${collection.id}`}>
      {collection.id === "barrel" && <GunArchitecture />}
      <CheetahBar tone={cinematic || lightPaw ? "light" : "dark"} />
      <HeaderWordmark
        dark={cinematic || lightMonogram}
        color={cinematic ? "#ede4da" : undefined}
      />
      {!cinematic && (
        <div ref={opening}>
          <CollectionCampaign key={collection.id} collection={collection} />
        </div>
      )}

      {cinematic ? (
        <MasqueradeCinema key={`${collection.id}-cinema`} />
      ) : collection.id === "masquerade" ? (
        <MasqueradeCampaign
          key={collection.id}
          collection={collection}
          inspect={setActivePhotograph}
        />
      ) : (
        <GunCampaign key={collection.id} />
      )}

      {cinematic && (
        <>
          <MasqueradeSculpture />
          <MasqueradeCoda paused={activePhotograph !== null} />
          <MasqueradeCloseup inspect={() => setActivePhotograph(3)} />
          <CollectionShowroom collection="The Masquerade" />
        </>
      )}

      <nav
        id="collection-next"
        className="collection-next house-container"
        aria-label="Next collection"
      >
        <Link href={`/collection/${collection.nextId}`}>
          <div>
            <h2>{collectionTitle(next?.title ?? collection.nextName)}</h2>
            <ArrowRight size={32} strokeWidth={1} aria-hidden="true" />
          </div>
        </Link>
      </nav>
      <HouseFooter />
      {activePhotograph !== null && (
        <CampaignImageDialog
          key={`${collection.id}-photographs`}
          title={title}
          images={collection.stills}
          initial={activePhotograph}
          dismiss={() => setActivePhotograph(null)}
        />
      )}
    </main>
  );
}
