import type { Metadata } from "next";
import { Printer } from "lucide-react";
import { award, certifications, education, experience, languages, volunteering } from "@/data/experience";
import { archive, projects } from "@/data/projects";
import { capabilities } from "@/data/capabilities";
import { personal, site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/motion/PageTransition";
import { Button } from "@/components/ui/Button";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = buildMetadata({
  title: "Résumé",
  description:
    "Web résumé of Adebayo Oluwamotemi Liberty, full-stack software engineer: experience, projects, skills, education and certifications. PDF available.",
  path: "/resume",
});

export default function Resume() {
  const flagship = projects.filter((p) => p.kind === "flagship");
  return (
    <PageTransition>
      <section className="surface pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-[clamp(4rem,8vw,8rem)]">
        <div className="wrap">
          <div className="no-print flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="t-mono text-muted">Résumé</p>
              <h1 className="t-h1 mt-4">The short version.</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={personal.resumePdf} icon="download" download>
                Download PDF
              </Button>
              <PrintButton>
                <Printer className="size-4" aria-hidden="true" />
                Print
              </PrintButton>
            </div>
          </div>

          <article className="mt-12 max-w-4xl border-t border-line pt-10 print:mt-0 print:border-0 print:pt-0">
            <header>
              <p className="text-3xl font-medium tracking-[-0.03em]">{site.name}</p>
              <p className="mt-1 text-muted">{site.role}</p>
              <p className="t-mono mt-4 flex flex-wrap gap-x-5 gap-y-1 text-muted">
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
                <span>{site.location}</span>
                <a href={personal.github}>github.com/{personal.githubHandle}</a>
                <a href={personal.linkedin}>linkedin.com/in/{personal.linkedinHandle}</a>
              </p>
            </header>

            <Section title="Summary">
              <p className="t-body max-w-3xl">
                Full-stack developer and frontend engineer with 3+ years of hands-on experience building and shipping production web
                applications with React, Next.js, TypeScript, Node.js, Express.js and MongoDB. Comfortable owning features end to end,
                from Figma designs and frontend architecture to API design, database schemas, authentication, deployment and
                production optimisation.
              </p>
            </Section>

            <Section title="Experience">
              <ul className="space-y-8">
                {experience.map((r) => (
                  <li key={r.id} className="break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                      <h3 className="font-medium tracking-tight">
                        {r.role}, {r.company}
                      </h3>
                      <p className="t-mono text-muted">{r.period}</p>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {r.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-[0.95rem] leading-relaxed">
                          <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Projects">
              <ul className="space-y-5">
                {flagship.map((p) => (
                  <li key={p.slug} className="break-inside-avoid">
                    <h3 className="font-medium tracking-tight">
                      {p.title} <span className="text-muted">· {p.role}</span>
                    </h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{p.shortDescription}</p>
                  </li>
                ))}
                {archive.map((a) => (
                  <li key={a.name} className="break-inside-avoid">
                    <h3 className="font-medium tracking-tight">
                      {a.name} <span className="text-muted">· {a.role}</span>
                    </h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{a.summary}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Skills">
              <dl className="space-y-3 text-[0.95rem]">
                {capabilities.map((g) => (
                  <div key={g.label} className="grid gap-1 sm:grid-cols-[11rem_1fr]">
                    <dt className="text-muted">{g.label}</dt>
                    <dd>{g.items.map((i) => i.name).join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section title="Education & awards">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                <h3 className="font-medium tracking-tight">
                  {education.degree}, {education.school}
                </h3>
                <p className="t-mono text-muted">{education.period}</p>
              </div>
              <p className="mt-1 text-[0.95rem] text-muted">
                {education.gpa} · {education.focus}
              </p>
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6">
                <h3 className="font-medium tracking-tight">{award.title}</h3>
                <p className="t-mono text-muted">{award.date}</p>
              </div>
              <p className="mt-1 text-[0.95rem] text-muted">{award.detail}</p>
            </Section>

            <Section title="Certifications & volunteering">
              <ul className="space-y-2 text-[0.95rem]">
                {certifications.map((c) => (
                  <li key={c.name} className="flex flex-wrap justify-between gap-x-6">
                    <span>
                      {c.name} <span className="text-muted">· {c.issuer}</span>
                    </span>
                    <span className="t-mono text-muted">{c.date}</span>
                  </li>
                ))}
                {volunteering.map((v) => (
                  <li key={v.title} className="flex flex-wrap justify-between gap-x-6">
                    <span>{v.title}</span>
                    <span className="t-mono text-muted">{v.period}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.95rem] text-muted">Languages: {languages.map((l) => `${l.name} (${l.level})`).join(", ")}</p>
            </Section>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 grid gap-4 border-t border-line pt-6 md:grid-cols-[9rem_1fr] md:gap-8 print:mt-6 print:pt-3">
      <h2 className="t-mono pt-1 text-muted">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
