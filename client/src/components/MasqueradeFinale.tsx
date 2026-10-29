import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MASQUERADE_DETAILS, detailViewBox } from "@/lib/masqueradeDetails";
import "./MasqueradeFinale.css";

const OBJECT = "/campaigns/masquerade/openwork-study.webp";

export default function MasqueradeFinale() {
  const [selected, setSelected] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [failed, setFailed] = useState(false);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const box = detailViewBox(selected, offset.x, offset.y);
  const choose = (index: number, pointer = false) => {
    drag.current = null;
    setDragging(false);
    setAnimate(pointer);
    setSelected(index);
    setOffset({ x: 0, y: 0 });
  };
  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? 2
          : (selected + (event.key === "ArrowRight" ? 1 : -1) + 3) % 3;
    choose(next);
    event.currentTarget
      .querySelectorAll<HTMLButtonElement>("button")
      [next]?.focus();
  };
  const startDrag = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: offset.x,
      startY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const move = (event: PointerEvent<SVGSVGElement>) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const scale = Math.min(rect.width / box[2], rect.height / box[3]);
    if (!scale) return;
    const next = detailViewBox(
      selected,
      start.startX - (event.clientX - start.x) / scale,
      start.startY - (event.clientY - start.y) / scale
    );
    const base = detailViewBox(selected);
    setOffset({ x: next[0] - base[0], y: next[1] - base[1] });
  };
  const release = () => {
    drag.current = null;
    setDragging(false);
  };

  return (
    <section
      className="masquerade-study house-container"
      aria-labelledby="masquerade-study-title"
    >
      <div className="masquerade-study-header">
        <h2 id="masquerade-study-title">In detail</h2>
        <div
          className="masquerade-study-choices"
          role="group"
          aria-label="Explore the frame details"
          onKeyDown={keys}
        >
          {MASQUERADE_DETAILS.map((detail, index) => (
            <button
              key={detail.id}
              type="button"
              aria-pressed={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={event => choose(index, event.detail > 0)}
            >
              {detail.label}
            </button>
          ))}
        </div>
      </div>
      <div className="masquerade-study-viewport" data-dragging={dragging}>
        {failed ? (
          <img
            src="/stills/masquerade-still-3.jpg"
            alt="The Masquerade frame and openwork"
            className="masquerade-study-fallback"
          />
        ) : (
          <motion.svg
            viewBox={box.join(" ")}
            initial={false}
            animate={{ viewBox: box.join(" ") }}
            transition={{
              duration: reduced || dragging || !animate ? 0 : 0.65,
              ease: [0.23, 1, 0.32, 1],
            }}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={`The Masquerade ${MASQUERADE_DETAILS[selected].label} detail. Drag with a mouse to explore, or use the detail buttons.`}
            onPointerDown={startDrag}
            onPointerMove={move}
            onPointerUp={release}
            onPointerCancel={release}
            onLostPointerCapture={release}
          >
            <image
              href={OBJECT}
              width="1600"
              height="914"
              onError={() => setFailed(true)}
            />
          </motion.svg>
        )}
      </div>
    </section>
  );
}
