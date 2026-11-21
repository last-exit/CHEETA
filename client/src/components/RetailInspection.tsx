import { useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { ScanSearch, X } from "lucide-react";
import type { ProductItem } from "@/data/retailCatalog";

function positionLens(plane: HTMLElement, x: number, y: number) {
  const clampedX = Math.max(0, Math.min(x, 100));
  const clampedY = Math.max(0, Math.min(y, 100));
  plane.style.setProperty("--loupe-x", `${clampedX}%`);
  plane.style.setProperty("--loupe-y", `${clampedY}%`);
}

function positionLensFromPointer(event: PointerEvent<HTMLDivElement>) {
  const plane = event.currentTarget;
  const { left, top, width, height } = plane.getBoundingClientRect();
  positionLens(
    plane,
    ((event.clientX - left) / width) * 100,
    ((event.clientY - top) / height) * 100
  );
}

function positionLensFromKeyboard(event: KeyboardEvent<HTMLDivElement>) {
  const plane = event.currentTarget;
  const x = parseFloat(plane.style.getPropertyValue("--loupe-x")) || 0;
  const y = parseFloat(plane.style.getPropertyValue("--loupe-y")) || 0;
  const step = event.shiftKey ? 16 : 4;

  switch (event.key) {
    case "Home":
      positionLens(plane, 50, 50);
      break;
    case "ArrowLeft":
      positionLens(plane, x - step, y);
      break;
    case "ArrowRight":
      positionLens(plane, x + step, y);
      break;
    case "ArrowUp":
      positionLens(plane, x, y - step);
      break;
    case "ArrowDown":
      positionLens(plane, x, y + step);
      break;
    default:
      return;
  }

  event.preventDefault();
}

export default function RetailInspection({
  product,
}: {
  product: ProductItem;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [magnifying, setMagnifying] = useState(true);
  const [open, setOpen] = useState(false);
  const dialogTitle = useId();
  const keyboardInstructions = useId();

  const showInspection = () => {
    if (!dialog.current?.open) {
      dialog.current?.showModal();
      setOpen(true);
    }
  };

  const closeInspection = () => {
    setOpen(false);
    setMagnifying(true);
    trigger.current?.focus({ preventScroll: true });
  };

  return (
    <figure className="retail-inspection">
      <button
        ref={trigger}
        type="button"
        className="retail-display-image"
        aria-label={`Inspect image of ${product.name}`}
        aria-haspopup="dialog"
        onClick={showInspection}
      >
        <span className="retail-detail-photo">
          <img
            src={product.productImage}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
        </span>
        <span className="retail-inspect-action">
          <ScanSearch size={18} strokeWidth={1.35} aria-hidden="true" />
          Inspect image
        </span>
      </button>
      <dialog
        ref={dialog}
        className="retail-inspection-dialog"
        aria-labelledby={dialogTitle}
        data-lenis-prevent
        onClose={closeInspection}
      >
        <header>
          <span id={dialogTitle}>{product.name}</span>
          <div>
            <button
              type="button"
              aria-pressed={magnifying}
              onClick={() => setMagnifying(value => !value)}
            >
              <ScanSearch size={17} aria-hidden="true" />
              <span>Loupe</span>
            </button>
            <button
              type="button"
              aria-label="Close image"
              onClick={() => dialog.current?.close()}
            >
              <X size={22} strokeWidth={1.3} aria-hidden="true" />
            </button>
          </div>
        </header>
        <span id={keyboardInstructions} className="sr-only">
          Move the loupe with the arrow keys. Press Home to centre it.
        </span>
        <div className="retail-inspection-window">
          {open && (
            <div
              ref={elem => {
                if (elem && !elem.style.getPropertyValue("--loupe-x")) {
                  positionLens(elem, 50, 50);
                  elem.focus({ preventScroll: true });
                }
              }}
              className="retail-loupe-plane"
              data-magnifying={magnifying}
              tabIndex={magnifying ? 0 : undefined}
              role={magnifying ? "group" : undefined}
              aria-label={magnifying ? "Image inspection" : undefined}
              aria-describedby={magnifying ? keyboardInstructions : undefined}
              onPointerDown={event => {
                if (!magnifying || event.button !== 0) return;
                positionLensFromPointer(event);
                if (event.pointerType !== "mouse") {
                  event.currentTarget.setPointerCapture(event.pointerId);
                }
              }}
              onPointerMove={event => {
                if (
                  magnifying &&
                  (event.pointerType === "mouse" ||
                    event.currentTarget.hasPointerCapture(event.pointerId))
                ) {
                  positionLensFromPointer(event);
                }
              }}
              onKeyDown={positionLensFromKeyboard}
            >
              <img
                className="retail-loupe-base"
                src={product.productImage}
                alt={product.name}
                decoding="async"
              />
              {magnifying && (
                <div className="retail-loupe-effect" aria-hidden="true">
                  <div className="retail-loupe-cutout">
                    <img src={product.productImage} alt="" decoding="async" />
                  </div>
                  <span className="retail-loupe-rim" />
                </div>
              )}
            </div>
          )}
        </div>
      </dialog>
    </figure>
  );
}
