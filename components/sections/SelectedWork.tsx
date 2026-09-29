import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { ProjectMeta, TechList, allTech } from "@/components/work/ProjectMeta";
import { ImageReveal, MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SelectedWork() {
  const [a, b, c] = featuredProjects;
  return (
    <section id="selected-work" aria-labelledby="work-title" className="cv-auto surface section" style={{ "--cv": "3400px" } as React.CSSProperties}>
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="01">Selected work</SectionLabel>
            <h2 id="work-title" className="t-h1 mt-6">
              <MaskText>Products I built,</MaskText>
              <MaskText delay={0.08}>
                <span className="serif">end</span> to end.
              </MaskText>
            </h2>
          </div>
          <Reveal className="max-w-sm text-muted md:pb-3">
            <p className="t-body">
              Three case studies covering product thinking, frontend craft, APIs, data and deployment. Each one links to the
              engineering decisions behind it.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(4rem,8vw,8rem)] space-y-[clamp(6rem,12vw,13rem)]">
          {a && <FeatureSticky project={a} />}
          {b && <FeatureWide project={b} />}
          {c && <FeatureOffset project={c} />}
        </div>

        <Reveal className="mt-[clamp(4rem,8vw,8rem)] flex items-center justify-between border-t border-line pt-6">
          <p className="text-muted">Plus research, client work and an archive.</p>
          <Link href="/work" className="group inline-flex items-center gap-3 text-lg tracking-tight">
            <span className="u">All work</span>
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Index({ n }: { n: string }) {
  return (
    <span aria-hidden="true" className="t-mono text-accent">
      {n} / 03
    </span>
  );
}

function CaseLink({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group inline-flex min-h-11 items-center gap-3 text-[1.05rem] font-medium tracking-tight">
      <span className="u">Read the case study</span>
      <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
      <span className="sr-only">for {project.title}</span>
    </Link>
  );
}

function VisualLink({ project, children }: { project: Project; children: React.ReactNode }) {
  return (
    <Link href={`/work/${project.slug}`} data-cursor="View case study" tabIndex={-1} aria-hidden="true" className="block">
      {children}
    </Link>
  );
}

/** Layout A: text stays put while the visual scrolls past. */
function FeatureSticky({ project }: { project: Project }) {
  return (
    <article className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4 lg:self-start lg:sticky lg:top-28">
        <Index n={project.number} />
        <h3 className="t-h2 mt-5">{project.title}</h3>
        <p className="t-lede mt-5 text-muted">{project.shortDescription}</p>
        <ProjectMeta project={project} className="mt-8" />
        <TechList items={allTech(project).slice(0, 7)} className="mt-6" />
        <div className="mt-6">
          <CaseLink project={project} />
        </div>
      </div>
      <div className="lg:col-span-8">
        <ImageReveal>
          <VisualLink project={project}>
            <ProjectVisual project={project} aspect="aspect-[4/3] lg:aspect-[5/4]" priority={false} sizes="(min-width:1024px) 65vw, 100vw" decorative />
          </VisualLink>
        </ImageReveal>
        {!project.thumbnail && <p className="t-mono mt-3 text-faint">Fig. {project.number} · Interface sketch</p>}
      </div>
    </article>
  );
}

/** Layout B: full-bleed cinematic visual with a three-column caption. */
function FeatureWide({ project }: { project: Project }) {
  return (
    <article>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Index n={project.number} />
          <h3 className="t-h1 mt-5">{project.title}</h3>
        </div>
        <p className="t-lede max-w-lg text-muted md:pb-2">{project.shortDescription}</p>
      </div>
      <ImageReveal className="mt-10">
        <VisualLink project={project}>
          <ProjectVisual project={project} aspect="aspect-[4/3] md:aspect-[16/9]" sizes="100vw" decorative />
        </VisualLink>
      </ImageReveal>
      <div className="mt-6 grid gap-8 md:grid-cols-12">
        <ProjectMeta project={project} className="md:col-span-4" />
        <div className="md:col-span-5">
          <TechList items={allTech(project)} />
        </div>
        <div className="md:col-span-3 md:text-right">
          <CaseLink project={project} />
        </div>
      </div>
    </article>
  );
}

/** Layout C: visual left, text dropped below the top edge. */
function FeatureOffset({ project }: { project: Project }) {
  return (
    <article className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <ImageReveal>
          <VisualLink project={project}>
            <ProjectVisual project={project} aspect="aspect-[4/3]" sizes="(min-width:1024px) 55vw, 100vw" decorative />
          </VisualLink>
        </ImageReveal>
      </div>
      <div className="lg:col-span-5 lg:pt-24">
        <Index n={project.number} />
        <h3 className="t-h2 mt-5">{project.title}</h3>
        <p className="t-lede mt-5 text-muted">{project.shortDescription}</p>
        <ProjectMeta project={project} className="mt-8" />
        <TechList items={allTech(project)} className="mt-6" />
        <div className="mt-6">
          <CaseLink project={project} />
        </div>
      </div>
    </article>
  );
}
