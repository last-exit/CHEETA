import Jharokha from "@/components/Jharokha";
import { CAMPAIGN_EDITORIAL } from "@/data/campaignEditorial";
import { PORTRAIT_ARCH } from "@/lib/palaceGeometry";

const { aspect, ...ARCH } = PORTRAIT_ARCH;

/** Three campaign portraits, one per window of the arcade. */
const BAYS = [
  {
    numeral: "I",
    label: "In profile",
    src: "/stills/masquerade-still-1.jpg",
    alt: "The Masquerade in profile, the openwork rising beside the face against candlelight",
    position: "50% 30%",
  },
  {
    numeral: "II",
    label: "Facing the light",
    src: "/stills/masquerade-still-2.jpg",
    alt: "The Masquerade campaign portrait, facing the light",
    position: "50% 30%",
  },
  {
    numeral: "III",
    label: "By candlelight",
    src: "/stills/masquerade-still-3.jpg",
    alt: "Candlelight reflected in the lenses of the Masquerade",
    position: "46% 30%",
  },
] as const;

/** An arcade of three windows cut into one marble wall. */
export default function MasqueradeArcade() {
  const copy = CAMPAIGN_EDITORIAL.masquerade;
  return (
    <section
      className="masquerade-arcade house-container"
      data-campaign-chapter="the-openwork"
      aria-labelledby="masquerade-arcade-title"
    >
      <header className="masquerade-arcade-header" data-editorial-reveal>
        <h2 id="masquerade-arcade-title">
          A mask, <em>left open.</em>
        </h2>
        <p>{copy.openwork.body}</p>
      </header>
      <ol className="masquerade-arcade-bays">
        {BAYS.map(bay => (
          <li key={bay.numeral}>
            <figure>
              <Jharokha aspect={aspect} arch={ARCH} panel={false}>
                <img
                  src={bay.src}
                  alt={bay.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: bay.position }}
                />
              </Jharokha>
              <figcaption>
                <span>{bay.numeral}</span>
                {bay.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}
