/** Film choices are editorial media, not additional collections or products. */
export const HOME_FILMS = [
  {
    id: "horseback",
    title: "Horseback",
    src: "/videos/barrel.mp4",
    poster: "/home/films/horseback.webp",
    light: true,
  },
  {
    id: "masquerade",
    title: "The Masquerade",
    src: "/videos/masquerade.mp4",
    poster: "/home/films/masquerade.webp",
    light: true,
  },
  {
    id: "king",
    title: "The King",
    src: "/videos/maharaja.mp4",
    poster: "/home/films/king.webp",
    light: false,
  },
  {
    id: "case",
    title: "The collector’s case",
    src: "/campaigns/gun/cinema/case-opening-v2.mp4",
    poster: "/home/films/case.webp",
    light: false,
  },
] as const;

export function nextHomeFilm(index: number, direction = 1) {
  return (
    (((index + direction) % HOME_FILMS.length) + HOME_FILMS.length) %
    HOME_FILMS.length
  );
}

export interface CinemaSelection {
  current: number;
  target: number | null;
  outgoing: number | null;
  request: number;
  immediate: boolean;
  error: number | null;
}
export const INITIAL_CINEMA: CinemaSelection = {
  current: 0,
  target: null,
  outgoing: null,
  request: 0,
  immediate: false,
  error: null,
};
export type CinemaAction =
  | { type: "request"; index: number; immediate: boolean }
  | { type: "ready" | "failed"; index: number; request: number }
  | { type: "settled"; index: number };

/** Preserve the displayed film until the newest request has a decoded frame. */
export function cinemaSelection(
  state: CinemaSelection,
  action: CinemaAction
): CinemaSelection {
  if (action.type === "request") {
    if (!Number.isInteger(action.index) || !HOME_FILMS[action.index])
      return state;
    return {
      ...state,
      target: action.index === state.current ? null : action.index,
      outgoing: null,
      request: state.request + 1,
      immediate: action.immediate,
      error: null,
    };
  }
  if (action.type === "settled")
    return action.index === state.current
      ? { ...state, outgoing: null }
      : state;
  if (action.request !== state.request || action.index !== state.target)
    return state;
  if (action.type === "failed")
    return { ...state, target: null, outgoing: null, error: action.index };
  return {
    ...state,
    current: action.index,
    target: null,
    outgoing: state.immediate ? null : state.current,
    error: null,
  };
}
