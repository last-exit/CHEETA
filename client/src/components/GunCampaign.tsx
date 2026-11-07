import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CollectorCase from "@/components/CollectorCase";
import CollectionShowroom from "@/components/CollectionShowroom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GUN_STUDY } from "@/lib/gunStudy";
import "./GunCampaign.css";

export const MAHARAJAH_DETAILS = [
  {
    id: "barrels",
    label: "barrels",
    numeral: "I",
    title: "The paired barrel.",
    body: "Two circular forms sit at the outer temple. Their shape gives The Gun Collection its most direct sporting reference, balanced by the ornament around them.",
    view: { x: 80, y: 590, width: 220, height: 220 },
    alt: "Close-up of Maharajah’s paired barrel forms and engraved gold surface",
  },
  {
    id: "profile",
    label: "profile",
    numeral: "II",
    title: "Along the temple.",
    body: "Seen from the side, the frame becomes a pair of long, parallel lines. Engraving follows the temples before giving way to the dark curved ends.",
    view: { x: 520, y: 387, width: 500, height: 188 },
    alt: "Maharajah in profile, with paired engraved temples and curved dark ends",
  },
  {
    id: "engraving",
    label: "engraving",
    numeral: "III",
    title: "Ornament, continued.",
    body: "The floral pattern moves along the temple and into the curved end. Its fine, branching lines give Maharajah a character that comes into focus at close range.",
    view: { x: 758, y: 590, width: 220, height: 220 },
    alt: "Close-up of the floral ornament continuing into Maharajah’s curved temple end",
  },
] as const;

/** A small botanical ornament, not a new house logo or product engraving. */
function RoyalOrnament() {
  return (
    <svg
      className="gun-royal-ornament"
      viewBox="0 0 160 68"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M80 55V15M80 39C65 38 60 28 63 19C73 21 79 29 80 39ZM80 39C95 38 100 28 97 19C87 21 81 29 80 39ZM80 24C70 18 73 8 80 3C87 8 90 18 80 24Z" />
      <path d="M80 51C62 51 47 44 38 30M80 51C98 51 113 44 122 30M59 46C49 47 43 42 43 36C50 35 57 39 59 46ZM101 46C111 47 117 42 117 36C110 35 103 39 101 46ZM45 37C37 36 32 30 34 24C41 24 45 30 45 37ZM115 37C123 36 128 30 126 24C119 24 115 30 115 37ZM69 57Q80 65 91 57" />
    </svg>
  );
}

function MaharajahDetails() {
  const [selected, setSelected] = useState(0);
  const [immediate, setImmediate] = useState(false);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const detail = MAHARAJAH_DETAILS[selected];
  const keys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % MAHARAJAH_DETAILS.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index + MAHARAJAH_DETAILS.length - 1) % MAHARAJAH_DETAILS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = MAHARAJAH_DETAILS.length - 1;
    else return;
    event.preventDefault();
    setImmediate(true);
    setSelected(next);
    controls.current[next]?.focus({ preventScroll: true });
  };
  return (
    <section
      className="gun-detail-chapter house-container"
      id="maharajah-details"
      data-campaign-chapter="the-ornament"
      aria-labelledby="gun-details-title"
    >
      <header>
        <h2 id="gun-details-title">
          The jeweller’s <em>view.</em>
        </h2>
      </header>
      <div className="gun-detail-composition">
        <figure
          className="gun-detail-loupe"
          id="gun-detail-image"
          aria-label={detail.alt}
          data-campaign-dark="true"
          data-campaign-shape="circle"
        >
          <AnimatePresence initial={false}>
            <motion.svg
              key={detail.id}
              viewBox={`${detail.view.x} ${detail.view.y} ${detail.view.width} ${detail.view.height}`}
              preserveAspectRatio="xMidYMid slice"
              initial={reduced || immediate ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced || immediate ? 0 : 0.28 }}
              aria-hidden="true"
            >
              <image
                href={GUN_STUDY.src}
                width={GUN_STUDY.width}
                height={GUN_STUDY.height}
              />
            </motion.svg>
          </AnimatePresence>
        </figure>
        <div className="gun-detail-copy">
          <div
            className="gun-detail-choices"
            role="tablist"
            aria-label="Maharajah details"
          >
            {MAHARAJAH_DETAILS.map((item, index) => (
              <button
                key={item.id}
                ref={node => {
                  controls.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`gun-detail-${item.id}`}
                aria-selected={selected === index}
                tabIndex={selected === index ? 0 : -1}
                aria-controls={`gun-panel-${item.id}`}
                onClick={event => {
                  setImmediate(event.detail === 0);
                  setSelected(index);
                }}
                onKeyDown={event => keys(event, index)}
              >
                <span aria-hidden="true">{item.numeral}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="gun-detail-passages">
            {MAHARAJAH_DETAILS.map((item, index) => (
              <div
                role="tabpanel"
                id={`gun-panel-${item.id}`}
                key={item.id}
                aria-labelledby={`gun-detail-${item.id}`}
                hidden={selected !== index}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GunCampaign() {
  return (
    <div className="gun-exhibition">
      <header
        className="gun-introduction house-container"
        data-campaign-chapter="prologue"
      >
        <RoyalOrnament />
        <h1>The Gun Collection</h1>
        <p>
          Maharajah. An octagonal silhouette, paired barrel temples and a
          sporting reference expressed through ornament.
        </p>
      </header>
      <CollectorCase />
      <section
        className="gun-form-chapter house-container"
        id="maharajah-study"
        data-campaign-chapter="the-outline"
        aria-labelledby="gun-form-title"
      >
        <header>
          <h2 id="gun-form-title">
            Eight sides.
            <br />
            <em>Two barrels.</em>
          </h2>
          <p>
            Maharajah’s eight-sided frame meets the paired barrel at each
            temple. Engraving runs around the rim and across the bridge, joining
            the form at its centre.
          </p>
        </header>
        <figure className="gun-form-study">
          <img
            src="/campaigns/gun/folio/maharajah-front-v2.webp"
            alt="Maharajah seen from the front, with two octagonal ruby lenses and paired barrel temples"
            width={1983}
            height={793}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>
      <MaharajahDetails />
      <CollectionShowroom collection="The Gun Collection" />
    </div>
  );
}
