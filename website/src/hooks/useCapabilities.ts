import { useEffect, useState } from "react";

export interface Capabilities {
  reducedMotion: boolean;
  webgl: boolean;
  wide: boolean;
  lowPower: boolean;
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** The 3D scene needs WebGL, motion allowed and room; anything else gets the static diagram. */
export function useCapabilities(): Capabilities {
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");
  const wide = useMedia("(min-width: 768px)");
  const [webgl] = useState(hasWebGL);
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowPower = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  return { reducedMotion, webgl, wide, lowPower };
}
