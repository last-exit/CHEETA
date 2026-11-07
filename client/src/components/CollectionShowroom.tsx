import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import "./CollectionShowroom.css";

export default function CollectionShowroom({
  collection,
}: {
  collection: string;
}) {
  return (
    <section
      className="collection-showroom house-container"
      data-campaign-chapter="the-showroom"
      aria-labelledby="collection-showroom-title"
    >
      <h2 id="collection-showroom-title">
        Only <em>in person.</em>
      </h2>
      <p>
        {collection} is available exclusively at our showroom. Contact us to
        arrange a visit.
      </p>
      <Link href="/contact" className="collection-showroom-link">
        arrange a showroom visit
        <ArrowUpRight size={20} strokeWidth={1} aria-hidden="true" />
      </Link>
    </section>
  );
}
