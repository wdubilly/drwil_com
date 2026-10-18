import type { Dict } from "../i18n";

/** Static diagram of the same idea as the 3D scene; used on mobile, without WebGL and with reduced motion. */
export function HeroFallback({ t }: { t: Dict }) {
  const l = t.hero.legend;
  const nodes = [
    { x: 40, y: 60, label: l.requirements },
    { x: 40, y: 150, label: l.contracts },
    { x: 40, y: 240, label: l.checks },
    { x: 40, y: 330, label: l.evidence },
  ];
  return (
    <svg viewBox="0 0 480 400" role="img" aria-label={t.hero.sceneLabel} style={{ width: "100%", height: "100%" }}>
      {nodes.map((n) => (
        <g key={n.label}>
          <path d={`M${n.x + 120} ${n.y} C 230 ${n.y}, 230 200, 300 200`} fill="none" stroke="#3ee6c4" strokeOpacity="0.45" />
          <rect x={n.x} y={n.y - 18} width="120" height="36" rx="8" fill="#131820" stroke="#232a36" />
          <text x={n.x + 60} y={n.y + 5} textAnchor="middle" fill="#e8edf4" fontSize="13" fontFamily="ui-monospace, monospace">
            {n.label}
          </text>
        </g>
      ))}
      <circle cx="340" cy="200" r="58" fill="#0f1218" stroke="#3ee6c4" strokeWidth="2" />
      <circle cx="340" cy="200" r="40" fill="none" stroke="#3ee6c4" strokeOpacity="0.35" strokeDasharray="4 5" />
      <path d="M322 202l13 13 24-27" fill="none" stroke="#3ee6c4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="340" y="285" textAnchor="middle" fill="#9aa6b8" fontSize="13" fontFamily="ui-monospace, monospace">
        {l.verdict}
      </text>
    </svg>
  );
}
