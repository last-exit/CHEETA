import { useEffect } from "react";
import { Link, useSearchParams } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { InformationFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import AcquisitionButton from "@/components/AcquisitionButton";
import HeaderWordmark from "@/components/HeaderWordmark";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { collectionHeading } from "@/lib/collectionPresentation";
import { useBagConfirmation } from "@/hooks/useBagConfirmation";
import "./Retail.css";

import { PRODUCTS, type ProductItem } from "@/data/retailCatalog";
export { PRODUCTS, type ProductItem } from "@/data/retailCatalog";

type FilterCategory = "all" | "eyewear" | "jewelry";
type ViewMode = "lookbook" | "grid";

const categories: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "all" },
  { id: "eyewear", label: "eyewear" },
  { id: "jewelry", label: "jewellery" },
];

export default function Retail() {
  const confirmAddedToBag = useBagConfirmation();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const filter: FilterCategory =
    category === "eyewear" || category === "jewelry" ? category : "all";
  const viewMode: ViewMode =
    searchParams.get("view") === "grid" ? "grid" : "lookbook";
  const updatePreference = (
    key: string,
    value: string,
    defaultValue: string
  ) => {
    setSearchParams(
      previous => {
        const next = new URLSearchParams(previous);
        if (value === defaultValue) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
  };
  const rememberPosition = () => {
    window.history.replaceState(
      { ...window.history.state, cheetaRetailScroll: window.scrollY },
      ""
    );
  };
  useEffect(() => {
    const position = window.history.state?.cheetaRetailScroll;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        if (typeof position === "number")
          window.scrollTo({ top: position, behavior: "instant" });
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);
  const { addToCart, totalCount } = useCart();

  const filteredProducts = PRODUCTS.filter(
    product =>
      filter === "all" ||
      product.category === (filter === "eyewear" ? "Eyewear" : "High Jewelry")
  );

  const handleAddToCart = (product: ProductItem) => {
    playVaultAcquisition();
    addToCart({
      id: product.id,
      name: product.name,
      frame: product.frame,
      lens: product.lens,
      price: product.price,
      priceDisplay: product.priceDisplay,
      image: product.productImage,
    });
    confirmAddedToBag(
      collectionHeading(product.name),
      product.priceDisplay.toLowerCase()
    );
  };

  return (
    <main className="retail-page">
      <CheetahBar />
      <HeaderWordmark dark={false} />

      <div className="retail-shell">
        <header className="retail-opening">
          <div className="retail-heading">
            <h1>Retail</h1>
            <Link
              href="/cart"
              className="retail-bag"
              onClick={rememberPosition}
            >
              bag ({totalCount})
            </Link>
          </div>
          <div className="retail-toolbar">
            <div
              className="retail-filters"
              role="group"
              aria-label="Product category"
            >
              {categories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={filter === category.id}
                  aria-controls="retail-pieces"
                  onClick={() => {
                    playMetallicClick();
                    updatePreference("category", category.id, "all");
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="retail-options">
              <div
                className="retail-views"
                role="group"
                aria-label="Product layout"
              >
                {(["lookbook", "grid"] as const).map(view => (
                  <button
                    key={view}
                    type="button"
                    aria-pressed={viewMode === view}
                    aria-controls="retail-pieces"
                    onClick={() => {
                      playMetallicClick();
                      updatePreference("view", view, "lookbook");
                    }}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <span className="sr-only" role="status" aria-live="polite">
            {filteredProducts.length} pieces, {viewMode} view
          </span>
        </header>

        <div id="retail-pieces" className="retail-list" data-view={viewMode}>
          {filteredProducts.map((product, index) => {
            const title = collectionHeading(product.name);
            const href = `/product/${product.slug}`;
            return (
              <article key={product.id} className="retail-product">
                <Link
                  href={href}
                  onClick={rememberPosition}
                  className={`retail-product-image ${product.category === "High Jewelry" ? "retail-product-image--jewellery" : ""} ${product.id === "atrium-necklace" ? "retail-product-image--necklace" : ""}`}
                  aria-label={`view ${title}`}
                >
                  <img
                    src={product.productImage}
                    alt={title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </Link>
                <div className="retail-product-info">
                  <h2>
                    <Link href={href} onClick={rememberPosition}>
                      {title}
                    </Link>
                  </h2>
                  <p className="retail-price">
                    {product.priceDisplay.toLowerCase()}
                  </p>
                  <div className="retail-product-actions">
                    <AcquisitionButton
                      onClick={() => handleAddToCart(product)}
                      aria-label={`acquire ${title}`}
                    >
                      acquire
                    </AcquisitionButton>
                    <Link
                      href={href}
                      onClick={rememberPosition}
                      className="retail-details"
                      aria-label={`details for ${title}`}
                    >
                      details{" "}
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <section
          className="retail-presentation"
          aria-labelledby="retail-vault-title"
        >
          <div>
            <h2 id="retail-vault-title">The velvet vault</h2>
            <Link href="/care" className="retail-details">
              care guide{" "}
              <ArrowUpRight size={14} strokeWidth={1.25} aria-hidden="true" />
            </Link>
          </div>
          <img
            src="/manus-storage/cheeta-leopard-vault-box.jpg"
            alt="Cheeta Jewels velvet presentation box"
            loading="lazy"
            decoding="async"
          />
        </section>
      </div>
      <InformationFooter />
    </main>
  );
}
