import { cn } from "@/lib/utils";

/** Mono index label: "01 — Selected work". The index is decorative, so it is hidden from assistive tech. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("t-mono flex items-center gap-3 text-muted", className)}>
      {index && (
        <span aria-hidden="true" className="text-accent">
          {index}
        </span>
      )}
      <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}
