import type { Piece } from "./gunData";
import { useReveal } from "./useGunReveal";
import Parallax from "./Parallax";

function Arrow() {
  return (
    <svg width="26" height="10" viewBox="0 0 26 10" fill="none" aria-hidden>
      <path d="M0 5h24M20 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Enquire({ piece }: { piece: Piece }) {
  return (
    <a href="#maharajah-details" className="label group inline-flex items-center gap-4" aria-label={`Enquire about ${piece.name}`}>
      <span className="ulink">Enquire</span>
      <span className="transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2">
        <Arrow />
      </span>
    </a>
  );
}

function Deva({ piece, className = "" }: { piece: Piece; className?: string }) {
  return (
    <span className={`flex items-baseline gap-4 ${className}`}>
      <span className="font-deva text-[clamp(1.4rem,2vw,2rem)] leading-none">{piece.deva}</span>
      <span className="display text-[clamp(1rem,1.2vw,1.2rem)] italic tracking-normal opacity-70">— {piece.gloss}</span>
    </span>
  );
}

/* ──────────────────────────  I · FAULAD  ────────────────────────── */
export function ChapterOne({ piece }: { piece: Piece }) {
  const [ref, seen] = useReveal<HTMLDivElement>(0.12);
  return (
    <section id={piece.id} data-nav="light" className="relative overflow-hidden bg-bone pb-[16svh] pt-[10svh]">
      <div ref={ref} className={seen ? "in" : ""}>
        <div className="relative ml-auto w-[min(92vw,150svh)] md:mr-[min(7vw,100px)] md:w-[min(86vw,150svh)]">
          <div className="wipe relative aspect-[3/2] overflow-hidden">
            <Parallax src={piece.img} alt={`${piece.name}: a steel and walnut flintlock pistol above rose-lensed octagonal eyewear`} speed={0.07} />
          </div>
          <span className="display rise absolute -left-[5vw] top-0 hidden text-[clamp(1.2rem,1.6vw,1.8rem)] italic tracking-normal md:block" style={{ ["--d" as string]: "0.9s" }}>
            {piece.numeral}.
          </span>
        </div>

        <div className="relative z-10 -mt-[0.27em] flex items-end justify-between gap-8 px-[4vw] text-[clamp(5.6rem,23vw,30rem)] leading-[0.8]">
          <h2 className="display">
            <span className="mask">
              <span style={{ ["--d" as string]: "0.35s" }}>{piece.name}</span>
            </span>
          </h2>
          <div className="rise hidden w-[min(24vw,360px)] flex-col gap-7 pb-[1.6vw] text-[1rem] leading-normal tracking-normal md:flex" style={{ ["--d" as string]: "1s" }}>
            <Deva piece={piece} />
            <p className="display text-[1.15rem] italic leading-snug tracking-normal opacity-80">{piece.line}</p>
            <Enquire piece={piece} />
          </div>
        </div>

        {/* small screens */}
        <div className="rise mt-12 flex flex-col gap-6 px-[6vw] md:hidden" style={{ ["--d" as string]: "0.6s" }}>
          <Deva piece={piece} />
          <p className="display text-lg italic leading-snug opacity-80">{piece.line}</p>
          <Enquire piece={piece} />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────  II · ZAR  ────────────────────────── */
export function ChapterTwo({ piece }: { piece: Piece }) {
  const [ref, seen] = useReveal<HTMLDivElement>(0.12);
  return (
    <section id={piece.id} data-nav="dark" data-campaign-dark="true" className="relative overflow-hidden bg-oxblood pb-[14svh] pt-[18svh] text-bone">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 48% at 50% 38%, rgba(120,26,44,0.5), transparent 72%), radial-gradient(40% 30% at 50% 100%, rgba(184,149,90,0.12), transparent 70%)",
        }}
      />
      <div ref={ref} className={`relative ${seen ? "in" : ""}`}>
        {/* the name sits behind the photograph */}
        <h2 className="display relative z-0 text-center text-[clamp(7rem,40vw,52rem)] leading-[0.74]">
          <span className="mask">
            <span
              style={{
                ["--d" as string]: "0.2s",
                backgroundImage: "linear-gradient(180deg,#f3e3bc 6%,#cfab6c 50%,#94702f 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                paddingBottom: "0.04em",
              }}
            >
              {piece.name}
            </span>
          </span>
        </h2>

        <div className="relative z-10 mx-auto -mt-[7.5vw] w-[min(86vw,150svh)]">
          <div className="wipe relative aspect-[3/2] overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]" style={{ ["--d" as string]: "0.5s" }}>
            <Parallax src={piece.img} alt={`${piece.name}: a gold-inlaid flintlock pistol above rose-lensed octagonal eyewear`} speed={0.07} />
          </div>
        </div>

        <div className="rise mx-auto mt-14 flex w-[min(86vw,150svh)] flex-col items-start justify-between gap-8 border-t border-gold/30 pt-8 md:flex-row md:items-center" style={{ ["--d" as string]: "1s" }}>
          <span className="display text-[clamp(1.2rem,1.6vw,1.8rem)] italic tracking-normal text-brass">{piece.numeral}.</span>
          <Deva piece={piece} />
          <p className="display text-[1.15rem] italic leading-snug tracking-normal opacity-80">{piece.line}</p>
          <Enquire piece={piece} />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────  III · SIM  ────────────────────────── */
export function ChapterThree({ piece }: { piece: Piece }) {
  const [ref, seen] = useReveal<HTMLDivElement>(0.08);
  return (
    <section id={piece.id} data-nav="dark" data-rail="dark" data-campaign-dark="true" className="relative overflow-hidden bg-ink text-bone">
      <div ref={ref} className={`relative ${seen ? "in" : ""}`}>
        {/* uncropped, edge to edge, dissolving into ink */}
        <div className="wipe relative aspect-[3/2] w-full">
          <Parallax src={piece.img} alt={`${piece.name}: a silver-chased flintlock pistol above rose-lensed octagonal eyewear`} speed={0.05} />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%]"
            style={{ background: "linear-gradient(to top, #1a0f0b 0%, rgba(26,15,11,0.7) 40%, rgba(26,15,11,0) 100%)" }}
          />
        </div>

        <span className="display rise absolute left-[4vw] top-[14vh] hidden text-[clamp(1.2rem,1.6vw,1.8rem)] italic tracking-normal text-ink md:block" style={{ ["--d" as string]: "1s" }}>
          {piece.numeral}.
        </span>

        <div className="relative z-10 -mt-[0.26em] flex items-end justify-between gap-8 px-[4vw] pb-[10svh] text-[clamp(6rem,25vw,34rem)] leading-[0.78]">
          <h2 className="display">
            <span className="mask">
              <span style={{ ["--d" as string]: "0.4s" }}>{piece.name}</span>
            </span>
          </h2>
          <div className="rise hidden w-[min(24vw,360px)] flex-col gap-7 pb-[1.4vw] text-[1rem] leading-normal tracking-normal md:flex" style={{ ["--d" as string]: "1.1s" }}>
            <Deva piece={piece} />
            <p className="display text-[1.15rem] italic leading-snug tracking-normal opacity-85">{piece.line}</p>
            <Enquire piece={piece} />
          </div>
        </div>

        <div className="rise flex flex-col gap-5 px-[6vw] pb-12 md:hidden" style={{ ["--d" as string]: "0.4s" }}>
          <Deva piece={piece} />
          <p className="display text-lg italic leading-snug opacity-80">{piece.line}</p>
          <Enquire piece={piece} />
        </div>
      </div>
    </section>
  );
}
