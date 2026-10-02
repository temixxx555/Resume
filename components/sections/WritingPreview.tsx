import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { PostList } from "@/components/blog/PostList";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function WritingPreview() {
  const posts = getAllPosts().slice(0, 4);
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="writing-title" className="cv-auto surface section border-t border-line">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="06">Writing</SectionLabel>
            <h2 id="writing-title" className="t-h2 mt-6">
              <MaskText>Notes on how</MaskText>
              <MaskText delay={0.08}>
                things <span className="serif">actually</span> work.
              </MaskText>
            </h2>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-3 text-lg tracking-tight md:pb-2">
            <span className="u">All articles</span>
            <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <Reveal className="mt-12">
          <PostList posts={posts} />
        </Reveal>
      </div>
    </section>
  );
}
