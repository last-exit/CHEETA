/**
 * THE FOUNDER : Eisa Saidi
 * Real content from the Cheeta Jewels writup (2026).
 * Founder story, real quote, real inspirations, real product context.
 */
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { InformationFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";

const atelierImage = "/manus-storage/cheeta-dubai-atelier_0dde518b.png";
const leopardBox = "/manus-storage/cheeta-leopard-vault-box.jpg";

export default function Founder() {
  return (
    <main className="founder-page min-h-screen w-full bg-[#FAFAF7] text-[#2A241D] selection:bg-[#2A241D] selection:text-[#FAFAF7] overflow-x-hidden">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark={false} />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />

      {/* ========================================================================= */}
      {/* 1. FOUNDER OPEN */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 pt-24 md:pt-36 pb-16 md:pb-24 max-w-7xl mx-auto pl-16 md:pl-28">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif normal-case text-[clamp(3.2rem,10vw,9rem)] leading-[0.88] tracking-[-0.035em] text-[#2A241D]"
        >
          Eisa
          <br />
          Saidi
        </motion.h1>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE BRAIDS : the real origin moment */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-3xl mx-auto pl-16 md:pl-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.56 }}
          className="space-y-8"
        >
          <p className="font-serif text-2xl md:text-3xl leading-[1.35] text-[#2A241D] tracking-[-0.01em]">
            Eisa wore braids to school, despite the ridicule.
          </p>
          <p className="font-serif text-2xl md:text-3xl leading-[1.35] text-[#2A241D] tracking-[-0.01em]">
            The same look was later copied.
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
          transition={{ duration: 0.56 }}
          className="space-y-8"
        >
          <blockquote className="font-serif text-3xl md:text-4xl leading-[1.25] text-[#2A241D] tracking-[-0.015em]">
            "Feeling out of place never stopped me from being who I was. And
            neither should it stop anyone."
          </blockquote>
          <figcaption className="font-serif text-2xl text-[#2A241D]">
            Eisa Saidi
          </figcaption>
        </motion.figure>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE CHEETAH NICKNAME */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto pl-16 md:pl-28 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-4">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2A241D] tracking-[-0.02em]">
            A nickname from the ring.
          </h2>
        </div>
        <p className="md:col-span-8 font-sans text-base md:text-lg text-[#2A241D]/75 leading-relaxed max-w-2xl">
          Eisa’s boxing nickname became the name of the house.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 5. INSPIRATIONS : the real two */}
      {/* ========================================================================= */}
      <section>
        <h2 className="font-serif text-3xl md:text-4xl mb-8">
          A collecting heritage
        </h2>
        <p className="font-sans text-base leading-relaxed max-w-2xl">
          His father’s collection of antiques and paintings informs Cheeta.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE FIRST COLLECTION : the real product line */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-20 md:py-32 max-w-7xl mx-auto pl-16 md:pl-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <h2 className="font-serif text-3xl md:text-5xl text-[#2A241D] tracking-[-0.02em] leading-[1.05]">
              The first
              <br />
              collection.
            </h2>
          </div>
          <div className="md:col-span-5 font-sans text-base md:text-lg text-[#2A241D]/75 leading-relaxed">
            <p>Sculpted frames, coloured lenses and gemstone details.</p>
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
            alt="Cheeta Jewels Dubai atelier"
            className="h-full w-full object-cover filter  "
          />
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
          <h3 className="font-serif text-2xl md:text-3xl text-[#2A241D] tracking-[-0.01em]">
            The case
          </h3>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CTA BACK TO COLLECTION */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-20 md:py-32 max-w-7xl mx-auto pl-16 md:pl-28 flex flex-wrap items-center justify-between gap-6">
        <Link href="/retail" className="founder-action">
          view the collection <ArrowDownRight size={16} />
        </Link>
      </section>
      <InformationFooter />
    </main>
  );
}
