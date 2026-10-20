/**
 * THE FOUNDER : Eisa Saidi
 * Real content from the Cheeta Jewels writup (2026).
 * Founder story, real quote, real inspirations, real product context.
 */
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";

const atelierImage = "/manus-storage/cheeta-dubai-atelier_0dde518b.png";
const leopardBox = "/manus-storage/cheeta-leopard-vault-box.jpg";

export default function Founder() {
  return (
    <main className="min-h-screen w-full bg-[#F4F1E8] text-[#1A1410] selection:bg-[#1A1410] selection:text-[#F4F1E8] overflow-x-hidden">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark={false} />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />


      {/* ========================================================================= */}
      {/* 1. FOUNDER OPEN */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 pt-24 md:pt-36 pb-16 md:pb-24 max-w-7xl mx-auto pl-16 md:pl-28">
        <div className="flex items-baseline justify-between mb-12 font-sans lowercase text-xs tracking-wider">
          <p className="text-[#6B1A2C]">
            the founder
          </p>
          <p className="text-[#1A1410]/40">
            dubai · est. 2026
          </p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif capitalize text-[clamp(3.2rem,10vw,9rem)] leading-[0.88] tracking-[-0.035em] text-[#1A1410]"
        >
          eisa<br />saidi
        </motion.h1>

        <p className="mt-10 font-sans lowercase text-xs tracking-wider text-[#1A1410]/55">
          founder · known in the ring as "the cheetah"
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE BRAIDS : the real origin moment */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-3xl mx-auto pl-16 md:pl-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B1A2C] block">
            Where it started
          </span>
          <p className="font-serif text-2xl md:text-3xl leading-[1.35] text-[#1A1410] tracking-[-0.01em]">
            One morning in high school, Eisa walked in with freshly braided hair. He knew it would draw ridicule. He wore it anyway. For a moment, it made him a target.
          </p>
          <p className="font-serif text-2xl md:text-3xl leading-[1.35] text-[#1A1410] tracking-[-0.01em]">
            Days later, the very look they mocked began appearing across the school. What was once ridiculed had become influence.
          </p>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HIS WORDS */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-20 md:py-32 max-w-3xl mx-auto pl-16 md:pl-28">
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B1A2C] block">
            In his words
          </span>
          <blockquote className="font-serif text-3xl md:text-4xl leading-[1.25] text-[#1A1410] tracking-[-0.015em]">
            "Feeling out of place never stopped me from being who I was. And neither should it stop anyone."
          </blockquote>
          <figcaption className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#1A1410]/45">
            Eisa Saidi
          </figcaption>
        </motion.figure>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE CHEETAH NICKNAME */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto pl-16 md:pl-28 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B1A2C] block mb-4">
            The Cheetah
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1410] tracking-[-0.02em]">
            A nickname from the ring.
          </h2>
        </div>
        <p className="md:col-span-8 font-sans text-base md:text-lg text-[#1A1410]/75 leading-relaxed max-w-2xl">
          Before the brand, there was a boxer. The nickname came from the way he moved, and it stuck. The cheetah motif on the eyewear is not a logo. It is the nickname, in gold.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 5. INSPIRATIONS : the real two */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-20 md:py-32 max-w-7xl mx-auto pl-16 md:pl-28">
        <div className="mb-16 max-w-2xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B1A2C] block mb-4">
            Two references he gave us
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1A1410] tracking-[-0.02em]">
            Where the silhouettes come from.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Cartier panther */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#1A1410]/45 block">
              Reference 01
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1A1410] tracking-[-0.01em]">
              Cartier's panther
            </h3>
            <p className="font-sans text-sm md:text-base text-[#1A1410]/75 leading-relaxed">
              The feline as a brand identity. Strength, stealth, presence. Eisa's version of it is a little cooler, a little more gender-fluid, a little more mischievous than the original.
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#1A1410]/45 pt-2">
              Influence, not imitation
            </p>
          </motion.article>

          {/* Purdey & Sons */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#1A1410]/45 block">
              Reference 02
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1A1410] tracking-[-0.01em]">
              Purdey & Sons
            </h3>
            <p className="font-sans text-sm md:text-base text-[#1A1410]/75 leading-relaxed">
              The vintage British gunmaker. Engraved metalwork, lavish wood finishes, heritage weight. The first eyewear chassis is an iconic British sporting gun, translated to a frame.
            </p>
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#1A1410]/45 pt-2">
              Old-world craft, new-world wear
            </p>
          </motion.article>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE FIRST COLLECTION : the real product line */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-20 md:py-32 max-w-7xl mx-auto pl-16 md:pl-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B1A2C] block mb-4">
              The first collection
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1A1410] tracking-[-0.02em] leading-[1.05]">
              100 pairs.<br />Numbered 001&ndash;100.
            </h2>
          </div>
          <div className="md:col-span-5 font-sans text-base md:text-lg text-[#1A1410]/75 leading-relaxed">
            <p>
              The first Cheetah Jewelz drop is a hundred pairs of eyewear. Ruby-toned mineral lenses, sculpted metallic frames, gemstone detailing, engraved sporting gun-inspired temples. AED 15,000 per pair.
            </p>
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-[#1A1410]/50">
              No reissue
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ATELIER PHOTO */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto pl-16 md:pl-28">
        <div className="aspect-[16/9] w-full overflow-hidden bg-[#111112]">
          <img
            src={atelierImage}
            alt="Cheetah Jewelz Dubai atelier"
            className="h-full w-full object-cover filter contrast-[1.06] brightness-[0.94]"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between font-sans text-[10px] uppercase tracking-[0.24em] text-[#1A1410]/45">
          <span>Dubai</span>
          <span>The atelier</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. THE CASE : the leopard vault, briefly */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto pl-16 md:pl-28 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img
              src={leopardBox}
              alt="Leopard velvet case"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-5 order-1 md:order-2 space-y-4">
          <Sparkles size={16} className="text-[#B8985F]" />
          <h3 className="font-serif text-2xl md:text-3xl text-[#1A1410] tracking-[-0.01em]">
            The case
          </h3>
          <p className="font-sans text-sm md:text-base text-[#1A1410]/75 leading-relaxed">
            Each pair ships in a leopard velvet case, with a numbered certificate.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CTA BACK TO COLLECTION */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-20 md:py-32 max-w-7xl mx-auto pl-16 md:pl-28 flex flex-wrap items-center justify-between gap-6">
        <Link
          href="/retail"
          className="group inline-flex items-center gap-3 bg-[#1A1410] text-[#F4F1E8] hover:bg-[#6B1A2C] transition-colors duration-300 pl-6 pr-2.5 py-3 rounded-full font-sans text-[11px] uppercase tracking-[0.22em]"
        >
          <span>View The 100</span>
          <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
            <ArrowDownRight size={13} />
          </span>
        </Link>
      </section>
    </main>
  );
}
