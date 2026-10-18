import { useState } from "react";
import type { Dict } from "../i18n";

export function Adopt({ t }: { t: Dict }) {
  const [i, setI] = useState(0);
  const a = t.adopt;
  const current = a.cases[i]!;
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") setI((n) => Math.min(n + 1, a.cases.length - 1));
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") setI((n) => Math.max(n - 1, 0));
  };
  return (
    <section id="adopt" aria-labelledby="ad-title">
      <div className="wrap">
        <h2 id="ad-title">{a.title}</h2>
        <p className="lead">{a.lead}</p>
        <div className="tabs" role="tablist" aria-label={a.listLabel} onKeyDown={onKey}>
          {a.cases.map((c, n) => (
            <button
              key={c.name}
              role="tab"
              id={`ad-tab-${n}`}
              aria-selected={n === i}
              aria-controls="ad-panel"
              tabIndex={n === i ? 0 : -1}
              onClick={() => setI(n)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="panel" role="tabpanel" id="ad-panel" aria-labelledby={`ad-tab-${i}`} style={{ padding: 22, marginTop: 12 }}>
          <p className="why">{current.intro}</p>
          <ol className="flow">
            {current.steps.map((s) => (
              <li key={s.title}>
                <span className={`who who-${s.who}`}>{a.actors[s.who]}</span>
                <h3>{s.title}</h3>
                <p className="why">{s.text}</p>
                {s.code && <pre className="code">{s.code}</pre>}
              </li>
            ))}
          </ol>
        </div>
        <p className="note" style={{ marginTop: 14 }}>{a.note}</p>
      </div>
    </section>
  );
}
