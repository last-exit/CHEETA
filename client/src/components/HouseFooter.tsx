import { Link } from "wouter";

export function InformationLinks() {
  return (
    <nav className="information-links" aria-label="Information">
      <Link href="/privacy">privacy policy</Link>
      <Link href="/contact">contact</Link>
    </nav>
  );
}

export function InformationFooter() {
  return <HouseFooter compact />;
}

export function HouseFooter({
  inverse = false,
  compact = false,
}: {
  inverse?: boolean;
  compact?: boolean;
}) {
  return (
    <footer className={compact ? "information-footer" : "house-footer"}>
      <div className="house-container house-footer-inner">
        <Link
          href="/"
          className="house-footer-signature"
          aria-label="Cheeta Jewels home"
        >
          <img
            src={inverse ? "/brand/icon-livin-white.png" : "/brand/icon-livin-black.png"}
            width="1024"
            height="258"
            alt="Icon livin’."
            loading="lazy"
            decoding="async"
          />
        </Link>
        <InformationLinks />
      </div>
    </footer>
  );
}
