// SITE-005: every internal anchor has a target and every external destination answers.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { LINKS } from "../src/links.ts";

const root = new URL("../src/", import.meta.url).pathname;
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(name)) files.push(p);
  }
})(root);
const source = files.map((f) => readFileSync(f, "utf8")).join("\n");

const problems = [];
const ids = new Set([...source.matchAll(/\bid="([\w-]+)"/g)].map((m) => m[1]));
const anchors = new Set([
  ...[...source.matchAll(/href="#([\w-]+)"/g)].map((m) => m[1]),
  ...[...source.matchAll(/ANCHORS = \[([^\]]+)\]/g)].flatMap((m) => [...m[1].matchAll(/"([\w-]+)"/g)].map((x) => x[1])),
]);
for (const a of anchors) if (!ids.has(a)) problems.push(`internal anchor #${a} has no matching id`);

const urls = [...new Set(Object.values(LINKS))];
const fragmentless = [...new Set(urls.map((u) => u.split("#")[0]))];
if (!process.argv.includes("--offline")) {
  for (const url of fragmentless) {
    try {
      const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(20000) });
      if (!res.ok) problems.push(`${url} answered ${res.status}`);
    } catch (e) {
      problems.push(`${url} unreachable (${e.message})`);
    }
  }
}

if (problems.length) {
  console.error(problems.map((p) => `✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log(`links ok: ${anchors.size} anchors, ${fragmentless.length} external destinations${process.argv.includes("--offline") ? " (offline)" : ""}`);
