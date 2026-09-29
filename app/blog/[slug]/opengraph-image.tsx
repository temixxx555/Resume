import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/blog";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Article";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return renderOg({
    eyebrow: `${post.meta.category} · ${post.meta.readingMinutes} min read`,
    title: post.meta.title,
    subtitle: post.meta.tags.slice(0, 3).join(" · "),
  });
}
