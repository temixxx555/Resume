import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { archive, intplusWork, projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/motion/PageTransition";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { TechList, allTech } from "@/components/work/ProjectMeta";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected full-stack case studies by Adebayo Liberty: Campus Connect, a QR-code SaaS, BowenEats and a deep-learning research project, plus client work and an archive.",
  path: "/work",
});

export default function WorkIndex() {
  return (
    <PageTransition>
      <section className="surface pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))] pb-[clamp(4rem,8vw,8rem)]">
        <div className="wrap">
          <SectionLabel index="§">Work</SectionLabel>
          <h1 className="t-display mt-8">
            <MaskText>Selected</MaskText>
            <MaskText delay={0.08}>
              <span className="serif">work</span>
              <span className="text-accent">.</span>
            </MaskText>
          </h1>
          <Reveal className="mt-10 max-w-xl">
            <p className="t-lede text-muted">
              A few products, each built end to end, with the reasoning behind the engineering. Open one for the problem, the
              architecture and the decisions.
            </p>
          </Reveal>

          <ol className="mt-[clamp(3rem,6vw,6rem)] border-t border-line">
            {projects.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/work/${p.slug}`}
                  data-cursor="View case study"
                  className="group grid gap-6 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10"
                >
                  <span aria-hidden="true" className="t-mono text-accent md:col-span-1">
                    {p.number}
                  </span>
                  <div className="md:col-span-6">
                    <h2 className="t-h2 flex items-start gap-3 transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-2">
                      <span>{p.title}</span>
                      <ArrowUpRight
                        className="mt-2 size-6 shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </h2>
                    <p className="t-body mt-4 max-w-lg text-muted">{p.tagline}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="t-mono text-muted">{p.kind === "research" ? "Research" : "Case study"}</span>
                      <span className="t-mono text-muted">{p.status}</span>
                    </div>
                    <TechList items={allTech(p).slice(0, 5)} className="mt-4" />
                  </div>
                  <div className="md:col-span-5">
                    <ProjectVisual
                      project={p}
                      aspect="aspect-[16/10]"
                      sizes="(min-width:768px) 40vw, 100vw"
                      priority={p.number === "01"}
                      decorative
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="archive-title" className="paper surface section">
        <div className="wrap">
          <SectionLabel index="§">Archive</SectionLabel>
          <h2 id="archive-title" className="t-h2 mt-6">
            <MaskText>Client work &amp;</MaskText>
            <MaskText delay={0.08}>
              <span className="serif">smaller</span> builds.
            </MaskText>
          </h2>

          <ul className="mt-12 border-t border-line">
            {archive.map((a) => (
              <li key={a.name}>
                <Reveal className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <h3 className="t-h3">{a.name}</h3>
                    <p className="t-mono mt-2 text-muted">
                      {a.context}
                      {a.year ? ` · ${a.year}` : ""}
                    </p>
                  </div>
                  <p className="t-body md:col-span-6">{a.summary}</p>
                  <div className="md:col-span-3">
                    <p className="t-mono mb-3 text-muted">{a.role}</p>
                    <TechList items={a.tech} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-16">
            <h3 className="t-mono text-muted">Also delivered at IntPlus Nigeria</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
              {intplusWork.map((w) => (
                <li key={w.name} className="border-t border-line pt-3">
                  <span className="block font-medium tracking-tight">{w.name}</span>
                  <span className="mt-1 block text-[0.85rem] text-muted">{w.note}</span>
                </li>
              ))}
            </ul>
            <p className="t-body mt-6 max-w-xl text-muted">
              More on the role, and the impact of this work, on the <Link href="/experience" className="u text-fg">experience page</Link>.
            </p>
          </Reveal>
        </div>
      </section>
      <ContactCTA index="§" />
    </PageTransition>
  );
}
