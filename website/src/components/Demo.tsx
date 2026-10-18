import { useState } from "react";
import type { Dict } from "../i18n";
import { evaluate, type Status } from "../demo/model";
import { SCENARIOS, VARIANTS, type ScenarioId, type VariantId } from "../demo/scenarios";

const SYMBOL: Record<Status, string> = { PASS: "✓", ATTESTED: "◆", FAIL: "✗", MANUAL: "?", ERROR: "!" };

export function Demo({ t }: { t: Dict }) {
  const [scenario, setScenario] = useState<ScenarioId>("pass");
  const [variant, setVariant] = useState<VariantId>("all-green");
  const [attested, setAttested] = useState(false);

  const effective: VariantId = variant === "human-pending" && attested ? "human-attested" : variant;
  const report = evaluate(VARIANTS[effective].def);
  const d = t.demo;

  const pick = (s: ScenarioId) => {
    setScenario(s);
    setVariant(SCENARIOS[s][0]!);
    setAttested(false);
  };
  const pickVariant = (v: VariantId) => {
    setVariant(v);
    setAttested(false);
  };

  return (
    <section id="demo" aria-labelledby="demo-title" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <p className="badge">{d.badge}</p>
        <h2 id="demo-title" style={{ marginTop: 14 }}>{d.title}</h2>
        <p className="lead">{d.lead}</p>

        <div className="tabs" role="group" aria-label={d.scenarioLabel}>
          {(Object.keys(SCENARIOS) as ScenarioId[]).map((s) => (
            <button key={s} className="tab" aria-pressed={scenario === s} onClick={() => pick(s)}>
              {d.scenarios[s]}
            </button>
          ))}
        </div>
        {SCENARIOS[scenario].length > 1 && (
          <div className="tabs" role="group" aria-label={d.variantLabel} style={{ marginTop: 0 }}>
            {SCENARIOS[scenario].map((v) => (
              <button key={v} className="tab sub" aria-pressed={variant === v} onClick={() => pickVariant(v)}>
                {d.variants[v as keyof typeof d.variants]}
              </button>
            ))}
          </div>
        )}

        <div className="demo-grid">
          <div className="term">
            <div className="term-bar"><i /><i /><i /> <span>{d.panels.terminal}</span></div>
            <pre data-testid="terminal" tabIndex={0} aria-label={d.panels.terminal}>
              {report.lines.map((line, i) => {
                const m = /^(\s*)([✓◆✗?!])/.exec(line);
                const status = m ? (Object.keys(SYMBOL) as Status[]).find((k) => SYMBOL[k] === m[2]) : undefined;
                const last = i === report.lines.length - 1;
                return (
                  <span key={i} className={status ? `t-${status}` : last ? `t-${report.status}` : undefined}>
                    {line}
                    {"\n"}
                  </span>
                );
              })}
            </pre>
          </div>

          <div className="stack">
            <div className="panel card">
              <h3>{d.panels.verdict}</h3>
              <div className="verdict" data-testid="verdict" aria-live="polite">
                <span className={`vbadge ${report.status}`}>
                  <span aria-hidden="true">{SYMBOL[report.status]}</span> {report.status}
                </span>
                <span className="mono" style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                  {d.exitLabel}: {report.exitCode}
                </span>
              </div>
            </div>

            <div className="panel card">
              <h3>{d.panels.criterion}</h3>
              <table>
                <thead>
                  <tr><th>{d.table.criterion}</th><th>{d.table.proof}</th><th>{d.table.verdict}</th></tr>
                </thead>
                <tbody>
                  {report.criteria.map((c) => (
                    <tr key={c.text}>
                      <td>« {c.text} »</td>
                      <td><code>{c.link ?? d.table.none}</code></td>
                      <td>{d.criterionStatus[c.status]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel card">
              <h3>{d.panels.contract}</h3>
              <ul className="plain" style={{ margin: 0 }}>
                {report.contracts.map((c) => (
                  <li key={c.id}>
                    <code>{SYMBOL[c.status]} {c.status}</code> <b>{c.id}</b> — {c.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel card">
              <h3>{d.panels.evidence}</h3>
              <table>
                <thead>
                  <tr><th>{d.evidenceCols.control}</th><th>{d.evidenceCols.result}</th><th>{d.evidenceCols.exit}</th></tr>
                </thead>
                <tbody>
                  {report.evidence.map((e) => (
                    <tr key={e.control}>
                      <td><code>{e.control}</code></td>
                      <td>{d.results[e.result]} — {e.detail}</td>
                      <td><code>{e.exit}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="explain" data-testid="why">{d.why[effective as keyof typeof d.why]}</p>

        {variant === "human-pending" && (
          <div style={{ marginTop: 14 }}>
            <button className="btn" onClick={() => setAttested((a) => !a)}>
              {attested ? d.resetButton : d.attestButton}
            </button>
            <p className="note" style={{ marginTop: 8 }}>{d.attestNote}</p>
          </div>
        )}
        {scenario === "unfinished" && <p className="why" style={{ marginTop: 14 }}>{d.errorVsManual}</p>}
        <p className="note" style={{ marginTop: 18 }}>{d.sample}</p>
      </div>
    </section>
  );
}
