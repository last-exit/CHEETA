import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "wouter";
import CampaignImageDialog from "@/components/CampaignImageDialog";
import CampaignMotionChapter from "@/components/CampaignMotionChapter";
import ScrollReveal from "@/components/ScrollReveal";
import { CAMPAIGN_STORIES } from "@/data/campaignStories";
import CollectionCampaign from "@/components/CollectionCampaign";
import { InformationFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { collectionTitle } from "@/lib/collectionPresentation";
import { COLLECTIONS } from "@/data/collections";
import "./CollectionDetail.css";

export default function CollectionDetail() {
  const params = useParams<{ id: string }>();
  const rawId = (params.id || "barrel").toLowerCase();
  const collection =
    COLLECTIONS[rawId === "gun" ? "barrel" : rawId] || COLLECTIONS.barrel;
  const next = COLLECTIONS[collection.nextId];
  const opening = useRef<HTMLDivElement>(null);
  const [activePhotograph, setActivePhotograph] = useState<number | null>(null);
  const [lightPaw, setLightPaw] = useState(true);
  const [lightMonogram, setLightMonogram] = useState(true);
  const title = collectionTitle(collection.title);
  const story = CAMPAIGN_STORIES[collection.id];

  useEffect(() => {
    setActivePhotograph(null);
    window.scrollTo(0, 0);
    const syncNavigation = () => {
      const filmBottom = opening.current?.getBoundingClientRect().bottom ?? 0;
      const images = Array.from(
        opening.current?.parentElement?.querySelectorAll<HTMLImageElement>(
          ".collection-portraits img, .collection-stills img"
        ) ?? []
      );
      const onDarkImage = (x: number, y: number) =>
        collection.id !== "maharaja" &&
        images.some(image => {
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
    syncNavigation();
    window.addEventListener("scroll", syncNavigation, { passive: true });
    window.addEventListener("resize", syncNavigation);
    return () => {
      window.removeEventListener("scroll", syncNavigation);
      window.removeEventListener("resize", syncNavigation);
    };
  }, [collection.id]);

  return (
    <main className={`collection-page collection-${collection.id}`}>
      <CheetahBar tone={lightPaw ? "light" : "dark"} />
      <HeaderWordmark dark={lightMonogram} />
      <div ref={opening}>
        <CollectionCampaign key={collection.id} collection={collection} />
      </div>

      <header className="collection-masthead house-container">
        <ScrollReveal key={collection.id}>
          <h1 aria-label={title}>
            {story.lead && (
              <span className="campaign-title-lead" aria-hidden="true">
                {story.lead}{" "}
              </span>
            )}
            <span className="campaign-title-name" aria-hidden="true">
              {story.name}
            </span>
          </h1>
        </ScrollReveal>
      </header>

      <section
        className="collection-portraits"
        aria-label={`${title} campaign portraits`}
      >
        <button
          type="button"
          className="campaign-photograph"
          aria-label={`View ${title} photograph 1`}
          onClick={() => setActivePhotograph(0)}
        >
          <img
            src={collection.stills[0]}
            alt={`${title}, campaign portrait`}
            loading="lazy"
            decoding="async"
          />
        </button>
        <button
          type="button"
          className="campaign-photograph"
          aria-label={`View ${title} photograph 2`}
          onClick={() => setActivePhotograph(1)}
        >
          <img
            src={collection.stills[1]}
            alt={`${title}, second campaign portrait`}
            loading="lazy"
            decoding="async"
          />
        </button>
      </section>

      <CampaignMotionChapter
        key={`motion-${collection.id}`}
        collection={collection}
        story={story}
      />

      <section
        className="collection-stills"
        aria-label={`${title} campaign stills`}
      >
        <figure className="collection-still-detail house-container">
          <button
            type="button"
            className="campaign-photograph"
            aria-label={`View ${title} photograph 3`}
            onClick={() => setActivePhotograph(2)}
          >
            <img
              src={collection.stills[2]}
              alt={`${title}, campaign still`}
              loading="lazy"
              decoding="async"
            />
          </button>
        </figure>
        <div className="campaign-closing-copy house-container">
          <h2>{story.closing}</h2>
        </div>
        <figure className="collection-still-wide">
          <button
            type="button"
            className="campaign-photograph"
            aria-label={`View ${title} photograph 4`}
            onClick={() => setActivePhotograph(3)}
          >
            <img
              src={collection.stills[3]}
              alt={`${title}, final campaign still`}
              loading="lazy"
              decoding="async"
            />
          </button>
        </figure>
      </section>

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
      <InformationFooter />
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
