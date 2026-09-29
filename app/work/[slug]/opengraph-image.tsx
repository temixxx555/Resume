import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Case study";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return renderOg({
    eyebrow: p.kind === "research" ? "Research" : "Case study",
    title: p.title,
    subtitle: p.tagline,
  });
}
