"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { personal } from "@/data/site";

/** The email is a real mailto link first. Copying is an enhancement. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* the mailto link still works */
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href={`mailto:${personal.email}`}
        className="u break-all text-[clamp(1.6rem,1rem+3vw,3.2rem)] leading-none font-medium tracking-[-0.045em]"
      >
        {personal.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-[5px] border border-line-strong px-3.5 text-[0.88rem] transition-colors hover:border-accent"
      >
        {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
