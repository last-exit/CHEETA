import NumberFlow from "@number-flow/react";
import Ornament from "@/components/Ornament";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { InformationFooter } from "@/components/HouseFooter";
import { collectionHeading } from "@/lib/collectionPresentation";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { useCart } from "@/contexts/CartContext";
import { cheetaEmailLink } from "@/lib/cheetaContact";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalCount } =
    useCart();
  const enquiry = cheetaEmailLink(
    "Retail enquiry",
    [
      "Hello Cheeta Jewels,",
      "",
      "I’d like to enquire about these Retail pieces:",
      "",
      ...cart.map(item => `${item.quantity} × ${item.name} (${item.id})`),
    ].join("\n")
  );

  return (
    <main className="cart-page relative min-h-screen w-full overflow-hidden">
      <CheetahBar />
      <HeaderWordmark />
      <div className="cart-shell relative z-10">
        {/* Back Link */}
        <div className="mb-6 font-sans lowercase text-[length:var(--house-label-size)]">
          <Link
            href="/retail"
            className="group inline-flex min-h-11 items-center gap-2 text-(--house-muted) hover:text-(--house-accent) transition-colors"
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>retail</span>
          </Link>
        </div>

        {/* Header */}
        <Ornament className="page-ornament mb-5" />
        <p className="house-kicker mb-5">The house</p>
        <header className="mb-8 flex items-baseline justify-between">
          <h1 className="font-serif text-[length:var(--house-heading)] font-normal leading-none tracking-[-0.052em]">
            Bag
          </h1>
          <span className="font-sans text-[length:var(--house-label-size)] text-(--house-muted)">
            {totalCount} {totalCount === 1 ? "piece" : "pieces"}
          </span>
        </header>

        {cart.length === 0 ? (
          <div className="py-10 text-center md:py-14">
            <p className="font-serif text-2xl text-(--house-muted) font-normal">
              Your bag is empty.
            </p>
            <div className="pt-3">
              <Link
                href="/retail"
                className="inline-flex min-h-11 items-center font-sans text-[length:var(--house-label-size)] hover:text-(--house-accent) transition-colors font-medium"
              >
                Back to Retail →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Item List */}
            <div className="space-y-6">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="bag-item flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6"
                >
                  <div className="bag-item-description flex items-center gap-6">
                    <div className="h-20 w-20 flex items-center justify-center shrink-0 bg-(--house-surface) p-2">
                      <img
                        src={item.image}
                        alt={collectionHeading(item.name)}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-normal">
                        {collectionHeading(item.name)}
                      </h3>
                      <p className="font-sans text-[length:var(--house-label-size)] lowercase text-(--house-muted) mt-1">
                        {item.frame}
                      </p>
                    </div>
                  </div>

                  <div className="bag-item-actions flex items-center justify-between sm:justify-end w-full sm:w-auto gap-8">
                    {/* Quantity Controls */}
                    <div className="bag-quantity flex items-center gap-2 font-sans text-[length:var(--house-label-size)]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-(--house-muted) hover:text-(--house-ink) transition-colors cursor-pointer"
                        aria-label="Decrease"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="px-2 select-none font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-(--house-muted) hover:text-(--house-ink) transition-colors cursor-pointer"
                        aria-label="Increase"
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-baseline gap-1 font-serif text-lg min-w-[110px] justify-end">
                      <span>AED</span>
                      <NumberFlow
                        value={item.price * item.quantity}
                        format={{ useGrouping: true }}
                      />
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-(--house-muted) hover:text-(--house-accent) transition-colors p-1 cursor-pointer"
                      aria-label="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-5 max-w-md ml-auto">
              <div className="space-y-3 font-sans text-[length:var(--house-label-size)]">
                <div className="flex justify-between text-(--house-muted)">
                  <span>Subtotal</span>
                  <div className="flex items-baseline gap-1">
                    <span>AED</span>
                    <NumberFlow
                      value={totalPrice}
                      format={{ useGrouping: true }}
                    />
                  </div>
                </div>
                <div className="bag-total flex justify-between text-2xl font-serif font-normal pt-4">
                  <span>Total</span>
                  <div className="flex items-baseline gap-1">
                    <span>AED</span>
                    <NumberFlow
                      value={totalPrice}
                      format={{ useGrouping: true }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={enquiry}
                  className="inline-flex min-h-12 w-full items-center justify-center bg-(--house-ink) px-6 text-(--house-paper) font-sans text-[length:var(--house-label-size)] tracking-wide hover:bg-(--house-accent) transition-colors duration-200"
                >
                  Email about these pieces
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <InformationFooter />
    </main>
  );
}
