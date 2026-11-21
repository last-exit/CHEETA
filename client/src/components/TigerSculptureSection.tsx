import { Reveal } from "./ui";

export default function TigerSculptureSection() {
  return (
    <section className="relative overflow-hidden bg-[#fafaf7] px-6 py-28 md:px-14 md:py-36 border-t border-[#ece6dc]">
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: Typography matching user mockup */}
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <p className="label mb-6 text-wine/80 tracking-[0.25em] text-xs md:text-sm lowercase">
                house of icon livin&rsquo;
              </p>
              <h2 className="display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight text-ink font-serif">
                Guarded,
                <br />
                <em className="font-normal italic">patient,</em> never
                <br />
                in a hurry.
              </h2>
            </Reveal>
          </div>

          {/* Right: Carved ivory cheetah/tiger sculpture */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-end">
            <Reveal delay={150} className="w-full max-w-[760px]">
              <img
                src="/philosophy/ivory-cheetah-v2.webp"
                alt="Carved ivory cheetah sculpture on an acanthus-carved plinth"
                className="w-full h-auto object-contain select-none"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
