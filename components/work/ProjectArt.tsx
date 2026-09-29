import type { ArtKind } from "@/data/projects";
import { artMarkup } from "./art-markup.generated";

/**
 * The sketches are pre-rendered to static SVG strings by scripts/generate-art.tsx
 * (edit components/work/art-source.tsx, then run `npm run art`). Injecting them as opaque
 * markup keeps them inline (page fonts and colours apply) while React skips their
 * hundreds of nodes during hydration.
 */
export function ProjectArt({ kind, decorative = false }: { kind: ArtKind; decorative?: boolean }) {
  const key = `${kind}:${decorative ? "d" : "l"}`;
  return <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: artMarkup[key] }} />;
}
