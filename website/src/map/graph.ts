// Hand-laid copy of docs/drwil-overview.mmd: tests/map.test.ts fails when nodes or links drift apart.
export type GroupId = "actors" | "install" | "optional" | "kit" | "guards" | "proof" | "closing";
export type Lens = "dev" | "quality" | "org";

export interface GraphNode {
  id: string;
  group: GroupId;
  col: number;
  row: number;
  where?: string;
  round?: boolean;
}

export interface GraphEdge {
  from: string;
  to: string;
  dashed?: boolean;
}

export const NODE_W = 170;
export const NODE_H = 46;
export const COL_GAP = 215;
export const ROW_GAP = 70;
export const ORIGIN = { x: 24, y: 64 };
export const VIEW = { w: 1290, h: 520 };

export const GROUPS: GroupId[] = ["actors", "install", "optional", "kit", "guards", "proof", "closing"];

export const NODES: GraphNode[] = [
  { id: "human", group: "actors", col: 0, row: 1, round: true },
  { id: "agent", group: "actors", col: 0, row: 4, round: true },
  { id: "cli", group: "install", col: 1, row: 0, where: "bin/drwil.js" },
  { id: "init", group: "install", col: 1, row: 1, where: "index.ts, install.ts, stack.ts" },
  { id: "upkeep", group: "install", col: 1, row: 2, where: "doctor.ts, drift.ts, manifest.ts" },
  { id: "dashboard", group: "optional", col: 1, row: 3.6 },
  { id: "frontq", group: "optional", col: 1, row: 4.6 },
  { id: "release", group: "optional", col: 1, row: 5.6 },
  { id: "agents", group: "kit", col: 2, row: 0, where: "AGENTS.md" },
  { id: "registry", group: "kit", col: 2, row: 1, where: "docs/contracts.md" },
  { id: "briefs", group: "kit", col: 2, row: 2, where: "docs/projects, docs/intentions" },
  { id: "recipes", group: "kit", col: 2, row: 3, where: "docs/recipes, .claude/skills" },
  { id: "state", group: "kit", col: 2, row: 4, where: ".githooks/state.mjs" },
  { id: "glossary", group: "kit", col: 2, row: 5, where: ".githooks/glossary.mjs" },
  { id: "agenthooks", group: "guards", col: 3, row: 0, where: ".claude/settings.json" },
  { id: "precommit", group: "guards", col: 3, row: 1, where: ".githooks/" },
  { id: "prepush", group: "guards", col: 3, row: 2, where: ".githooks/" },
  { id: "ci", group: "guards", col: 3, row: 3, where: "GitHub Actions or GitLab" },
  { id: "engine", group: "guards", col: 3, row: 4, where: "engine.mjs, scope-gate.mjs, check-docs.mjs" },
  { id: "verify", group: "proof", col: 4, row: 0, where: "verify.ts, criteria.ts" },
  { id: "verdict", group: "proof", col: 4, row: 1 },
  { id: "evidence", group: "proof", col: 4, row: 2, where: "evidence.ts" },
  { id: "attest", group: "proof", col: 4, row: 3, where: "attest.ts" },
  { id: "attfiles", group: "proof", col: 4, row: 4, where: ".drwil/evidence/attestations" },
  { id: "agentout", group: "proof", col: 4, row: 5, where: "agent.ts" },
  { id: "journal", group: "closing", col: 5, row: 0 },
  { id: "usage", group: "closing", col: 5, row: 1, where: ".drwil/usage.jsonl" },
  { id: "pr", group: "closing", col: 5, row: 2 },
  { id: "queue", group: "closing", col: 5, row: 3 },
];

const e = (from: string, to: string, dashed = false): GraphEdge => ({ from, to, dashed });

// `optional` designates the frame of the optional modules, as in the Mermaid subgraph.
export const EDGES: GraphEdge[] = [
  e("init", "agents", true), e("init", "registry", true), e("init", "recipes", true), e("init", "engine", true), e("init", "optional", true),
  e("agents", "agent"), e("agent", "precommit"), e("agenthooks", "agent", true), e("state", "agenthooks", true),
  e("precommit", "engine"), e("precommit", "prepush"), e("prepush", "ci"),
  e("engine", "registry"), e("engine", "briefs"),
  e("registry", "glossary"), e("briefs", "glossary"), e("agent", "glossary"),
  e("glossary", "verify", true), e("glossary", "agenthooks", true), e("agenthooks", "human", true),
  e("agent", "verify"), e("ci", "verify"), e("registry", "verify"), e("briefs", "verify"),
  e("verify", "evidence"), e("verify", "verdict"), e("verify", "agentout"),
  e("verdict", "human"), e("human", "attest"), e("attest", "attfiles"), e("attfiles", "verify"),
  e("evidence", "state"), e("state", "journal"), e("journal", "usage"), e("usage", "pr"), e("pr", "human"), e("pr", "queue"),
  e("human", "registry"), e("human", "briefs"), e("human", "state"), e("human", "queue"), e("queue", "state"),
  e("cli", "init"), e("cli", "upkeep"), e("cli", "verify"), e("cli", "attest"),
];

export interface Box { x: number; y: number; w: number; h: number }

export function nodeBox(n: GraphNode): Box {
  return { x: ORIGIN.x + n.col * COL_GAP, y: ORIGIN.y + n.row * ROW_GAP, w: NODE_W, h: NODE_H };
}

const FRAME_PAD = 12;
export function groupBox(group: GroupId): Box | null {
  const boxes = NODES.filter((n) => n.group === group).map(nodeBox);
  if (!boxes.length || group === "actors") return null;
  const x1 = Math.min(...boxes.map((b) => b.x)) - FRAME_PAD;
  const y1 = Math.min(...boxes.map((b) => b.y)) - FRAME_PAD - 14;
  const x2 = Math.max(...boxes.map((b) => b.x + b.w)) + FRAME_PAD;
  const y2 = Math.max(...boxes.map((b) => b.y + b.h)) + FRAME_PAD;
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}

function boxOf(id: string): Box {
  const n = NODES.find((x) => x.id === id);
  if (n) return nodeBox(n);
  return groupBox(id as GroupId)!;
}

export function edgePath(edge: GraphEdge): string {
  const a = boxOf(edge.from);
  const b = boxOf(edge.to);
  const ay = a.y + a.h / 2;
  const by = b.y + b.h / 2;
  if (Math.abs(a.x - b.x) < 1) {
    const x = a.x + a.w;
    return `M${x},${ay} C${x + 60},${ay} ${x + 60},${by} ${x},${by}`;
  }
  const forward = b.x > a.x;
  const x1 = forward ? a.x + a.w : a.x;
  const x2 = forward ? b.x : b.x + b.w;
  const dx = Math.max(40, Math.abs(x2 - x1) / 2);
  const s = forward ? 1 : -1;
  return `M${x1},${ay} C${x1 + s * dx},${ay} ${x2 - s * dx},${by} ${x2},${by}`;
}
