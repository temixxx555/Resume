"use client";

import { m } from "motion/react";
import { EASE } from "./MotionProvider";
import { cn } from "@/lib/utils";

const viewport = { once: true, margin: "0px 0px -8% 0px" } as const;

/** A restrained fade with a small rise. Used for body content, never for headlines. */
export function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "article" | "section";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={cn("js-reveal", className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Headline line that slides up out of a mask. Wrap each line separately. */
export function MaskText({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={cn("mask-line", className)}>
      <m.span
        className="js-reveal block"
        initial={{ y: "105%" }}
        whileInView={{ y: 0 }}
        viewport={viewport}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </m.span>
    </span>
  );
}

/** A hairline that draws itself from the left. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.div
      aria-hidden="true"
      className={cn("js-reveal h-px origin-left bg-line", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewport}
      transition={{ duration: 1.3, delay, ease: EASE }}
    />
  );
}

/** Image/art container that opens with a clip-path wipe. */
export function ImageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={cn("js-reveal", className)}
      initial={{ clipPath: "inset(12% 0% 0% 0%)", opacity: 0.001 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
