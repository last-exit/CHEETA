import { useEffect, useState } from "react";

const LINKS = [
  ["collection", "#collection"],
  ["masquerade", "#masquerade"],
  ["retail", "#retail"],
  ["philosophy", "#philosophy"],
];

// Appears only once the opening film has been scrolled past, so the hero is untouched.
export default function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.85);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-ink/85 px-6 py-4 backdrop-blur-md transition-all duration-700 md:px-14"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(-100%)",
        pointerEvents: show ? "auto" : "none",
        borderBottom: "1px solid rgba(217,189,130,0.18)",
      }}
    >
      <a href="#top" className="font-script text-3xl md:text-4xl leading-none text-bone ml-10 md:ml-12 hover:text-gilt transition-colors">
        Icon livin&rsquo;
      </a>
      <nav className="label hidden gap-9 text-ivory/70 md:flex">
        {LINKS.map(([t, h]) => (
          <a key={t} href={h} className="transition hover:text-gilt tracking-widest text-xs uppercase">
            {t}
          </a>
        ))}
      </nav>
    </header>
  );
}
