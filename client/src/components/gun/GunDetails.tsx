import { Arch } from "./Arch";
import Parallax from "./Parallax";
import { media } from "./gunData";
import { useReveal } from "./useGunReveal";

export default function GunDetails() {
  const [ref, seen] = useReveal<HTMLDivElement>(0.1);
  return (
    <section data-nav="light" className="relative overflow-hidden bg-paper py-[18svh]">
      <div ref={ref} className={`mx-auto max-w-[1700px] px-[6vw] ${seen ? "in" : ""}`}>
        <h3 className="display text-center text-[clamp(2.8rem,8.4vw,9.5rem)] italic leading-[0.95] tracking-[-0.04em]">
          <span className="mask">
            <span>Under the loupe</span>
          </span>
        </h3>

        <div className="mt-[10svh] grid grid-cols-1 gap-x-[6vw] gap-y-24 md:grid-cols-12">
          <figure className="md:col-span-5 md:col-start-2 md:mt-[16vw]">
            <div className="wipe loose text-gold" style={{ ["--d" as string]: "0.2s" }}>
              <Arch kind="a23" echo={12} className="w-full">
                <Parallax src={media.detailLock} alt="Gold koftgari inlay on the lock of a flintlock pistol" speed={0.06} />
              </Arch>
            </div>
            <figcaption className="rise mt-12 flex items-baseline justify-between gap-6" style={{ ["--d" as string]: "0.9s" }}>
              <span className="label">Koftgari</span>
              <span className="display text-[1.15rem] italic tracking-normal opacity-75">Gold wire, hammered into steel.</span>
            </figcaption>
          </figure>

          <figure className="md:col-span-4 md:col-start-8">
            <div className="wipe loose text-gold" style={{ ["--d" as string]: "0.45s" }}>
              <Arch kind="a23" echo={12} className="w-full">
                <Parallax src={media.detailLens} alt="An octagonal ruby lens in an engraved gold frame with a jewelled barrel hinge" speed={0.06} />
              </Arch>
            </div>
            <figcaption className="rise mt-12 flex items-baseline justify-between gap-6" style={{ ["--d" as string]: "1.1s" }}>
              <span className="label">The Hinge</span>
              <span className="display text-[1.15rem] italic tracking-normal opacity-75">A ruby, set in a barrel of gold.</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
