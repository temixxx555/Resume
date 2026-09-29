import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentPosts, getAllPosts, getHeadings, getPost, getRelatedPosts } from "@/lib/blog";
import { absoluteUrl, buildMetadata, jsonLdString } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";
import { PageTransition } from "@/components/motion/PageTransition";
import { PostBody } from "@/components/blog/PostBody";
import { PostList } from "@/components/blog/PostList";
import { ReadingProgress, ShareBar, TableOfContents } from "@/components/blog/ArticleChrome";
import { ContactCTA } from "@/components/sections/ContactCTA";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { meta } = post;
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: meta.date,
    modifiedTime: meta.updated ?? meta.date,
    tags: meta.tags,
    noindex: meta.draft,
  });
}

export default async function Article({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, content } = post;

  const headings = getHeadings(content);
  const showToc = headings.filter((h) => h.level === 2).length >= 3;
  const { newer, older } = getAdjacentPosts(slug);
  const related = getRelatedPosts(meta, 2);
  const projects = meta.projects.map((s) => getProject(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const url = absoluteUrl(`/blog/${slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    mainEntityOfPage: url,
    url,
    keywords: meta.tags.join(", "),
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
  };

  return (
    <PageTransition>
      <ReadingProgress />
      <article className="surface pt-[calc(var(--header-h)+clamp(2rem,5vw,5rem))]">
        <header className="wrap">
          <Link href="/blog" className="group u-on t-mono inline-flex min-h-9 items-center gap-2 text-muted hover:text-fg">
            <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true" />
            All writing
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <p className="t-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                <span className="text-accent">{meta.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{meta.readingMinutes} min read</span>
                {meta.updated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
                    </span>
                  </>
                )}
              </p>
              <h1 className="t-article mt-6 text-balance">{meta.title}</h1>
              <p className="t-lede mt-8 max-w-3xl text-muted">{meta.description}</p>
              {meta.draft && (
                <p className="t-mono mt-8 inline-block rounded-[4px] border border-dashed border-accent/60 bg-accent/5 px-3 py-2 text-accent">
                  Sample draft · pending author review
                </p>
              )}
            </div>
          </div>
        </header>

        <div className="wrap mt-[clamp(3rem,6vw,5rem)] grid gap-14 border-t border-line pt-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <PostBody source={content} />
            <div className="mt-16 max-w-2xl border-t border-line pt-6">
              <ShareBar url={url} title={meta.title} />
            </div>

            {projects.length > 0 && (
              <div className="mt-14 max-w-2xl">
                <p className="t-mono text-muted">Related work</p>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {projects.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/work/${p.slug}`} className="group flex items-center justify-between gap-4 py-5">
                        <span>
                          <span className="t-h3 block">{p.title}</span>
                          <span className="mt-1 block text-[0.92rem] text-muted">{p.tagline}</span>
                        </span>
                        <ArrowRight className="size-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {showToc && (
            <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
              <div className="sticky top-28">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>

        <div className="wrap mt-[clamp(4rem,8vw,7rem)] pb-[clamp(4rem,8vw,7rem)]">
          {related.length > 0 && (
            <>
              <p className="t-mono mb-6 text-muted">Keep reading</p>
              <PostList posts={related} />
            </>
          )}
          {(newer || older) && (
            <nav aria-label="Article navigation" className="mt-12 grid gap-4 sm:grid-cols-2">
              {older ? (
                <Link href={`/blog/${older.slug}`} className="group rounded-[6px] border border-line p-5 transition-colors hover:border-line-strong">
                  <span className="t-mono text-muted">← Older</span>
                  <span className="mt-2 block text-lg leading-snug tracking-tight text-balance">{older.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {newer && (
                <Link href={`/blog/${newer.slug}`} className="group rounded-[6px] border border-line p-5 text-right transition-colors hover:border-line-strong">
                  <span className="t-mono text-muted">Newer →</span>
                  <span className="mt-2 block text-lg leading-snug tracking-tight text-balance">{newer.title}</span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </article>
      <ContactCTA index="§" heading={["Building something", "similar?"]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
    </PageTransition>
  );
}
