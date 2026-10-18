import { describe, expect, it } from "vitest";
import { DICTS } from "../src/i18n";
import { EDGES, GROUPS, NODES } from "../src/map/graph";

const source = Object.values(
  import.meta.glob<string>("../../docs/drwil-overview.mmd", { query: "?raw", import: "default", eager: true }),
)[0]!;
const mmdEdges = [...source.matchAll(/^(\w+)\s+-(?:\.)?->(?:\|"[^"]*"\|)?\s*(\w+)\s*$/gm)].map((m) => `${m[1]}>${m[2]}`);
const mmdNodes = [...source.matchAll(/^\s*(\w+)(?:\[|\(\()"/gm)].map((m) => m[1]!);

describe("SITE-002: the interactive map matches the overview source", () => {
  it("SITE-002: every node and link of docs/drwil-overview.mmd is on the map, and nothing else", () => {
    expect(NODES.map((n) => n.id).sort()).toEqual([...mmdNodes].sort());
    expect(EDGES.map((e) => `${e.from}>${e.to}`).sort()).toEqual([...mmdEdges].sort());
  });
});

describe("SITE-004: the map text exists in both languages", () => {
  it("SITE-004: every node has a short name and a role, and lens items point to real nodes", () => {
    const ids = new Set(NODES.map((n) => n.id));
    for (const lang of ["en", "fr"] as const) {
      const map = DICTS[lang].map;
      for (const id of ids) {
        expect(map.nodes[id], `${lang}:${id}`).toBeDefined();
        expect(map.nodes[id]!.name.length, `${lang}:${id} name fits its box`).toBeLessThanOrEqual(26);
      }
      expect(Object.keys(map.nodes).sort()).toEqual([...ids].sort());
      expect(Object.keys(map.groups).sort()).toEqual([...GROUPS].sort());
      for (const lens of Object.values(map.lenses)) {
        for (const item of lens.items) for (const id of item.nodes) expect(ids.has(id), `${lang}:${id}`).toBe(true);
      }
    }
  });
});
