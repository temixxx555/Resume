"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export type PaletteItem = {
  id: string;
  label: string;
  group: string;
  hint?: string;
  action: { type: "route"; href: string } | { type: "external"; href: string } | { type: "copy"; text: string };
};

const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });

/**
 * Only the shortcut listener ships up front. The palette itself is loaded the first time
 * someone presses Cmd/Ctrl+K or clicks the nav button.
 */
export function PaletteMount({ items }: { items: PaletteItem[] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const load = () => setLoaded(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        load();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", load);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", load);
    };
  }, [loaded]);

  return loaded ? <CommandPalette items={items} autoOpen /> : null;
}
