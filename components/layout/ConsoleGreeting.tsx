"use client";

import { useEffect } from "react";
import { personal } from "@/data/site";

/** The site's one easter egg: a note for people who open the console. */
export function ConsoleGreeting() {
  useEffect(() => {
    const w = window as unknown as { __greeted?: boolean };
    if (w.__greeted) return;
    w.__greeted = true;
    console.log(
      "%cAL%c  You opened the console. Good instinct.",
      "background:#ff5b2e;color:#0e0d0b;font-weight:700;padding:4px 8px;border-radius:3px",
      "font:500 13px system-ui",
    );
    console.log(
      `%cIf you are hiring, or building something that needs an engineer who ships, write to ${personal.email}.\nTip: press Cmd/Ctrl + K to jump anywhere.`,
      "font:12px/1.6 ui-monospace,monospace;color:#9b968a",
    );
  }, []);
  return null;
}
