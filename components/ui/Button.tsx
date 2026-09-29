import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  icon?: "arrow" | "up-right" | "download" | "none";
  className?: string;
  /** Opens in a new tab. mailto: and tel: links never do. */
  external?: boolean;
  download?: boolean;
  "aria-label"?: string;
};

export function Button({
  href,
  children,
  variant = "solid",
  icon = "arrow",
  className,
  external,
  download,
  ...rest
}: Props) {
  const Icon = icon === "arrow" ? ArrowRight : icon === "up-right" ? ArrowUpRight : icon === "download" ? Download : null;
  const cls = cn("btn", variant === "solid" ? "btn-solid" : "btn-ghost", className);
  const inner = (
    <>
      <span>{children}</span>
      {Icon && <Icon className={icon === "arrow" ? "arrow size-4" : "size-4"} aria-hidden="true" />}
    </>
  );
  const isInternal = href.startsWith("/") && !download && !href.endsWith(".pdf");
  if (isInternal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {inner}
    </a>
  );
}
