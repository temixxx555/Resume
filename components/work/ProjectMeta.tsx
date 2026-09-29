import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Metadata list. Only renders fields that exist. */
export function ProjectMeta({ project, className, columns = 2 }: { project: Project; className?: string; columns?: 1 | 2 | 4 }) {
  const rows: [string, string][] = [["Role", project.role], ["Status", project.status]];
  if (project.year) rows.push(["Year", project.year]);
  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-2",
        columns === 4 && "grid-cols-2 md:grid-cols-4",
        className,
      )}
    >
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="t-mono text-muted">{k}</dt>
          <dd className="mt-1.5 text-[0.98rem] leading-snug">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TechList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function allTech(project: Project) {
  return project.stack.flatMap((g) => g.items);
}
