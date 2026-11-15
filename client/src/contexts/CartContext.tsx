import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { RETAIL_PRODUCTS, type ProductItem } from "@/data/retailCatalog";

export interface CartItem {
  id: string;
  name: string;
  frame: string;
  lens: string;
  price: number; // in AED
  priceDisplay: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string) => boolean;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "cheeta_cart_v1";
const retailById = new Map(
  RETAIL_PRODUCTS.map(product => [product.id, product])
);

function cartItem(product: ProductItem, quantity: number): CartItem {
  return {
    id: product.id,
    name: product.name,
    frame: product.frame,
    lens: product.lens,
    price: product.price,
    priceDisplay: product.priceDisplay,
    image: product.productImage,
    quantity,
  };
}

export function readRetailCart(saved: string | null): CartItem[] {
  if (saved === null) return [];

  try {
    const entries: unknown = JSON.parse(saved);
    if (!Array.isArray(entries)) return [];

    const quantities = new Map<string, number>();
    for (const entry of entries) {
      if (
        typeof entry?.id !== "string" ||
        !Number.isSafeInteger(entry.quantity) ||
        entry.quantity < 1
      )
        continue;
      const quantity = (quantities.get(entry.id) ?? 0) + entry.quantity;
      if (Number.isSafeInteger(quantity)) quantities.set(entry.id, quantity);
    }
    return RETAIL_PRODUCTS.flatMap(product => {
      const quantity = quantities.get(product.id);
      return quantity ? [cartItem(product, quantity)] : [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return readRetailCart(window.localStorage.getItem(CART_STORAGE_KEY));
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      }
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  const addToCart = useCallback((productId: string) => {
    const product = retailById.get(productId);
    if (!product) return false;

    setCart(previous => {
      const existing = previous.find(item => item.id === productId);
      if (!existing) return [...previous, cartItem(product, 1)];
      if (!Number.isSafeInteger(existing.quantity + 1)) return previous;
      return previous.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
    return true;
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    if (!Number.isSafeInteger(delta)) return;
    setCart(previous =>
      previous.flatMap(item => {
        if (item.id !== id) return [item];
        const quantity = item.quantity + delta;
        if (quantity < 1) return [];
        return Number.isSafeInteger(quantity)
          ? [{ ...item, quantity }]
          : [item];
      })
    );
  }, []);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = React.useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalCount,
      totalPrice,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, totalCount, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
