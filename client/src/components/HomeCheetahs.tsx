import { Link } from "wouter";
import FlowerBed from "./FlowerBed";
import Lace from "./Lace";
import CheetahCrest from "./CheetahCrest";

/**
 * The house's namesake, in the art of the court it borrows from: the Mughal
 * emperors hunted with trained cheetahs and had them painted in the
 * chronicles of their reigns.
 */
export default function HomeCheetahs() {
  return (
    <section className="home-cheetahs" aria-labelledby="home-cheetahs-title">
      <div className="home-cheetahs-inner">
        <figure className="home-cheetahs-folio">
          <span className="folio-mount">
            <img
              src="/mughal/akbar-cheetahs.webp"
              alt="A page from the Akbarnama: the emperor's hunt in the hills, with elephants above, and a cheetah springing on a deer at the left."
              width="804"
              height="1262"
              loading="lazy"
              decoding="async"
            />
          </span>
          <figcaption>From the Akbarnama, about 1604</figcaption>
        </figure>
        <div className="home-cheetahs-text" data-editorial-reveal>
          <CheetahCrest className="home-cheetahs-crest" />
          <p className="panel-kicker">The cheetah</p>
          <h2 id="home-cheetahs-title" className="panel-title">
            Kept by <em>emperors.</em>
          </h2>
          <p className="home-cheetahs-copy">
            The Mughal emperors hunted with trained cheetahs, and had them
            painted in the chronicles of their reigns. On this page of the
            Akbarnama, one springs from the grass at Akbar’s hunt.
          </p>
          <p className="home-cheetahs-copy">
            The house carries the same name. “The Cheetah” was Eisa Saidi’s
            name in the ring.
          </p>
          <Link href="/founder" className="house-cartouche">
            Meet Eisa Saidi
          </Link>
        </div>
      </div>
      <Lace hang="down" className="lace-below" />
      <FlowerBed place="inside" className="home-cheetahs-bed" />
    </section>
  );
}
