import { useEffect, useRef, useState } from "react";
import ArcText from "@/components/ArcText";
import CheetahCrest from "@/components/CheetahCrest";
import { Link, useSearchParams } from "wouter";
import Lace from "@/components/Lace";
import AcquisitionButton from "@/components/AcquisitionButton";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { InformationFooter } from "@/components/HouseFooter";
import RetailGalleryImage from "@/components/RetailGalleryImage";
import { useCart } from "@/contexts/CartContext";
import { useBagConfirmation } from "@/hooks/useBagConfirmation";
import { playVaultAcquisition } from "@/lib/soundEffects";
import {
  RETAIL_PREVIEW_PRODUCTS,
  RETAIL_PRODUCTS,
  type ProductItem,
} from "@/data/retailCatalog";
import "./Retail.css";

const categories = [
  { id: "all", label: "All pieces" },
  { id: "eyewear", label: "Eyewear" },
  { id: "jewelry", label: "Jewellery" },
] as const;

const showingPreview = RETAIL_PRODUCTS.length === 0;
const catalogue = showingPreview ? RETAIL_PREVIEW_PRODUCTS : RETAIL_PRODUCTS;

export default function Retail() {
  const { addToCart, totalCount } = useCart();
  const treasury = useRef<HTMLElement>(null);
  // The paw and CJ turn light while they sit over the painted header.
  const [overHall, setOverHall] = useState(true);
  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      const bottom = treasury.current?.getBoundingClientRect().bottom ?? 0;
      setOverHall(bottom > 72);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const confirmAddedToBag = useBagConfirmation();
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const filter =
    category === "eyewear" || category === "jewelry" ? category : "all";
  const filtered = catalogue.filter(
    product =>
      filter === "all" ||
      product.category === (filter === "eyewear" ? "Eyewear" : "High Jewelry")
  );

  const chooseCategory = (id: (typeof categories)[number]["id"]) => {
    const next = new URLSearchParams(search);
    next.delete("piece");
    next.delete("view");
    if (id === "all") next.delete("category");
    else next.set("category", id);
    setSearch(next, { replace: true, state: history.state });
  };

  const acquire = (product: ProductItem) => {
    if (!addToCart(product.id)) return;
    playVaultAcquisition();
    confirmAddedToBag(product.name, product.priceDisplay);
  };

  return (
    <main className="retail-page catalogue-page">
      <CheetahBar tone={overHall ? "light" : "dark"} />
      <HeaderWordmark dark={overHall} />

      <header ref={treasury} className="treasury" aria-labelledby="retail-title">
        <img
          className="treasury-painting"
          src="/mughal/garden.webp"
          alt=""
          width="1850"
          height="1480"
          decoding="async"
        />
        <div className="treasury-heading">
          <h1 id="retail-title" className="treasury-title">
            <ArcText bow="over" className="treasury-welcome">Welcome to the</ArcText>
            <span className="treasury-name">Treasury</span>
            <ArcText bow="under" className="treasury-line">of Cheeta Jewels</ArcText>
          </h1>
        </div>
        <div className="retail-toolbar">
          <div className="retail-categories" role="group" aria-label="Product category">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                aria-controls="retail-pieces"
                onClick={() => chooseCategory(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <span className="sr-only" role="status">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </span>
      </header>

      <div className="album-page">
        <Lace hang="up" />
      <div className="catalogue-shell house-container">
        <div className="retail-preview-banner">
          <CheetahCrest className="retail-crest" />
          {showingPreview && (
            <p className="retail-preview-note">
              Catalogue preview. Pieces and prices are illustrative.
            </p>
          )}
          {showingPreview ? (
            <Link href="/contact?interest=retail" className="retail-contact">
              Retail enquiries
            </Link>
          ) : (
            <Link href="/cart" className="retail-contact">
              Bag ({totalCount})
            </Link>
          )}
        </div>
        <section className="retail-gallery" id="retail-pieces" aria-label="Retail pieces">
          {filtered.map((product, index) => (
            <article
              key={product.id}
              id={`piece-${product.slug}`}
              className="retail-gallery-piece"
            >
              <Link
                href={`/product/${product.slug}`}
                state={{ retailSearch: search.toString() }}
                className="retail-piece-link"
              >
                <RetailGalleryImage
                  src={product.productImage}
                  loading={index > 1 ? "lazy" : "eager"}
                />
                <div className="retail-piece-caption">
                  <span className="retail-piece-no">No. {String(index + 1).padStart(2, "0")}</span>
                  <h2>{product.name}</h2>
                  <p className="retail-piece-price">{product.priceDisplay}</p>
                  <span className="retail-piece-discover" aria-hidden="true">Discover</span>
                </div>
              </Link>
              {!showingPreview && (
                <AcquisitionButton onClick={() => acquire(product)}>
                  Add to bag
                </AcquisitionButton>
              )}
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="retail-empty">No pieces in this category.</p>
          )}
        </section>
      </div>
      </div>
      <InformationFooter />
    </main>
  );
}
