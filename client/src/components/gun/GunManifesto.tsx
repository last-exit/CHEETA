import { useReveal } from "./useGunReveal";

const words: { t: string; i?: boolean }[] = [
  { t: "Each" },
  { t: "lens" },
  { t: "takes" },
  { t: "the" },
  { t: "name", i: true },
  { t: "of" },
  { t: "the" },
  { t: "pistol", i: true },
  { t: "that" },
  { t: "stands" },
  { t: "beside" },
  { t: "it." },
];

export default function GunManifesto() {
  const [ref, seen] = useReveal<HTMLDivElement>(0.3);
  return (
    <section data-nav="light" className="relative bg-bone px-[6vw] py-[24svh]">
      <div ref={ref} className={`mx-auto flex max-w-[1400px] flex-col items-center ${seen ? "in" : ""}`}>
        <svg width="34" height="34" viewBox="0 0 34 34" className="rise mb-14 text-gold" aria-hidden>
          <polygon points="10,1 24,1 33,10 33,24 24,33 10,33 1,24 1,10" fill="none" stroke="currentColor" strokeWidth="1" />
          <polygon points="12,9 22,9 25,12 25,22 22,25 12,25 9,22 9,12" fill="currentColor" opacity="0.85" className="text-rose" />
        </svg>
        <p className="display text-center text-[clamp(2.2rem,6.2vw,6.6rem)] leading-[1.02] tracking-[-0.035em]">
          {words.map((w, i) => (
            <span key={i} className="mask !inline-block">
              <span style={{ ["--d" as string]: `${i * 0.07}s` }} className={w.i ? "italic text-rose" : ""}>
                {w.t}
                {"\u00A0"}
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
