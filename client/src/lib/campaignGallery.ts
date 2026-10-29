export interface CampaignGalleryState {
  requested: number;
  displayed: number | null;
  ready: boolean[];
  failed: boolean[];
  attempts: number[];
}

export type CampaignGalleryAction =
  | { type: "step"; delta: number }
  | { type: "ready" | "failed"; index: number; attempt: number }
  | { type: "retry" };

const wrap = (index: number, count: number) =>
  ((index % count) + count) % count;

export function createCampaignGallery(
  initial: number,
  count: number
): CampaignGalleryState {
  const length = Math.max(1, count);
  return {
    requested: wrap(Number.isFinite(initial) ? Math.trunc(initial) : 0, length),
    displayed: null,
    ready: Array(length).fill(false),
    failed: Array(length).fill(false),
    attempts: Array(length).fill(0),
  };
}

/** Decoding can finish in any order; only the latest requested photograph may commit. */
export function campaignGalleryReducer(
  state: CampaignGalleryState,
  action: CampaignGalleryAction
): CampaignGalleryState {
  if (action.type === "step") {
    const requested = wrap(state.requested + action.delta, state.ready.length);
    return {
      ...state,
      requested,
      displayed: state.ready[requested] ? requested : state.displayed,
    };
  }
  if (action.type === "retry") {
    return {
      ...state,
      ready: state.ready.map((ready, i) =>
        i === state.requested ? false : ready
      ),
      failed: state.failed.map((failed, i) =>
        i === state.requested ? false : failed
      ),
      attempts: state.attempts.map((attempt, i) =>
        i === state.requested ? attempt + 1 : attempt
      ),
    };
  }
  const { index, attempt } = action;
  if (
    index < 0 ||
    index >= state.ready.length ||
    attempt !== state.attempts[index]
  )
    return state;
  if (action.type === "failed") {
    return {
      ...state,
      ready: state.ready.map((ready, i) => (i === index ? false : ready)),
      failed: state.failed.map((failed, i) => (i === index ? true : failed)),
      displayed: state.displayed === index ? null : state.displayed,
    };
  }
  if (state.failed[index]) return state;
  return {
    ...state,
    ready: state.ready.map((ready, i) => (i === index ? true : ready)),
    displayed: state.requested === index ? index : state.displayed,
  };
}
