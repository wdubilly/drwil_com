import type { Dict } from "../i18n";
import { useInView } from "../hooks/useInView";

export function Chain({ t }: { t: Dict }) {
  const [ref, seen] = useInView<HTMLOListElement>({ threshold: 0.15 });
  return (
    <section id="chain" aria-labelledby="chain-title">
      <div className="wrap">
        <h2 id="chain-title">{t.chain.title}</h2>
        <p className="lead">{t.chain.lead}</p>
        <ol className={`chain${seen ? " in" : ""}`} ref={ref}>
          {t.chain.stages.map((s) => (
            <li key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="caution">{t.chain.caution}</p>
      </div>
    </section>
  );
}
