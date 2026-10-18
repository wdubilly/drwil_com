import type { Dict, Lang } from "../i18n";
import { LANGS } from "../i18n";
import { LINKS } from "../links";

const ANCHORS = ["chain", "demo", "map", "workflow", "adopt", "commands", "regression", "verdicts", "boundaries", "install"] as const;

export function Nav({ t, lang, onLang }: { t: Dict; lang: Lang; onLang: (l: Lang) => void }) {
  return (
    <header className="nav">
      <a className="skip" href="#main">{t.nav.skip}</a>
      <div className="nav-inner">
        <a className="brand" href={`/${lang}/`} aria-label="DRWIL">
          DR<b>WIL</b>
        </a>
        <nav className="nav-links" aria-label={t.nav.label}>
          {ANCHORS.map((a) => (
            <a key={a} href={`#${a}`}>{t.nav.links[a]}</a>
          ))}
        </nav>
        <div className="lang" role="group" aria-label={t.nav.language}>
          {LANGS.map((l) => (
            <a
              key={l}
              href={`/${l}/`}
              hrefLang={l}
              lang={l}
              aria-current={l === lang}
              onClick={(e) => {
                e.preventDefault();
                onLang(l);
              }}
            >
              {l.toUpperCase()}
            </a>
          ))}
        </div>
        <a className="gh" href={LINKS.repo} rel="noopener noreferrer">{t.nav.github}</a>
      </div>
    </header>
  );
}
