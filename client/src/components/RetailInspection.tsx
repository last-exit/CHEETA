import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import type { ProductItem } from "@/data/retailCatalog";

export default function RetailInspection({ product }: { product: ProductItem }) {
  const [close, setClose] = useState(false);
  const Icon = close ? ZoomOut : ZoomIn;

  return (
    <button
      type="button"
      className="retail-display-image"
      aria-label={`Inspect ${product.name}`}
      aria-pressed={close}
      onClick={() => setClose(value => !value)}
      onKeyDown={event => {
        if (event.key === "Escape" && close) {
          event.preventDefault();
          setClose(false);
        }
      }}
    >
      <img
        src={product.productImage}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
      <span className="retail-inspect-icon">
        <Icon size={21} strokeWidth={1.4} aria-hidden="true" />
      </span>
    </button>
  );
}
