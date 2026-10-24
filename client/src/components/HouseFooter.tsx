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
  return (
    <footer className="information-footer house-container">
      <InformationLinks />
    </footer>
  );
}

export function HouseFooter() {
  return (
    <footer className="house-footer">
      <div className="house-container">
        <h2>
          Icon
          <br />
          livin’.
        </h2>
        <InformationLinks />
      </div>
    </footer>
  );
}
