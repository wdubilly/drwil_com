// QUA-041 (docs/contracts.md): each scenario of docs/projects/acceptance-criteria-demo.md
// is replayed in a throwaway copy of the working tree, never in the real repository.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// The copy runs the QUA-041 check too: without this guard, every copy would copy itself again.
const NESTED = "DRWIL_DEMO_NESTED";
const skip = process.env[NESTED] ? "nested run inside a demo copy" : false;
const env = { ...process.env, [NESTED]: "1" };
const copies = [];

after(() => {
  for (const dir of copies) rmSync(dir, { recursive: true, force: true });
});

function run(cmd, args, cwd) {
  const r = spawnSync(cmd, args, { cwd, env, encoding: "utf8" });
  if (r.error) throw r.error;
  return r;
}

function git(cwd, ...args) {
  const r = run("git", ["-c", "user.name=demo", "-c", "user.email=demo@example.invalid", ...args], cwd);
  assert.equal(r.status, 0, `git ${args.join(" ")}: ${r.stderr}`);
  return r.stdout;
}

/** Copy of the working tree (tracked and untracked, not ignored), committed on a `demo` branch. */
function makeCopy() {
  const dir = mkdtempSync(join(tmpdir(), "drwil-demo-"));
  copies.push(dir);
  const files = git(ROOT, "ls-files", "-co", "--exclude-standard", "-z").split("\0").filter(Boolean);
  for (const f of files) {
    mkdirSync(dirname(join(dir, f)), { recursive: true });
    cpSync(join(ROOT, f), join(dir, f));
  }
  symlinkSync(join(ROOT, "node_modules"), join(dir, "node_modules"), "dir");
  git(dir, "init", "-q", "-b", "demo");
  git(dir, "add", "-A");
  git(dir, "commit", "-q", "-m", "demo baseline");
  return dir;
}

function verify(dir) {
  const r = run(process.execPath, [join(dir, "node_modules", "drwil", "bin", "drwil.js"), "verify", "--json"], dir);
  const verdict = JSON.parse(r.stdout);
  verdict.of = (id) => verdict.results.find((k) => k.id === id);
  return verdict;
}

function edit(dir, file, change) {
  const path = join(dir, file);
  const before = readFileSync(path, "utf8");
  const after = change(before);
  assert.notEqual(after, before, `${file}: the scenario's change did not apply`);
  writeFileSync(path, after);
}

test("QUA-041: S1 — a criterion is linked to its contract, and the contract to the check actually run", { skip }, async () => {
  const dir = makeCopy();
  const { acceptanceCriteria } = await import(join(dir, ".githooks", "briefs.mjs"));
  const [criterion] = acceptanceCriteria(
    "## Acceptance criteria\n\n- An order totalling 100 € has a total of 90 € — `APP-001`\n",
  );
  assert.equal(criterion.link, "APP-001");
  const contract = verify(dir).of(criterion.link);
  assert.equal(contract.status, "pass");
  assert.deepEqual(contract.checks, [{ id: "APP-001", status: "ok" }]);
});

test("QUA-041: S2 — a deliberate regression fails the check, the verdict and the commit", { skip }, () => {
  const dir = makeCopy();
  edit(dir, "src/order-total.mjs", (s) => s.replace("subtotal < DISCOUNT_THRESHOLD_CENTS", "subtotal <= DISCOUNT_THRESHOLD_CENTS"));
  const verdict = verify(dir);
  assert.equal(verdict.of("APP-001").status, "fail");
  assert.notEqual(verdict.status, "pass");

  git(dir, "config", "core.hooksPath", ".githooks");
  git(dir, "add", "src/order-total.mjs");
  const commit = run("git", ["-c", "user.name=demo", "-c", "user.email=demo@example.invalid", "commit", "-m", "regression"], dir);
  assert.notEqual(commit.status, 0, "the commit of the regression was accepted");
  const failures = `${commit.stdout}${commit.stderr}`.split("\n").filter((l) => l.includes("✗ failed:"));
  assert.ok(failures.length > 0, "no failed check reported");
  for (const line of failures) assert.match(line, /APP-001/, `refused for another reason: ${line}`);
});

test("QUA-041: S3 — a removed check is never reported as passed", { skip }, () => {
  const dir = makeCopy();
  edit(dir, ".drwil/ia-first.json", (s) => {
    const cfg = JSON.parse(s);
    cfg.checks = cfg.checks.filter((c) => c.id !== "APP-001");
    return `${JSON.stringify(cfg, null, 2)}\n`;
  });
  const verdict = verify(dir);
  assert.notEqual(verdict.of("APP-001").status, "pass");
  assert.notEqual(verdict.status, "pass");
});

test("QUA-041: S4 — a Manual contract with no attestation is never reported as passed", { skip }, () => {
  const dir = makeCopy();
  edit(dir, "docs/contracts.md", (s) =>
    s.replace(
      "\n## Business (APP)",
      "\n## QUA-099 — Demo contract with no proof\n**Rule** : demo only.\n**Scope** : none\n**Source of truth** : none\n**Proof** : human attestation\n**Reason** : demo only.\n**Manual** : never attested.\n\n## Business (APP)",
    ),
  );
  const verdict = verify(dir);
  assert.equal(verdict.of("QUA-099").status, "manual");
  assert.notEqual(verdict.status, "pass");
  assert.equal(verdict.exitCode, 1);
});

test("QUA-041: S5 — changing an attested contract's text makes its attestation obsolete", { skip }, () => {
  const dir = makeCopy();
  assert.equal(verify(dir).of("QUA-015").status, "attested");
  edit(dir, "docs/contracts.md", (s) => s.replace(/(## QUA-015[^\n]*\n\*\*Rule\*\* : [^\n]*)/, "$1 (demo edit)"));
  assert.equal(verify(dir).of("QUA-015").status, "manual");
});

test("QUA-041: S6 — changing what an attested contract covers keeps it attested (known gap)", { skip }, () => {
  const dir = makeCopy();
  edit(dir, "package.json", (s) => {
    const pkg = JSON.parse(s);
    pkg.dependencies = { "demo-unaudited-package": "0.0.1" };
    return `${JSON.stringify(pkg, null, 2)}\n`;
  });
  // Documents the kit's current behavior, not a wish: if this starts failing, the gap is closed.
  assert.equal(verify(dir).of("SEC-006").status, "attested");
});
