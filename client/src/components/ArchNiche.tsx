import { useId } from "react";
import { cuspedArchPath, PORTRAIT_ARCH } from "@/lib/palaceGeometry";
import "./ArchNiche.css";

const ARCH = cuspedArchPath(PORTRAIT_ARCH);

/**
 * The house niche: a piece set in a cusped Mughal arch, edged with a gilt
 * line. Used wherever a piece is shown on its own, so the homepage, Retail and
 * the product pages share one frame.
 */
export default function ArchNiche({
  src,
  alt = "",
  loading = "lazy",
  className = "",
  ornate = false,
}: {
  src: string;
  alt?: string;
  loading?: "eager" | "lazy";
  className?: string;
  /** A second gilt line and a gold finial on the crown, for the grander rooms. */
  ornate?: boolean;
}) {
  const id = `arch-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  return (
    <span className={`arch-niche ${className}`.trim()}>
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="arch-niche-defs">
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d={ARCH} />
        </clipPath>
      </svg>
      <span className="arch-niche-opening" style={{ clipPath: `url(#${id})` }}>
        <img src={src} alt={alt} loading={loading} decoding="async" />
      </span>
      <svg
        className="arch-niche-gilt"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={ARCH} vectorEffect="non-scaling-stroke" />
      </svg>
      {ornate && (
        <>
          <svg
            className="arch-niche-gilt arch-niche-gilt-outer"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d={ARCH} vectorEffect="non-scaling-stroke" />
          </svg>
          <svg className="arch-niche-finial" viewBox="0 0 16 34" aria-hidden="true" focusable="false">
            <circle cx="8" cy="3" r="2.2" />
            <path d="M8 7C9.2 12.5 13.5 15 13.5 20.5a5.5 5.5 0 0 1-11 0C2.5 15 6.8 12.5 8 7Z" />
            <rect x="7.3" y="25" width="1.4" height="9" />
          </svg>
        </>
      )}
    </span>
  );
}
