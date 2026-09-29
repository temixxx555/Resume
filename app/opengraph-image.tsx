import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/data/site";

export const alt = `${site.displayName}: ${site.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Portfolio",
    title: "Adebayo Liberty",
    emphasis: "Liberty",
    subtitle: "Full-Stack Software Engineer. Next.js, TypeScript, Node.js, MongoDB.",
  });
}
