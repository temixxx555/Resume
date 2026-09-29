"use client";

import { Button } from "@/components/ui/Button";
import { personal } from "@/data/site";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="surface flex flex-1 flex-col justify-center pt-[calc(var(--header-h)+2rem)] pb-16">
      <div className="wrap">
        <p className="t-mono text-accent">Something broke</p>
        <h1 className="t-h1 mt-6 max-w-3xl">
          That was <span className="serif">my</span> bug, not yours.
        </h1>
        <p className="t-lede mt-6 max-w-lg text-muted">
          The page hit an unexpected error. Try again, or write to me at{" "}
          <a href={`mailto:${personal.email}`} className="u text-fg">
            {personal.email}
          </a>
          .
        </p>
        <div className="mt-10 flex gap-3">
          <button type="button" onClick={reset} className="btn btn-solid">
            Try again
          </button>
          <Button href="/" variant="ghost">
            Back home
          </Button>
        </div>
      </div>
    </section>
  );
}
