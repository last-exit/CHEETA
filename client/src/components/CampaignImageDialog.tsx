import { useEffect, useReducer, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import {
  campaignGalleryReducer,
  createCampaignGallery,
} from "@/lib/campaignGallery";
import "./CampaignImageDialog.css";

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
  const close = useRef<HTMLButtonElement>(null);
  const alive = useRef(true);
  const [state, dispatch] = useReducer(campaignGalleryReducer, initial, value =>
    createCampaignGallery(value, images.length)
  );
  const numerals = ["I", "II", "III", "IV"];
  const failed = state.failed[state.requested];
  const pending = state.displayed !== state.requested;
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    alive.current = true;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    close.current?.focus({ preventScroll: true });
    return () => {
      alive.current = false;
      element.close();
      document.body.style.overflow = overflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);
  const turn = (delta: number) => dispatch({ type: "step", delta });
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
          ref={close}
          type="button"
          onClick={dismiss}
          aria-label="Close photographs"
        >
          <span>close</span>
          <X size={18} strokeWidth={1} aria-hidden="true" />
        </button>
      </header>
      <div className="campaign-dialog-image" aria-busy={pending && !failed}>
        {images.map((source, index) => {
          const attempt = state.attempts[index];
          return (
            <img
              key={`${source}-${attempt}`}
              src={source}
              alt={`${title}, photograph ${numerals[index]}`}
              data-displayed={state.displayed === index}
              aria-hidden={state.displayed !== index}
              decoding="async"
              onLoad={async event => {
                const image = event.currentTarget;
                try {
                  await image.decode();
                } catch {
                  /* A loaded image can still be usable after a decode cancellation. */
                }
                if (alive.current && image.complete && image.naturalWidth)
                  dispatch({ type: "ready", index, attempt });
              }}
              onError={() => dispatch({ type: "failed", index, attempt })}
            />
          );
        })}
        {state.displayed === null && !failed && (
          <span className="campaign-gallery-loading" role="status">
            loading photograph
          </span>
        )}
      </div>
      <footer>
        <button
          type="button"
          aria-label="Previous photograph"
          onClick={() => turn(-1)}
        >
          <ArrowLeft size={24} strokeWidth={1} aria-hidden="true" />
        </button>
        <div className="campaign-gallery-caption" aria-live="polite">
          <span>
            {numerals[state.requested]} / {numerals[images.length - 1]}
          </span>
          {failed ? (
            <>
              <p>photograph unavailable</p>
              <button
                type="button"
                onClick={() => {
                  close.current?.focus({ preventScroll: true });
                  dispatch({ type: "retry" });
                }}
              >
                retry photograph
              </button>
            </>
          ) : pending && state.displayed !== null ? (
            <p>loading photograph</p>
          ) : null}
        </div>
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
