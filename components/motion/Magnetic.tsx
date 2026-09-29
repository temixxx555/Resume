"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { FINE_POINTER, useMediaQuery } from "@/lib/use-media";

/** Pulls its child gently toward the pointer. Only active for fine pointers and no reduced motion. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery(FINE_POINTER);
  const calm = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = fine && !calm;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div ref={ref} className={className} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </m.div>
  );
}
