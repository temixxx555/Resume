import Link from "next/link";
import { nav, personal, site, socials } from "@/data/site";
import { LocalTime } from "./LocalTime";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="surface border-t border-line">
      <div className="wrap grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-xl font-medium tracking-tight">{site.name}</p>
          <p className="mt-2 max-w-sm text-muted">
            {site.role}. Building products from interface to infrastructure, from {site.location}.
          </p>
          <a href={`mailto:${personal.email}`} className="u mt-6 inline-block text-lg tracking-tight">
            {personal.email}
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="t-mono text-muted">Pages</p>
          <ul className="mt-4 space-y-2">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/resume", label: "Résumé" }, { href: "/contact", label: "Contact" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="u">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="t-mono text-muted">Elsewhere</p>
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="u">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/rss.xml" className="u">
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap t-mono flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-muted">
          <span>
            © {year} {site.name}
          </span>
          <span>
            Lagos, NG · <LocalTime />
          </span>
          <span className="hidden sm:inline">Press ⌘K / Ctrl K to jump anywhere</span>
        </div>
      </div>
    </footer>
  );
}
