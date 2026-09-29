import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/motion/PageTransition";
import { PostList } from "@/components/blog/PostList";
import { MaskText, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { site } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description: `Engineering notes from ${site.displayName}: how full-stack products are built, from authentication and billing to QR redirects and role-aware social platforms.`,
  path: "/blog",
});

export default function BlogIndex() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured);
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <PageTransition>
      <section className="surface pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))] pb-[clamp(4rem,8vw,8rem)]">
        <div className="wrap">
          <SectionLabel index="§">Writing</SectionLabel>
          <h1 className="t-display mt-8">
            <MaskText>Notes from</MaskText>
            <MaskText delay={0.08}>
              the <span className="serif">build</span>.
            </MaskText>
          </h1>
          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <p className="t-lede text-muted">
                Short, practical articles on the engineering behind the products I build: authentication, billing, redirects and
                role-aware systems.
              </p>
            </Reveal>
            {categories.length > 0 && (
              <Reveal className="md:col-span-5 md:col-start-8">
                <ul className="flex flex-wrap gap-2 md:justify-end" aria-label="Categories">
                  {categories.map((c) => (
                    <li key={c} className="chip">
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          {posts.length === 0 ? (
            <p className="mt-20 text-muted">Nothing published yet. The first articles are on their way.</p>
          ) : (
            <div className="mt-[clamp(3rem,6vw,6rem)]">
              {posts.some((p) => p.draft) && (
                <p className="t-mono mb-6 text-muted">
                  <span className="text-accent">Note</span> · Articles marked Draft are working samples awaiting review.
                </p>
              )}
              <PostList posts={featured ? [featured, ...posts.filter((p) => p !== featured)] : posts} />
            </div>
          )}
        </div>
      </section>
      <ContactCTA index="§" />
    </PageTransition>
  );
}
