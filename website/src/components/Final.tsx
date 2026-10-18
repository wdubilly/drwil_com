import type { Dict } from "../i18n";
import { LINKS } from "../links";

export function Final({ t }: { t: Dict }) {
  return (
    <section className="final" aria-labelledby="f-title">
      <div className="wrap">
        <h2 id="f-title">{t.final.title}</h2>
        <p className="lead" style={{ margin: "0 auto" }}>{t.final.text}</p>
        <div className="btns">
          <a className="btn primary" href={LINKS.repo} rel="noopener noreferrer">{t.final.cta}</a>
        </div>
      </div>
    </section>
  );
}
