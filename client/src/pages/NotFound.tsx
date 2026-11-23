import { Link } from "wouter";
import Ornament from "@/components/Ornament";
import ArchNiche from "@/components/ArchNiche";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { InformationFooter } from "@/components/HouseFooter";
import "./NotFound.css";

/**
 * A room nobody was meant to find: one masked guest in an arch, watching
 * from the dark by candlelight, and the way back to the house.
 */
export default function NotFound() {
  return (
    <main className="not-found-page">
      <CheetahBar tone="light" />
      <HeaderWordmark dark />
      <section className="not-found-room" aria-labelledby="not-found-title">
        <div className="not-found-inner house-container">
          <ArchNiche src="/stills/masquerade-still-1.jpg" className="not-found-guest" />
          <div className="not-found-text">
            <Ornament className="page-ornament not-found-ornament" />
            <p className="house-kicker">Page not found</p>
            <h1 id="not-found-title">
              You were not meant <em>to find this room.</em>
            </h1>
            <Link href="/" className="house-cartouche" data-tone="gold">
              Return to the house
            </Link>
          </div>
        </div>
        <span className="house-flicker" aria-hidden="true" />
        <span className="house-vignette" aria-hidden="true" />
      </section>
      <InformationFooter lace={false} />
    </main>
  );
}
