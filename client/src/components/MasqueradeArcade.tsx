import { Fragment, useEffect, useRef } from "react";
import "./MasqueradeArcade.css";

/** Campaign studies until the commissioned photographs arrive. */
const STUDIES = [
  { n: "01", alt: "The Masquerade in profile, the openwork rising beside the face against candlelight." },
  { n: "02", alt: "A guest in a black gown wearing the Masquerade in a palace gallery." },
  { n: "03", alt: "The openwork edge of the frame, close." },
  { n: "06", alt: "The Masquerade worn beneath carved arches." },
  { n: "10", alt: "A dark hall hung with red curtains." },
  { n: "05", alt: "The Masquerade facing the light." },
  { n: "11", alt: "Candlelight caught in the dark lens." },
  { n: "07", alt: "The Masquerade half turned, candles behind." },
  { n: "08", alt: "The frame at sculptural scale in a pale room." },
  { n: "09", alt: "The Masquerade, a smile and smoke." },
] as const;

/** The studies hang twice around the room, so the wall closes into a circle. */
const PLATES = [...STUDIES, ...STUDIES].map((study, i) => ({ ...study, key: `${study.n}-${i}`, copy: i >= STUDIES.length }));

/** The plate that opens into the whole screen. */
const HERO = PLATES.findIndex(plate => plate.n === "05");

/**
 * Scroll progress at which each beat happens. 1 is where the stage stops
 * holding still; the last beats play on while the page carries it away, so
 * the room is never left empty on screen.
 */
const BEAT = {
  open: [0.18, 0.3],
  type: [0.28, 0.35],
  typeOut: [0.42, 0.48],
  dissolve: [0.44, 0.52],
  bend: [0.45, 0.62],
  wordsOut: [0.98, 1.06],
  exit: [0.99, 1.2],
} as const;

/** Where the room rests when motion is reduced: gathered, every word in place. */
const REST = 0.9;

/** Each line at the centre of the room, and when it comes into focus. */
const LINES = [
  { at: 0.6, words: ["A", "mask,", "left", "open."] },
  { at: 0.66, words: ["To", "see,"] },
  { at: 0.69, words: ["and", "not", "be", "seen."] },
  { at: 0.75, words: ["Graphic", "in", "one", "light,"] },
  { at: 0.785, words: ["lost", "in", "the", "next."] },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, [a, b]: readonly [number, number]) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;
/** A fixed scatter, so each plate leaves at its own pace. */
const jitter = (i: number) => (Math.sin(i * 12.9898) * 43758.5453) % 1;

