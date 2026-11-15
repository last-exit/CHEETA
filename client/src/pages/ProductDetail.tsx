import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Redirect, useParams } from "wouter";
import { useHistoryState } from "wouter/use-browser-location";
import AcquisitionButton from "@/components/AcquisitionButton";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { InformationFooter } from "@/components/HouseFooter";
import RetailInspection from "@/components/RetailInspection";
import { useCart } from "@/contexts/CartContext";
import { useBagConfirmation } from "@/hooks/useBagConfirmation";
import { playVaultAcquisition } from "@/lib/soundEffects";
import { productForSlug, type ProductItem } from "@/data/retailCatalog";
import NotFound from "./NotFound";
import "./Retail.css";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = productForSlug(slug);
  if (!product) return <NotFound />;
  if (product.availability === "showroom")
    return <Redirect to="/collection/barrel" replace />;
  if (product.availability === "unlisted")
    return <Redirect to="/retail" replace />;
  return <RetailProduct key={product.id} product={product} />;
}

function RetailProduct({ product }: { product: ProductItem }) {
  const { addToCart, totalCount } = useCart();
  const confirmAddedToBag = useBagConfirmation();
  const preview = product.availability === "preview";
  const state = useHistoryState<{ retailSearch?: string } | null>();
  const retailSearch = new URLSearchParams(state?.retailSearch);
  retailSearch.set("piece", product.slug);

  const handleAdd = () => {
    if (!addToCart(product.id)) return;
    playVaultAcquisition();
    confirmAddedToBag(product.name, product.priceDisplay);
  };

  return (
    <main className="product-page catalogue-page">
      <CheetahBar />
      <HeaderWordmark />

      <div className="catalogue-shell house-container">
        <nav className="product-breadcrumb" aria-label="Retail navigation">
          <Link href={`/retail?${retailSearch}`} className="retail-detail-link">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to retail
          </Link>
          {preview ? (
            <Link href="/contact?interest=retail" className="retail-contact">
              Retail enquiries <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ) : (
            <Link href="/cart" className="retail-contact">
              Bag ({totalCount})
            </Link>
          )}
        </nav>

        <section className="retail-display product-display" aria-label="Piece details">
          <RetailInspection product={product} />
          <div className="retail-display-info">
            <h1>{product.name}</h1>
            <p className="retail-price">{product.priceDisplay}</p>
            <p className="product-specification">{product.frame} · {product.lens}</p>
            {preview ? (
              <p className="retail-preview-note">Preview piece. Price is illustrative.</p>
            ) : (
              <div className="retail-product-actions">
                <AcquisitionButton onClick={handleAdd}>Add to bag</AcquisitionButton>
              </div>
            )}
          </div>
        </section>
      </div>
      <InformationFooter />
    </main>
  );
}
