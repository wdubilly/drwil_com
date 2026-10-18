import { lazy, Suspense } from "react";
import type { Dict } from "../i18n";
import { LINKS } from "../links";
import { useCapabilities } from "../hooks/useCapabilities";
import { useInView } from "../hooks/useInView";
import { HeroFallback } from "./HeroFallback";

const HeroScene = lazy(() => import("../three/HeroScene"));

export function Hero({ t }: { t: Dict }) {
  const caps = useCapabilities();
  const [ref, inView] = useInView<HTMLDivElement>();
  const use3d = caps.webgl && caps.wide && !caps.reducedMotion;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title">
            <span>{t.hero.line1}</span>
            <span className="dim">{t.hero.line2}</span>
          </h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="btns">
            <a className="btn primary" href={LINKS.repo} rel="noopener noreferrer">{t.hero.ctaPrimary}</a>
            <a className="btn" href="#demo">{t.hero.ctaSecondary}</a>
          </div>
          <ul className="points">
            {t.hero.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <figure className="hero-visual" ref={ref} style={{ margin: 0 }}>
          {use3d ? (
            <Suspense fallback={<HeroFallback t={t} />}>
              <div data-testid="hero-3d">
                <HeroScene running={inView} lowPower={caps.lowPower} />
              </div>
            </Suspense>
          ) : (
            <HeroFallback t={t} />
          )}
          <figcaption className="sr">{t.hero.sceneNote}</figcaption>
        </figure>
      </div>
    </section>
  );
}
