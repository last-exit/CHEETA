import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function HomeMasquerade() {
  return (
    <section
      id="masquerade"
      className="home-masquerade"
      aria-labelledby="home-masquerade-title"
    >
      <div className="home-masquerade-stage house-container">
        {/* Editorial Header */}
        <div className="home-masquerade-header" data-editorial-reveal>
          <div className="home-masquerade-eyebrow">
            <span className="home-masquerade-badge-dot" />
            <span>Atelier Archive · Chapter 02</span>
          </div>
          <h2 id="home-masquerade-title" className="home-masquerade-heading">
            <em>The</em> Masquerade
          </h2>
          <p className="home-masquerade-subheading">
            Obsidian Openwork & Sculpted Titanium · Limited Venetian Atelier Series
          </p>
        </div>

        {/* Curated Gallery Exhibition Canvas */}
        <Link
          href="/collection/masquerade"
          className="home-masquerade-feature"
          aria-label="Explore The Masquerade campaign"
        >
          <div className="home-masquerade-grid">
            {/* Primary Frame: Candlelit Palazzo Campaign Portrait */}
            <div className="home-masquerade-frame home-masquerade-frame-primary">
              <img
                src="/home/masquerade-campaign.webp"
                alt="A woman wearing black openwork eyewear in a candlelit palazzo"
                width="1920"
                height="1080"
                loading="lazy"
                decoding="async"
              />
              <div className="home-masquerade-frame-tag">
                Palazzo Nocturne
              </div>
            </div>

            {/* Companion Frame: Sun-Drenched Architectural Gallery Sculpture */}
            <div className="home-masquerade-frame home-masquerade-frame-secondary">
              <img
                src="/campaigns/masquerade/exhibition-study-v1.webp"
                alt="Architectural openwork eyewear sculpture inside a sunlit white gallery"
                width="1920"
                height="1080"
                loading="lazy"
                decoding="async"
              />
              <div className="home-masquerade-frame-tag">
                Openwork Study
              </div>
            </div>
          </div>

          {/* Action Gateway & Archival Specs */}
          <div className="home-masquerade-footer">
            <div className="home-masquerade-specs">
              <span>Hand-Carved Titanium Openwork</span>
              <span className="home-masquerade-divider">·</span>
              <span>Blackout Onyx Mineral Crystal</span>
              <span className="home-masquerade-divider">·</span>
              <span>Limited to 50 Editions</span>
            </div>
            <span className="home-campaign-action home-masquerade-action">
              Explore The Masquerade
              <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
