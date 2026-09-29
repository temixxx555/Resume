import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/data/projects";
import { ProjectArt } from "./ProjectArt";
import { cn } from "@/lib/utils";

/**
 * The project's visual: real screenshot if one is set in the data, otherwise the drawn sketch.
 * Shares a view-transition name with its twin on the case-study page so the image morphs on navigation.
 */
export function ProjectVisual({
  project,
  variant = "thumb",
  aspect = "aspect-[16/10]",
  className,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  decorative = false,
}: {
  project: Project;
  variant?: "thumb" | "hero";
  aspect?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  decorative?: boolean;
}) {
  const img = variant === "hero" ? (project.heroImage ?? project.thumbnail) : (project.thumbnail ?? project.heroImage);
  return (
    <ViewTransition name={`project-${project.slug}`} share="project-morph" default="none">
      <div className={cn("art-frame", aspect, className)}>
        {img ? (
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes={sizes}
            priority={priority}
            className="art-inner h-full w-full object-cover"
          />
        ) : (
          <ProjectArt kind={project.art} decorative={decorative} />
        )}
      </div>
    </ViewTransition>
  );
}
