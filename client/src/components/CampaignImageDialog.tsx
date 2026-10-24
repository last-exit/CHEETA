import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function CampaignImageDialog({
  title,
  images,
  initial,
  dismiss,
}: {
  title: string;
  images: string[];
  initial: number;
  dismiss: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initial);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());
  const [failed, setFailed] = useState<Set<number>>(() => new Set());
  const numerals = ["I", "II", "III", "IV"];
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);
  const turn = (direction: number) =>
    setIndex(value => (value + direction + images.length) % images.length);
  return (
    <dialog
      ref={dialog}
      className="campaign-image-dialog"
      aria-label={`${title} photographs`}
      data-lenis-prevent
      onCancel={event => {
        event.preventDefault();
        dismiss();
      }}
      onClick={event => {
        if (event.target === event.currentTarget) dismiss();
      }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          turn(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <header>
        <span>{title}</span>
        <button
          type="button"
          autoFocus
          onClick={dismiss}
          aria-label="Close photographs"
        >
          <span>close</span>
          <X size={18} strokeWidth={1} aria-hidden="true" />
        </button>
      </header>
      <div className="campaign-dialog-image">
        {images.map((source, i) => (
          <img
            key={source}
            src={source}
            alt={`${title}, photograph ${numerals[i]}`}
            hidden={i !== index || failed.has(i)}
            onLoad={() => setLoaded(value => new Set(value).add(i))}
            onError={() => setFailed(value => new Set(value).add(i))}
          />
        ))}
        {!loaded.has(index) && !failed.has(index) && (
          <span role="status">loading photograph</span>
        )}
        {failed.has(index) && <span role="alert">photograph unavailable</span>}
      </div>
      <footer>
        <button
          type="button"
          aria-label="Previous photograph"
          onClick={() => turn(-1)}
        >
          <ArrowLeft size={24} strokeWidth={1} aria-hidden="true" />
        </button>
        <span aria-live="polite">
          {numerals[index]} / {numerals[images.length - 1]}
        </span>
        <button
          type="button"
          aria-label="Next photograph"
          onClick={() => turn(1)}
        >
          <ArrowRight size={24} strokeWidth={1} aria-hidden="true" />
        </button>
      </footer>
    </dialog>
  );
}
