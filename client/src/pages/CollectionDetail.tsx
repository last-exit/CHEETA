import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "wouter";
import CampaignImageDialog from "@/components/CampaignImageDialog";
import MasqueradeCampaign from "@/components/MasqueradeCampaign";
import GunCampaign from "@/components/GunCampaign";
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

  useEffect(() => {
    setActivePhotograph(null);
    window.scrollTo(0, 0);
    let frame = 0;
    const syncNavigation = () => {
      frame = 0;
      const filmBottom = opening.current?.getBoundingClientRect().bottom ?? 0;
      const images = Array.from(
        page.current?.querySelectorAll<HTMLImageElement>(
          'img[data-campaign-dark="true"]'
        ) ?? []
      );
      const onDarkImage = (x: number, y: number) =>
        images.some(image => {
          if (!image.complete || !image.naturalWidth) return false;
          const rect = image.getBoundingClientRect();
          return (
            rect.left <= x &&
            rect.right >= x &&
            rect.top <= y &&
            rect.bottom >= y
          );
        });
      setLightPaw(
        filmBottom > 72 || onDarkImage(window.innerWidth < 768 ? 40 : 64, 72)
      );
      setLightMonogram(
        filmBottom > 48 || onDarkImage(window.innerWidth / 2, 48)
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(syncNavigation);
    };
    syncNavigation();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    page.current?.addEventListener("load", schedule, true);
    const root = page.current;
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root?.removeEventListener("load", schedule, true);
    };
  }, [collection.id]);

  return (
    <main ref={page} className={`collection-page collection-${collection.id}`}>
      <CheetahBar tone={lightPaw ? "light" : "dark"} />
      <HeaderWordmark dark={lightMonogram} />
      <div ref={opening}>
        <CollectionCampaign key={collection.id} collection={collection} />
      </div>

      {collection.id === "masquerade" ? (
        <MasqueradeCampaign
          key={collection.id}
          collection={collection}
          inspect={setActivePhotograph}
        />
      ) : (
        <GunCampaign
          key={collection.id}
          collection={collection}
          inspect={setActivePhotograph}
        />
      )}

      <nav
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
          key={collection.id}
          title={title}
          images={collection.stills}
          initial={activePhotograph}
          dismiss={() => setActivePhotograph(null)}
        />
      )}
    </main>
  );
}
