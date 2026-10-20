/**
 * PHILOSOPHY : Monograph & High Jewelry Archive
 * Pure luxury minimalism in GT Sectra Display & GT America.
 * Stripped of all unnecessary subtext, coordinates, and AI-like micro-labels.
 * Typography and photography on white with a subtle sculptural relief.
 */
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import PhilosophyRelief from "@/components/PhilosophyRelief";

const atelierImage = "/manus-storage/cheeta-dubai-atelier_0dde518b.png";
const necklaceImage = "/manus-storage/cheeta-atrium-necklace-bone.jpg";
const emeraldRing = "/manus-storage/cheeta-emerald-signet-bone.jpg";
const eyeImage = "/manus-storage/cheeta-gaze-landscape.jpg";
const leopardBox = "/manus-storage/cheeta-leopard-vault-box.jpg";

const chapters = [
  {
    num: "i",
    title: "the beginning",
    copy: "Raised beneath Dubai's skyline, Eisa Saidi built an instinct for style that never asked for permission. Grandeur without conviction is noise.",
  },
  {
    num: "ii",
    title: "the proof",
    copy: "The look that invited ridicule became influence. What was mocked first was copied later. True presence cannot be diluted.",
  },
  {
    num: "iii",
    title: "the house",
    copy: "Cheeta Jewels turns conviction into wearable art. Solid 18K gold, natural Colombian emeralds, and architectural mineral optics.",
  },
];

