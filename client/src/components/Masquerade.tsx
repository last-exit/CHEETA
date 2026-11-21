import { Arrow, Reveal, Tilt } from "./ui";

const masquerade = "/home/masquerade-campaign.webp";

export default function Masquerade() {
  return (
    <section id="masquerade" className="home-masquerade">
      <div
        className="grain relative overflow-hidden px-6 py-32 md:px-14 md:py-48"
        style={{
          background:
            "radial-gradient(70% 60% at 25% 40%, #4a1019 0%, #2a0c12 55%, #170709 100%)",
        }}
      >
        {/* giant ghost numeral */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 top-10 select-none text-[34vw] font-light italic leading-none text-bone/[0.03]"
        >
          II
        </span>

        <div className="relative mx-auto grid max-w-[1500px] items-center gap-16 md:grid-cols-12">
          {/* arched portrait on layered 3D planes */}
          <Reveal className="md:col-span-5">
            <Tilt max={9} perspective={1400} className="mx-auto w-full max-w-[520px]">
              <div className="relative aspect-[3/4.3] w-full" style={{ transformStyle: "preserve-3d" }}>
                {/* back plane: gilded arch outline */}
                <div
                  className="absolute inset-0 rounded-t-full border border-gilt/50"
                  style={{ transform: "translateZ(-60px) translate(26px, 22px) scale(1.02)" }}
                />
                {/* mid plane: portrait */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-t-full"
                  style={{
                    transform: "translateZ(0)",
                    boxShadow: "0 70px 120px -30px rgba(0,0,0,0.85)",
                  }}
                >
                  <img
                    src={masquerade}
                    alt="The Masquerade: woman in black lace filigree sunglasses lit by candles"
                    className="h-full w-full scale-110 object-cover"
                  />
                  <div
                    className="absolute inset-0 mix-blend-screen"
                    style={{
                      background:
                        "radial-gradient(30% 22% at 85% 75%, rgba(255,190,100,0.5), transparent 70%), radial-gradient(26% 20% at 12% 62%, rgba(255,180,90,0.45), transparent 70%)",
                      animation: "flicker 3.4s infinite",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-oxblood/70 via-transparent to-transparent" />
                </div>
                {/* front plane: small gilded plate */}
                <div
                  className="absolute -left-4 bottom-12 border border-gilt/50 bg-ink/70 px-5 py-3 backdrop-blur-sm md:-left-10"
                  style={{ transform: "translateZ(70px)" }}
                >
                  <p className="label text-gilt">the campaign</p>
                </div>
              </div>
            </Tilt>
          </Reveal>

          {/* title overlaps the arch */}
          <div className="md:col-span-7 md:-ml-24 md:pt-40">
            <Reveal delay={120}>
              <h2 className="display text-[clamp(4.2rem,12vw,12.5rem)] text-bone">
                The
                <br />
                <em className="ml-[0.4em] text-gilt">Masquerade</em>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-10 md:ml-[18%] md:grid-cols-2">
              <Reveal delay={240}>
                <p className="text-lg leading-relaxed text-ivory/70">
                  A ball with no names. Lace cut in black lacquer, lenses dark as a closed door,
                  and a room lit by nothing but wax.
                </p>
              </Reveal>
              <Reveal delay={340} className="md:self-end">
                <a
                  href="/collection/masquerade"
                  aria-label="Explore The Masquerade campaign"
                  className="hair-link label text-gilt"
                >
                  enter the campaign <Arrow />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
