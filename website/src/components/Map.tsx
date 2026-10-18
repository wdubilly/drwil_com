import { useMemo, useState } from "react";
import type { Dict } from "../i18n";
import { EDGES, GROUPS, NODES, NODE_H, NODE_W, VIEW, edgePath, groupBox, nodeBox, type Lens } from "../map/graph";

const LENSES: Lens[] = ["dev", "quality", "org"];

export function Map({ t }: { t: Dict }) {
  const m = t.map;
  const [lens, setLens] = useState<Lens | null>(null);
  const [item, setItem] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const lensItems = lens ? m.lenses[lens].items : [];
  const lit = useMemo(() => {
    if (selected) {
      const set = new Set([selected]);
      for (const e of EDGES) {
        if (e.from === selected) set.add(e.to);
        if (e.to === selected) set.add(e.from);
      }
      return set;
    }
    if (lens) {
      const picked = item !== null ? [lensItems[item]!] : lensItems;
      return new Set(picked.flatMap((i) => i.nodes));
    }
    return null;
  }, [selected, lens, item, lensItems]);

  const choose = (l: Lens | null) => {
    setLens(l);
    setItem(null);
    setSelected(null);
  };
  const pick = (id: string) => {
    setSelected((s) => (s === id ? null : id));
    setItem(null);
  };
  const dim = (id: string) => (lit && !lit.has(id) ? " dim" : "");
  const nodeText = (id: string) => m.nodes[id]!;
  const sel = selected ? NODES.find((n) => n.id === selected)! : null;
  const incoming = selected ? EDGES.filter((e) => e.to === selected).map((e) => e.from) : [];
  const outgoing = selected ? EDGES.filter((e) => e.from === selected).map((e) => e.to) : [];
  const label = (id: string) => (m.nodes[id]?.name ?? m.groups[id as keyof typeof m.groups]);

  return (
    <section id="map" aria-labelledby="map-title">
      <div className="wrap">
        <h2 id="map-title">{m.title}</h2>
        <p className="lead">{m.lead}</p>

        <div className="tabs" role="group" aria-label={m.lensLabel}>
          <button aria-pressed={lens === null} onClick={() => choose(null)}>{m.allLabel}</button>
          {LENSES.map((l) => (
            <button key={l} aria-pressed={lens === l} onClick={() => choose(l)}>{m.lenses[l].name}</button>
          ))}
        </div>

        <div className="panel map-view">
          <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} role="group" aria-label={m.svgLabel} className="map-svg">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
              </marker>
            </defs>
            {GROUPS.map((g) => {
              const b = groupBox(g);
              if (!b) return null;
              return (
                <g key={g} className={`frame g-${g}`}>
                  <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={12} />
                  <text x={b.x + 12} y={b.y + 18}>{m.groups[g]}</text>
                </g>
              );
            })}
            <g className="edges">
              {EDGES.map((e) => {
                const on = selected !== null && (e.from === selected || e.to === selected);
                const faded = lit !== null && !(lit.has(e.from) && lit.has(e.to));
                return (
                  <path
                    key={`${e.from}-${e.to}`}
                    d={edgePath(e)}
                    className={`edge${e.dashed ? " dashed" : ""}${on ? " on" : ""}${faded && !on ? " dim" : ""}`}
                    markerEnd="url(#arrow)"
                  />
                );
              })}
            </g>
            {NODES.map((n) => {
              const b = nodeBox(n);
              const text = nodeText(n.id);
              return (
                <g
                  key={n.id}
                  className={`node g-${n.group}${selected === n.id ? " sel" : ""}${dim(n.id)}`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selected === n.id}
                  aria-label={text.name}
                  onClick={() => pick(n.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      pick(n.id);
                    }
                  }}
                >
                  <rect x={b.x} y={b.y} width={NODE_W} height={NODE_H} rx={n.round ? NODE_H / 2 : 8} />
                  <text x={b.x + NODE_W / 2} y={b.y + NODE_H / 2 + 4} textAnchor="middle">{text.name}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="note">{m.hint}</p>

        <div className="cols map-detail">
          <div className="panel" style={{ padding: 20 }} aria-live="polite">
            <p className="note">{m.selectedLabel}</p>
            {sel ? (
              <>
                <h3>{nodeText(sel.id).name}</h3>
                <p className="why" style={{ marginTop: 6 }}>{nodeText(sel.id).role}</p>
                {sel.where && <p className="note" style={{ marginTop: 10 }}>{m.whereLabel} : <code>{sel.where}</code></p>}
                {incoming.length > 0 && (
                  <p className="chips"><span className="note">{m.inLabel}</span>{incoming.map((id) => <button key={id} onClick={() => pick(id)}>{label(id)}</button>)}</p>
                )}
                {outgoing.length > 0 && (
                  <p className="chips"><span className="note">{m.outLabel}</span>{outgoing.map((id) => <button key={id} onClick={() => pick(id)}>{label(id)}</button>)}</p>
                )}
                <button className="btn" style={{ marginTop: 12 }} onClick={() => setSelected(null)}>{m.clear}</button>
              </>
            ) : (
              <p className="why" style={{ marginTop: 6 }}>{m.nothingSelected}</p>
            )}
          </div>
          <div>
            <p className="note">{m.benefitsLabel}</p>
            {lens ? (
              <>
                <p className="why" style={{ marginTop: 6 }}>{m.lenses[lens].intro}</p>
                <ul className="benefits">
                  {lensItems.map((b, n) => (
                    <li key={b.title}>
                      <button aria-pressed={item === n} onClick={() => { setItem(item === n ? null : n); setSelected(null); }}>
                        <b>{b.title}</b>
                        <span>{b.text}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="why" style={{ marginTop: 6 }}>{m.lead}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
