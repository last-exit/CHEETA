import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { createDiamondStudio } from "@/lib/philosophyDiamond";

type Studio = Awaited<ReturnType<typeof createDiamondStudio>>;

export default function PhilosophyDiamond() {
  const mount = useRef<HTMLDivElement>(null);
  const studio = useRef<Studio | null>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const motion = useRef(reduced);
  const pose = useRef({ x: 0.25, y: -0.48 });
  const pointer = useRef<{
    id: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    motion.current = reduced;
    studio.current?.reduced(reduced);
  }, [reduced]);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const controller = new AbortController();
    const fail = () => {
      studio.current?.dispose();
      studio.current = null;
      setReady(false);
    };
    import("@/lib/philosophyDiamond")
      .then(module =>
        controller.signal.aborted
          ? null
          : module.createDiamondStudio(
              host,
              controller.signal,
              motion.current,
              () => {
                if (!controller.signal.aborted) setReady(true);
              },
              fail
            )
      )
      .then(result => {
        if (!result) return;
        if (controller.signal.aborted) result.dispose();
        else studio.current = result;
      })
      .catch(error => {
        if (error?.name !== "AbortError" && !controller.signal.aborted) fail();
      });
    return () => {
      controller.abort();
      studio.current?.dispose();
      studio.current = null;
    };
  }, []);
  const change = (x: number, y: number, immediate = false) => {
    pose.current = { x: Math.max(-0.65, Math.min(0.8, x)), y };
    studio.current?.pose(pose.current.x, pose.current.y, immediate);
  };
  return (
    <div className="philosophy-diamond" data-ready={ready}>
      <img
        className="philosophy-diamond-poster"
        src="/philosophy/sculpture/diamond-poster-v1.webp"
        alt=""
        width="900"
        height="700"
        aria-hidden="true"
        fetchPriority="high"
      />
      <div
        className="philosophy-diamond-control"
        role="group"
        aria-hidden={!ready}
        aria-label="Interactive diamond sculpture"
        aria-describedby="philosophy-diamond-instructions"
        tabIndex={ready ? 0 : -1}
        onKeyDown={event => {
          pose.current = studio.current?.orientation() ?? pose.current;
          const step = event.shiftKey ? 0.3 : 0.12;
          if (event.key === "ArrowLeft")
            change(pose.current.x, pose.current.y - step, true);
          else if (event.key === "ArrowRight")
            change(pose.current.x, pose.current.y + step, true);
          else if (event.key === "ArrowUp")
            change(pose.current.x - step, pose.current.y, true);
          else if (event.key === "ArrowDown")
            change(pose.current.x + step, pose.current.y, true);
          else if (event.key === "Home" || event.key === "Escape")
            change(0.25, -0.48, true);
          else return;
          event.preventDefault();
        }}
        onPointerDown={event => {
          if (!ready || !event.isPrimary || event.button !== 0) return;
          pose.current = studio.current?.orientation() ?? pose.current;
          studio.current?.pose(pose.current.x, pose.current.y, true);
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            moved: false,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
          if (event.pointerType === "mouse")
            event.currentTarget.focus({ preventScroll: true });
        }}
        onPointerMove={event => {
          const drag = pointer.current;
          if (!drag || drag.id !== event.pointerId) return;
          const dx = event.clientX - drag.x,
            dy = event.clientY - drag.y;
          if (!drag.moved && Math.hypot(dx, dy) < 5) return;
          if (
            !drag.moved &&
            event.pointerType === "touch" &&
            Math.abs(dy) > Math.abs(dx)
          )
            return;
          drag.moved = true;
          change(pose.current.x + dy * 0.005, pose.current.y + dx * 0.008);
          drag.x = event.clientX;
          drag.y = event.clientY;
        }}
        onPointerUp={() => {
          pointer.current = null;
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onLostPointerCapture={() => {
          pointer.current = null;
        }}
      >
        <div ref={mount} className="philosophy-diamond-canvas" />
      </div>
      <p
        className="sr-only"
        id="philosophy-diamond-instructions"
        aria-hidden={!ready}
      >
        A diamond sculpture, not a product for sale. Drag horizontally to turn.
        With the sculpture focused, use the arrow keys to rotate, or Home and
        Escape to return to its opening position. Swipe vertically to scroll.
      </p>
    </div>
  );
}
