import { PRODUCTS } from "@/data/retailCatalog";

export type LensId = "ruby" | "smoke" | "amber";
export const FITTING_LENSES: {
  id: LensId;
  name: string;
  colour: string;
  productId: string;
  previewImage: string;
}[] = [
  {
    id: "ruby",
    name: "Ruby",
    colour: "#6b1a2c",
    productId: "barrel-01",
    previewImage: "/character-select/lens-ruby.webp",
  },
  {
    id: "smoke",
    name: "Smoke",
    colour: "#424647",
    productId: "barrel-02",
    previewImage: "/character-select/lens-smoke.webp",
  },
  {
    id: "amber",
    name: "Amber",
    colour: "#936128",
    productId: "barrel-03",
    previewImage: "/character-select/lens-amber.webp",
  },
];

/** Calibrated sprite coordinates; the unadorned body is always the same image. */
export const FITTING_CHARACTERS = [
  {
    id: "ivory",
    numeral: "I",
    image: "/character-select/ivory.png",
    alphaMask: "/character-select/ivory-mask.png",
    eyeX: 574,
    eyeY: 189,
    shiftX: 146.17,
    shiftY: 0,
  },
  {
    id: "noir",
    numeral: "II",
    image: "/character-select/noir.png",
    alphaMask: null,
    eyeX: 560,
    eyeY: 203,
    shiftX: 128.34,
    shiftY: -3.57,
  },
  {
    id: "sand",
    numeral: "III",
    image: "/character-select/sand.png",
    alphaMask: null,
    eyeX: 535,
    eyeY: 218,
    shiftX: 65.95,
    shiftY: 0,
  },
] as const;

export function fittingProduct(lens: LensId | null) {
  const option = FITTING_LENSES.find(item => item.id === lens);
  return option
    ? PRODUCTS.find(item => item.id === option.productId)
    : undefined;
}

export interface FittingState {
  character: number;
  requested: number;
  ready: boolean[];
  pending: boolean;
  error: boolean;
  lens: LensId | null;
  inspect: boolean;
}
export const initialFittingState: FittingState = {
  character: 0,
  requested: 0,
  ready: [false, false, false],
  pending: true,
  error: false,
  lens: null,
  inspect: false,
};
type FittingAction =
  | { type: "character"; index: number }
  | { type: "ready"; index: number }
  | { type: "failed"; index: number }
  | { type: "lens"; lens: LensId | null }
  | { type: "inspect"; value: boolean };

export function fittingReducer(
  state: FittingState,
  action: FittingAction
): FittingState {
  switch (action.type) {
    case "character":
      if (action.index < 0 || action.index >= FITTING_CHARACTERS.length)
        return state;
      return {
        ...state,
        requested: action.index,
        pending: !state.ready[action.index],
        character: state.ready[action.index] ? action.index : state.character,
        error: false,
      };
    case "ready": {
      const ready = [...state.ready];
      ready[action.index] = true;
      return action.index === state.requested
        ? {
            ...state,
            ready,
            character: action.index,
            pending: false,
            error: false,
          }
        : { ...state, ready };
    }
    case "failed":
      return action.index === state.requested
        ? { ...state, pending: false, error: true }
        : state;
    case "lens":
      return { ...state, lens: action.lens };
    case "inspect":
      return { ...state, inspect: action.value };
  }
}
