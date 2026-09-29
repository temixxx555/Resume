"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Command } from "lucide-react";
import { contactHref, nav, personal, site, socials } from "@/data/site";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/MotionProvider";
import { LocalTime } from "./LocalTime";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  // Appear on scroll-up, tuck away on scroll-down. Always visible near the top or while the menu is open.
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 120) setHidden(false);
      else if (y - lastY.current > 8) setHidden(true);
      else if (lastY.current - y > 8) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes (state adjusted during render, no effect needed).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <nav aria-label="Primary" className="wrap flex h-[var(--header-h)] items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-[5px] border border-line-strong text-[0.72rem] font-medium tracking-tight transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
            >
              {site.initials}
            </span>
            <span className="sr-only text-[0.95rem] font-medium tracking-tight sm:not-sr-only">{site.displayName}</span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            <ul className="flex items-center gap-8">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex items-center gap-2 py-2 text-[0.92rem] transition-colors duration-300",
                        active ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-1 rounded-full bg-accent transition-all duration-500",
                          active ? "scale-100 opacity-100" : "w-0 scale-0 opacity-0",
                        )}
                      />
                      <span className="roll">
                        <span data-text={item.label}>{item.label}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}
              aria-label="Open command menu"
              className="hidden items-center gap-1.5 rounded-[5px] border border-line px-2 py-1.5 text-muted transition-colors hover:border-line-strong hover:text-fg lg:inline-flex"
            >
              <Command className="size-3" aria-hidden="true" />
              <span className="t-mono !text-[0.68rem]">K</span>
            </button>
            <Link
              href={contactHref}
              aria-current={isActive(pathname, contactHref) ? "page" : undefined}
              className="btn btn-solid !min-h-10 !px-4 !text-[0.88rem]"
            >
              <span>Contact</span>
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-11 items-center gap-3 px-2 text-[0.92rem] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span>Menu</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              <span className="h-px w-full bg-fg" />
              <span className="h-px w-3/5 self-end bg-fg" />
            </span>
          </button>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => { setOpen(false); toggleRef.current?.focus(); }} pathname={pathname} />
    </>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const links = [{ href: "/", label: "Home" }, ...nav, { href: contactHref, label: "Contact" }];

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-bg md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="wrap flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <span className="t-mono text-muted">Index</span>
            <button type="button" onClick={onClose} className="-mr-2 inline-flex h-11 items-center gap-3 px-2 text-[0.92rem]">
              <span>Close</span>
              <span aria-hidden="true" className="relative block size-5">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-fg" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-fg" />
              </span>
            </button>
          </div>

          <ul className="wrap flex flex-1 flex-col justify-center gap-1">
            {links.map((l, i) => {
              const active = l.href === "/" ? pathname === "/" : isActive(pathname, l.href);
              return (
                <m.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
                  transition={{ duration: 0.6, delay: 0.12 + i * 0.05, ease: EASE }}
                >
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span aria-hidden="true" className="t-mono w-6 text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("text-[clamp(2.2rem,11vw,3.4rem)] leading-none font-medium tracking-[-0.045em]", active && "text-accent")}>
                      {l.label}
                    </span>
                  </Link>
                </m.li>
              );
            })}
          </ul>

          <m.div
            className="wrap shrink-0 pt-6 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a href={`mailto:${personal.email}`} className="text-lg font-medium tracking-tight">
              {personal.email}
            </a>
            <div className="mt-4 flex items-center justify-between">
              <ul className="flex gap-5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="u text-muted">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <span className="t-mono text-muted">
                Lagos <LocalTime />
              </span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