export default function Philosophy() {
  return (
    <main className="philosophy-page min-h-screen w-full text-[#2A241D] selection:bg-[#2A241D] selection:text-[#F9F6F0] overflow-x-hidden relative">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark={false} />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />
      <PhilosophyRelief />


      {/* ========================================================================= */}
      {/* 1. MONOGRAPH HERO: "dubai born."                                         */}
      {/* ========================================================================= */}
      <section className="relative z-10 px-6 md:px-20 pt-32 md:pt-44 pb-16 md:pb-24 max-w-6xl mx-auto pl-16 md:pl-28 select-none">
        {/* Monumental Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-serif capitalize text-[clamp(4.2rem,13vw,11.5rem)] leading-[0.82] tracking-[-0.04em] text-[#2A241D]"
        >
          dubai<br />
          born<span className="text-[#D4AF37]">.</span>
        </motion.h1>

        <p className="mt-10 md:mt-12 max-w-[48ch] font-sans text-base md:text-lg leading-relaxed text-[#2A241D]/85">
          Born in Dubai, Cheeta Jewels creates jewellery and eyewear shaped by Eisa Saidi’s instinct for individual style.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE FOUNDRY PHOTO : UNBOXED PURE PHOTOGRAPHY PLATE                     */}
      {/* ========================================================================= */}
      <section className="relative z-10 px-6 md:px-20 py-8 md:py-16 max-w-6xl mx-auto pl-16 md:pl-28 select-none">
        <div className="aspect-[16/9] w-full overflow-hidden bg-[#111112] shadow-[0_20px_45px_rgba(42,36,29,0.08)]">
          <img
            src={atelierImage}
            alt="Cheeta Jewels Foundry"
            className="h-full w-full object-cover filter contrast-[1.08] brightness-[0.92]"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THREE ESSAY CHAPTERS                                                   */}
      {/* ========================================================================= */}
      <section className="relative z-10 px-6 md:px-20 py-14 md:py-24 max-w-6xl mx-auto pl-16 md:pl-28 select-none">
        <div>
          {chapters.map((chap, idx) => (
            <motion.article
              key={chap.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-baseline"
            >
              <div className="md:col-span-2">
                <span className="font-serif lowercase text-3xl md:text-4xl text-[#D4AF37] font-normal leading-none">
                  {chap.num}
                </span>
              </div>
              <div className="md:col-span-4">
                <h2 className="font-serif capitalize text-2xl md:text-3xl text-[#2A241D] tracking-tight">
                  {chap.title}
                </h2>
              </div>
              <div className="md:col-span-6 font-sans text-base md:text-lg text-[#2A241D]/75 leading-relaxed">
                {chap.copy}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LEOPARD ARCHIVE & HIGH JEWELRY                                         */}
      {/* ========================================================================= */}
      <section className="relative z-10 px-6 md:px-20 py-16 md:py-28 max-w-6xl mx-auto pl-16 md:pl-28 select-none">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 md:mb-16">
          <div>
            <h2 className="font-serif capitalize text-3xl md:text-4xl lg:text-5xl text-[#2A241D] tracking-tight leading-[0.95]">
              the leopard archive
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-xs md:text-sm text-[#2A241D]/75 leading-relaxed">
              Inspired by 1980s power dressing and vintage Cartier archives, each piece is signed with solid gold hardware and delivered in handcrafted Italian leopard velvet.
            </p>
          </div>
        </div>

        {/* Plates: Atmosphere & The Vault */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start mb-20 md:mb-28">
          <div className="group">
            <div className="aspect-[4/3] overflow-hidden bg-[#0D0C0B] relative shadow-[0_16px_40px_rgba(42,36,29,0.06)]">
              <img
                src={eyeImage}
                alt="Cheetah Instinct Gaze"
                className="h-full w-full object-cover filter contrast-[1.06] brightness-95 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <span className="font-serif capitalize text-lg text-[#2A241D]">the gaze</span>
            </div>
          </div>

          <div className="group">
            <div className="aspect-[4/3] overflow-hidden bg-[#F2EDE4] relative shadow-[0_16px_40px_rgba(42,36,29,0.06)]">
              <img
                src={leopardBox}
                alt="Handcrafted Italian Leopard Velvet Box"
                className="h-full w-full object-cover filter contrast-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <span className="font-serif capitalize text-lg text-[#2A241D]">the velvet vault</span>
            </div>
          </div>
        </div>

        {/* Curated High Jewelry Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <article className="group">
            <div className="aspect-[4/3] relative overflow-hidden bg-[#F2EDE4] shadow-[0_16px_40px_rgba(42,36,29,0.06)]">
              <img
                src={emeraldRing}
                alt="The Emerald Signet"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex flex-col space-y-1">
              <h3 className="font-serif capitalize text-xl sm:text-2xl text-[#2A241D]">
                the emerald signet
              </h3>
              <p className="font-sans lowercase text-xs text-[#2A241D]/60 tracking-wider">
                4.20 ct muzo emerald · 18k gold
              </p>
            </div>
          </article>

          <article className="group">
            <div className="aspect-[4/3] relative overflow-hidden bg-[#F2EDE4] shadow-[0_16px_40px_rgba(42,36,29,0.06)]">
              <img
                src={necklaceImage}
                alt="The Atrium Gold Collar"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex flex-col space-y-1">
              <h3 className="font-serif capitalize text-xl sm:text-2xl text-[#2A241D]">
                the atrium gold collar
              </h3>
              <p className="font-sans lowercase text-xs text-[#2A241D]/60 tracking-wider">
                3.45 ct pavé diamonds · 18k gold
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CLOSING FOOTER                                                         */}
      {/* ========================================================================= */}
      <section className="relative z-10 overflow-hidden bg-[#141211] text-[#F9F6F0] px-6 md:px-20 py-20 md:py-28 pl-16 md:pl-28">
        <div className="max-w-6xl mx-auto flex flex-col justify-between gap-12">
          <h2 className="font-serif capitalize text-[clamp(4.2rem,10vw,10.5rem)] leading-[0.78] tracking-[-0.04em] text-white">
            icon<br />
            livin<span className="text-[#D4AF37]">’</span>.
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 ">
            <span className="font-serif lowercase text-base sm:text-lg text-white/70">
              "presence speaks before words do."
            </span>

            <div className="flex items-center gap-8">
              <Link
                href="/retail"
                className="font-sans lowercase text-xs tracking-wider text-[#F9F6F0] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
              >
                <span>explore catalogue</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
