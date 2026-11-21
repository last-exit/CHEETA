import { ArrowUpRight } from "lucide-react";
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
}: {
  collection: ShowroomCollection;
  title?: string;
  linkLabel?: string;
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
        className="collection-showroom-link"
      >
        {linkLabel}
        <ArrowUpRight size={20} strokeWidth={1} aria-hidden="true" />
      </Link>
    </section>
  );
}
