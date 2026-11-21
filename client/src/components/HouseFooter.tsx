import { Link } from "wouter";
import Lace from "./Lace";

export function InformationLinks() {
  return (
    <nav className="information-links" aria-label="Information">
      <Link href="/privacy">Privacy policy</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}

export function InformationFooter({ lace = true }: { lace?: boolean }) {
  return <HouseFooter compact lace={lace} />;
}

/**
 * The close of every page: near-black, a gilt rule, the CJ struck in foil,
 * the house signature, and two quiet links.
 */
export function HouseFooter({
  compact = false,
  lace = true,
}: {
  /** The paper's lace edge and a fallen rose over the join; off after a dark room. */
  lace?: boolean;
  /** Kept for existing callers; the footer is always the dark close now. */
  inverse?: boolean;
  compact?: boolean;
}) {
  return (
    <footer className={compact ? "information-footer" : "house-footer"} data-lace={lace}>
      {lace && (
        <>
          <Lace hang="down" />
          <img className="house-flower house-footer-flower" src="/mughal/flower-rose.webp" alt="" loading="lazy" decoding="async" />
        </>
      )}
      <div className="house-container house-footer-inner">
        <span className="house-seal" aria-hidden="true" />
        <Link href="/" className="house-footer-signature" aria-label="Cheeta Jewels home">
          <img
            src="/brand/icon-livin-white.png"
            width="1024"
            height="258"
            alt="Icon livin’."
            loading="lazy"
            decoding="async"
          />
        </Link>
        <InformationLinks />
        <p className="house-footer-fine">© {new Date().getFullYear()} Cheeta Jewels</p>
      </div>
    </footer>
  );
}
