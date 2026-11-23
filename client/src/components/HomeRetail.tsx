import { Link } from "wouter";
import Ornament from "./Ornament";
import { RETAIL_PREVIEW_PRODUCTS, RETAIL_PRODUCTS } from "@/data/retailCatalog";
import ArchNiche from "./ArchNiche";
import Lace from "./Lace";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Retail as a page from a Mughal album: painted flower margins down each side,
 * and each piece set in its own cusped niche, edged in gilt.
 */
export default function HomeRetail() {
  const live = RETAIL_PRODUCTS.length > 0;
  const pieces = (live ? RETAIL_PRODUCTS : RETAIL_PREVIEW_PRODUCTS).slice(0, 4);

  return (
    <section
      id="retail"
      className="home-retail"
      aria-labelledby="home-retail-title"
    >
      <Lace hang="up" />
      <div className="home-retail-frieze" aria-hidden="true" />
      <div className="home-retail-inner">
        <header className="home-retail-head" data-editorial-reveal>
          <div>
            <Ornament className="room-ornament room-ornament-start" />
            <p className="panel-kicker">Retail</p>
            <h2 id="home-retail-title" className="panel-title">
              Pieces to <em>keep close.</em>
            </h2>
          </div>
          <div className="home-retail-aside">
            <p>Eyewear and jewellery, to order online.</p>
            <Link href="/retail" className="house-cartouche">
              View the collection
            </Link>
          </div>
        </header>

        <ol className="home-retail-ledge" data-editorial-reveal>
          {pieces.map((piece, index) => (
            <li key={piece.id}>
              <Link href={`/product/${piece.slug}`} className="home-retail-piece">
                <ArchNiche src={piece.productImage} className="home-retail-object" />
                <span className="home-retail-no">No. {pad(index + 1)}</span>
                <span className="home-retail-label">{piece.name}</span>
                <span className="home-retail-meta">
                  {piece.category === "Eyewear" ? "Eyewear" : "Jewellery"} ·{" "}
                  {piece.priceDisplay}
                </span>
                <span className="home-retail-discover" aria-hidden="true">
                  Discover
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {!live && (
          <p className="home-retail-note">
            A preview of the online collection. Pieces and prices are shown for
            illustration and will be confirmed before sale.
          </p>
        )}
      </div>
      <div className="home-retail-frieze" aria-hidden="true" />
    </section>
  );
}
