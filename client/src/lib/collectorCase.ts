import {
  campaignGalleryReducer,
  createCampaignGallery,
  type CampaignGalleryAction,
  type CampaignGalleryState,
} from "./campaignGallery";

const base = "/campaigns/gun/collectors-case";

/** Presentation artwork only. No catalogue identifiers or purchasing behaviour. */
export const COLLECTOR_CASE_VIEWS = [
  {
    id: "closed",
    src: `${base}/closed-studio-v2.webp`,
    alt: "The closed dark wood collector’s case with brass antlers, isolated on the page",
    width: 1672,
    height: 941,
  },
  {
    id: "open",
    src: `${base}/open-studio-v2.webp`,
    alt: "The open collector’s case holding three octagonal Maharajah frames: ruby, smoke and amber",
    width: 1672,
    height: 941,
  },
  {
    id: "ruby",
    src: `${base}/open-studio-v2.webp`,
    alt: "The ruby-lensed Maharajah frame inside the collector’s case",
    width: 1672,
    height: 941,
  },
  {
    id: "smoke",
    src: `${base}/open-studio-v2.webp`,
    alt: "The smoke-lensed Maharajah frame inside the collector’s case",
    width: 1672,
    height: 941,
  },
  {
    id: "amber",
    src: `${base}/open-studio-v2.webp`,
    alt: "The amber-lensed Maharajah frame inside the collector’s case",
    width: 1672,
    height: 941,
  },
] as const;

/** The photographed glasses are the controls; no detached selector row. */
export const COLLECTOR_CASE_ITEMS = [
  {
    id: "ruby",
    label: "Ruby",
    title: "Maharajah in ruby",
    view: 2,
    region: { left: 13, top: 49.5, width: 23.5, height: 15 },
  },
  {
    id: "smoke",
    label: "Smoke",
    title: "Maharajah in smoke",
    view: 3,
    region: { left: 38.3, top: 49.5, width: 23.5, height: 15 },
  },
  {
    id: "amber",
    label: "Amber",
    title: "Maharajah in amber",
    view: 4,
    region: { left: 63.7, top: 49.5, width: 23.5, height: 15 },
  },
] as const;

// The studio film is enabled only after its generation has been approved and inspected.
export const CASE_FILM_AVAILABLE = false;

export type CollectorCaseAction =
  | CampaignGalleryAction
  | { type: "request"; index: number };
export type CollectorCaseState = CampaignGalleryState;
export const createCollectorCase = () =>
  createCampaignGallery(0, COLLECTOR_CASE_VIEWS.length);

export function collectorCaseReducer(
  state: CollectorCaseState,
  action: CollectorCaseAction
): CollectorCaseState {
  if (action.type === "request") {
    if (
      !Number.isInteger(action.index) ||
      action.index < 0 ||
      action.index >= COLLECTOR_CASE_VIEWS.length
    )
      return state;
    return campaignGalleryReducer(state, {
      type: "step",
      delta: action.index - state.requested,
    });
  }
  return campaignGalleryReducer(state, action);
}

export const COLLECTOR_CASE_FILMS = {
  opening: `${base}/opening-studio-v2.mp4`,
  closing: `${base}/closing-studio-v2.mp4`,
} as const;

export type CaseCamera = { scale: number; x: number; y: number };
const clamp = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));

/** Normalised translations keep the same compartment in frame at every width.
 * Limit magnification to preserve the film frame's detail and surrounding tray. */
export function caseCamera(view: number): CaseCamera {
  const item = COLLECTOR_CASE_ITEMS.find(entry => entry.view === view);
  if (!item) return { scale: 1, x: 0, y: 0 };
  const { left, top, width, height } = item.region;
  const scale = Math.min(2.6, 0.86 / (width / 100));
  return {
    scale,
    x: clamp(0.5 - ((left + width / 2) / 100) * scale, 1 - scale, 0),
    y: clamp(0.5 - ((top + height / 2) / 100) * scale, 1 - scale, 0),
  };
}

export function caseCameraTransform(view: number) {
  const { scale, x, y } = caseCamera(view);
  return `translate(${x * 100}%, ${y * 100}%) scale(${scale})`;
}

/** Forward and reverse files contain the same frames in opposite order. */
export function reverseCaseTime(time: number, duration: number) {
  return clamp(duration - 1 / 24 - time, 0, Math.max(0, duration - 1 / 24));
}
