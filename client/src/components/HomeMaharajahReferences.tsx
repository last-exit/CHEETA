import { useRef, useState, type KeyboardEvent } from "react";

/** Provisional AI extractions of the client's book photographs. Sources remain unchanged. */
const REFERENCES = [
  {
    id: "manani",
    numeral: "I",
    label: "Manani reference",
    src: "/campaigns/gun/references/manani-cutout-v1.webp",
    width: 2149,
    height: 732,
    alt: "An engraved antique pistol isolated from the client's Manani book reference",
  },
  {
    id: "cominazzo-mariani",
    numeral: "II",
    label: "Cominazzo-Mariani reference",
    src: "/campaigns/gun/references/cominazzo-mariani-cutout-v1.webp",
    width: 2172,
    height: 724,
    alt: "A gold-ornamented antique pistol isolated from the client's Cominazzo-Mariani book reference",
  },
  {
    id: "florentine",
    numeral: "III",
    label: "Florentine reference",
    src: "/campaigns/gun/references/florentine-cutout-v1.webp",
    width: 2172,
    height: 724,
    alt: "An engraved antique pistol isolated from the client's Florentine book reference",
  },
] as const;

export default function HomeMaharajahReferences() {
  const [selected, setSelected] = useState(0);
  const [requested, setRequested] = useState(0);
  const [ready, setReady] = useState<Set<number>>(() => new Set());
  const [failed, setFailed] = useState<Set<number>>(() => new Set());
  const [attempts, setAttempts] = useState([0, 0, 0]);
  const [immediate, setImmediate] = useState(false);
  const latest = useRef(0);
  const versions = useRef([0, 0, 0]);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (index: number, keyboard = false) => {
    setImmediate(keyboard);
    latest.current = index;
    setRequested(index);
    if (ready.has(index)) setSelected(index);
  };
  const loaded = async (index: number, image: HTMLImageElement) => {
    const version = versions.current[index];
    try {
      await image.decode();
      if (versions.current[index] !== version) return;
      setReady(value => new Set(value).add(index));
      if (latest.current === index) setSelected(index);
    } catch {
      if (versions.current[index] === version)
        setFailed(value => new Set(value).add(index));
    }
  };
  const retry = () => {
    const index = requested;
    versions.current[index]++;
    setFailed(value => {
      const next = new Set(value);
      next.delete(index);
      return next;
    });
    setAttempts(value =>
      value.map((attempt, i) => (i === index ? attempt + 1 : attempt))
    );
  };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % REFERENCES.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + REFERENCES.length - 1) % REFERENCES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = REFERENCES.length - 1;
    else return;
    event.preventDefault();
    event.stopPropagation();
    select(next, true);
    buttons.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div className="home-maharajah-references" data-immediate={immediate}>
      <div
        className="home-reference-choices"
        role="group"
        aria-label="Gun references"
      >
        {REFERENCES.map((reference, index) => (
          <button
            key={reference.id}
            ref={node => {
              buttons.current[index] = node;
            }}
            type="button"
            aria-label={reference.label}
            aria-pressed={selected === index && ready.has(index)}
            aria-controls="home-reference-object"
            onClick={() => select(index)}
            onKeyDown={event => navigate(event, index)}
          >
            {reference.numeral}
          </button>
        ))}
      </div>
      <div
        id="home-reference-object"
        className="home-reference-object"
        aria-busy={!ready.has(requested) && !failed.has(requested)}
      >
        <div className="home-reference-stack">
          {REFERENCES.map((reference, index) => (
            <img
              key={`${reference.id}-${attempts[index]}`}
              src={
                attempts[index]
                  ? `${reference.src}?retry=${attempts[index]}`
                  : reference.src
              }
              alt={reference.alt}
              width={reference.width}
              height={reference.height}
              loading="lazy"
              decoding="async"
              data-active={selected === index && ready.has(index)}
              aria-hidden={selected !== index || !ready.has(index)}
              onLoad={event => {
                void loaded(index, event.currentTarget);
              }}
              onError={() => setFailed(value => new Set(value).add(index))}
            />
          ))}
        </div>
        {failed.has(requested) && (
          <div className="home-reference-retry" role="status">
            <button type="button" onClick={retry}>
              reference unavailable. retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
