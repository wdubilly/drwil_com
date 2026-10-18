import type { Dict } from "../i18n";

export function Boundaries({ t }: { t: Dict }) {
  const b = t.boundaries;
  return (
    <section id="boundaries" aria-labelledby="b-title" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <h2 id="b-title">{b.title}</h2>
        <p className="lead">{b.lead}</p>
        <div className="cols">
          <div className="panel card">
            <h3>{b.doesTitle}</h3>
            <ul className="plain">{b.does.map((x) => <li key={x}>✓ {x}</li>)}</ul>
          </div>
          <div className="panel card">
            <h3>{b.doesNotTitle}</h3>
            <ul className="plain">{b.doesNot.map((x) => <li key={x}>✗ {x}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
