import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { LocalTime } from "@/components/layout/LocalTime";
import { PointerGlow } from "./PointerGlow";
import { personal, site } from "@/data/site";

const stages = [
  { name: "Interface", tech: "Next.js · React · Tailwind" },
  { name: "API", tech: "Node.js · Express · REST" },
  { name: "Data", tech: "MongoDB · Mongoose" },
  { name: "Auth & billing", tech: "JWT · Clerk · Paystack" },
  { name: "Deploy", tech: "Vercel · Render" },
];

const proof = [
  { value: "3+", label: "years shipping production web apps" },
  { value: "15+", label: "responsive interfaces delivered at IntPlus" },
  { value: "40%", label: "faster data loading through API and caching work" },
  { value: "30%", label: "faster feature builds with a shared component system" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="surface relative isolate flex min-h-svh flex-col overflow-clip pt-[calc(var(--header-h)+1.5rem)]">
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
      <PointerGlow />

      <div className="wrap flex flex-1 flex-col justify-center gap-8 py-8 md:gap-10">
        <div className="in-fade t-mono flex flex-wrap items-center gap-x-6 gap-y-2 text-muted" style={{ "--i": 0 } as React.CSSProperties}>
          {personal.availability.open && (
            <span className="flex items-center gap-2.5 text-fg">
              <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-accent" />
              {personal.availability.label}
            </span>
          )}
          <span>
            {site.location} · <LocalTime />
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <h1 id="hero-title" className="lg:col-span-9">
          <span className="block text-[clamp(3.9rem,21vw,7rem)] leading-[0.84] font-[560] tracking-[-0.06em] md:text-[clamp(5rem,10.4vw,10rem)]">
            <span className="block">Adebayo</span>
            <span className="block">Liberty</span>
          </span>
          <span className="sr-only"> — </span>
          <span
            className="in-rise mt-5 block text-[clamp(1.55rem,6.4vw,2.2rem)] leading-[1.05] tracking-[-0.035em] text-muted md:mt-7 md:text-[clamp(1.9rem,3.2vw,3.4rem)]"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <span className="serif text-fg">Full-Stack</span> Software Engineer
          </span>
        </h1>

        <aside aria-label="Selected work" className="in-fade hidden lg:col-span-3 lg:mt-3 lg:block" style={{ "--i": 5 } as React.CSSProperties}>
          <p className="t-mono mb-4 text-muted">Selected work</p>
          <ol className="border-t border-line">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="group flex items-baseline justify-between gap-4 border-b border-line py-4">
                  <span className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="t-mono text-accent">{p.number}</span>
                    <span className="text-[1.02rem] font-medium tracking-tight transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-1">{p.title}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
          <p className="t-mono mt-4 text-faint">+ AI research · client work</p>
        </aside>
        </div>

        <div className="grid items-end gap-8 md:grid-cols-12">
          <p className="in-rise t-lede text-muted md:col-span-6 lg:col-span-5" style={{ "--i": 6 } as React.CSSProperties}>
            I design and engineer digital products from <span className="text-fg">interface to infrastructure</span>: Next.js
            frontends, Node.js APIs, databases, auth, payments and deployment.
          </p>

          <div className="in-rise flex flex-col gap-5 md:col-span-6 md:items-end lg:col-span-5 lg:col-start-8" style={{ "--i": 7 } as React.CSSProperties}>
            <div className="flex flex-wrap gap-3">
              <Button href="#selected-work">View selected work</Button>
              <Button href="/contact" variant="ghost" icon="up-right">
                Contact me
              </Button>
            </div>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem] text-muted">
              <li>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="u inline-flex min-h-8 items-center gap-2 hover:text-fg">
                  <GithubIcon className="size-4" /> GitHub
                </a>
              </li>
              <li>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="u inline-flex min-h-8 items-center gap-2 hover:text-fg">
                  <LinkedinIcon className="size-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={personal.resumePdf} download className="u inline-flex min-h-8 items-center gap-2 hover:text-fg">
                  <Download className="size-4" aria-hidden="true" /> Résumé
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="wrap in-fade pb-8" style={{ "--i": 9 } as React.CSSProperties}>
        <StackPath />
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 md:grid-cols-4">
          {proof.map((p) => (
            <div key={p.value}>
              <dt className="sr-only">{p.label}</dt>
              <dd>
                <span className="block text-[clamp(1.8rem,4vw,2.6rem)] leading-none font-medium tracking-[-0.04em]">{p.value}</span>
                <span className="mt-2 block max-w-[16rem] text-[0.82rem] leading-snug text-muted">{p.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Concept → production, as a path with the tools I use at each stage. */
function StackPath() {
  return (
    <div>
      <p className="t-mono mb-5 text-muted">From idea to production</p>
      <div className="relative">
        <div aria-hidden="true" className="path-line absolute inset-x-0 top-[5px] hidden md:block" />
        <ol className="relative grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-5">
          {stages.map((s, i) => (
            <li key={s.name}>
              <span aria-hidden="true" className="mb-4 block size-[11px] rounded-full border border-line-strong bg-bg" />
              <p className="flex items-baseline gap-2">
                <span aria-hidden="true" className="t-mono text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.98rem] font-medium tracking-tight">{s.name}</span>
              </p>
              <p className="t-mono mt-1.5 !text-[0.66rem] text-muted">{s.tech}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
