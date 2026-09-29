import { ViewTransition } from "react";

/**
 * Wrap the root of every page. Route changes are React transitions, so the browser's
 * View Transitions API animates between the outgoing and incoming page. It is short
 * (about 0.5s), skipped for reduced motion, and a no-op where unsupported.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="flex flex-1 flex-col">{children}</div>
    </ViewTransition>
  );
}
