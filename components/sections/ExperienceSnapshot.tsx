import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { experience } from "@/data/experience";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ExperienceSnapshot() {
  const roles = experience.filter((r) => ["intplus", "easyspend", "j3"].includes(r.id));
  return (
    <section aria-labelledby="exp-title" className="cv-auto paper surface section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="02">Experience</SectionLabel>
            <h2 id="exp-title" className="t-h2 mt-6">
              <MaskText>Shipping for</MaskText>
              <MaskText delay={0.08}>
                <span className="serif">real</span> teams.
              </MaskText>
            </h2>
            <p className="t-body mt-6 max-w-sm text-muted">
              Startup and client work where interfaces had to be fast, consistent and ready for production, not just for a demo.
            </p>
            <Link href="/experience" className="group mt-8 inline-flex items-center gap-3 text-lg tracking-tight">
              <span className="u">Full experience</span>
              <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {roles.map((r) => (
            <li key={r.id}>
              <Reveal className="grid gap-4 border-t border-line py-9 md:grid-cols-12 md:gap-8">
                <p className="t-mono text-muted md:col-span-3">{r.period}</p>
                <div className="md:col-span-9">
                  <h3 className="t-h3">
                    {r.role} <span className="text-muted">·</span> {r.company}
                  </h3>
                  {r.summary && <p className="t-body mt-3 max-w-xl text-muted">{r.summary}</p>}
                  {r.metrics && (
                    <dl className="mt-6 grid grid-cols-3 gap-4">
                      {r.metrics.slice(0, 3).map((m) => (
                        <div key={m.label}>
                          <dd className="text-[clamp(2rem,4.4vw,3.4rem)] leading-none font-medium tracking-[-0.05em] text-accent">{m.value}</dd>
                          <dt className="mt-2 text-[0.8rem] leading-snug text-muted">{m.label}</dt>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
          <li className="border-t border-line" aria-hidden="true" />
        </ol>
      </div>
    </section>
  );
}
