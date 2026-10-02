import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { personal } from "@/data/site";

/** Closing statement, used on the home page and at the end of case studies. */
export function ContactCTA({ index = "07", heading }: { index?: string; heading?: [string, string] }) {
  const [l1, l2] = heading ?? ["Have something", "worth building?"];
  return (
    <section aria-labelledby="cta-title" className="cv-auto paper surface section overflow-clip">
      <div className="wrap">
        <SectionLabel index={index}>Contact</SectionLabel>
        <h2 id="cta-title" className="mt-8 text-[clamp(3.1rem,1rem+10vw,11rem)] leading-[0.86] font-[560] tracking-[-0.06em]">
          <MaskText>{l1}</MaskText>
          <MaskText delay={0.08}>
            <span className="serif">{l2}</span>
          </MaskText>
        </h2>

        <div className="mt-12 grid items-end gap-10 md:mt-16 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="t-lede max-w-md">
              I am open to full-time roles and select contract work. Send a note with what you are building and I will reply
              personally.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-6 md:col-span-6 md:items-end" delay={0.1}>
            <Magnetic>
              <Button href={`mailto:${personal.email}`} icon="up-right" className="!min-h-14 !px-7 !text-base">
                {personal.email}
              </Button>
            </Magnetic>
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
              {/* <li>
                <Link href="/contact" className="u inline-flex min-h-9 items-center">
                  Contact page
                </Link>
              </li> */}
              <li>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="u inline-flex min-h-9 items-center gap-2">
                  <LinkedinIcon className="size-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={personal.whatsapp} target="_blank" rel="noopener noreferrer" className="u inline-flex min-h-9 items-center gap-2">
                  <WhatsappIcon className="size-4" /> Whatsapp
                </a>
              </li>
              <li>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="u inline-flex min-h-9 items-center gap-2">
                  <GithubIcon className="size-4" /> GitHub
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
