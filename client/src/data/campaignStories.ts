export interface CampaignStory {
  lead?: string;
  name: string;
  introduction: string;
  chapter: string;
  narrative: string;
  closing: string;
  aperture: "paired" | "eye" | "octagon" | "horizon";
  segment: { start: number; end: number };
}

/** Editorial descriptions of the existing campaigns, without unverified material claims. */
export const CAMPAIGN_STORIES: Record<string, CampaignStory> = {
  barrel: {
    lead: "The Gun",
    name: "Collection",
    introduction:
      "Vintage sporting guns, reimagined through engraved temples and ruby tones.",
    chapter: "From Barrel To Temple",
    narrative:
      "Paired temples and engraving carry the double-barrel reference into the frame.",
    closing: "The Profile",
    aperture: "paired",
    segment: { start: 2, end: 7 },
  },
  masquerade: {
    lead: "The",
    name: "Masquerade",
    introduction: "Sculpted eyewear between candlelight and shadow.",
    chapter: "Seen And Unseen",
    narrative: "An openwork silhouette that reveals as much as it conceals.",
    closing: "The Openwork Silhouette",
    aperture: "eye",
    segment: { start: 1, end: 6 },
  },
  maharaja: {
    name: "Maharaja",
    introduction: "An octagonal frame, set against the symmetry of the palace.",
    chapter: "Eight Sides",
    narrative: "The frame echoes the geometry of the architecture around it.",
    closing: "The Octagon",
    aperture: "octagon",
    segment: { start: 2, end: 7 },
  },
  savanah: {
    name: "Savanah",
    introduction: "Amber tones and translucent frames in the desert light.",
    chapter: "Along The Horizon",
    narrative: "Warm colour carries from the frame to the dunes beyond.",
    closing: "Out In The Open",
    aperture: "horizon",
    segment: { start: 1, end: 6 },
  },
};
