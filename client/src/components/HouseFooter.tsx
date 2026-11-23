import { Link } from "wouter";
import FlowerBed from "./FlowerBed";
import Lace from "./Lace";
import CheetahCrest from "./CheetahCrest";


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
 * The close of every page: the house cheetah on its vine, the signature,
 * two quiet links and the copyright, on near-black.
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
          <FlowerBed place="above" />
        </>
      )}
      <div className="house-container house-footer-inner">
        <CheetahCrest />
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
