"use client";

import { useState } from "react";
import type { CapabilityGroup, WorkId } from "@/data/capabilities";
import { cn } from "@/lib/utils";

type Work = readonly { id: WorkId; label: string }[];

/**
 * A typographic matrix rather than a wall of logos. Everything is readable with no interaction.
 * Choosing a project (click, tap, hover or keyboard) dims everything I did not use there.
 */
export function CapabilityMatrix({ groups, work }: { groups: CapabilityGroup[]; work: Work }) {
  const [pinned, setPinned] = useState<WorkId | null>(null);
  const [hover, setHover] = useState<WorkId | null>(null);
  const active = hover ?? pinned;

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <p id="filter-label" className="t-mono shrink-0 text-muted">
          See what I used in
        </p>
        <ul aria-labelledby="filter-label" className="flex flex-wrap gap-2">
          {work.map((w) => {
            const on = pinned === w.id;
            return (
              <li key={w.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPinned(on ? null : w.id)}
                  onMouseEnter={() => setHover(w.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(w.id)}
                  onBlur={() => setHover(null)}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-[5px] border px-3.5 text-[0.88rem] transition-colors duration-300 md:min-h-9",
                    on ? "border-accent bg-accent text-on-accent" : "border-line-strong text-fg hover:border-fg",
                  )}
                >
                  {w.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-12 border-t border-line">
        {groups.map((g) => (
          <div key={g.label} className="grid gap-5 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10">
            <div className="md:col-span-3">
              <h3 className="text-[1.05rem] font-medium tracking-tight">{g.label}</h3>
              <p className="mt-2 max-w-[16rem] text-[0.88rem] leading-snug text-muted">{g.blurb}</p>
            </div>
            <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 md:col-span-9">
              {g.items.map((item) => {
                const match = active ? !!item.used?.includes(active) : false;
                const dim = active ? !match : false;
                return (
                  <li
                    key={item.name}
                    className={cn(
                      "leading-tight tracking-[-0.03em] transition-[opacity,color] duration-500",
                      item.core ? "text-[clamp(1.5rem,3.1vw,2.5rem)] font-medium" : "text-[clamp(1.05rem,1.6vw,1.35rem)] text-muted",
                      dim && "opacity-25",
                      match && "!text-accent",
                    )}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <p className="t-mono mt-5 text-faint" aria-live="polite">
        {active ? `Highlighted: what I used in ${work.find((w) => w.id === active)?.label}` : "Larger type: used across shipped products"}
      </p>
    </div>
  );
}
