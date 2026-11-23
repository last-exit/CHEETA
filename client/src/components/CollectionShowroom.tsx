import { Link } from "wouter";
import {
  SHOWROOM_COLLECTIONS,
  type ShowroomCollection,
} from "@/lib/cheetaContact";
import "./CollectionShowroom.css";

export default function CollectionShowroom({
  collection,
  title = "Visit the showroom",
  linkLabel = "Arrange a visit",
  tone,
}: {
  collection: ShowroomCollection;
  title?: string;
  linkLabel?: string;
  /** "gold" for a dark room. */
  tone?: "gold";
}) {
  return (
    <section
      className="collection-showroom house-container"
      data-campaign-chapter="the-showroom"
      aria-labelledby="collection-showroom-title"
      data-editorial-reveal
    >
      <h2 id="collection-showroom-title">{title}</h2>
      <p>
        {SHOWROOM_COLLECTIONS[collection].name} is available exclusively at our
        showroom.
      </p>
      <Link
        href={`/contact?collection=${collection}`}
        className="house-cartouche collection-showroom-link"
        data-tone={tone}
      >
        {linkLabel}
      </Link>
    </section>
  );
}
