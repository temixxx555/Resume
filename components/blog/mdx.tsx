import Image from "next/image";
import Link from "next/link";
import GithubSlugger from "github-slugger";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) return textOf((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  return "";
}

/** Heading components share one slugger per render so ids match lib/blog.ts getHeadings(). */
function makeHeading(level: 2 | 3) {
  const Tag = `h${level}` as const;
  const slugger = new GithubSlugger();
  return function Heading({ children }: { children?: React.ReactNode }) {
    const id = slugger.slug(textOf(children));
    return (
      <Tag id={id} className="group">
        <a href={`#${id}`} className="!no-underline">
          {children}
          <span aria-hidden="true" className="ml-2 text-faint opacity-0 transition-opacity group-hover:opacity-100">
            #
          </span>
        </a>
      </Tag>
    );
  };
}

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: "note" | "warning" | "todo";
  title?: string;
  children: React.ReactNode;
}) {
  const label = title ?? (type === "warning" ? "Watch out" : type === "todo" ? "To fill in" : "Note");
  return (
    <aside
      className={cn(
        "not-prose rounded-[6px] border p-5 text-[0.95rem] leading-relaxed",
        type === "todo" ? "border-dashed border-accent/60 bg-accent/5" : "border-line bg-raised",
      )}
    >
      <p className={cn("t-mono mb-2", type === "note" ? "text-muted" : "text-accent")}>{label}</p>
      <div className="[&>*+*]:mt-3 [&_a]:underline [&_code]:font-mono [&_code]:text-[0.9em]">{children}</div>
    </aside>
  );
}

export function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}) {
  return (
    <figure>
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 44rem, 100vw" className="h-auto w-full rounded-[6px] border border-line" />
      {caption && <figcaption className="t-mono mt-3 text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Fresh component map per render so heading slug counters start at zero. */
export function getMdxComponents(): MDXComponents {
  return {
    h2: makeHeading(2),
    h3: makeHeading(3),
    pre: (props) => <CodeBlock {...props} />,
    a: ({ href = "", children, ...rest }) => {
      if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
      if (href.startsWith("#")) return <a href={href}>{children}</a>;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    },
    table: (props) => (
      <div className="-mx-1 overflow-x-auto px-1">
        <table {...props} />
      </div>
    ),
    Callout,
    Figure,
  };
}
