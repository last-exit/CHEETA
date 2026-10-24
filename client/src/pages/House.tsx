/**
 * Origin dossier: Dubai-born, editorially restrained, and centered on Eisa Saidi's living-icon conviction.
 */
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { InformationFooter } from "@/components/HouseFooter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";

const mark = "/brand/cheeta-cj-transparent.png";
const atelierImage = "/manus-storage/cheeta-dubai-atelier_0dde518b.png";
const necklaceImage = "/manus-storage/cheeta-necklace-atrium_e7928040.png";

const chapters = [
  [
    "01",
    "the beginning",
    "Eisa Saidi’s own approach to style, formed in Dubai.",
  ],
  ["02", "the proof", "What was mocked first was copied later."],
  [
    "03",
    "the house",
    "Individuality, expressed through jewellery and eyewear.",
  ],
];

export default function House() {
  return (
    <main className="house-page relative overflow-hidden bg-[#FAFAF7] text-[#2A241D]">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark={false} />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />

      <section className="house-hero px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:px-11 lg:pb-32 lg:pt-36">
        <div className="mx-auto max-w-[1680px] pt-5">
          <img
            src={mark}
            alt="Cheeta Jewels CJ monogram"
            className="house-transition-seal"
          />
          <motion.h1
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 font-serif text-[clamp(5.7rem,18vw,23rem)] leading-[0.69] tracking-[-0.078em]"
          >
            Dubai
            <br />
            born<span className="text-[#6B1A2C]">.</span>
          </motion.h1>
          <div className="mt-16 lg:mt-24">
            <p className="max-w-[720px] font-sans text-[clamp(0.88rem,1.35vw,1.22rem)] lowercase leading-[1.65] tracking-[0.06em] text-[#2A241D]/75">
              A personal point of view, by Eisa Saidi.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#2A241D] px-5 py-20 text-[#FAFAF7] sm:px-8 sm:py-28 lg:px-11 lg:py-40">
        <div className="mx-auto max-w-[1680px]">
          <div className="founder-grid pt-5">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="mt-7 font-serif text-[clamp(4rem,8vw,10.5rem)] leading-[0.75] tracking-[-0.07em]">
                  Eisa
                  <br />
                  Saidi
                </h2>
              </div>
              <div className="mt-10 max-w-[278px] text-[15px] leading-[1.6] text-[#FAFAF7]/72 lg:mt-0">
                <p>Personal style, expressed through eyewear and jewellery.</p>
              </div>
            </div>
            <figure className="founder-portrait-frame relative overflow-hidden bg-[#252a25]">
              <img
                src={atelierImage}
                alt="Architectural Cheeta Jewels atelier in Dubai"
                className="h-full w-full object-cover opacity-60"
              />
              <div className="founder-portrait-overlay">
                <img
                  src={mark}
                  alt=""
                  className="h-12 w-12 object-contain brightness-0 invert"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-11 lg:py-40">
        <div className="mx-auto max-w-[1680px]">
          <div className="pt-5">
            <p className="max-w-[800px] font-serif text-[clamp(3.2rem,7vw,9rem)] leading-[0.8] tracking-[-0.068em]">
              Jewellery and
              <br />
              eyewear.
            </p>
          </div>
          <div className="chapter-list mt-16 lg:mt-24">
            {chapters.map(([number, title, copy]) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55 }}
                className="chapter-row"
              >
                <span className="font-sans text-[11px] text-[#6B1A2C]">
                  {number} / 03
                </span>
                <h3 className="font-serif text-[clamp(2.8rem,5.5vw,7rem)] leading-[0.82] tracking-[-0.06em]">
                  {title}
                </h3>
                <p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#d8d5cb] px-5 py-20 sm:px-8 sm:py-28 lg:px-11 lg:py-40">
        <img
          src={necklaceImage}
          alt="Gold and emerald Cheeta object"
          className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-30 mix-blend-multiply lg:w-1/2"
        />
        <div className="relative mx-auto flex max-w-[1680px] flex-col justify-between gap-16 pt-5 lg:min-h-[52vh]">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 className="font-serif text-[clamp(5rem,12vw,16rem)] leading-[0.69] tracking-[-0.077em]">
              Icon
              <br />
              livin’.
            </h2>
            <div>
              <Link
                href="/philosophy"
                className="archive-button mt-8 max-w-[330px]"
              >
                <span>Read the philosophy</span>
                <ArrowDownRight size={16} strokeWidth={1.4} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#FAFAF7] px-5 py-7 sm:px-8 lg:px-11">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between pt-5 font-sans text-[10px] lowercase tracking-[0.16em] text-[#2A241D]/55">
          <Link
            href="/retail"
            className="magnetic-link flex items-center gap-2"
          >
            View the Gun Collection <ArrowUpRight size={13} />
          </Link>
        </div>
      </footer>
      <InformationFooter />
    </main>
  );
}
