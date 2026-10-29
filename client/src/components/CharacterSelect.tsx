import {
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import NumberFlow from "@number-flow/react";
import AcquisitionButton from "@/components/AcquisitionButton";
import { useCharacterFitting } from "@/hooks/useCharacterFitting";
import { useBagConfirmation } from "@/hooks/useBagConfirmation";
import { useCart } from "@/contexts/CartContext";
import {
  FITTING_CHARACTERS,
  FITTING_LENSES,
  fittingProduct,
  type LensId,
} from "@/lib/characterFitting";
import "./CharacterSelect.css";

type Character = (typeof FITTING_CHARACTERS)[number];
function octagon(cx: number, cy: number, rx: number, ry: number) {
  return `${cx - rx * 0.58},${cy - ry} ${cx + rx * 0.58},${cy - ry} ${cx + rx},${cy - ry * 0.58} ${cx + rx},${cy + ry * 0.58} ${cx + rx * 0.58},${cy + ry} ${cx - rx * 0.58},${cy + ry} ${cx - rx},${cy + ry * 0.58} ${cx - rx},${cy - ry * 0.58}`;
}

/** Keep the body pixels fixed. Only the bounded eyewear region is equipped. */
function FittingFigure({
  character,
  lens,
  animate,
}: {
  character: Character;
  lens: LensId | null;
  animate: boolean;
}) {
  const id = `fitting-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { eyeX: x, eyeY: y } = character;
  const left = x - 62,
    right = x + 62;
  const photo = (
    <image
      href={character.image}
      width="2000"
      height="2500"
      x={-1000 + character.shiftX}
      y={character.shiftY}
      preserveAspectRatio="none"
    />
  );
  return (
    <svg viewBox="0 0 1000 1250" className="fitting-figure" aria-hidden="true">
      <defs>
        {character.alphaMask && (
          <mask
            id={`${id}-person`}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="1250"
            style={{ maskType: "alpha" }}
          >
            <image
              href={character.alphaMask}
              width="2000"
              height="2500"
              preserveAspectRatio="none"
            />
          </mask>
        )}
        <filter id={`${id}-edge`}>
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <mask
          id={`${id}-frame`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1000"
          height="1250"
          style={{ maskType: "alpha" }}
        >
          <rect
            x={x - 170}
            y={y - 65}
            width="340"
            height="140"
            rx="12"
            fill="white"
            filter={`url(#${id}-edge)`}
          />
        </mask>
        <clipPath id={`${id}-lens`}>
          <polygon points={octagon(left, y + 15, 65, 53)} />
          <polygon points={octagon(right, y + 15, 65, 53)} />
        </clipPath>
        <filter id={`${id}-red`} colorInterpolationFilters="sRGB">
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  24 -48 0 0 0" />
        </filter>
        <mask
          id={`${id}-optics`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1000"
          height="1250"
          style={{ maskType: "alpha" }}
        >
          <g clipPath={`url(#${id}-lens)`} filter={`url(#${id}-red)`}>
            {photo}
          </g>
        </mask>
        <filter id={`${id}-smoke`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id={`${id}-amber`} colorInterpolationFilters="sRGB">
          <feColorMatrix values="1.4 0 0 0 .045  .7 0 0 0 .012  .22 0 0 0 .006  0 0 0 1 0" />
        </filter>
      </defs>
      <image
        href={character.image}
        mask={character.alphaMask ? `url(#${id}-person)` : undefined}
        width="2000"
        height="2500"
        preserveAspectRatio="none"
      />
      {lens && (
        <g
          key="eyewear"
          className={
            animate
              ? "fitting-equipment fitting-equipment--enter"
              : "fitting-equipment"
          }
        >
          <g mask={`url(#${id}-frame)`}>{photo}</g>
          {lens !== "ruby" && (
            <g mask={`url(#${id}-optics)`} filter={`url(#${id}-${lens})`}>
              {photo}
            </g>
          )}
        </g>
      )}
    </svg>
  );
}

export default function CharacterSelect({
  onAccentChange,
}: {
  onAccentChange: (colour: string) => void;
}) {
  const { state, dispatch, section, selectCharacter } = useCharacterFitting();
  const [animate, setAnimate] = useState(false);
  const reduceMotion = useReducedMotion();
  const { addToCart } = useCart();
  const confirm = useBagConfirmation();
  const character = FITTING_CHARACTERS[state.character];
  const lens = FITTING_LENSES.find(item => item.id === state.lens);
  const product = fittingProduct(state.lens);
  const ready = state.ready[state.character];
  const canAcquire = !!product && ready && !state.pending && !state.error;

  useEffect(() => {
    onAccentChange(lens?.colour ?? "#2a241d");
  }, [lens?.colour, onAccentChange]);
  useEffect(() => {
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setAnimate(false);
        dispatch({ type: "inspect", value: false });
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [dispatch]);

  const equip = (id: LensId | null, pointer = false) => {
    setAnimate(pointer);
    dispatch({ type: "lens", lens: id });
  };
  const navigate = (
    event: KeyboardEvent<HTMLElement>,
    group: "character" | "lens"
  ) => {
    const keys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const current =
      group === "character"
        ? state.requested
        : FITTING_LENSES.findIndex(item => item.id === state.lens);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? 2
          : (Math.max(0, current) +
              (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) +
              3) %
            3;
    setAnimate(false);
    if (group === "character") selectCharacter(next);
    else equip(FITTING_LENSES[next].id);
    event.currentTarget
      .querySelectorAll<HTMLButtonElement>("button[data-option]")
      [next]?.focus();
  };
  const acquire = () => {
    if (!canAcquire || !product) return;
    addToCart({
      id: product.id,
      name: product.name,
      frame: product.frame,
      lens: product.lens,
      price: product.price,
      priceDisplay: product.priceDisplay,
      image: product.productImage,
    });
    confirm(product.name, product.priceDisplay);
  };

  return (
    <div
      ref={section}
      className="character-select"
      style={{ "--fitting-accent": lens?.colour ?? "#2a241d" } as CSSProperties}
    >
      <h2 className="character-title">The Gun Collection</h2>
      <div
        className="character-stage"
        data-inspect={state.inspect}
        data-motion={animate && !reduceMotion}
      >
        <span className="character-watermark" aria-hidden="true">
          {character.numeral}
        </span>
        <div className="character-main-view" aria-busy={state.pending}>
          {FITTING_CHARACTERS.map(
            (model, index) =>
              state.ready[index] && (
                <motion.div
                  key={model.id}
                  className="character-layer"
                  initial={false}
                  animate={{ opacity: state.character === index ? 1 : 0 }}
                  transition={{
                    duration: animate ? (reduceMotion ? 0.16 : 0.28) : 0,
                    ease: "easeOut",
                  }}
                  aria-hidden="true"
                >
                  <motion.div
                    key={reduceMotion ? String(state.inspect) : "canvas"}
                    className="character-main-canvas"
                    initial={reduceMotion && animate ? { opacity: 0.5 } : false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: animate ? 0.16 : 0 }}
                    style={
                      {
                        "--eye-x": `${model.eyeX / 10}%`,
                        "--eye-y": `${model.eyeY / 12.5}%`,
                      } as CSSProperties
                    }
                  >
                    <FittingFigure
                      character={model}
                      lens={state.lens}
                      animate={animate && !reduceMotion}
                    />
                  </motion.div>
                </motion.div>
              )
          )}
        </div>
        <div
          className="character-roster"
          role="group"
          aria-label="Choose a character"
          onKeyDown={event => navigate(event, "character")}
        >
          {FITTING_CHARACTERS.map((model, index) => (
            <button
              key={model.id}
              type="button"
              data-option
              aria-pressed={state.character === index}
              aria-label={`Character ${model.numeral}`}
              tabIndex={state.requested === index ? 0 : -1}
              onClick={event => {
                setAnimate(event.detail > 0);
                selectCharacter(index);
              }}
            >
              <svg
                viewBox={`${model.eyeX - 190} ${model.eyeY - 175} 380 400`}
                aria-hidden="true"
              >
                {state.ready[index] && (
                  <image
                    href={model.image}
                    width="2000"
                    height="2500"
                    preserveAspectRatio="none"
                  />
                )}
              </svg>
              <span>{model.numeral}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="character-inspect"
          disabled={!ready}
          aria-label={
            state.inspect ? "Full character view" : "Look closer at the eyewear"
          }
          aria-pressed={state.inspect}
          onClick={event => {
            setAnimate(event.detail > 0);
            dispatch({ type: "inspect", value: !state.inspect });
          }}
        >
          {state.inspect ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
        </button>
        <div className="character-loading" role="status" aria-live="polite">
          {state.error ? (
            <button
              type="button"
              onClick={() => selectCharacter(state.requested)}
            >
              Image unavailable. Retry
            </button>
          ) : state.pending ? (
            "Loading character"
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="character-inventory">
        <fieldset
          className="fitting-lenses"
          onKeyDown={event => navigate(event, "lens")}
        >
          <legend className="sr-only">Choose a lens</legend>
          <div className="fitting-lens-options">
            {FITTING_LENSES.map((option, index) => (
              <button
                key={option.id}
                type="button"
                data-option
                aria-label={`Equip ${option.name} lenses`}
                aria-pressed={state.lens === option.id}
                tabIndex={
                  state.lens === option.id || (!state.lens && index === 0)
                    ? 0
                    : -1
                }
                onClick={event => equip(option.id, event.detail > 0)}
              >
                <img
                  className="fitting-lens-object"
                  src={option.previewImage}
                  alt=""
                  width="180"
                  height="96"
                  loading="lazy"
                  decoding="async"
                  onError={event => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                  onLoad={event => {
                    event.currentTarget.style.visibility = "visible";
                  }}
                />
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="fitting-selection">
          {product && (
            <div className="price">
              <span>aed </span>
              <NumberFlow
                animated={!reduceMotion && animate}
                value={product.price}
                format={{ useGrouping: true }}
              />
            </div>
          )}
        </div>
        <div className="fitting-actions">
          <AcquisitionButton disabled={!canAcquire} onClick={acquire}>
            acquire
          </AcquisitionButton>
          <Link href={product ? `/product/${product.slug}` : "/retail"}>
            {product ? "details" : "retail"}
          </Link>
        </div>
        <button
          type="button"
          className="fitting-unequip"
          disabled={!state.lens}
          onClick={() => equip(null)}
          aria-label="Unequip eyewear"
        >
          unequip
        </button>

        <p className="sr-only" role="status" aria-live="polite">
          {ready
            ? `Character ${character.numeral}, ${lens ? `${lens.name} lenses equipped` : "no eyewear equipped"}`
            : ""}
        </p>
      </div>
    </div>
  );
}
