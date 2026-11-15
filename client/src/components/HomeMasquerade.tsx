import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function HomeMasquerade() {
  return (
    <section
      id="masquerade"
      className="home-masquerade"
      aria-labelledby="home-masquerade-title"
      data-home-dark="true"
    >
      <div className="home-masquerade-feature">
        <div className="home-masquerade-picture">
          <img
            src="/home/masquerade-campaign.webp"
            alt="Masquerade campaign portrait with black openwork eyewear in candlelight"
            width="1920"
            height="1080"
            loading="lazy"
            decoding="async"
            data-editorial-camera
          />
        </div>
        <h2 id="home-masquerade-title" className="home-masquerade-heading">
          The <em>Masquerade</em>
        </h2>
        <Link
          href="/collection/masquerade"
          className="home-masquerade-link"
          aria-label="Explore The Masquerade campaign"
        >
          <span className="home-campaign-action">
            enter the campaign{" "}
            <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
