/**
 * NOT FOUND : Editorial 404
 * A quiet, considered page when a route is not in the public archive.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full bg-[#F4F1E8] text-[#1A1410] flex items-center justify-center px-6 py-32 select-none overflow-hidden">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark={false} />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />


      <div className="relative z-10 max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          {/* Editorial mark */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#6B1A2C]" />
            <span className="font-sans lowercase text-xs tracking-wider text-[#1A1410]/55">
              404 / archive notice
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif capitalize text-[clamp(3.2rem,9vw,7rem)] font-normal leading-[0.92] tracking-[-0.03em] text-[#1A1410]">
            an object <em className="not-italic text-[#6B1A2C]">undisclosed</em>.
          </h1>

          {/* Body */}
          <p className="font-sans text-base md:text-lg text-[#1A1410]/75 leading-relaxed max-w-xl">
            The address you followed is not in the public archive of Cheetah Jewelz. Some pieces are kept under private viewing only. Others simply no longer exist.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 bg-[#1A1410] text-[#F4F1E8] hover:bg-[#6B1A2C] transition-colors duration-300 pl-6 pr-2.5 py-2.5 rounded-full font-sans text-[11px] uppercase tracking-[0.2em]"
            >
              <span>Return to Entrance</span>
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight size={13} />
              </span>
            </Link>

            <Link
              href="/retail"
              className="group inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[#1A1410]/70 hover:text-[#1A1410] transition-colors"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              <span>Browse the Collection</span>
            </Link>
          </div>
        </motion.div>

        {/* Editorial footer */}
        <div className="mt-24 pt-8 flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.24em] text-[#1A1410]/40">
          <span>Cheetah Jewelz / Atelier Archive</span>
          <span>Dubai · Est. 2026</span>
        </div>
      </div>
    </main>
  );
}
