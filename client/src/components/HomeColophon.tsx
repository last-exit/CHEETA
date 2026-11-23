import { useEffect, useId, useRef, useState } from "react";
import { Link } from "wouter";
import { cuspedArchPath, jaliStarPath } from "@/lib/palaceGeometry";

const ALCOVE = cuspedArchPath({ aspect: 1.36, spring: 0.5, lobes: 9 });
/** One tile of the jali: an eight-point star tied to its neighbours. */
const TILE = 52;
const STAR = jaliStarPath(TILE, 15);
const TIES = `M${TILE / 2} 0V${TILE / 2 - 15}M${TILE / 2} ${TILE / 2 + 15}V${TILE}M0 ${TILE / 2}H${TILE / 2 - 15}M${TILE / 2 + 15} ${TILE / 2}H${TILE}`;

/**
 * The alcove, carved from the same ivory stone as the console: a pierced jali
 * screen over a dark recess, framed by a moulded stone arch with a gilt bead.
 * The stone is lit by an SVG lighting filter, so the carving has real relief
 * rather than drawn lines. It is drawn in pixel space (measured), so the
 * lattice and moulding keep true proportions at every size.
 */
function Alcove() {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const host = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 580, h: 430 });

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setSize({ w: Math.round(r.width), h: Math.round(r.height) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { w, h } = size;
  // The moulding keeps its proportion to the arch at every size.
  const fascia = Math.max(13, Math.round(w * 0.045));
  const arch = `scale(${w} ${h})`;
  // The recessed inner panel, stepped in from the moulding.
  const inset = Math.min(w, h) * 0.075;
  const panel = `translate(${inset} ${inset * 1.25}) scale(${w - inset * 2} ${h - inset * 1.25})`;

  return (
    <svg ref={host} className="finale-alcove" width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={ALCOVE} transform={arch} />
        </clipPath>
        <pattern id={`${id}-jali`} width={TILE} height={TILE} patternUnits="userSpaceOnUse" x={(w / 2) % TILE} y="0">
          <g fill="none" stroke="#cbbc9f" strokeWidth="4" strokeLinejoin="miter" strokeMiterlimit="8" strokeLinecap="butt">
            <path d={STAR} />
            <path d={TIES} />
            {/* Diagonal ties to the corners, so the stars interlace as lace. */}
            <path d={`M0 0L${TILE / 2 - 10.6} ${TILE / 2 - 10.6}M${TILE} 0L${TILE / 2 + 10.6} ${TILE / 2 - 10.6}M0 ${TILE}L${TILE / 2 - 10.6} ${TILE / 2 + 10.6}M${TILE} ${TILE}L${TILE / 2 + 10.6} ${TILE / 2 + 10.6}`} strokeWidth="2.6" />
          </g>
          <circle cx={TILE / 2} cy={TILE / 2} r="4.2" fill="none" stroke="#cbbc9f" strokeWidth="2.4" />
        </pattern>
        {/* Carved stone: relief from the shape's own edges, lit from the upper
            left, with a fine grain and a shadow cast onto the recess behind. */}
        <filter id={`${id}-stone`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="relief" />
          <feDiffuseLighting in="relief" surfaceScale="3.2" diffuseConstant="1.15" lightingColor="#fff" result="diffuse">
            <feDistantLight azimuth="235" elevation="38" />
          </feDiffuseLighting>
          <feSpecularLighting in="relief" surfaceScale="3.2" specularConstant="0.55" specularExponent="24" lightingColor="#fff3dc" result="gloss">
            <feDistantLight azimuth="235" elevation="42" />
          </feSpecularLighting>
          <feComposite in="gloss" in2="SourceAlpha" operator="in" result="glossIn" />
          <feComposite in="SourceGraphic" in2="diffuse" operator="arithmetic" k1="1" result="lit" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.42  0 0 0 0 0.36  0 0 0 0 0.3  0 0 0 0.16 0" result="grainTone" />
          <feComposite in="grainTone" in2="SourceAlpha" operator="in" result="grain" />
          <feOffset in="SourceAlpha" dx="2" dy="4" result="drop" />
          <feGaussianBlur in="drop" stdDeviation="3" result="dropSoft" />
          <feFlood floodColor="#000" floodOpacity="0.8" />
          <feComposite in2="dropSoft" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="lit" />
            <feMergeNode in="grain" />
            <feMergeNode in="glossIn" />
          </feMerge>
        </filter>
        {/* Lamplight from the statue's side; the crown of the recess in shade. */}
        <radialGradient id={`${id}-lamp`} cx="0.56" cy="0.95" r="0.8">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.14" />
          <stop offset="0.42" stopColor="#000" stopOpacity="0.2" />
          <stop offset="1" stopColor="#000" stopOpacity="0.86" />
        </radialGradient>
        <radialGradient id={`${id}-depth`} cx="0.5" cy="0.8" r="0.6">
          <stop offset="0" stopColor="#4a2e1a" />
          <stop offset="1" stopColor="#0a0605" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        {/* The dark recess, seen through the piercings. */}
        <rect width={w} height={h} fill={`url(#${id}-depth)`} />
        <rect width={w} height={h} fill={`url(#${id}-jali)`} filter={`url(#${id}-stone)`} />
        <rect width={w} height={h} fill={`url(#${id}-lamp)`} />
        {/* The stepped panel inside the arch: a cut groove catching the light. */}
        <path d={ALCOVE} transform={panel} vectorEffect="non-scaling-stroke" fill="none" stroke="rgb(0 0 0 / 0.75)" strokeWidth="3" />
        <path d={ALCOVE} transform={`translate(0 1.5) ${panel}`} vectorEffect="non-scaling-stroke" fill="none" stroke="rgb(236 222 196 / 0.35)" strokeWidth="1" />
      </g>

      {/* The moulded stone arch, with a gilt bead along its face. */}
      {/* A stepped profile: a broad outer fascia, a raised inner roll, a gilt bead. */}
      <g filter={`url(#${id}-stone)`}>
        <path d={ALCOVE} transform={arch} vectorEffect="non-scaling-stroke" fill="none" stroke="#b9aa8e" strokeWidth={fascia} strokeLinejoin="round" />
        <path d={ALCOVE} transform={arch} vectorEffect="non-scaling-stroke" fill="none" stroke="#d3c5aa" strokeWidth={Math.round(fascia * 0.46)} strokeLinejoin="round" />
        <path d={ALCOVE} transform={arch} vectorEffect="non-scaling-stroke" fill="none" stroke="#b8904c" strokeWidth={fascia > 18 ? 2.4 : 1.6} strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/**
 * The finale: the house's guardian, an ivory cheetah at rest on a carved
 * console, set into a carved alcove in the velvet wall, beneath the house line.
 */
export default function HomeColophon() {
  return (
    <section className="home-house" data-home-dark="true" aria-labelledby="home-house-title">
      <h2 id="home-house-title" className="finale-line" data-editorial-reveal>
        Diamonds are made <em>in the rough.</em>
      </h2>
      <figure className="finale-cheetah">
        <Alcove />
        <svg className="finale-alcove-finial" viewBox="0 0 16 34" aria-hidden="true" focusable="false">
          <circle cx="8" cy="3" r="2.2" />
          <path d="M8 7C9.2 12.5 13.5 15 13.5 20.5a5.5 5.5 0 0 1-11 0C2.5 15 6.8 12.5 8 7Z" />
          <rect x="7.3" y="25" width="1.4" height="9" />
        </svg>
        <span className="finale-statue">
          <img
            src="/philosophy/ivory-cheetah-v2.webp"
            alt="An ivory cheetah at rest on a gilded, carved console."
            width="1895"
            height="830"
            loading="lazy"
            decoding="async"
          />
          {/* The same light on the stone: bright on the back, falling to shade below. */}
          <span className="finale-statue-shade" aria-hidden="true" />
        </span>
      </figure>
      <Link href="/philosophy" className="house-cartouche" data-tone="gold">
        Read the philosophy
      </Link>
    </section>
  );
}
