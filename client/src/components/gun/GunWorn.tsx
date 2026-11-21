import { media } from "./gunData";
import { useReveal } from "./useGunReveal";

function Still({
  src,
  alt,
  className = "",
  delay = 0,
  position = "50% 50%",
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  position?: string;
}) {
  return (
    <div className={`wipe push relative overflow-hidden bg-ink ${className}`} style={{ ["--d" as string]: `${delay}s` }}>
      <div className="zoom absolute inset-0">
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="zoom-in h-full w-full object-cover"
          style={{ objectPosition: position }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default function GunWorn() {
  const [ref, seen] = useReveal<HTMLDivElement>(0.08);
  return (
    <section id="maharajah-details" data-nav="light" className="relative bg-bone px-[clamp(1rem,2vw,2rem)] pb-[clamp(1rem,2vw,2rem)] pt-[18svh]">
      <div ref={ref} className={seen ? "in" : ""}>
        <div className="mb-[clamp(1.5rem,3vw,3rem)] flex items-end justify-between gap-6 px-[clamp(0rem,0.5vw,0.5rem)]">
          <h3 className="display text-[clamp(3rem,8.6vw,9.5rem)] leading-[0.9] tracking-[-0.05em]">
            <span className="mask">
              <span>Maharaja, worn</span>
            </span>
          </h3>
          <p className="rise hidden pb-3 text-[0.95rem] tracking-normal opacity-80 md:block" style={{ ["--d" as string]: "0.6s" }}>
            stills from the original horseback film.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(0.5rem,0.8vw,0.8rem)] md:grid-cols-[1.6fr_1fr]">
          <Still
            src={media.still1}
            alt="Film still: a young man in a leather jacket and rose lenses, seen from below, on horseback"
            className="aspect-[3/2] md:row-span-2 md:aspect-auto"
            position="30% 50%"
            delay={0.2}
          />
          <Still
            src={media.still2}
            alt="Film still: the rider looks skyward, a silver brooch on his lapel"
            className="aspect-[3/2]"
            delay={0.45}
            position="50% 30%"
          />
          <Still
            src={media.still3}
            alt="Film still: the rider in profile against a pale sky"
            className="aspect-[3/2]"
            delay={0.7}
            position="50% 30%"
          />
        </div>
      </div>
    </section>
  );
}
