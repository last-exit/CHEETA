import { useId } from "react";

/**
 * A line of lettering set on a curve, as it runs round a seal or a coin:
 * `bow="over"` arches it like the crown of a doorway, `bow="under"` cups it.
 */
export default function ArcText({
  children,
  bow,
  className = "",
}: {
  children: string;
  bow: "over" | "under";
  className?: string;
}) {
  const id = `arc-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const d = bow === "over" ? "M40 104Q300 -6 560 104" : "M40 16Q300 126 560 16";
  return (
    <>
      <svg
        className={`arc-text arc-text-${bow} ${className}`.trim()}
        viewBox="0 0 600 120"
        aria-hidden="true"
        focusable="false"
      >
        <path id={id} d={d} fill="none" />
        <text>
          <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
            {children}
          </textPath>
        </text>
      </svg>
      <span className="sr-only">{children}</span>
    </>
  );
}
