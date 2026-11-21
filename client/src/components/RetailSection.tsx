import { Reveal, Tilt } from "./ui";

const retail = "/home/retail-jewellery.webp";

const SPECS = [
  ["frame", "Antiqued brass, hand burnished"],
  ["lens", "Amber gradient, ground in Japan"],
  ["setting", "Cut emerald at the hinge"],
];

export default function RetailSection() {
  return (
    <section
      id="retail"
      className="relative overflow-hidden bg-[#f6f2ec] px-6 py-28 text-ink md:px-14 md:py-36"
    >
      {/* Paper warmth subtle glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 55% at 78% 45%, rgba(185,152,90,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px]">
        <div>
          {/* Fully visible Retail headline - unclipped and unobstructed */}
          <Reveal>
            <h2
              className="display select-none text-[clamp(4.5rem,15vw,13rem)] text-ink font-serif tracking-tight"
              style={{ lineHeight: 0.95 }}
            >
              Retail
            </h2>
          </Reveal>

          {/* 3D Tilted Product Card placed cleanly below Retail */}
          <Reveal delay={150} className="relative z-10 mt-6 md:mt-8 ml-auto w-full md:w-[72%] lg:w-[65%]">
            <Tilt max={6} perspective={1400}>
              <div className="relative aspect-[3/2] w-full" style={{ transformStyle: "preserve-3d" }}>
                {/* Back offset brass border */}
                <div
                  className="absolute inset-0 border border-brass/75 pointer-events-none"
                  style={{ transform: "translateZ(-40px) translate(-22px, 22px)" }}
                />

                {/* Main product card */}
                <div
                  className="absolute inset-0 overflow-hidden bg-[#0a0706]"
                  style={{
                    boxShadow: "0 45px 90px -25px rgba(60,40,10,0.45)",
                    transform: "translateZ(0)",
                  }}
                >
                  <img
                    src={retail}
                    alt="Cheeta Jewels retail collection piece"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Front boutique badge */}
                <div
                  className="absolute -bottom-4 right-4 md:-bottom-5 md:right-8 bg-[#0a0706] border border-gilt/40 px-5 py-2.5 text-gilt text-xs font-sans tracking-[0.22em] uppercase shadow-xl select-none"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <p className="label text-gilt text-xs tracking-[0.22em]">now in boutiques</p>
                </div>
              </div>
            </Tilt>
          </Reveal>
        </div>

        {/* Bottom Details Grid */}
        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 items-start">
          <Reveal className="md:col-span-5">
            <p className="max-w-md text-lg md:text-xl leading-relaxed text-[#3a322a]/80 font-sans">
              The everyday edit. Wearable metal, made in small runs, finished by the same hands
              that cut the collection.
            </p>
            <a
              href="/retail"
              className="hair-link label mt-8 md:mt-10 text-wine tracking-[0.22em] uppercase text-xs md:text-sm hover:text-ink transition-colors font-medium"
            >
              EXPLORE RETAIL <span className="ml-1 text-sm font-normal">↗</span>
            </a>
          </Reveal>

          <ul className="md:col-span-6 md:col-start-7">
            {SPECS.map(([k, v], i) => (
              <Reveal as="li" key={k} delay={i * 100}>
                <div className="flex items-baseline justify-between border-t border-[#d8d0c2] py-5 md:py-6 last:border-b">
                  <span className="text-xs md:text-sm tracking-[0.18em] text-[#7a7165] lowercase font-sans">
                    {k}
                  </span>
                  <span className="text-xl md:text-2xl font-serif italic text-ink">
                    {v}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
