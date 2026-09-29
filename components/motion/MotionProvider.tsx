"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * One provider for the whole site.
 * - LazyMotion + `m` components keeps the animation bundle to the small `domAnimation` feature set.
 * - reducedMotion="user" makes Motion honour prefers-reduced-motion for transform/layout animation.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

export const EASE = [0.22, 1, 0.36, 1] as const;
