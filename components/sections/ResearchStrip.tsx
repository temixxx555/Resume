import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProject } from "@/data/projects";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { ImageReveal, MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechList } from "@/components/work/ProjectMeta";

export function ResearchStrip() {
  const p = getProject("lss-classification");
  if (!p) return null;
  return (
    <section aria-labelledby="research-title" className="cv-auto surface section border-t border-line">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:order-2">
          <SectionLabel index="05">AI &amp; research</SectionLabel>
          <h2 id="research-title" className="t-h2 mt-6">
            <MaskText>Past the</MaskText>
            <MaskText delay={0.08}>
              <span className="serif">browser</span> too.
            </MaskText>
          </h2>
          <Reveal className="mt-8 space-y-5">
            <p className="t-lede">
              My final-year project applied deep learning with attention mechanisms to lumbar spinal stenosis classification from
              MRI. It earned a Grade A.
            </p>
            <p className="t-body text-muted">
              It sits beside my product work, not in place of it. Reading papers, preparing data and questioning a model’s output
              make me a more careful engineer everywhere else.
            </p>
            <TechList items={["Python", "Deep learning", "Attention", "Medical imaging"]} />
            <Link href={`/work/${p.slug}`} className="group inline-flex min-h-11 items-center gap-3 pt-2 text-lg tracking-tight">
              <span className="u">Read the project</span>
              <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:order-1">
          <ImageReveal>
            <Link href={`/work/${p.slug}`} data-cursor="View project" tabIndex={-1} aria-hidden="true" className="block">
              <ProjectVisual project={p} aspect="aspect-[4/3]" sizes="(min-width:1024px) 55vw, 100vw" decorative />
            </Link>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
