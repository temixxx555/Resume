import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { award, certifications, education, experience, volunteering } from "@/data/experience";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/motion/PageTransition";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechList } from "@/components/work/ProjectMeta";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description:
    "Professional experience of Adebayo Liberty: Frontend Engineer at IntPlus Nigeria and EasySpend, full-stack work at J3 Rentals, and a B.Sc. in Software Engineering from Bowen University.",
  path: "/experience",
});

export default function Experience() {
  return (
    <PageTransition>
      <section className="surface pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))] pb-[clamp(4rem,8vw,8rem)]">
        <div className="wrap">
          <SectionLabel index="§">Experience</SectionLabel>
          <h1 className="t-display mt-8">
            <MaskText>Impact,</MaskText>
            <MaskText delay={0.08}>
              not <span className="serif">job titles</span>.
            </MaskText>
          </h1>
          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal className="max-w-xl">
              <p className="t-lede text-muted">
                Startup, client and team work across fintech, enterprise and e-commerce. What I shipped, and what it changed.
              </p>
            </Reveal>
            <Reveal className="flex flex-wrap gap-3">
              <Button href="/resume" variant="ghost">
                Web résumé
              </Button>
            </Reveal>
          </div>

          <ol className="mt-[clamp(3rem,6vw,6rem)] border-t border-line">
            {experience.map((r) => (
              <li key={r.id} className="border-b border-line">
                <article className="grid gap-8 py-10 md:grid-cols-12 md:gap-10 md:py-14">
                  <header className="md:col-span-4">
                    <p className="t-mono text-accent">{r.period}</p>
                    <h2 className="t-h2 mt-4">{r.company}</h2>
                    <p className="t-lede mt-2 text-muted">{r.role}</p>
                    <p className="t-mono mt-4 text-muted">
                      {r.location}
                      {r.type ? ` · ${r.type}` : ""}
                    </p>
                  </header>

                  <div className="md:col-span-8">
                    {r.summary && <p className="t-lede">{r.summary}</p>}
                    {r.metrics && (
                      <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
                        {r.metrics.map((m) => (
                          <div key={m.label}>
                            <dd className="text-[clamp(2.2rem,5vw,4rem)] leading-none font-medium tracking-[-0.05em] text-accent">{m.value}</dd>
                            <dt className="mt-3 text-[0.85rem] leading-snug text-muted">{m.label}</dt>
                          </div>
                        ))}
                      </dl>
                    )}
                    <ul className="mt-8 space-y-4">
                      {r.highlights.map((h) => (
                        <li key={h} className="flex gap-4 t-body">
                          <span aria-hidden="true" className="mt-[0.85em] h-px w-4 shrink-0 bg-accent" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {r.shipped && (
                      <div className="mt-8">
                        <p className="t-mono mb-3 text-muted">Work delivered</p>
                        <TechList items={r.shipped} />
                        <p className="mt-3 text-[0.9rem] text-muted">
                          See the <Link href="/work" className="u text-fg">work archive</Link> for more on these projects.
                        </p>
                      </div>
                    )}
                    <div className="mt-8">
                      <p className="t-mono mb-3 text-muted">Stack</p>
                      <TechList items={r.tech} />
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="edu-title" className="paper surface section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel index="§">Education &amp; recognition</SectionLabel>
            <h2 id="edu-title" className="t-h2 mt-6">
              <MaskText>The</MaskText>
              <MaskText delay={0.08}>
                <span className="serif">foundations</span>.
              </MaskText>
            </h2>
          </div>
          <div className="space-y-14 lg:col-span-8">
            <Reveal>
              <p className="t-mono text-muted">{education.period}</p>
              <h3 className="t-h3 mt-3">{education.school}</h3>
              <p className="t-body mt-1 text-muted">
                {education.degree} · {education.location} · {education.gpa}
              </p>
              <p className="t-body mt-4 max-w-xl">{education.focus}. Coursework: {education.coursework.join(", ")}.</p>
            </Reveal>

            <Reveal>
              <p className="t-mono text-muted">{award.date}</p>
              <h3 className="t-h3 mt-3">{award.title}</h3>
              <p className="t-body mt-1 text-muted">{award.org}</p>
              <p className="t-body mt-4 max-w-xl">{award.detail}</p>
              <Link href={`/work/${award.project}`} className="group mt-4 inline-flex items-center gap-2">
                <span className="u">Read the project</span>
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>

            <Reveal>
              <h3 className="t-mono text-muted">Certifications</h3>
              <ul className="mt-4 border-t border-line">
                {certifications.map((c) => (
                  <li key={c.name} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <span>
                      <span className="block font-medium tracking-tight">{c.name}</span>
                      <span className="text-[0.9rem] text-muted">{c.issuer}</span>
                    </span>
                    <span className="t-mono text-muted">{c.date}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h3 className="t-mono text-muted">Volunteering</h3>
              <ul className="mt-4 border-t border-line">
                {volunteering.map((v) => (
                  <li key={v.title} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <span>
                      <span className="block font-medium tracking-tight">{v.title}</span>
                      <span className="text-[0.9rem] text-muted">{v.detail}</span>
                    </span>
                    <span className="t-mono text-muted">{v.period}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
      <ContactCTA index="§" />
    </PageTransition>
  );
}
