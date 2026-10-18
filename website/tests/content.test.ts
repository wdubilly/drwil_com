import { describe, expect, it } from "vitest";
import { DICTS, langFromPath, pathFor } from "../src/i18n";

function shape(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(shape);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)]));
  return typeof v;
}

describe("SITE-004: English and French expose the same pages", () => {
  it("SITE-004: both dictionaries have identical structure and no empty text", () => {
    expect(shape(DICTS.fr)).toEqual(shape(DICTS.en));
    const empties: string[] = [];
    const walk = (v: unknown, path: string, lang: string) => {
      if (typeof v === "string" && v.trim() === "" && !path.endsWith(".code")) empties.push(`${lang}:${path}`);
      else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}.${i}`, lang));
      else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`, lang);
    };
    walk(DICTS.en, "", "en");
    walk(DICTS.fr, "", "fr");
    expect(empties).toEqual([]);
  });

  it("SITE-004: the verdict vocabulary is not translated", () => {
    const names = (l: "en" | "fr") => DICTS[l].verdicts.items.map((i) => i.name);
    expect(names("fr")).toEqual(["PASS", "FAIL", "ERROR", "MANUAL", "ATTESTED"]);
    expect(names("en")).toEqual(names("fr"));
    expect(DICTS.fr.workflow.stages.map((s) => s.name)).toEqual(DICTS.en.workflow.stages.map((s) => s.name));
  });

  it("SITE-004: routes resolve to a language and default to English", () => {
    expect(langFromPath("/fr/")).toBe("fr");
    expect(langFromPath("/en/")).toBe("en");
    expect(langFromPath("/")).toBe("en");
    expect(langFromPath("/xx")).toBe("en");
    expect(pathFor("fr", "#demo")).toBe("/fr/#demo");
  });
});
