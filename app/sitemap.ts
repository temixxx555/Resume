import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getPublishedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/work", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/experience", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/resume", priority: 0.6, changeFrequency: "monthly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    priority,
    changeFrequency: changeFrequency as "monthly" | "yearly" | "weekly",
  }));

  const work: MetadataRoute.Sitemap = projects.map((p) => ({
    url: absoluteUrl(`/work/${p.slug}`),
    lastModified: now,
    priority: p.kind === "flagship" ? 0.9 : 0.7,
    changeFrequency: "monthly",
  }));

  // Drafts are deliberately excluded until they are approved.
  const posts: MetadataRoute.Sitemap = getPublishedPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updated ?? p.date),
    priority: 0.6,
    changeFrequency: "yearly",
  }));

  return [...pages, ...work, ...posts];
}
