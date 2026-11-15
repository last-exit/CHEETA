import { useState, useEffect, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

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
    <div className="min-h-screen w-full bg-[#FFFFFF] text-[#1A1410] flex flex-col justify-between items-center px-8 py-10 sm:px-12 sm:py-12 relative overflow-hidden select-none">
      {/* Subtle Architectural Ambient Ground */}

      {/* Spacer to push card to true center without top bar */}
      <div className="w-full h-4" />

      {/* Center Gatekeeper Form Card */}
      <main className="w-full max-w-md my-auto flex flex-col items-center text-center relative z-10">
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
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1410] mb-3">
          Private viewing
        </h1>
        <p className="font-sans text-base text-[#6A635D] max-w-xs leading-relaxed mb-8">
          Enter your passcode to view the site.
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
              placeholder="Passcode"
              aria-label="Passcode"
              autoFocus
              className={`w-full bg-[#FAF9F5] border ${
                error
                  ? "border-[#B22222] text-[#B22222]"
                  : "border-[#DCD6CA] text-[#1A1410] focus:border-[#1A1410]"
              } py-3.5 px-4 text-center font-sans text-base placeholder:text-[#6A635D] outline-none transition-all duration-300 rounded-none shadow-sm`}
            />
          </div>

          {error && (
            <p role="alert" className="text-[length:var(--house-label-size)] font-sans text-[#B22222]">
              Incorrect passcode. Try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#1A1410] hover:bg-[#000000] text-[#FFFFFF] font-sans text-base py-3.5 px-6 flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#FFFFFF]" />
          </button>
        </form>

      </main>

      {/* Pure Minimalist Bottom-Left Copyright */}
      <footer className="w-full flex justify-start text-[length:var(--house-label-size)] font-sans text-[#6A635D] relative z-10">
        <span>© 2026 Cheeta Jewels</span>
      </footer>
    </div>
  );
}
