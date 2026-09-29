import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { z } from "zod";
import { site } from "@/data/site";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const frontmatter = z.object({
  title: z.string(),
  description: z.string(),
  date: z.union([z.string(), z.date()]).transform((d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d)),
  updated: z
    .union([z.string(), z.date()])
    .transform((d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d))
    .optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  cover: z.string().optional(),
  /** Slugs from data/projects.ts that this article relates to. */
  projects: z.array(z.string()).default([]),
});

export type PostMeta = z.infer<typeof frontmatter> & {
  slug: string;
  readingMinutes: number;
};

export type Post = { meta: PostMeta; content: string };
export type Heading = { id: string; text: string; level: 2 | 3 };

function isVisible(draft: boolean) {
  if (!draft) return true;
  if (process.env.NODE_ENV !== "production") return true;
  return site.showDraftsInProduction;
}

function readPost(file: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = frontmatter.parse(data);
  return {
    meta: { ...fm, slug, readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)) },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readPost(f).meta)
    .filter((m) => isVisible(m.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Posts that should appear in the sitemap and RSS: never drafts. */
export function getPublishedPosts() {
  return getAllPosts().filter((p) => !p.draft);
}

export function getPost(slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    const file = `${slug}${ext}`;
    if (fs.existsSync(path.join(CONTENT_DIR, file))) {
      const post = readPost(file);
      return isVisible(post.meta.draft) ? post : null;
    }
  }
  return null;
}

/** Extract h2/h3 headings (ignoring fenced code) for the table of contents. */
export function getHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[`*_]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    headings.push({ id: slugger.slug(text), text, level: m[1].length as 2 | 3 });
  }
  return headings;
}

export function getAdjacentPosts(slug: string) {
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    newer: i > 0 ? all[i - 1] : null,
    older: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
  };
}

export function getRelatedPosts(meta: PostMeta, limit = 2) {
  return getAllPosts()
    .filter((p) => p.slug !== meta.slug)
    .map((p) => ({
      p,
      score:
        p.tags.filter((t) => meta.tags.includes(t)).length * 2 +
        (p.category === meta.category ? 1 : 0) +
        p.projects.filter((s) => meta.projects.includes(s)).length * 2,
    }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.p);
}

export function postsForProject(projectSlug: string, explicit: string[] = []) {
  const all = getAllPosts();
  const byLink = all.filter((p) => explicit.includes(p.slug));
  const byTag = all.filter((p) => p.projects.includes(projectSlug) && !explicit.includes(p.slug));
  return [...byLink, ...byTag];
}
