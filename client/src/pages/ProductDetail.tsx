import { ArrowLeft } from "lucide-react";
import Ornament from "@/components/Ornament";
import { Link, Redirect, useParams } from "wouter";
import { useHistoryState } from "wouter/use-browser-location";
import AcquisitionButton from "@/components/AcquisitionButton";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { InformationFooter } from "@/components/HouseFooter";
import RetailGalleryImage from "@/components/RetailGalleryImage";
import RetailInspection from "@/components/RetailInspection";
import { useCart } from "@/contexts/CartContext";
import { useBagConfirmation } from "@/hooks/useBagConfirmation";
import { playVaultAcquisition } from "@/lib/soundEffects";
import {
  productForSlug,
  RETAIL_PREVIEW_PRODUCTS,
  RETAIL_PRODUCTS,
  type ProductItem,
} from "@/data/retailCatalog";
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
  retailSearch.delete("view");
  retailSearch.set("piece", product.slug);
  const related = (preview ? RETAIL_PREVIEW_PRODUCTS : RETAIL_PRODUCTS)
    .filter(item => item.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.category === product.category) -
        Number(a.category === product.category)
    )
    .slice(0, 3);
  const enquiry = `/contact?interest=retail&piece=${encodeURIComponent(product.slug)}`;

  const handleAdd = () => {
    if (!addToCart(product.id)) return;
    playVaultAcquisition();
    confirmAddedToBag(product.name, product.priceDisplay);
  };

  return (
    <main className="product-page catalogue-page">
      <CheetahBar />
      <HeaderWordmark />

      <div className="album-page">
        <img className="house-flower product-flower-iris" src="/mughal/flower-iris.webp" alt="" decoding="async" />
      <div className="catalogue-shell house-container">
        <nav className="product-breadcrumb" aria-label="Retail navigation">
          <Link
            href={`/retail?${retailSearch}#piece-${product.slug}`}
            className="retail-detail-link"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Back to retail
          </Link>
          {!preview && (
            <Link href="/cart" className="retail-contact">
              Bag ({totalCount})
            </Link>
          )}
        </nav>

        <section className="product-display" aria-label="Piece details">
          <RetailInspection product={product} />
          <div className="product-display-info">
            <p className="house-kicker">
              {product.category === "Eyewear" ? "Eyewear" : "Jewellery"}
            </p>
            <h1>{product.name}</h1>
            <p className="retail-price">{product.priceDisplay}</p>
            <dl className="product-specification">
              <div>
                <dt>{product.category === "Eyewear" ? "Frame" : "Form"}</dt>
                <dd>{product.frame}</dd>
              </div>
              <div>
                <dt>{product.category === "Eyewear" ? "Lenses" : "Detail"}</dt>
                <dd>{product.lens}</dd>
              </div>
            </dl>
            {preview ? (
              <>
                <p className="retail-preview-note">
                  Catalogue preview. Price is illustrative.
                </p>
                <Link href={enquiry} className="house-cartouche">
                  Enquire about this piece
                </Link>
              </>
            ) : (
              <div className="retail-product-actions">
                <AcquisitionButton onClick={handleAdd}>Add to bag</AcquisitionButton>
              </div>
            )}
          </div>
        </section>
        {related.length > 0 && (
          <section className="product-related" aria-labelledby="product-related-title">
            <Ornament className="page-ornament" />
            <h2 id="product-related-title">More from Retail</h2>
            <div className="product-related-grid">
              {related.map(item => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className="retail-piece-link"
                >
                  <RetailGalleryImage src={item.productImage} />
                  <span className="retail-piece-caption">
                    <span>{item.name}</span>
                    <span className="retail-piece-price">{item.priceDisplay}</span>
                    <span className="retail-piece-discover" aria-hidden="true">Discover</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      </div>
      <InformationFooter />
    </main>
  );
}
