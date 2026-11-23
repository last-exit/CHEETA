import { useRef, useState, type PointerEvent } from "react";

const ZOOM = 2.6;

/**
 * A painting under a dealer's loupe: a gilt-rimmed lens follows the pointer
 * (or a finger) and shows the brushwork magnified, as you would look at a
 * miniature in the gallery itself.
 */
export default function HayratLoupe({
  src,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const frame = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  const move = (event: PointerEvent<HTMLSpanElement>) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box || !frame.current) return;
    const x = Math.min(Math.max(event.clientX - box.left, 0), box.width);
    const y = Math.min(Math.max(event.clientY - box.top, 0), box.height);
    const style = frame.current.style;
    style.setProperty("--lx", `${x}px`);
    style.setProperty("--ly", `${y}px`);
    style.setProperty("--bw", `${box.width * ZOOM}px`);
    style.setProperty("--bx", `${-(x * ZOOM) }px`);
    style.setProperty("--by", `${-(y * ZOOM)}px`);
    if (!active) setActive(true);
  };

  return (
    <span
      ref={frame}
      className={`hayrat-loupe ${className}`.trim()}
      data-active={active || undefined}
      onPointerMove={move}
      onPointerDown={move}
      onPointerLeave={() => setActive(false)}
      onPointerCancel={() => setActive(false)}
    >
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <span
        className="hayrat-loupe-lens"
        aria-hidden="true"
        style={{ backgroundImage: `url(${src})` }}
      />
    </span>
  );
}
