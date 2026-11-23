import { useId } from "react";

/**
 * The join between two rooms: a clean seam with a single gold clasp at its
 * centre, as on a necklace: a foil lozenge set with a rosette, flanked by
 * graduated beads. `hang` keeps the old API: "down" and "up" sit on the
 * top seam of their section; className "lace-below" moves it to the bottom.
 */
export default function Lace({ className = "" }: { hang: "down" | "up"; className?: string }) {
  const id = `clasp-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  return (
    <span className={`lace ${className}`.trim()} aria-hidden="true">
      <svg viewBox="-44 -15 88 30" focusable="false">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8f6a2f" />
            <stop offset="0.3" stopColor="#d9b46a" />
            <stop offset="0.48" stopColor="#f6e3a6" />
            <stop offset="0.66" stopColor="#c19446" />
            <stop offset="1" stopColor="#7d5b26" />
          </linearGradient>
        </defs>
        <g fill={`url(#${id})`}>
          <circle cx="-34" r="1.7" />
          <circle cx="-26" r="2.6" />
          <circle cx="26" r="2.6" />
          <circle cx="34" r="1.7" />
          <path d="M0 -13.5L13.5 0 0 13.5-13.5 0Z" />
        </g>
        <path d="M0 -9.5L9.5 0 0 9.5-9.5 0Z" fill="none" stroke="#6e4f1f" strokeWidth="0.7" opacity="0.7" />
        <g fill="#6e4f1f" opacity="0.75">
          <circle r="2" />
          <circle cy="-5" r="1.1" />
          <circle cy="5" r="1.1" />
          <circle cx="-5" r="1.1" />
          <circle cx="5" r="1.1" />
        </g>
      </svg>
    </span>
  );
}
