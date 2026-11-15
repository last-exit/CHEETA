import type { KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useSearchParams } from "wouter";
import AcquisitionButton from "@/components/AcquisitionButton";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import RetailInspection from "@/components/RetailInspection";
import { InformationFooter } from "@/components/HouseFooter";
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
  { id: "all", label: "All" },
  { id: "eyewear", label: "Eyewear" },
  { id: "jewelry", label: "Jewellery" },
] as const;
const views = [
  { id: "display", label: "Display" },
  { id: "grid", label: "Grid" },
] as const;

const showingPreview = RETAIL_PRODUCTS.length === 0;
const catalogue = showingPreview ? RETAIL_PREVIEW_PRODUCTS : RETAIL_PRODUCTS;

export default function Retail() {
  const { addToCart, totalCount } = useCart();
  const confirmAddedToBag = useBagConfirmation();
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const filter =
    category === "eyewear" || category === "jewelry" ? category : "all";
  const view = search.get("view") === "grid" ? "grid" : "display";
  const filtered = catalogue.filter(
    product =>
      filter === "all" ||
      product.category === (filter === "eyewear" ? "Eyewear" : "High Jewelry")
  );
  const selected =
    filtered.find(product => product.slug === search.get("piece")) ??
    filtered[0];

  const updatePreference = (
    key: string,
    value: string,
    defaultValue?: string
  ) => {
    setSearch(
      previous => {
        const next = new URLSearchParams(previous);
        if (value === defaultValue) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
  };

  const select = (product: ProductItem) =>
    updatePreference("piece", product.slug);

  const handleSelectionKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(event.currentTarget.querySelectorAll("button"));
    const current = buttons.indexOf(event.target as HTMLButtonElement);
    if (current < 0) return;
    let next: number;
    switch (event.key) {
      case "ArrowLeft":
        next = (current - 1 + filtered.length) % filtered.length;
        break;
      case "ArrowRight":
        next = (current + 1) % filtered.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = filtered.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(filtered[next]);
    buttons[next]?.focus();
  };

  const acquire = (product: ProductItem) => {
    if (!addToCart(product.id)) return;
    playVaultAcquisition();
    confirmAddedToBag(product.name, product.priceDisplay);
  };

  return (
    <main className="retail-page catalogue-page">
      <CheetahBar />
      <HeaderWordmark />

      <div className="catalogue-shell house-container">
        <header className="retail-opening">
          <div className="retail-heading">
            <h1>Retail</h1>
            {showingPreview ? (
              <Link href="/contact?interest=retail" className="retail-contact">
                Retail enquiries <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ) : (
              <Link href="/cart" className="retail-contact">
                Bag ({totalCount})
              </Link>
            )}
          </div>
          {showingPreview && (
            <p className="retail-preview-note">
              Catalogue preview. Pieces and prices are illustrative.
            </p>
          )}
          <div className="retail-toolbar">
            <div role="group" aria-label="Product category">
              {categories.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={filter === id}
                  aria-controls="retail-pieces"
                  onClick={() => updatePreference("category", id, "all")}
                >
                  {label}
                </button>
              ))}
            </div>
            <div role="group" aria-label="Product layout">
              {views.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={view === id}
                  aria-controls="retail-pieces"
                  onClick={() => updatePreference("view", id, "display")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <span className="sr-only" role="status">
            {view === "display" && selected
              ? `${selected.name}, ${selected.priceDisplay}. ${filtered.length} pieces.`
              : `${filtered.length} pieces.`}
          </span>
        </header>

        {!selected ? (
          <p id="retail-pieces" className="retail-empty">
            {catalogue.length
              ? "No pieces in this category."
              : "The first online release is in preparation."}
          </p>
        ) : view === "display" ? (
          <section
            className="retail-display"
            id="retail-pieces"
            aria-label="Retail display"
          >
            <RetailInspection key={selected.slug} product={selected} />
            <div className="retail-display-info">
              <h2>{selected.name}</h2>
              <p className="retail-price">{selected.priceDisplay}</p>
              <div className="retail-product-actions">
                <Link
                  href={`/product/${selected.slug}`}
                  state={{ retailSearch: search.toString() }}
                  className="retail-detail-link"
                >
                  View details <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                {!showingPreview && (
                  <AcquisitionButton onClick={() => acquire(selected)}>
                    Add to bag
                  </AcquisitionButton>
                )}
              </div>
            </div>
            <div
              className="retail-piece-tray"
              role="group"
              aria-label="Select a piece"
              onKeyDown={handleSelectionKeys}
            >
              {filtered.map(product => (
                <button
                  key={product.id}
                  type="button"
                  aria-label={product.name}
                  aria-pressed={product.id === selected.id}
                  onClick={() => select(product)}
                >
                  <img src={product.productImage} alt="" decoding="async" />
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section
            className="retail-grid"
            id="retail-pieces"
            aria-label="Retail pieces"
          >
            {filtered.map((product, index) => (
              <article key={product.id} className="retail-grid-piece">
                <Link
                  href={`/product/${product.slug}`}
                  state={{ retailSearch: search.toString() }}
                  className="retail-grid-link"
                >
                  <span className="retail-grid-image">
                    <img
                      src={product.productImage}
                      alt=""
                      loading={index > 1 ? "lazy" : "eager"}
                      decoding="async"
                    />
                  </span>
                  <h2>{product.name}</h2>
                  <p className="retail-price">{product.priceDisplay}</p>
                </Link>
                {!showingPreview && (
                  <AcquisitionButton onClick={() => acquire(product)}>
                    Add to bag
                  </AcquisitionButton>
                )}
              </article>
            ))}
          </section>
        )}
      </div>
      <InformationFooter />
    </main>
  );
}
