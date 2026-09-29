"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import type { PaletteItem } from "./PaletteMount";

export default function CommandPalette({ items, autoOpen }: { items: PaletteItem[]; autoOpen: boolean }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [notice, setNotice] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (d && !d.open) {
      setQuery("");
      setIndex(0);
      setNotice("");
      d.showModal();
    }
  }, []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    if (autoOpen) open();
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", open);
    };
  }, [autoOpen, open, close]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  async function run(item: PaletteItem) {
    if (item.action.type === "route") {
      close();
      router.push(item.action.href);
    } else if (item.action.type === "external") {
      close();
      window.open(item.action.href, "_blank", "noopener,noreferrer");
    } else {
      try {
        await navigator.clipboard.writeText(item.action.text);
        setNotice("Copied to clipboard");
      } catch {
        setNotice(item.action.text);
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[index]) void run(results[index]);
    }
  }

  const groups = Array.from(new Set(results.map((r) => r.group)));

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      onClick={(e) => e.target === dialogRef.current && close()}
      className="m-auto mt-[12vh] w-[min(38rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-line-strong bg-raised p-0 text-fg shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] backdrop:bg-black/60 backdrop:backdrop-blur-[2px]"
    >
      <div onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 border-b border-line px-4 focus-within:border-accent">
          <Search className="size-4 text-muted" aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `palette-${results[index].id}` : undefined}
            aria-label="Search pages, projects and links"
            placeholder="Search pages, projects, links…"
            className="h-14 w-full bg-transparent text-[1rem] outline-none placeholder:text-faint"
          />
          <kbd className="t-mono rounded border border-line px-1.5 py-0.5 !text-[0.65rem] text-muted">Esc</kbd>
        </div>

        <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-muted">Nothing matches “{query}”.</li>}
          {groups.map((g) => (
            <li key={g} role="presentation">
              <p className="t-mono px-3 pt-3 pb-1 text-faint">{g}</p>
              <ul role="presentation">
                {results
                  .map((r, i) => ({ r, i }))
                  .filter(({ r }) => r.group === g)
                  .map(({ r, i }) => (
                    <li
                      key={r.id}
                      id={`palette-${r.id}`}
                      data-i={i}
                      role="option"
                      aria-selected={i === index}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => void run(r)}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2.5 ${i === index ? "bg-fg/10" : ""}`}
                    >
                      <span className="truncate">{r.label}</span>
                      <span className="flex shrink-0 items-center gap-2 text-muted">
                        {r.hint && <span className="t-mono !text-[0.66rem]">{r.hint}</span>}
                        {i === index && <CornerDownLeft className="size-3.5" aria-hidden="true" />}
                      </span>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
        <p role="status" aria-live="polite" className="t-mono border-t border-line px-4 py-2.5 text-muted">
          {notice || "↑ ↓ to move · Enter to open"}
        </p>
      </div>
    </dialog>
  );
}
