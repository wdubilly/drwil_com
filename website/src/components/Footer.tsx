import type { Dict } from "../i18n";
import { LINKS } from "../links";

export function Footer({ t }: { t: Dict }) {
  const l = t.footer.links;
  return (
    <footer>
      <div className="wrap">
        <p style={{ maxWidth: "52ch" }}>{t.footer.text}</p>
        <nav aria-label="Links">
          <a href={LINKS.repo} rel="noopener noreferrer">{l.repo}</a>
          <a href={LINKS.readme} rel="noopener noreferrer">{l.readme}</a>
          <a href={LINKS.install} rel="noopener noreferrer">{l.install}</a>
          <a href={LINKS.issues} rel="noopener noreferrer">{l.issues}</a>
          <a href={LINKS.license} rel="noopener noreferrer">{l.license}</a>
        </nav>
      </div>
    </footer>
  );
}
