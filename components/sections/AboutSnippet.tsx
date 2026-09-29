import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutSnippet() {
  return (
    <section aria-labelledby="about-title" className="cv-auto surface section border-t border-line">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel index="04">About</SectionLabel>
          <h2 id="about-title" className="t-h2 mt-6">
            <MaskText>An engineer who</MaskText>
            <MaskText delay={0.08}>
              owns the <span className="serif">whole path</span>.
            </MaskText>
          </h2>
        </div>
        <Reveal className="space-y-6 lg:col-span-6 lg:col-start-7">
          <p className="t-lede">
            I am a software engineer in Lagos with a B.Sc. in Software Engineering from Bowen University. I like taking a product
            from a rough idea to something people can log into, pay for and rely on.
          </p>
          <p className="t-body text-muted">
            That has meant writing the interface, the API, the data model, the auth and the deploy pipeline myself, then going back
            to make the loading, empty and error states honest. I have done it at a startup, on client projects, and on my own
            product, Campus Connect.
          </p>
          <Link href="/about" className="group inline-flex items-center gap-3 text-lg tracking-tight">
            <span className="u">More about me</span>
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
