/**
 * A border of painted flowers growing up from a lace edge: a cluster at each
 * side, of mixed heights, overlapping as they do in the margins of a Mughal
 * album. `place="above"` plants it on the paper just above an element;
 * `place="inside"` plants it along an element's own bottom edge.
 */
type Sprig = { flower: string; scale: number; flip?: boolean; small?: boolean };

const LEFT: Sprig[] = [
  { flower: "hyacinth", scale: 0.66 },
  { flower: "rose", scale: 1.08 },
  { flower: "anemone", scale: 0.72, small: true },
];
const RIGHT: Sprig[] = [
  { flower: "tulip", scale: 0.86, small: true },
  { flower: "iris", scale: 1 },
  { flower: "hyacinth", scale: 0.58, flip: true },
];

/** Each plant's true size, so the bed holds its shape before the images arrive. */
const SIZE: Record<string, [number, number]> = {
  anemone: [296, 626],
  hyacinth: [308, 649],
  iris: [444, 630],
  rose: [658, 649],
  tulip: [471, 649],
};

function Cluster({ sprigs, side }: { sprigs: Sprig[]; side: "left" | "right" }) {
  return (
    <span className={`flower-bed-cluster flower-bed-${side}`}>
      {sprigs.map(({ flower, scale, flip, small }, i) => (
        <img
          key={`${flower}-${i}`}
          src={`/mughal/flower-${flower}.webp`}
          width={SIZE[flower][0]}
          height={SIZE[flower][1]}
          alt=""
          loading="lazy"
          decoding="async"
          data-small={small || undefined}
          style={{
            // Both sides are set outright, so no browser can stretch a plant
            // to fill the row.
            height: `calc(var(--bed) * ${scale} * 1.5)`,
            width: `calc(var(--bed) * ${((scale * 1.5 * SIZE[flower][0]) / SIZE[flower][1]).toFixed(4)})`,
            transform: flip ? "scaleX(-1)" : undefined,
          }}
        />
      ))}
    </span>
  );
}

export default function FlowerBed({
  place,
  className = "",
}: {
  place: "above" | "inside";
  className?: string;
}) {
  return (
    <span className={`flower-bed flower-bed-${place} ${className}`.trim()} aria-hidden="true">
      <Cluster sprigs={LEFT} side="left" />
      <Cluster sprigs={RIGHT} side="right" />
    </span>
  );
}
