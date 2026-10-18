import type { CommandEntry, Dict } from "../i18n/en";

function List({ items }: { items: CommandEntry[] }) {
  return (
    <dl className="cmds">
      {items.map((c) => (
        <div key={c.cmd}>
          <dt><code>{c.cmd}</code></dt>
          <dd>{c.text}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Commands({ t }: { t: Dict }) {
  const c = t.commands;
  return (
    <section id="commands" aria-labelledby="cmd-title">
      <div className="wrap">
        <h2 id="cmd-title">{c.title}</h2>
        <p className="lead">{c.lead}</p>
        <div className="cols">
          <div>
            <h3>{c.cliTitle}</h3>
            <List items={c.cli} />
          </div>
          <div>
            <h3>{c.slashTitle}</h3>
            <p className="note" style={{ marginTop: 6 }}>{c.slashNote}</p>
            <List items={c.slash} />
          </div>
        </div>
        <p className="note" style={{ marginTop: 18 }}>{c.note}</p>
      </div>
    </section>
  );
}
