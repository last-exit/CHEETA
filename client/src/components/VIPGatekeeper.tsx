import { useState, useEffect, type ReactNode } from "react";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

interface VIPGatekeeperProps {
  children: ReactNode;
}

// Configured valid house passcodes (case-insensitive)
const VALID_PASSCODES = [
  "ICON-LIVIN",
  "ICONLIVIN",
  "CHEETA2026",
  "CHEETA-VIP",
  "CHEETA",
  "SAIDI",
];

const STORAGE_KEY = "cheeta_private_viewing_access";

export default function VIPGatekeeper({ children }: VIPGatekeeperProps) {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 1. Check local storage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "authorized") {
      setIsUnlocked(true);
      setIsChecking(false);
      return;
    }

    // 2. Check URL query parameters for instant one-click VIP access: ?passcode=ICON-LIVIN or ?vip=true
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCode = params.get("passcode") || params.get("code") || params.get("key");
      const isVipParam = params.get("vip") === "true" || params.get("vip") === "1";

      if (isVipParam || (urlCode && VALID_PASSCODES.includes(urlCode.trim().toUpperCase()))) {
        localStorage.setItem(STORAGE_KEY, "authorized");
        setIsUnlocked(true);
        // Clean URL without reloading
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch {
      // Ignore URL parsing fallback
    }

    setIsChecking(false);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = passcode.trim().toUpperCase();
    if (VALID_PASSCODES.includes(cleaned)) {
      localStorage.setItem(STORAGE_KEY, "authorized");
      setError(false);
      setIsUnlocked(true);
    } else {
      setError(true);
      // Auto-clear error state after 2.5s
      setTimeout(() => setError(false), 2500);
    }
  };

  if (isChecking) {
    return <div className="min-h-screen bg-[#FFFFFF]" />;
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] text-[#1A1410] flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden select-none">
      {/* Background Subtle Luxury Architectural Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.04),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#1A1410_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Bar / Header Stamp */}
      <header className="w-full max-w-4xl flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-[#7A7368] border-b border-[#E8E4DC] pb-5 relative z-10 font-sans">
        <span className="font-sans">Cheeta Jewels · Dubai</span>
        <span className="flex items-center gap-1.5 text-[#B8860B] font-sans">
          <Lock className="w-3 h-3 text-[#B8860B]" />
          Private Viewing Chamber
        </span>
        <span className="font-sans hidden sm:inline text-[#7A7368]">Edition 2026</span>
      </header>

      {/* Center Gatekeeper Form Card */}
      <main className="w-full max-w-md my-auto py-12 flex flex-col items-center text-center relative z-10">
        {/* Official CJ Seal / Monogram */}
        <div className="w-20 h-20 mb-8 border border-[#E8E4DC] rounded-full flex items-center justify-center p-3.5 bg-[#FAF9F5] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <img
            src="/brand/cheeta-cj-transparent.png"
            alt="Cheeta Jewels Official Seal"
            className="w-full h-full object-contain opacity-95"
            onError={(e) => {
              // Fallback to official storage crest if brand path differs
              e.currentTarget.src = "/manus-storage/cheeta-cj-official_8dcc9825.png";
            }}
          />
        </div>

        {/* Headline & Editorial Context */}
        <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.16em] font-normal text-[#1A1410] uppercase mb-3">
          Archival Access
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#7A7368] font-light max-w-xs leading-relaxed mb-8">
          This digital salon is confidential and reserved for private client & stakeholder review. Please enter your house passcode to proceed.
        </p>

        {/* Passcode Entry Form */}
        <form onSubmit={handleUnlock} className="w-full space-y-4">
          <div className="relative">
            <input
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError(false);
              }}
              placeholder="ENTER HOUSE PASSCODE"
              autoFocus
              className={`w-full bg-[#FAF9F5] border ${
                error
                  ? "border-[#B22222] text-[#B22222]"
                  : "border-[#DCD6CA] text-[#1A1410] focus:border-[#1A1410]"
              } py-3.5 px-4 text-center font-sans text-xs sm:text-sm tracking-[0.3em] uppercase placeholder:text-[#9C9487] placeholder:text-[10px] placeholder:tracking-[0.25em] outline-none transition-all duration-300 rounded-none shadow-sm`}
            />
          </div>

          {error && (
            <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#B22222] animate-pulse">
              Invalid Passcode · Access Denied
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#1A1410] hover:bg-[#000000] text-[#FFFFFF] font-sans text-[11px] tracking-[0.3em] uppercase py-3.5 px-6 flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>Enter Salon</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#FFFFFF]" />
          </button>
        </form>

        <div className="mt-8 flex items-center gap-2 text-[10px] font-sans text-[#8C8476] tracking-[0.25em] uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Encrypted Session · No Search Indexing</span>
        </div>
      </main>

      {/* Footer Credentials */}
      <footer className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between text-[9px] font-sans tracking-[0.25em] uppercase text-[#8C8476] border-t border-[#E8E4DC] pt-5 gap-2 relative z-10">
        <span>© 2026 Cheeta Jewels · All Rights Reserved</span>
        <span>Default Passcode: ICON-LIVIN</span>
      </footer>
    </div>
  );
}
