import { capabilities, capabilityWork } from "@/data/capabilities";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CapabilityMatrix } from "./CapabilityMatrix";

export function Capabilities({ index = "03", compact = false }: { index?: string; compact?: boolean }) {
  return (
    <section aria-labelledby="cap-title" className="cv-auto surface section">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel index={index}>Capabilities</SectionLabel>
            <h2 id="cap-title" className="t-h1 mt-6">
              <MaskText>The whole</MaskText>
              <MaskText delay={0.08}>
                <span className="serif">stack</span>, in context.
              </MaskText>
            </h2>
          </div>
          {!compact && (
            <Reveal className="md:col-span-4">
              <p className="t-body text-muted">
                Tools mean little on their own. Pick a project to see where each one earned its place.
              </p>
            </Reveal>
          )}
        </div>
        <div className="mt-14 md:mt-20">
          <CapabilityMatrix groups={capabilities} work={capabilityWork} />
        </div>
      </div>
    </section>
  );
}
