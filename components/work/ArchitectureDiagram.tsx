import type { Project } from "@/data/projects";

type Arch = NonNullable<Project["architecture"]>;

/** Data-driven layer diagram. Reads as an ordered list, so it works for screen readers too. */
export function ArchitectureDiagram({ architecture }: { architecture: Arch }) {
  const { layers } = architecture;
  return (
    <ol className="grid gap-3 md:grid-flow-col md:auto-cols-fr md:gap-0" aria-label="Architecture layers">
      {layers.map((layer, i) => (
        <li key={layer.label} className="relative">
          <div className="h-full rounded-[6px] border border-line bg-raised p-5 md:rounded-none md:first:rounded-l-[6px] md:last:rounded-r-[6px] md:[&:not(:first-child)]:border-l-0">
            <p className="flex items-baseline gap-2">
              <span aria-hidden="true" className="t-mono text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[1.02rem] font-medium tracking-tight">{layer.label}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {layer.items.map((item) => (
                <li key={item} className="t-mono !text-[0.7rem] !normal-case !tracking-normal text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {i < layers.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -bottom-3 left-1/2 z-10 grid size-6 -translate-x-1/2 place-items-center rounded-full border border-line-strong bg-bg text-[0.7rem] text-accent md:top-1/2 md:-right-3 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2"
            >
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
