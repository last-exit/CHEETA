const PETALS = [0, 45, 90, 135, 180, 225, 270, 315];

/** One side of the vine: a scrolling stem with leaves, ending in a tendril. */
function Vine() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M131 16C142 7 156 6 166 12C175 17 183 23 194 20C203 17.5 207 10 202 6.5C198 3.8 193.5 7 195.5 10.5C197 13 200.5 12 200.5 9.5" />
      <path d="M166 12C171 6.5 179 5 185 7.5" opacity="0.8" />
      <path d="M183 21.5C189 26 197 27 203 24.5" opacity="0.8" />
      <g fill="currentColor" stroke="none">
        <path d="M146 8.6c3.2-4.6 8.6-5.4 11.6-3.6-2.4 4-7.4 5.6-11.6 3.6Z" />
        <path d="M156 15.4c3.6 3.6 8.8 4 11.6 1.8-2.8-3.4-8-4-11.6-1.8Z" opacity="0.85" />
        <path d="M185 7.5c2.6-1.4 5.8-0.6 7 1.4-2.6 1.2-5.6 0.4-7-1.4Z" />
        <path d="M203 24.5c2.4 0.4 4.2 2.4 4 4.4-2.4-0.4-4-2.4-4-4.4Z" />
        <circle cx="213" cy="16" r="1.3" />
        <circle cx="219" cy="16" r="0.9" opacity="0.7" />
      </g>
    </g>
  );
}

/**
 * The house divider: an eight-petalled Mughal rosette with a curling vine
 * scrolling out on either side, drawn so it stays crisp at any size.
 */
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`ornament ${className}`.trim()}
      viewBox="0 0 240 32"
      aria-hidden="true"
      focusable="false"
    >
      <Vine />
      <g transform="translate(240 0) scale(-1 1)">
        <Vine />
      </g>
      <g transform="translate(120 16)">
        {PETALS.map(r => (
          <ellipse
            key={r}
            cy="-6.6"
            rx="2.6"
            ry="6.6"
            transform={`rotate(${r})`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        ))}
        <circle r="2.4" fill="currentColor" />
      </g>
    </svg>
  );
}
