import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { getMdxComponents } from "./mdx";

const prettyCode: Options = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: { block: "plaintext" },
};

/** Compiles MDX on the server. No MDX runtime or highlighter ships to the browser. */
export function PostBody({ source }: { source: string }) {
  return (
    <div className="prose-editorial">
      <MDXRemote
        source={source}
        components={getMdxComponents()}
        options={{
          mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [[rehypePrettyCode, prettyCode]] },
        }}
      />
    </div>
  );
}
