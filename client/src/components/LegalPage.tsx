/**
 * LEGAL / EDITORIAL PAGE LAYOUT
 * Shared chrome for shipping, returns, care, privacy, terms,
 * accessibility, and contact.
 */
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";

export interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  lastUpdated?: string;
}

export default function LegalPage({
  eyebrow,
  title,
  intro,
  children,
  lastUpdated = "September 2026",
}: LegalPageProps) {
  // Reset scroll on mount so a deep link lands at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <main className="legal-page relative w-full min-h-screen bg-[#F4F1E8] text-[#1A1410] selection:bg-[#1A1410] selection:text-[#F4F1E8] pt-20 md:pt-24 overflow-hidden">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark={false} />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />


      <article className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="block font-sans lowercase text-[11px] tracking-wider text-[#6B1A2C] mb-6"
        >
          {eyebrow}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-serif capitalize text-4xl md:text-5xl lg:text-6xl text-[#1A1410] leading-[1.05] tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Intro */}
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="mt-6 md:mt-8 font-serif text-lg md:text-xl text-[#1A1410]/75 leading-relaxed max-w-2xl"
          >
            {intro}
          </motion.p>
        )}

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-10 md:mt-12 space-y-12"
        >
          {children}
        </motion.div>

        {/* Footer note */}
        <div className="mt-20 md:mt-24 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[#1A1410]/50 font-sans text-[10px] uppercase tracking-[0.32em]">
          <span>Last updated · {lastUpdated}</span>
          <Link href="/" className="hover:text-[#6B1A2C] transition-colors">
            Return to the house →
          </Link>
        </div>
      </article>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable section blocks for legal pages                            */
/* ------------------------------------------------------------------ */

export function Section({
  no,
  title,
  children,
}: {
  no: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <header className="flex items-baseline gap-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#6B1A2C] shrink-0">
          {no}
        </span>
        <h2 className="font-serif text-2xl md:text-3xl text-[#1A1410] tracking-tight leading-tight">
          {title}
        </h2>
      </header>
      <div className="space-y-3 font-sans text-[15px] leading-[1.7] text-[#1A1410]/80">
        {children}
      </div>
    </section>
  );
}

export function List({
  items,
}: {
  items: { lead: string; rest: string }[];
}) {
  return (
    <ul className="space-y-2 pl-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="font-serif text-[#6B1A2C] shrink-0 mt-0.5">·</span>
          <span>
            <strong className="text-[#1A1410] font-medium">{it.lead}</strong>
            {it.rest && <> {it.rest}</>}
          </span>
        </li>
      ))}
    </ul>
  );
}
