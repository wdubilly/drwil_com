import type { Dict } from "../i18n";
import { evaluate } from "../demo/model";
import { VARIANTS } from "../demo/scenarios";

const SYMBOL = { PASS: "✓", FAIL: "✗" } as const;

export function Regression({ t }: { t: Dict }) {
  const r = t.regression;
  const before = evaluate(VARIANTS["all-green"].def);
  const after = evaluate(VARIANTS.regression.def);
  const panel = (title: string, text: string, rep: typeof before, testId: string) => (
    <div className="panel card" data-testid={testId}>
      <h3>{title}</h3>
      <p className="why">{text}</p>
      <p style={{ marginTop: 12 }}>
        <span className={`vbadge ${rep.status}`}>
          <span aria-hidden="true">{SYMBOL[rep.status as "PASS" | "FAIL"]}</span> {rep.status}
        </span>
      </p>
      <pre className="code">{rep.lines.filter((l) => /EXP-012|export-empty|│/.test(l)).join("\n")}</pre>
    </div>
  );
  return (
    <section id="regression" aria-labelledby="reg-title" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <h2 id="reg-title">{r.title}</h2>
        <blockquote className="quote">{r.quote}</blockquote>
        <p className="lead">{r.lead}</p>
        <ol className="steps">
          {r.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="compare">
          {panel(r.before, r.beforeText, before, "reg-before")}
          {panel(r.after, r.afterText, after, "reg-after")}
        </div>
        <p className="caution">{r.note}</p>
        <p className="note" style={{ marginTop: 14 }}>{r.sample}</p>
      </div>
    </section>
  );
}
