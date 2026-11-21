import React, { useEffect, useRef, useState } from "react";
import { Arrow, Reveal } from "./ui";

const PIECES = [
  {
    numeral: "I",
    name: "Manani",
    subtitle: "Brescia, c. 1740",
    img: "/home/still-life/manani-v1.webp",
    alt: "Maharajah beneath the Manani antique pistol in an ivory cabinet campaign still life",
  },
  {
    numeral: "II",
    name: "Cominazzo-Mariani",
    subtitle: "Gardone, c. 1680",
    img: "/home/still-life/cominazzo-mariani-v1.webp",
    alt: "Maharajah beneath the gold-ornamented Cominazzo-Mariani pistol in the same ivory cabinet",
  },
  {
    numeral: "III",
    name: "Florentine",
    subtitle: "Florence, c. 1710",
    img: "/home/still-life/florentine-v1.webp",
    alt: "Maharajah beneath the engraved Florentine pistol in the same ivory cabinet",
  },
];

export default function GunCollection() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);

  const go = (n: number) => setActive((n + PIECES.length) % PIECES.length);

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft") go(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const piece = PIECES[active];

  return (
    <section
      id="collection"
      className="grain relative overflow-hidden bg-ink px-6 pb-28 pt-32 md:px-14 md:pt-44"
    >
      <div id="characters" className="home-object-study" data-static="true" style={{ display: "contents" }}>
        <span id="pieces" />
      </div>

      {/* warm ambient light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 58%, rgba(185,152,90,0.15), transparent 70%), radial-gradient(40% 40% at 8% 0%, rgba(90,20,32,0.35), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display text-[clamp(3.8rem,10vw,10rem)] text-bone tracking-[-0.04em] leading-[0.9]">
                The Gun
                <br />
                <em className="text-gilt font-normal">Collection</em>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pb-4">
            <Reveal delay={150}>
              <a
                href="/collection/barrel"
                className="hair-link label text-gilt tracking-[0.2em] uppercase text-xs hover:text-bone transition-colors"
              >
                explore collection <Arrow />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Still life stage — image dominant */}
        <div className="mt-14 md:mt-20">
          <div
            ref={stage}
            id="home-reference-object"
            className="relative w-full"
          >
            {/* Full-bleed image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-umber">
              {PIECES.map((p, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={p.name}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={p.img}
                      alt={p.alt}
                      className="h-full w-full object-cover select-none"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Caption bar beneath image */}
          <div className="home-reference-caption">
            <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              {/* Piece name + origin */}
              <div>
                <h3 className="display text-4xl sm:text-5xl lg:text-6xl text-bone font-normal tracking-tight leading-[1]">
                  {piece.name}
                </h3>
                <p className="mt-2 text-sm tracking-[0.15em] text-ivory/40 font-sans">
                  {piece.subtitle}
                </p>
              </div>

              {/* Numeral switcher + arrows */}
              <div className="flex items-center gap-6">
                <div
                  className="flex items-center gap-6 sm:gap-8"
                  role="group"
                  aria-label="Gun references"
                >
                  {PIECES.map((p, i) => {
                    const isActive = i === active;
                    return (
                      <button
                        key={p.numeral}
                        onClick={() => go(i)}
                        aria-controls="home-reference-object"
                        aria-pressed={isActive}
                        className={`relative font-serif text-lg tracking-[0.18em] transition-colors duration-300 cursor-pointer ${
                          isActive
                            ? "text-gilt"
                            : "text-ivory/25 hover:text-ivory/50"
                        }`}
                      >
                        {p.numeral}
                      </button>
                    );
                  })}
                </div>

                <div className="h-4 w-px bg-ivory/15" />

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => go(active - 1)}
                    aria-label="Previous reference"
                    className="group flex h-9 w-9 items-center justify-center border border-gilt/20 hover:border-gilt/50 transition-colors cursor-pointer"
                  >
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="text-ivory/50 group-hover:text-gilt transition-colors">
                      <path d="M13 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </button>
                  <button
                    onClick={() => go(active + 1)}
                    aria-label="Next reference"
                    className="group flex h-9 w-9 items-center justify-center border border-gilt/20 hover:border-gilt/50 transition-colors cursor-pointer"
                  >
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="text-ivory/50 group-hover:text-gilt transition-colors">
                      <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
