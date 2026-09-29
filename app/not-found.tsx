import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="surface relative isolate flex flex-1 flex-col justify-center overflow-clip pt-[calc(var(--header-h)+2rem)] pb-16">
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
      <div className="wrap">
        <p className="t-mono text-accent">Error 404</p>
        <p
          aria-hidden="true"
          className="mt-4 text-[clamp(7rem,32vw,26rem)] leading-[0.8] font-[560] tracking-[-0.07em] text-transparent [-webkit-text-stroke:1.5px_var(--line-strong)]"
        >
          404
        </p>
        <h1 className="t-h2 mt-6 max-w-3xl">
          This page was never <span className="serif">merged</span>.
        </h1>
        <p className="t-lede mt-6 max-w-lg text-muted">
          The link may be old, or mistyped. Here is where the good stuff lives.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back home</Button>
          <Button href="/work" variant="ghost">
            See the work
          </Button>
        </div>
        <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-2 text-muted">
          {projects.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="u hover:text-fg">
                {p.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="u hover:text-fg">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
