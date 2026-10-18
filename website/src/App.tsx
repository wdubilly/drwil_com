import { useCallback, useEffect, useState } from "react";
import { DICTS, langFromPath, pathFor, type Lang } from "./i18n";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Chain } from "./components/Chain";
import { Demo } from "./components/Demo";
import { Map } from "./components/Map";
import { Adopt } from "./components/Adopt";
import { Commands } from "./components/Commands";
import { Workflow } from "./components/Workflow";
import { Regression } from "./components/Regression";
import { Verdicts } from "./components/Verdicts";
import { Boundaries } from "./components/Boundaries";
import { Install } from "./components/Install";
import { Final } from "./components/Final";
import { Footer } from "./components/Footer";

export function App() {
  const [lang, setLang] = useState<Lang>(() => langFromPath(location.pathname));
  const t = DICTS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.add("js");
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang, t]);

  useEffect(() => {
    // `/` and unknown languages land on the canonical English route.
    const first = location.pathname.split("/").filter(Boolean)[0];
    if (first !== "en" && first !== "fr") history.replaceState(null, "", pathFor("en", location.hash));
    const onPop = () => setLang(langFromPath(location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const switchLang = useCallback((l: Lang) => {
    history.pushState(null, "", pathFor(l, location.hash));
    setLang(l);
  }, []);

  return (
    <>
      <Nav t={t} lang={lang} onLang={switchLang} />
      <main id="main">
        <Hero t={t} />
        <Chain t={t} />
        <Demo t={t} />
        <Map t={t} />
        <Workflow t={t} />
        <Adopt t={t} />
        <Commands t={t} />
        <Regression t={t} />
        <Verdicts t={t} />
        <Boundaries t={t} />
        <Install t={t} />
        <Final t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
