import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { personal, site } from "@/data/site";
import { PageTransition } from "@/components/motion/PageTransition";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { LocalTime } from "@/components/layout/LocalTime";
import { ContactForm } from "@/components/sections/ContactForm";
import { CopyEmail } from "@/components/sections/CopyEmail";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${site.displayName} about full-time roles, contract work or a product you want built. Email, LinkedIn and GitHub.`,
  path: "/contact",
});

export default function Contact() {
  return (
    <PageTransition>
      <section className="surface pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))] pb-[clamp(4rem,8vw,8rem)]">
        <div className="wrap">
          <SectionLabel index="§">Contact</SectionLabel>
          <h1 className="t-display mt-8 !text-[clamp(3.2rem,1rem+8.4vw,9.5rem)]">
            <MaskText>Let’s build</MaskText>
            <MaskText delay={0.08}>
              something <span className="serif">useful</span>.
            </MaskText>
          </h1>

          <div className="mt-[clamp(3rem,6vw,6rem)] grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal className="space-y-10">
                <div>
                  <p className="t-mono mb-4 text-muted">Email</p>
                  <CopyEmail />
                </div>

                {personal.availability.open && (
                  <p className="flex items-start gap-3">
                    <span aria-hidden="true" className="pulse-dot mt-[0.55em] size-2 shrink-0 rounded-full bg-accent" />
                    <span>
                      <span className="block font-medium tracking-tight">{personal.availability.label}</span>
                      <span className="text-muted">{personal.availability.detail}.</span>
                    </span>
                  </p>
                )}

                <ul className="border-t border-line">
                  <li>
                    <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center justify-between border-b border-line">
                      <span className="inline-flex items-center gap-3">
                        <LinkedinIcon className="size-5" /> LinkedIn
                      </span>
                      <span className="t-mono text-muted transition-colors group-hover:text-accent">{personal.linkedinHandle} ↗</span>
                    </a>
                  </li>
                  <li>
                    <a href={personal.github} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center justify-between border-b border-line">
                      <span className="inline-flex items-center gap-3">
                        <GithubIcon className="size-5" /> GitHub
                      </span>
                      <span className="t-mono text-muted transition-colors group-hover:text-accent">@{personal.githubHandle} ↗</span>
                    </a>
                  </li>
                  <li>
                    <a href={personal.resumePdf} download className="group flex min-h-14 items-center justify-between border-b border-line">
                      <span>Résumé (PDF)</span>
                      <span className="t-mono text-muted transition-colors group-hover:text-accent">Download ↓</span>
                    </a>
                  </li>
                </ul>

                <p className="t-mono text-muted">
                  {site.location} · <LocalTime />
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                <h2 className="t-h3 mb-8">Or send the details here</h2>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
