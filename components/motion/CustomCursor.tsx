"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { FINE_POINTER, useMediaQuery } from "@/lib/use-media";

/**
 * A small label that trails the pointer over elements marked `data-cursor="View"`.
 * The native cursor is never hidden. It renders nothing on touch devices, and nothing
 * here is required to use the site: every marked element is also a normal, labelled link.
 */
export function CustomCursor() {
  const enabled = useMediaQuery(FINE_POINTER);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 480, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 480, damping: 38, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX + 18);
      y.set(e.clientY + 18);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <m.div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[90]" style={{ x: sx, y: sy }}>
      <m.span
        className="t-mono block rounded-[4px] bg-accent px-3 py-2 whitespace-nowrap text-on-accent"
        initial={false}
        animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.6 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      >
        {label}
      </m.span>
    </m.div>
  );
}
