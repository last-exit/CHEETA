import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cuspedArchPath, jaliStarPath } from "@/lib/palaceGeometry";
import "./Jharokha.css";

const TILE = 30;
const STAR = jaliStarPath(TILE, 10.5);

type ArchOptions = Parameters<typeof cuspedArchPath>[0];

/**
 * A palace window: a cusped arch cut into a marble panel, optionally behind a
 * jali screen. `veil="auto"` lifts the screen once the window is in view;
 * `veil="manual"` leaves the lift to the CSS variable `--jali-lift` (0–1).
 */
export default function Jharokha({
  aspect,
  arch,
  veil = "auto",
  panel = true,
  className = "",
  windowProps,
  children,
}: {
  aspect: number;
  arch?: ArchOptions;
  veil?: "auto" | "manual" | false;
  panel?: boolean;
  className?: string;
  windowProps?: HTMLAttributes<HTMLDivElement> & Record<`data-${string}`, unknown>;
  children: ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  const path = useMemo(() => cuspedArchPath({ aspect, ...arch }), [aspect, arch]);
  const opening = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [unveiled, setUnveiled] = useState(false);

  useEffect(() => {
    if (veil !== "auto") return;
    if (reduced) {
      setUnveiled(true);
      return;
    }
    const node = opening.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setUnveiled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [veil, reduced]);

  return (
    <div
      className={`jharokha ${className}`}
      data-panel={panel}
      data-veil={veil || "none"}
      data-unveiled={veil === "auto" ? unveiled : undefined}
      style={{ "--jharokha-aspect": aspect } as CSSProperties}
    >
      <svg className="jharokha-defs" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`arch-${id}`} clipPathUnits="objectBoundingBox">
            <path d={path} />
          </clipPath>
          <pattern
            id={`jali-${id}`}
            width={TILE}
            height={TILE}
            patternUnits="userSpaceOnUse"
          >
            <path d={`M0 0 H${TILE} V${TILE} H0 Z ${STAR}`} fillRule="evenodd" />
          </pattern>
        </defs>
      </svg>
      <div className="jharokha-opening">
        <div
          {...windowProps}
          ref={opening}
          className={`jharokha-window ${windowProps?.className ?? ""}`}
          style={{ ...windowProps?.style, clipPath: `url(#arch-${id})` }}
        >
          {children}
          {veil && (
            <svg className="jharokha-screen" aria-hidden="true" focusable="false">
              <rect width="100%" height="100%" fill={`url(#jali-${id})`} />
            </svg>
          )}
        </div>
        <svg
          className="jharokha-outline"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d={path} />
        </svg>
      </div>
    </div>
  );
}
