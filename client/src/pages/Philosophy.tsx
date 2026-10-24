import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import CampaignVideo from "@/components/CampaignVideo";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import { HouseFooter } from "@/components/HouseFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import "./Philosophy.css";

/** A single native-scroll reveal; the photograph remains intact and unfiltered. */
function InstinctChapter() {
  const section = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const root = section.current;
    const visual = image.current;
    if (!root || !visual) return;
    let frame = 0;
    let visible = false;
    const render = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight))
      );
      const staticView =
        reduced || window.innerWidth < 768 || window.innerHeight < 600;
      visual.style.clipPath = staticView
        ? "none"
        : `inset(${22 * (1 - progress)}% ${18 * (1 - progress)}%)`;
    };
    const schedule = () => {
      if (visible && !document.hidden && !frame)
        frame = window.requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(root);
    const resize = new ResizeObserver(schedule);
    resize.observe(root);
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [reduced]);

  return (
    <section
      ref={section}
      className="philosophy-instinct"
      aria-labelledby="instinct-title"
    >
      <div className="philosophy-instinct-stage house-container">
        <div className="philosophy-instinct-heading">
          <h2 id="instinct-title">A name earned in the ring.</h2>
        </div>
        <div ref={image} className="philosophy-gaze">
          <img
            src="/manus-storage/cheeta-gaze-landscape.jpg"
            alt="A close view of a cheetah’s amber eye"
            width="1200"
            height="896"
            loading="lazy"
            decoding="async"
            data-philosophy-dark
          />
        </div>
      </div>
    </section>
  );
}

export default function Philosophy() {
  const page = useRef<HTMLElement>(null);
  const [lightPaw, setLightPaw] = useState(false);
  const [lightMonogram, setLightMonogram] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let frame = 0;
    const sync = () => {
      frame = 0;
      const media = page.current?.querySelectorAll<HTMLElement>(
        "[data-philosophy-dark], .house-footer"
      );
      const overImage = (x: number, y: number) =>
        Array.from(media ?? []).some(item => {
          const rect = item.getBoundingClientRect();
          return (
            rect.left <= x &&
            rect.right >= x &&
            rect.top <= y &&
            rect.bottom >= y
          );
        });
      setLightPaw(overImage(window.innerWidth < 768 ? 40 : 64, 72));
      setLightMonogram(overImage(window.innerWidth / 2, 48));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <main ref={page} className="philosophy-page philosophy-editorial">
      <CheetahBar tone={lightPaw ? "light" : "dark"} />
      <HeaderWordmark dark={lightMonogram} />

      <header className="philosophy-opening house-container">
        <div className="philosophy-opening-copy">
          <h1>
            Diamonds
            <br />
            are made
            <br />
            in the <em>rough.</em>
          </h1>
        </div>
        <figure className="philosophy-founder">
          <img
            src="/philosophy/eisa-portrait.jpg"
            alt="Eisa Saidi, founder of Cheeta Jewels, in a still from his identity film"
            width="545"
            height="506"
            fetchPriority="high"
            data-philosophy-dark
          />
          <figcaption>Eisa Saidi, ceo</figcaption>
        </figure>
      </header>

      <section
        className="philosophy-origin house-container"
        aria-labelledby="individuality-title"
      >
        <ScrollReveal>
          <h2 id="individuality-title">
            What was mocked first
            <br />
            <em>was copied later.</em>
          </h2>
        </ScrollReveal>
      </section>

      <section
        className="philosophy-conversation house-container"
        aria-labelledby="conversation-title"
      >
        <ScrollReveal className="philosophy-film-heading">
          <h2 id="conversation-title">In his own words.</h2>
        </ScrollReveal>
        <div className="philosophy-film" data-philosophy-dark>
          <CampaignVideo
            src="/philosophy/identity-passage.mp4"
            poster="/philosophy/identity-film-poster.jpg"
            className="philosophy-film-media"
          />
        </div>
      </section>

      <InstinctChapter />

      <section
        className="philosophy-expression house-container"
        aria-labelledby="expression-title"
      >
        <ScrollReveal className="philosophy-expression-copy">
          <div>
            <h2 id="expression-title">
              Jewellery,
              <br />
              <em>in another form.</em>
            </h2>
          </div>
          <div className="philosophy-expression-note">
            <Link
              href="/collection/barrel"
              className="philosophy-campaign-link"
            >
              explore the collections{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
        <figure className="philosophy-expression-image">
          <img
            src="/stills/barrel-founder-wide.jpg"
            alt="Eisa wearing the octagonal eyewear on horseback in the Gun collection film"
            width="832"
            height="464"
            loading="lazy"
            decoding="async"
            data-philosophy-dark
          />
        </figure>
      </section>

      <HouseFooter />
    </main>
  );
}
