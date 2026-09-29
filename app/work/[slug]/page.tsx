import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { postsForProject, type Heading } from "@/lib/blog";
import { absoluteUrl, buildMetadata, jsonLdString } from "@/lib/seo";
import { site } from "@/data/site";
import { PageTransition } from "@/components/motion/PageTransition";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { ProjectMeta, TechList } from "@/components/work/ProjectMeta";
import { ArchitectureDiagram } from "@/components/work/ArchitectureDiagram";
import { TableOfContents } from "@/components/blog/ArticleChrome";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { GithubIcon } from "@/components/ui/BrandIcons";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.title}: ${p.tagline.replace(/\.$/, "")}`,
    description: p.shortDescription,
    path: `/work/${p.slug}`,
    socialTitle: `${p.title}: case study by ${site.displayName}`,
  });
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const related = p.related.projects.map((s) => getProject(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const posts = postsForProject(p.slug, p.related.posts);

  // Only sections that have content are rendered (and listed in the section nav).
  const sections: Heading[] = [
    { id: "overview", text: "Overview", level: 2 },
    ...(p.problem.length ? [{ id: "problem", text: "The problem", level: 2 as const }] : []),
    { id: "built", text: "What I built", level: 2 },
    ...(p.architecture ? [{ id: "architecture", text: "Architecture", level: 2 as const }] : []),
    ...(p.decisions.length ? [{ id: "decisions", text: "Engineering decisions", level: 2 as const }] : []),
    ...(p.challenges?.length ? [{ id: "challenges", text: "Challenges", level: 2 as const }] : []),
    ...(p.results?.length ? [{ id: "outcome", text: "Outcome", level: 2 as const }] : []),
    ...(p.inProgress ? [{ id: "in-progress", text: "In development", level: 2 as const }] : []),
    ...(p.gallery?.length ? [{ id: "gallery", text: "Gallery", level: 2 as const }] : []),
    ...(posts.length ? [{ id: "writing", text: "Related writing", level: 2 as const }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.shortDescription,
    url: absoluteUrl(`/work/${p.slug}`),
    author: { "@id": `${site.url}/#person` },
    ...(p.year ? { dateCreated: p.year } : {}),
    ...(p.liveUrl ? { sameAs: p.liveUrl } : {}),
    keywords: p.stack.flatMap((g) => g.items).join(", "),
  };

  return (
    <PageTransition>
      <article className="surface pt-[calc(var(--header-h)+clamp(2rem,5vw,4.5rem))]">
        <header className="wrap">
          <Link href="/work" className="group u-on t-mono inline-flex min-h-9 items-center gap-2 text-muted hover:text-fg">
            <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true" />
            All work
          </Link>

          <p aria-hidden="true" className="t-mono mt-10 text-accent">
            {p.number} / {p.kind === "research" ? "Research" : "Case study"}
          </p>
          <h1 className="t-display mt-5 !text-[clamp(2.9rem,1rem+9vw,10rem)] text-balance">
            <MaskText>{p.title}</MaskText>
          </h1>
          <div className="mt-8 grid gap-10 md:grid-cols-12">
            <p className="t-lede text-muted md:col-span-6">{p.tagline}</p>
            <div className="md:col-span-5 md:col-start-8">
              <ProjectMeta project={p} columns={2} />
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="u inline-flex min-h-9 items-center gap-2">
                    Live site <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="u inline-flex min-h-9 items-center gap-2">
                    <GithubIcon className="size-4" /> Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="wrap mt-[clamp(2.5rem,5vw,4.5rem)]">
          <ProjectVisual project={p} variant="hero" aspect="aspect-[4/3] md:aspect-[21/10]" priority sizes="100vw" />
          {!(p.heroImage ?? p.thumbnail) && <p className="t-mono mt-3 text-faint">Fig. {p.number} · Interface sketch, not a screenshot</p>}
        </div>

        <div className="wrap mt-[clamp(4rem,8vw,8rem)] grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 space-y-10">
              <TableOfContents headings={sections} />
              <div>
                <p className="t-mono mb-3 text-muted">Stack</p>
                <ul className="space-y-1.5 text-[0.9rem]">
                  {p.stack.map((g) => (
                    <li key={g.label}>
                      <span className="text-muted">{g.label}: </span>
                      {g.items.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="space-y-[clamp(4rem,8vw,7rem)] lg:col-span-8 lg:col-start-5">
            <Block id="overview" title="Overview">
              <div className="space-y-5">
                {p.fullDescription.map((para, k) => (
                  <p key={k} className={k === 0 ? "t-lede" : "t-body text-muted"}>
                    {para}
                  </p>
                ))}
              </div>
              <TechList items={p.stack.flatMap((g) => g.items)} className="mt-8 lg:hidden" />
            </Block>

            {p.problem.length > 0 && (
              <Block id="problem" title="The problem">
                <div className="space-y-5">
                  {p.problem.map((para, k) => (
                    <p key={k} className="t-body text-muted first:text-fg">
                      {para}
                    </p>
                  ))}
                </div>
              </Block>
            )}

            <Block id="built" title="What I built">
              {p.solution.intro && <p className="t-body text-muted">{p.solution.intro}</p>}
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {p.solution.features.map((f) => (
                  <li key={f} className="flex gap-4 py-3.5 text-[1.02rem]">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>

            {p.architecture && (
              <Block id="architecture" title="Architecture">
                {p.architecture.summary && <p className="t-body mb-8 text-muted">{p.architecture.summary}</p>}
                <ArchitectureDiagram architecture={p.architecture} />
              </Block>
            )}

            {p.decisions.length > 0 && (
              <Block id="decisions" title="Engineering decisions">
                <ol className="space-y-10">
                  {p.decisions.map((d, k) => (
                    <li key={d.title} className="grid gap-3 sm:grid-cols-[3rem_1fr]">
                      <span aria-hidden="true" className="t-mono pt-1.5 text-accent">
                        {String(k + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="t-h3">{d.title}</h3>
                        <p className="t-body mt-3 text-muted">{d.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {p.challenges && p.challenges.length > 0 && (
              <Block id="challenges" title="Challenges">
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.challenges.map((c) => (
                    <div key={c.title} className="rounded-[6px] border border-line bg-raised p-6">
                      <h3 className="text-[1.1rem] leading-snug font-medium tracking-tight">{c.title}</h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{c.body}</p>
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {p.results && p.results.length > 0 && (
              <Block id="outcome" title="Outcome">
                <dl className="divide-y divide-line border-y border-line">
                  {p.results.map((r) => (
                    <div key={r.label} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]">
                      <dt className="t-mono text-accent">{r.label}</dt>
                      <dd className="t-body">{r.detail}</dd>
                    </div>
                  ))}
                </dl>
              </Block>
            )}

            {p.inProgress && (
              <Block id="in-progress" title="In development">
                <div className="rounded-[6px] border border-dashed border-accent/60 bg-accent/5 p-6">
                  <h3 className="t-h3">{p.inProgress.title}</h3>
                  <p className="t-body mt-3 text-muted">{p.inProgress.body}</p>
                </div>
              </Block>
            )}

            {p.gallery && p.gallery.length > 0 && (
              <Block id="gallery" title="Gallery">
                <div className="space-y-8">
                  {p.gallery.map((g) => (
                    <figure key={g.src}>
                      <Image
                        src={g.src}
                        alt={g.alt}
                        width={g.width}
                        height={g.height}
                        sizes="(min-width:1024px) 55vw, 100vw"
                        className="h-auto w-full rounded-[6px] border border-line"
                      />
                      {g.caption && <figcaption className="t-mono mt-3 text-muted">{g.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </Block>
            )}

            {posts.length > 0 && (
              <Block id="writing" title="Related writing">
                <ul className="divide-y divide-line border-y border-line">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="group flex items-center justify-between gap-4 py-5">
                        <span>
                          <span className="t-mono text-muted">{post.category}</span>
                          <span className="mt-1 block text-lg leading-snug tracking-tight text-balance">{post.title}</span>
                        </span>
                        <ArrowRight className="size-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>
        </div>

        <div className="wrap mt-[clamp(5rem,10vw,10rem)] grid gap-10 border-t border-line pt-14 pb-[clamp(4rem,8vw,8rem)] md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="t-mono text-muted">Next project</p>
            <Link href={`/work/${next.slug}`} transitionTypes={["nav-forward"]} className="group mt-4 block">
              <span className="t-h1 flex items-center gap-4 transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-2">
                {next.title}
                <ArrowRight className="size-[0.6em] shrink-0 text-accent" aria-hidden="true" />
              </span>
            </Link>
          </div>
          {related.length > 0 && (
            <div className="md:col-span-4 md:col-start-9">
              <p className="t-mono text-muted">Also see</p>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/work/${r.slug}`} className="u text-lg tracking-tight">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
      <ContactCTA index="§" heading={["Want something", "like this built?"]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
    </PageTransition>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28">
      <Reveal>
        <h2 id={`${id}-h`} className="t-mono mb-8 flex items-center gap-3 text-muted">
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
