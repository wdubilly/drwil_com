import { en, type Dict, type Lang } from "./en";
import { fr } from "./fr";

export type { Dict, Lang };

export const LANGS: Lang[] = ["en", "fr"];
export const DICTS: Record<Lang, Dict> = { en, fr };
export const DEFAULT_LANG: Lang = "en";

export function langFromPath(pathname: string): Lang {
  const first = pathname.split("/").filter(Boolean)[0];
  return first === "fr" ? "fr" : DEFAULT_LANG;
}

export function pathFor(lang: Lang, hash = ""): string {
  return `/${lang}/${hash}`;
}
