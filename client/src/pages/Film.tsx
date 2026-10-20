/**
 * FILM
 * Campaign and editorial gallery: one lead film, a plates section
 * (cinematic stills with lightbox), and credits.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight, Subtitles } from "lucide-react";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";

/* ------------------------------------------------------------------ */
/*  Film metadata                                                      */
/* ------------------------------------------------------------------ */

interface Plate {
  src: string;
  alt: string;
  caption: string;
  no: string;
}

const PLATES: Plate[] = [
  {
    src: "/manus-storage/cheeta-leopard-vault-box.jpg",
    alt: "The leopard-print velvet case, photographed in the Dubai atelier",
    caption: "The case : hand-stitched velvet, hallmarked brass clasp",
    no: "I",
  },
  {
    src: "/manus-storage/cheeta-dubai-atelier_0dde518b.png",
    alt: "Eisa Saidi at the workbench in the Dubai atelier",
    caption: "The atelier : Al Quoz, 04:12 GST",
    no: "II",
  },
  {
    src: "/manus-storage/cheeta-room-1910_79d40eca.png",
    alt: "Interior of a private salon, low light, brushed gold",
    caption: "Salon I : velvets & brass",
    no: "III",
  },
  {
    src: "/manus-storage/cheeta-presence-eye_09963203.png",
    alt: "Close-up of the gold frame on the bridge of the nose",
    caption: "Presence I : the bridge",
    no: "IV",
  },
  {
    src: "/manus-storage/cheeta-dubai-private-salon.jpg",
    alt: "The private salon in low light, the leopard case on the table",
    caption: "Salon II : by appointment",
    no: "V",
  },
  {
    src: "/manus-storage/cheeta-presence-tail_5c764f52.png",
    alt: "Close-up of the brushed gold temple tip",
    caption: "Presence II : the temple tip",
    no: "VI",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Film() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Pause when leaving the tab : keeps browser autoplay policies happy
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && videoRef.current) videoRef.current.pause();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i === null ? null : (i + 1) % PLATES.length));
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i === null ? null : (i - 1 + PLATES.length) % PLATES.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIdx]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const fmt = (s: number) => {
    if (!isFinite(s) || s <= 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <main className="relative w-full min-h-screen bg-[#1A1410] text-[#F4F1E8] overflow-hidden">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark />

      {/* ============================================================== */}
      {/*  HERO : video player                                              */}
      {/* ============================================================== */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster="/manus-storage/cheeta-vintage-revival-entry_1f1afeed.mp4"
          playsInline
          muted={isMuted}
          onTimeUpdate={(e) => {
            const t = e.currentTarget;
            setProgress(t.currentTime / (t.duration || 1));
          }}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
        >
          <source
            src="/manus-storage/cheeta-vintage-revival-entry_1f1afeed.mp4"
            type="video/mp4"
          />
          <track kind="captions" srcLang="en" label="English captions" default={false} />
        </video>

        {/* Edge vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.65)_100%)]" />
        {/* Top + bottom scrims for the control bar and the title */}
        <div className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none bg-gradient-to-b from-black/75 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none bg-gradient-to-t from-black/85 to-transparent" />

        {/* Top-left eyebrow */}
        <div className="absolute top-8 left-8 md:top-10 md:left-12 z-20 pointer-events-none">
          <span className="font-sans text-[10px] uppercase tracking-[0.42em] text-white/65">
            Film · 01
          </span>
        </div>

        {/* Bottom-left title block */}
        <div className="absolute bottom-24 md:bottom-28 left-8 md:left-12 z-20 max-w-2xl pointer-events-none">
          <h1
            className="font-serif text-3xl md:text-5xl text-white leading-[1.05] tracking-tight italic"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7)" }}
          >
            The First Run
          </h1>
          <p
            className="mt-3 font-sans text-[10px] md:text-xs uppercase tracking-[0.32em] text-white/70"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
          >
            A short film by the house · 02:14
          </p>
        </div>

        {/* Center play button (only when paused) */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              key="play-overlay"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={togglePlay}
              className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group focus:outline-none"
              aria-label="Play film"
            >
              <span className="flex flex-col items-center gap-5">
                <span className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/70 group-hover:border-white group-hover:bg-white/10 transition-colors flex items-center justify-center backdrop-blur-sm">
                  <Play size={28} className="text-white ml-1" strokeWidth={1.4} />
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.42em] text-white/85">
                  Play the film
                </span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom control bar */}
        <div className="absolute bottom-6 md:bottom-8 left-8 right-8 md:left-12 md:right-12 z-20 flex items-center gap-4 md:gap-6">
          <button
            onClick={togglePlay}
            className="text-white/85 hover:text-white transition-colors p-1 cursor-pointer focus:outline-none"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={toggleMute}
            className="text-white/85 hover:text-white transition-colors p-1 cursor-pointer focus:outline-none"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Progress bar */}
          <div className="flex-1 h-px bg-white/20 relative">
            <div
              className="absolute top-0 left-0 h-px bg-[#B8985F]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <span className="font-sans text-[10px] tabular-nums tracking-[0.2em] text-white/65">
            {fmt(progress * duration)} / {fmt(duration)}
          </span>

          <button
            onClick={() => setCaptionsOn((c) => !c)}
            className={`transition-colors p-1 cursor-pointer focus:outline-none ${
              captionsOn ? "text-[#B8985F]" : "text-white/55 hover:text-white"
            }`}
            aria-label="Toggle captions"
            aria-pressed={captionsOn}
          >
            <Subtitles size={16} />
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/*  PLATES : gallery with lightbox                                  */}
      {/* ============================================================== */}
      <section className="relative w-full bg-[#100C0A] py-20 md:py-28 pl-0 md:pl-24 pr-6 md:pr-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16 pl-6 md:pl-0">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#B8985F]/85">
              Plates · I - VI
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#F4F1E8] tracking-tight leading-[1.05] max-w-2xl">
              Stills from the inaugural shoot.
            </h2>
          </div>
          <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#F4F1E8]/45 shrink-0">
            Click any plate to enter the lightbox
          </span>
        </div>

        {/* Asymmetric plates grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 pl-6 md:pl-0">
          {PLATES.map((p, i) => {
            // Asymmetric: first plate big, alternating rhythm
            const span = i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5";
            const aspect = i === 0 ? "aspect-[4/5]" : "aspect-[4/3]";
            return (
              <button
                key={p.no}
                onClick={() => setLightboxIdx(i)}
                className={`group relative ${span} ${aspect} bg-[#1A1410] overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B8985F]`}
                aria-label={`Open plate ${p.no} in lightbox`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

                {/* Plate number, top-left */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-0.5">
                  <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-white/55">
                    Plate
                  </span>
                  <span className="font-serif text-2xl text-white/95 leading-none">
                    {p.no}
                  </span>
                </div>

                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#B8985F]/95">
                    {p.caption}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/*  CREDITS                                                          */}
      {/* ============================================================== */}
      <section className="relative w-full bg-[#0A0807] py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <span className="block font-sans text-[10px] uppercase tracking-[0.4em] text-[#B8985F]/85 mb-8">
            Credits
          </span>
          <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
            {[
              ["Directed by", "the house"],
              ["Cinematography", "Dubai · Atelier"],
              ["Wardrobe", "Cheetah Jewelz : The 100"],
              ["Location", "Al Quoz, Dubai"],
              ["Music", "Original score, in-house"],
              ["Run time", "02:14"],
            ].map(([k, v]) => (
              <div key={k} className="pt-4">
                <dt className="font-sans text-[9px] uppercase tracking-[0.42em] text-[#F4F1E8]/40">
                  {k}
                </dt>
                <dd className="mt-1 font-serif text-base text-[#F4F1E8]/90">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-sans text-[10px] uppercase tracking-[0.32em] text-[#F4F1E8]/45">
            <span>© 2026 · Cheetah Jewelz, Dubai</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/*  LIGHTBOX                                                         */}
      {/* ============================================================== */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-6 right-6 z-10 text-white/70 hover:text-white p-2 cursor-pointer focus:outline-none"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((i) => (i === null ? null : (i - 1 + PLATES.length) % PLATES.length));
              }}
              className="absolute left-4 md:left-8 z-10 text-white/70 hover:text-white p-3 cursor-pointer focus:outline-none"
              aria-label="Previous plate"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((i) => (i === null ? null : (i + 1) % PLATES.length));
              }}
              className="absolute right-4 md:right-8 z-10 text-white/70 hover:text-white p-3 cursor-pointer focus:outline-none"
              aria-label="Next plate"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full flex flex-col items-center gap-4"
            >
              <img
                src={PLATES[lightboxIdx].src}
                alt={PLATES[lightboxIdx].alt}
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
              <div className="text-center">
                <span className="font-sans text-[9px] uppercase tracking-[0.42em] text-white/55">
                  Plate {PLATES[lightboxIdx].no} of {PLATES.length.toString().padStart(2, "0")}
                </span>
                <p className="mt-1 font-serif text-sm text-white/85 italic">
                  {PLATES[lightboxIdx].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
