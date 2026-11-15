import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { InformationFooter } from "@/components/HouseFooter";

export default function NotFound() {
  return (
    <main className="min-h-svh flex flex-col bg-[#FAFAF7] text-[#2A241D]">
      <CheetahBar />
      <HeaderWordmark />
      <div className="house-container flex flex-1 flex-col items-start justify-center gap-6 py-32">
        <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight">
          Page not found
        </h1>
        <Link href="/" className="inline-flex min-h-11 items-center gap-3">
          Back to Cheeta Jewels
          <ArrowUpRight size={18} strokeWidth={1.25} aria-hidden="true" />
        </Link>
      </div>
      <InformationFooter />
    </main>
  );
}
