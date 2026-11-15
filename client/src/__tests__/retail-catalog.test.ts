import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { CartProvider, readRetailCart } from "../contexts/CartContext";
import {
  PRODUCTS,
  RETAIL_PRODUCTS,
  productForSlug,
} from "../data/retailCatalog";
import Retail from "../pages/Retail";

describe("Retail availability", () => {
  it("keeps showroom and unlisted products out of the online range", () => {
    expect(RETAIL_PRODUCTS).toEqual(
      PRODUCTS.filter(product => product.availability === "retail")
    );
    expect(productForSlug("double-barrel-01")?.availability).toBe("showroom");
    expect(productForSlug("gun-collection-02")?.availability).toBe("showroom");
    expect(productForSlug("emerald-signet-ring")?.availability).toBe(
      "unlisted"
    );
  });

  it("leaves unknown product URLs unresolved", () => {
    expect(productForSlug("unknown-piece")).toBeUndefined();
    expect(productForSlug(undefined)).toBeUndefined();
  });

  it("shows a labelled catalogue preview while there are no approved online items", () => {
    const html = renderToStaticMarkup(
      createElement(
        Router,
        { ssrPath: "/retail" },
        createElement(CartProvider, { children: createElement(Retail) })
      )
    );
    expect(html).toContain('href="/contact?interest=retail"');
    expect(html).toContain('href="/product/preview-amber-round"');
    expect(html).toContain('aria-label="Green signet ring"');
    expect(html).toContain("Pieces and prices are illustrative.");
    expect(html).not.toMatch(/add to bag|href="\/cart"/i);
    expect(html).not.toMatch(/double-barrel-01|emerald-signet-ring|15,000/);
  });

  it("excludes old showroom products and unknown items from restored bags", () => {
    expect(
      readRetailCart(
        JSON.stringify([
          { id: "barrel-01", quantity: 1, price: 15000 },
          { id: "emerald-signet", quantity: 1, price: 42000 },
          { id: "missing-piece", quantity: 2 },
          { id: "preview-amber-round", quantity: 1, price: 5000 },
        ])
      )
    ).toEqual([]);
    expect(readRetailCart("{")).toEqual([]);
  });
});
