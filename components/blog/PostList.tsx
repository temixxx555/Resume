import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

/** Editorial index: date, title, description and tags on a hairline grid. */
export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="border-t border-line">
      {posts.map((p) => (
        <li key={p.slug} className="border-b border-line">
          <Link href={`/blog/${p.slug}`} className="group grid gap-3 py-8 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-10">
            <div className="t-mono flex items-center gap-3 text-muted md:col-span-3 md:flex-col md:items-start md:gap-2">
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <span className="flex items-center gap-2">
                <span>{p.category}</span>
                <span aria-hidden="true">·</span>
                <span>{p.readingMinutes} min</span>
              </span>
            </div>
            <div className="md:col-span-8">
              <h3 className="t-h3 flex items-start gap-3 transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-1.5">
                <span className="text-balance">{p.title}</span>
                {p.draft && (
                  <span className="t-mono mt-1 shrink-0 rounded-[3px] border border-accent px-1.5 py-0.5 !text-[0.62rem] text-accent">Draft</span>
                )}
              </h3>
              <p className="t-body mt-3 max-w-2xl text-muted">{p.description}</p>
              {p.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                  {p.tags.slice(0, 4).map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ArrowUpRight
              className="hidden size-6 justify-self-end text-muted transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent md:block"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
