"use client";

import { m, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import type { Heading } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Thin reading-progress bar pinned to the very top of the viewport. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}

/** Table of contents with scroll-spy. Plain anchor links, so it works without JS too. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  return (
    <nav aria-label="Table of contents">
      <p className="t-mono mb-4 text-muted">On this page</p>
      <ol className="space-y-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 text-[0.88rem] leading-snug transition-colors",
                h.level === 3 ? "pl-7" : "pl-4",
                active === h.id ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }
  const enc = encodeURIComponent;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem]">
      <span className="t-mono text-muted">Share</span>
      <button type="button" onClick={copy} className="u inline-flex min-h-9 items-center gap-2">
        {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="u inline-flex min-h-9 items-center"
      >
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="u inline-flex min-h-9 items-center"
      >
        X
      </a>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