function Words({ line }: { line: (typeof LINES)[number] }) {
  return (
    <>
      {line.words.map((word, j) => (
        <Fragment key={word + j}>
          <span className="masq-ring-word" data-at={(line.at + j * 0.012).toFixed(3)}>
            {word}
          </span>
          {j < line.words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/**
 * The openwork chapter as a room of portraits. A row of plates slides past;
 * one opens into the whole screen with the collection's name across it, then
 * dissolves, and the row bends around the visitor into a round gallery, the
 * far wall in shadow and the near walls in light, turning as the page
 * scrolls. Scroll drives every beat, so it plays backwards as well as
 * forwards; the room follows the pointer a little and a plate steps out of
 * the wall when pointed at. As the page moves on, the plates leave past the
 * eye. With reduced motion the room is shown at rest with every word in place.
 */
export default function MasqueradeArcade() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = track.current;
    const stage = root?.querySelector<HTMLElement>(".masq-ring-stage");
    const room = root?.querySelector<HTMLElement>(".masq-ring-plates");
    const hero = root?.querySelector<HTMLElement>(".masq-ring-hero");
    const heroImg = hero?.querySelector<HTMLElement>("img");
    const heroType = root?.querySelector<HTMLElement>(".masq-ring-hero-type");
    if (!root || !stage || !room || !hero || !heroImg || !heroType) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".masq-ring-plate"));
    const shades = cards.map(card => card.querySelector<HTMLElement>(".masq-ring-shade"));
    const words = Array.from(root.querySelectorAll<HTMLElement>(".masq-ring-word"));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) root.dataset.still = "true";

    const N = cards.length;
    const lift = new Array<number>(N).fill(0);
    let hovered = -1;
    let W = 0;
    let H = 0;
    let cw = 0;
    let ch = 0;
    let P = 1500;
    let phone = false;
    let target = 0;
    let p = 0;
    let past = 1;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = 0;
    let visible = false;

    const measure = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      phone = W < 640;
      cw = phone ? Math.min(W * 0.6, H * 0.5 * 0.75) : Math.min(W * 0.235, H * 0.56 * 0.75);
      ch = cw / 0.75;
      P = phone ? Math.max(900, H * 1.15) : Math.max(1000, W * 0.8);
      stage.style.setProperty("--cw", `${cw.toFixed(1)}px`);
      stage.style.setProperty("--ch", `${ch.toFixed(1)}px`);
      stage.style.perspective = `${P.toFixed(0)}px`;
    };

    // Progress runs 0 to 1 while the stage holds still, and on past 1 while
    // the page carries it away, so the last beat plays as the next one arrives.
    const read = () => {
      const r = root.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      past = run > 0 ? 1 + window.innerHeight / run : 1;
      target = run > 0 ? clamp(-r.top / run, 0, past) : 0;
    };

    const draw = (t: number) => {
      const pitch = cw * 1.07;
      const stripY = -ch * 0.05;

      // The row slides until the chosen plate reaches the centre.
      const slide = 1 - clamp(p / BEAT.open[0]);
      const open = ease(seg(p, BEAT.open));
      const dissolve = seg(p, BEAT.dissolve);
      const k = ease(seg(p, BEAT.bend));
      const out = ease(seg(p, BEAT.exit));

      // In the room the plates hang larger and further apart; the wall's
      // radius closes the circle exactly, and the visitor stands nearer the
      // far wall than the centre, so the near walls sweep wide past the eye.
      const grow = phone ? 1.9 : 1.85;
      const pitchRoom = pitch * grow;
      const R = (N * pitchRoom) / TAU;
      const near = R * 0.5;
      const step = mix(pitch, pitchRoom, k);
      const total = step * N;
      const bend = k / R;
      const spin = (p * TAU * 0.42 + (still ? 0 : t * 0.000035)) * R * k;

      // The room turns a little toward the pointer.
      room.style.transform =
        k > 0
          ? `rotateX(${(-tilt.y * 3.5 * k).toFixed(2)}deg) rotateY(${(tilt.x * 7 * k).toFixed(2)}deg)`
          : "none";

      cards.forEach((card, i) => {
        let s = (i - HERO) * step + slide * pitch * 4 - spin;
        s = ((((s + total / 2) % total) + total) % total) - total / 2;

        const theta = bend > 0 ? s * bend : 0;
        let x = bend > 0 ? Math.sin(theta) / bend : s;
        let z = k * (near - R) + (bend > 0 ? (1 - Math.cos(theta)) / bend : 0);

        lift[i] += ((i === hovered && k > 0.95 && out === 0 ? 1 : 0) - lift[i]) * 0.12;
        const l = lift[i];
        z += l * 140;

        // On the way out every plate rushes past the eye, each at its own pace.
        const rush = out * (1 + 0.5 * Math.abs(jitter(i)));
        z += rush * P * 0.95;
        x *= 1 + rush * 0.5;
        const y = mix(stripY, 0, k) - rush * H * 0.12;

        const sc = mix(1, grow, k);
        card.style.transform =
          `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) ` +
          `rotateY(${((-theta * 180) / Math.PI).toFixed(2)}deg) scale(${sc.toFixed(4)})`;

        // Behind the visitor, or too close to the eye, a plate is not drawn.
        const behind = z > P * 0.82 || (k > 0.5 && Math.cos(theta) < 0);
        card.style.visibility = behind ? "hidden" : "visible";
        card.style.opacity = clamp((P * 0.82 - z) / (P * 0.25)).toFixed(3);
        card.style.zIndex = String(Math.round(2000 + z));

        // The far wall falls into shadow; the near walls take the light.
        const distance = -z;
        const shadow = clamp((distance - near * 0.15) / (R - near - near * 0.15));
        const shade = shades[i];
        if (shade) shade.style.opacity = (k * (1 - l) * (1 - out) * shadow * 0.8).toFixed(3);
      });

      // The chosen plate opens from its own place into the whole screen.
      const left = W / 2 - cw / 2;
      const top = H / 2 + stripY - ch / 2;
      const insetTop = mix(top, 0, open);
      const insetSide = mix(left, 0, open);
      const insetBottom = mix(H - top - ch, 0, open);
      const cover = Math.max(W / 1920, H / 1080);
      const k0 = ch / 1080 / cover;
      hero.style.clipPath = `inset(${insetTop.toFixed(1)}px ${insetSide.toFixed(1)}px ${insetBottom.toFixed(1)}px)`;
      hero.style.visibility = open > 0 && dissolve < 1 ? "visible" : "hidden";
      hero.style.opacity = (1 - dissolve).toFixed(3);
      hero.style.filter = dissolve > 0 ? `blur(${(dissolve * 26).toFixed(1)}px)` : "none";
      heroImg.style.transform = `translateY(${(stripY * (1 - open)).toFixed(1)}px) scale(${mix(k0, 1, open).toFixed(4)})`;
      if (open > 0 && k < 0.5) cards[HERO].style.visibility = "hidden";

      const typeIn = seg(p, BEAT.type);
      const type = typeIn * (1 - seg(p, BEAT.typeOut));
      heroType.style.opacity = type.toFixed(3);
      heroType.style.filter = type < 1 ? `blur(${((1 - type) * 14).toFixed(1)}px)` : "none";
      heroType.style.transform = `translateY(${((1 - typeIn) * 18).toFixed(1)}px)`;

      // The words come into focus one at a time.
      const leave = seg(p, BEAT.wordsOut);
      words.forEach(word => {
        const q = clamp((p - Number(word.dataset.at)) / 0.045) * (1 - leave);
        word.style.opacity = q.toFixed(3);
        word.style.filter = q < 1 ? `blur(${((1 - q) * 12).toFixed(1)}px)` : "none";
      });
    };

    const tick = (t: number) => {
      frame = 0;
      p += (target - p) * 0.11;
      if (Math.abs(target - p) < 0.0002) p = target;
      tilt.x += (tilt.tx - tilt.x) * 0.06;
      tilt.y += (tilt.ty - tilt.y) * 0.06;
      draw(t);
      if (visible) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && !still) frame = requestAnimationFrame(tick);
    };

    measure();
    if (still) {
      p = REST;
      draw(0);
      stage.dataset.ready = "true";
      const resize = () => {
        measure();
        draw(0);
      };
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
    read();
    p = target;
    draw(0);
    stage.dataset.ready = "true";

    const onScroll = () => {
      read();
      start();
    };
    const onResize = () => {
      measure();
      read();
      start();
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const r = stage.getBoundingClientRect();
      tilt.tx = ((event.clientX - r.left) / r.width - 0.5) * 2;
      tilt.ty = ((event.clientY - r.top) / r.height - 0.5) * 2;
      const card = (event.target as HTMLElement).closest<HTMLElement>(".masq-ring-plate");
      hovered = card ? cards.indexOf(card) : -1;
    };
    const onLeave = () => {
      tilt.tx = 0;
      tilt.ty = 0;
      hovered = -1;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });

    observer.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      className="masquerade-arcade"
      data-campaign-chapter="the-openwork"
      aria-labelledby="masquerade-arcade-title"
    >
      <div ref={track} className="masq-ring-track">
        <div className="masq-ring-stage">
          <ul className="masq-ring-plates" aria-label="The Masquerade, worn">
            {PLATES.map(plate => (
              <li key={plate.key} className="masq-ring-plate" aria-hidden={plate.copy || undefined}>
                <img
                  src={`/home/masquerade-ring/${plate.n}.webp`}
                  width={600}
                  height={800}
                  alt={plate.copy ? "" : plate.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span className="masq-ring-shade" aria-hidden="true" />
              </li>
            ))}
          </ul>

          <div className="masq-ring-hero" aria-hidden="true">
            <img src="/home/masquerade-ring/hero.webp" width={1920} height={1080} alt="" loading="lazy" decoding="async" />
            <div className="masq-ring-hero-type">
              <span className="masq-ring-mark">Masquerade</span>
              <p>The dark centre conceals; the finer edge reveals. Both belong to the same silhouette.</p>
              <span className="masq-ring-numeral">II</span>
            </div>
          </div>

          <div className="masq-ring-centre">
            <h2 id="masquerade-arcade-title">
              <Words line={LINES[0]} />
            </h2>
            <p className="masq-ring-verse">
              <span>
                <Words line={LINES[1]} />
              </span>
              <span>
                <Words line={LINES[2]} />
              </span>
            </p>
            <p className="masq-ring-verse masq-ring-verse-quiet">
              <span>
                <Words line={LINES[3]} />
              </span>
              <span>
                <Words line={LINES[4]} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
