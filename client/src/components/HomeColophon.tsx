import { Link } from "wouter";

/**
 * The closing room: a 17th-century Persianate album page hung on oxblood, the
 * house seal and the house line beside it, like a plate and its caption.
 */
export default function HomeColophon() {
  return (
    <section className="home-house" aria-labelledby="home-house-title">
      <div className="home-house-room" data-home-dark="true">
        <div className="home-house-inner" data-editorial-reveal>
          <figure className="home-house-folio">
            <img
              src="/mughal/night-gathering.webp"
              alt="An album page: a gathering of holy men at night, framed by borders of irises, tulips and roses."
              width="1200"
              height="1903"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              A Night-time Gathering, from the Davis Album, 1664–65.
              The Metropolitan Museum of Art. Public domain.
            </figcaption>
          </figure>
          <div className="home-house-text">
            <span className="home-house-seal" aria-hidden="true" />
            <h2 id="home-house-title" className="panel-title">
              Diamonds are made <em>in the rough.</em>
            </h2>
            <Link href="/philosophy" className="panel-button">
              Read the philosophy
            </Link>
          </div>
        </div>
      </div>
      <span className="house-flicker" aria-hidden="true" />
      <span className="house-vignette" data-soft aria-hidden="true" />
    </section>
  );
}
