import { useState } from "react";
import type { Dict } from "../i18n";

export function Workflow({ t }: { t: Dict }) {
  const [i, setI] = useState(0);
  const w = t.workflow;
  const stage = w.stages[i]!;
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") setI((n) => Math.min(n + 1, w.stages.length - 1));
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") setI((n) => Math.max(n - 1, 0));
  };
  return (
    <section id="workflow" aria-labelledby="wf-title">
      <div className="wrap">
        <h2 id="wf-title">{w.title}</h2>
        <p className="lead">{w.lead}</p>
        <div className="wf">
          <div className="wf-list" role="tablist" aria-label={w.listLabel} onKeyDown={onKey}>
            {w.stages.map((s, n) => (
              <button
                key={s.name}
                role="tab"
                id={`wf-tab-${n}`}
                aria-selected={n === i}
                aria-controls="wf-panel"
                tabIndex={n === i ? 0 : -1}
                onClick={() => setI(n)}
              >
                {n + 1}. {s.name}
              </button>
            ))}
          </div>
          <div className="panel wf-detail" role="tabpanel" id="wf-panel" aria-labelledby={`wf-tab-${i}`}>
            <h3>{stage.name}</h3>
            <p className="why" style={{ marginTop: 8 }}>{stage.text}</p>
            <p className="note" style={{ marginTop: 12 }}>{stage.role}</p>
            <p className="note" style={{ marginTop: 14 }}>{w.artifactLabel}</p>
            <pre>{stage.artifact}</pre>
          </div>
        </div>
        <div className="roles">
          {(["agent", "drwil", "human"] as const).map((r) => (
            <div key={r} className="panel role">
              <b>{w.roles[r]}</b>
              {w.roles[`${r}Text` as const]}
            </div>
          ))}
        </div>
        <div className="cols">
          <div>
            <h3>{w.loopsTitle}</h3>
            <ul className="plain">
              {w.loops.map((l) => (
                <li key={l.name}><b>{l.name}.</b> {l.text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{w.humanTitle}</h3>
            <ul className="plain">
              {w.humanGates.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="caution">{w.stateNote}</p>
      </div>
    </section>
  );
}
