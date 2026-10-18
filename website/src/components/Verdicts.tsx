import type { Dict } from "../i18n";

const ICON = { PASS: "✓", FAIL: "✗", ERROR: "!", MANUAL: "?", ATTESTED: "◆" } as const;

export function Verdicts({ t }: { t: Dict }) {
  const v = t.verdicts;
  return (
    <section id="verdicts" aria-labelledby="v-title">
      <div className="wrap">
        <h2 id="v-title">{v.title}</h2>
        <p className="lead">{v.lead}</p>
        <ul className="verdicts">
          {v.items.map((it) => (
            <li key={it.name} className={`panel v-${it.name}`}>
              <span className="icon" aria-hidden="true">{ICON[it.name as keyof typeof ICON]}</span>
              <h3 className="mono">{it.name}</h3>
              <p>{it.meaning}</p>
              <p className="note">{it.shape}</p>
            </li>
          ))}
        </ul>
        <p className="rule">{v.rule}</p>
        <p className="why" style={{ marginTop: 12, maxWidth: "70ch" }}>{v.priority}</p>
        <p className="why" style={{ marginTop: 8, maxWidth: "70ch" }}>{v.exit}</p>
      </div>
    </section>
  );
}
