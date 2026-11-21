import { Arch } from "./Arch";
import Parallax from "./Parallax";
import { media } from "./gunData";
import { useEffect, useState } from "react";

export default function GunHero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Reveal immediately on mount
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      data-nav="dark"
      data-campaign-dark="true"
      className={`relative min-h-[100svh] overflow-hidden bg-oxblood text-bone ${ready ? "in" : ""}`}
    >
      {/* velvet glow behind the arch */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 46% at 50% 42%, rgba(132,28,46,0.62) 0%, rgba(74,14,26,0.35) 48%, transparent 76%), linear-gradient(180deg, #2a0810 0%, #1d050b 100%)",
        }}
      />

      {/* arch */}
      <div className="absolute left-1/2 top-[12svh] md:top-[10.5svh] -translate-x-1/2 text-gold">
        <div className="wipe" style={{ ["--d" as string]: "0.1s" }}>
          <Arch kind="a45" outline={false} className="w-[min(86vw,66svh)]">
            <Parallax src={media.casket} alt="Maharaja eyewear resting in a rosewood casket lined with crimson velvet" position="50% 60%" speed={0.05} />
          </Arch>
        </div>
        {/* echo outline appears after the arch opens */}
        <div className="rise pointer-events-none absolute inset-0" style={{ ["--d" as string]: "1.1s" }}>
          <Arch kind="a45" outline className="h-full w-full">
            <span />
          </Arch>
        </div>
      </div>

      {/* the name */}
      <h1
        className="display pointer-events-none absolute inset-x-0 bottom-[20svh] md:bottom-[8.5svh] z-10 text-center text-[clamp(4rem,22vw,30rem)] leading-[0.8] text-bone"
        aria-label="Maharaja"
      >
        <span className="mask">
          <span style={{ ["--d" as string]: "0.35s" }}>Maharaja</span>
        </span>
      </h1>

    </section>
  );
}
