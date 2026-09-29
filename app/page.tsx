import { PageTransition } from "@/components/motion/PageTransition";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ExperienceSnapshot } from "@/components/sections/ExperienceSnapshot";
import { Capabilities } from "@/components/sections/Capabilities";
import { AboutSnippet } from "@/components/sections/AboutSnippet";
import { ResearchStrip } from "@/components/sections/ResearchStrip";
import { WritingPreview } from "@/components/sections/WritingPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <SelectedWork />
      <ExperienceSnapshot />
      <Capabilities />
      <AboutSnippet />
      <ResearchStrip />
      <WritingPreview />
      <ContactCTA />
    </PageTransition>
  );
}
