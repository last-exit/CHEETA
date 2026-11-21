/**
 * LEGAL / EDITORIAL PAGE LAYOUT
 * Shared chrome for shipping, returns, care, privacy, terms,
 * accessibility, and contact.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { InformationFooter } from "@/components/HouseFooter";
import { collectionHeading } from "@/lib/collectionPresentation";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";

export interface LegalPageProps {
  title: string;
  intro?: string;
  children: React.ReactNode;
  lastUpdated?: string;
}

export default function LegalPage({
  title,
  intro,
  children,
  lastUpdated = "September 2026",
}: LegalPageProps) {
  return (
    <main className="legal-page relative w-full min-h-screen bg-[var(--house-paper)] text-[#2A241D] selection:bg-[#2A241D] selection:text-[#FAFAF7] pt-20 md:pt-24 overflow-hidden">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark={false} />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />

      <article className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="house-kicker mb-6">The house</p>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-serif normal-case text-4xl md:text-5xl lg:text-6xl text-[#2A241D] leading-[1.05] tracking-tight"
        >
          {collectionHeading(title)}
        </motion.h1>

        {/* Intro */}
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="mt-6 md:mt-8 font-serif italic text-lg md:text-xl text-[#2A241D]/75 leading-relaxed max-w-2xl"
          >
            {intro}
          </motion.p>
        )}

        <hr className="house-rule mt-10 md:mt-12" />

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
        <div className="legal-note mt-20 md:mt-24 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[#6A635D] font-sans">
          <span>Last updated {lastUpdated}</span>
          <Link href="/" className="hover:text-[#6B1A2C] transition-colors">
            Return to the house
          </Link>
        </div>
      </article>
      <InformationFooter />
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
        <span className="font-serif italic text-[#6B1A2C] shrink-0">
          {no}
        </span>
        <h2 className="font-serif text-2xl md:text-3xl text-[#2A241D] tracking-tight leading-tight">
          {collectionHeading(title)}
        </h2>
      </header>
      <div className="space-y-3 font-sans text-base leading-[1.7] text-[#2A241D]/80">
        {children}
      </div>
    </section>
  );
}

export function List({ items }: { items: { lead: string; rest: string }[] }) {
  return (
    <ul className="space-y-2 pl-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="font-serif text-[#6B1A2C] shrink-0 mt-0.5">·</span>
          <span>
            <strong className="text-[#2A241D] font-medium">{it.lead}</strong>
            {it.rest && <> {it.rest}</>}
          </span>
        </li>
      ))}
    </ul>
  );
}
