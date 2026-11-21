import React, { useRef, useState, useEffect } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      className={`inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 5h17M13 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

export function Tilt({
  children,
  max = 8,
  perspective = 1400,
  className = "",
}: {
  children: React.ReactNode;
  max?: number;
  perspective?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({
      x: -py * max,
      y: px * max,
    });
  };

  const onPointerLeave = () => {
    setRot({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
      style={{
        perspective: `${perspective}px`,
      }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: "transform 0.4s cubic-bezier(0.2, 0.7, 0.1, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
