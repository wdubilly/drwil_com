import { useState } from "react";
import type { Dict } from "../i18n";
import { INSTALL_COMMAND, LINKS } from "../links";

export function Install({ t }: { t: Dict }) {
  const i = t.install;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the command stays selectable */
    }
  };
  return (
    <section id="install" aria-labelledby="i-title">
      <div className="wrap">
        <h2 id="i-title">{i.title}</h2>
        <p className="lead">{i.lead}</p>
        <p className="note" style={{ marginTop: 10 }}>{i.prerequisites}</p>
        <ol className="install" style={{ marginTop: 24 }}>
          {i.steps.map((s, n) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p className="why">{s.text}</p>
              <pre className="code">{n === 0 ? INSTALL_COMMAND : s.code}</pre>
              {n === 0 && (
                <button className="btn" style={{ marginTop: 8 }} onClick={copy} aria-live="polite">
                  {copied ? i.copied : i.copy}
                </button>
              )}
            </li>
          ))}
        </ol>
        <p className="note">
          {i.note} <a href={LINKS.install} rel="noopener noreferrer">README</a>
        </p>
      </div>
    </section>
  );
}
