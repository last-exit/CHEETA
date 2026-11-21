export type Piece = {
  id: string;
  numeral: string;
  name: string;
  deva: string;
  gloss: string;
  line: string;
  img: string;
};

export const pieces: Piece[] = [
  {
    id: "faulad",
    numeral: "I",
    name: "Faulad",
    deva: "फ़ौलाद",
    gloss: "steel",
    line: "Blued steel, burr walnut, a silvered butt.",
    img: "/campaigns/gun/prototype/faulad.jpg",
  },
  {
    id: "zar",
    numeral: "II",
    name: "Zar",
    deva: "ज़र",
    gloss: "gold",
    line: "Twenty-four-carat vines, wired into walnut.",
    img: "/campaigns/gun/prototype/zar.jpg",
  },
  {
    id: "sim",
    numeral: "III",
    name: "Sim",
    deva: "सीम",
    gloss: "silver",
    line: "Chased silver, from the butt to the muzzle.",
    img: "/campaigns/gun/prototype/sim.jpg",
  },
];

export const media = {
  casket: "/campaigns/gun/prototype/casket.jpg",
  still1: "/stills/barrel-founder-wide.jpg",
  still2: "/stills/barrel-founder-portrait-1.jpg",
  still3: "/stills/barrel-founder-portrait-2.jpg",
  detailLock: "/campaigns/gun/prototype/detail-lock.jpg",
  detailLens: "/campaigns/gun/prototype/detail-lens.jpg",
};
