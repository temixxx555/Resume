import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { absoluteUrl, buildMetadata, jsonLdString, personJsonLd } from "@/lib/seo";
import { personal, site } from "@/data/site";
import { education, languages, volunteering } from "@/data/experience";
import { PageTransition } from "@/components/motion/PageTransition";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LocalTime } from "@/components/layout/LocalTime";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Adebayo Liberty is a full-stack software engineer in Lagos with a B.Sc. in Software Engineering from Bowen University. He takes products from idea to production.",
  path: "/about",
});

const principles = [
  {
    title: "Ship vertical slices",
    body: "A feature is not done when the screen looks right. It is done when the interface, the API and the data all work together.",
  },
  {
    title: "Make every state honest",
    body: "Loading, empty, error and validation states are part of the product. Users spend more time in them than designers expect.",
  },
  {
    title: "Put a contract between layers",
    body: "Typed API contracts between frontend and backend catch a whole class of bugs before anyone opens a browser.",
  },
  {
    title: "Reuse on purpose",
    body: "A good component system removes decisions. At IntPlus, a shared shadcn/ui-based system cut the time to build new features by about 30%.",
  },
];

const now = [
  { label: "Backend developer", detail: "Anvil Build Cycle, a six-week MVP sprint with a student team." },
  { label: "Founder", detail: "Continuing to build Campus Connect for university communities." },
  { label: "Building", detail: "An enterprise and rewards direction for QR Platform." },
];

export default function About() {
  const p = personal.portrait;
  return (
    <PageTransition>
      <section className="surface pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))] pb-[clamp(4rem,8vw,8rem)]">
        <div className="wrap">
          <SectionLabel index="§">About</SectionLabel>
          <h1 className="t-h1 mt-8 max-w-5xl">
            <MaskText>Trained as an engineer.</MaskText>
            <MaskText delay={0.08}>
              Driven by <span className="serif">building</span> things.
            </MaskText>
          </h1>

          <div className="mt-[clamp(3rem,6vw,6rem)] grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {p ? (
                  <Image src={p.src} alt={p.alt} width={p.width} height={p.height} priority sizes="(min-width:1024px) 30vw, 100vw" className="h-auto w-full rounded-[6px] border border-line" />
                ) : (
                  <div className="art-frame relative grid aspect-[4/5] place-items-center">
                    <div aria-hidden="true" className="grid-bg absolute inset-0" />
                    <span aria-hidden="true" className="serif relative text-[clamp(6rem,14vw,11rem)] leading-none text-fg">
                      AL
                    </span>
                    <dl className="t-mono absolute inset-x-5 bottom-5 flex justify-between text-muted">
                      <div>
                        <dt className="sr-only">Location</dt>
                        <dd>Lagos, NG</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Coordinates</dt>
                        <dd>6.52° N · 3.38° E</dd>
                      </div>
                    </dl>
                  </div>
                )}
                <p className="t-mono mt-4 text-muted">
                  {site.location} · <LocalTime />
                </p>
              </div>
            </div>

            <div className="space-y-16 lg:col-span-7 lg:col-start-6">
              <Reveal className="space-y-6">
                <p className="t-lede">
                  I am a software engineer in Lagos. I studied Software Engineering at Bowen University, and I have spent the last
                  three-plus years building web products: the interface, the API, the database, authentication, payments and the
                  deployment that keeps it online.
                </p>
                <p className="t-body text-muted">
                  What I care about most is the space between a design and a working product. The loading state nobody specified.
                  The permission rule that only shows up in production. The endpoint that needs a contract both sides can trust.
                  That is where a lot of software quietly goes wrong, and it is where I like to spend my time.
                </p>
                <p className="t-body text-muted">
                  Beyond client and startup work, I build my own things. <Link href="/work/campus-connect" className="u text-fg">Campus Connect</Link> is a
                  social platform I founded for university communities. <Link href="/work/qr-platform" className="u text-fg">QR Platform</Link> is a subscription
                  product with billing and analytics. My final-year project was a{" "}
                  <Link href="/work/lss-classification" className="u text-fg">deep-learning model for medical imaging</Link>, which is a long way from a React
                  component and a good reminder that the most interesting problems are rarely shaped like one.
                </p>
              </Reveal>

              <div>
                <h2 className="t-mono text-muted">How I work</h2>
                <ol className="mt-6 border-t border-line">
                  {principles.map((pr, i) => (
                    <li key={pr.title}>
                      <Reveal className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3rem_1fr]">
                        <span aria-hidden="true" className="t-mono pt-1.5 text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="t-h3">{pr.title}</h3>
                          <p className="t-body mt-2 max-w-xl text-muted">{pr.body}</p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="t-mono text-muted">Right now</h2>
                <ul className="mt-6 border-t border-line">
                  {now.map((n) => (
                    <li key={n.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                      <span className="font-medium tracking-tight">{n.label}</span>
                      <span className="text-muted">{n.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="beyond-title" className="paper surface section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel index="§">Beyond the code</SectionLabel>
            <h2 id="beyond-title" className="t-h2 mt-6">
              <MaskText>Where the</MaskText>
              <MaskText delay={0.08}>
                <span className="serif">curiosity</span> goes.
              </MaskText>
            </h2>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            <Reveal>
              <h3 className="t-mono text-muted">Interests</h3>
              <ul className="t-lede mt-4 space-y-1.5">
                <li>AI and machine learning</li>
                <li>AI agents and robots</li>
                <li>Startups: building, growth, scale</li>
                <li>Solo development and game jams</li>
                <li>Community</li>
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="t-mono text-muted">Education</h3>
              <p className="t-lede mt-4">{education.school}</p>
              <p className="t-body mt-1 text-muted">
                {education.degree} · {education.period} · {education.gpa}
              </p>
              <h3 className="t-mono mt-8 text-muted">Volunteering</h3>
              {volunteering.map((v) => (
                <p key={v.title} className="t-body mt-3">
                  {v.title}
                  <span className="block text-muted">{v.detail}</span>
                </p>
              ))}
              <h3 className="t-mono mt-8 text-muted">Languages</h3>
              <p className="t-body mt-3">{languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="surface section">
        <div className="wrap flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <p className="t-h2 max-w-2xl text-balance">
            See the <span className="serif">work</span>, or the résumé.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-lg tracking-tight">
            {[
              { href: "/work", label: "Selected work" },
              { href: "/experience", label: "Experience" },
              { href: "/resume", label: "Résumé" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group inline-flex items-center gap-2">
                <span className="u">{l.label}</span>
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA index="§" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString({ "@context": "https://schema.org", "@type": "ProfilePage", url: absoluteUrl("/about"), mainEntity: { "@id": personJsonLd["@id"] } }) }} />
    </PageTransition>
  );
}
