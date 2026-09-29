"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Wraps the highlighted <pre> with an accessible copy button. */
export function CodeBlock(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the code stays selectable */
    }
  }

  return (
    <div className="group relative">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2.5 right-2.5 inline-flex size-9 items-center justify-center rounded-[5px] border border-line bg-bg/80 text-muted opacity-100 backdrop-blur transition-colors hover:text-fg md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100"
      >
        {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </div>
  );
}
