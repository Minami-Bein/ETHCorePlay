import { useMemo, useState } from 'react';
import { type GlossaryItem } from '../data/glossary';
import { Link } from 'react-router-dom';

export function GlossaryGraph({ glossary }: { glossary: GlossaryItem[] }) {
  const [active, setActive] = useState<GlossaryItem | null>(null);
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState('');

  const items = useMemo(() => glossary.slice(0, 36), [glossary]);
  const pos = useMemo(() => {
    const cx = 410, cy = 220;
    return items.map((g, i) => {
      const ring = i < 12 ? 110 : i < 24 ? 170 : 220;
      const a = (Math.PI * 2 * i) / Math.max(1, items.length);
      return { ...g, x: cx + Math.cos(a) * ring, y: cy + Math.sin(a) * ring };
    });
  }, [items]);

  const edges = useMemo(() => {
    const idx = new Map(pos.map((p, i) => [p.term, i]));
    const pairs = new Map<string, { a: number; b: number; w: number }>();
    pos.forEach((p, i) => {
      (p.relatedTerms || []).forEach((t) => {
        const j = idx.get(t);
        if (j == null || i === j) return;
        const a = Math.min(i, j), b = Math.max(i, j);
        const k = `${a}-${b}`;
        const cur = pairs.get(k);
        pairs.set(k, { a, b, w: (cur?.w || 0) + 1 });
      });
    });
    return Array.from(pairs.values());
  }, [pos]);

  const located = useMemo(() => {
    const k = query.trim().toLowerCase();
    if (!k) return null;
    return pos.find((p) => `${p.term} ${p.desc}`.toLowerCase().includes(k)) || null;
  }, [query, pos]);

  const panel = active || located;

  return (
    <section className="card card-hover">
      <div className="card-title-row">
        <h3 className="section-title" style={{ margin: 0 }}>术语关系图谱（v2）</h3>
        <small className="subtle">节点 {pos.length} · 连线 {edges.length}</small>
      </div>

      <div className="filter-row">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索术语并自动定位" style={{ flex: 1, minWidth: 220, padding: 8, borderRadius: 10, border: '1px solid var(--border-default)' }} />
        <input type="range" min={0.8} max={2.1} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} style={{ width: 180 }} />
      </div>

      <div className="graph-layout">
        <svg viewBox="0 0 820 460" style={{ width: '100%', height: 'auto', borderRadius: 12, background: 'var(--bg-elevated)' }}>
          <g transform={`translate(${410 - 410 * zoom} ${230 - 230 * zoom}) scale(${zoom})`}>
            {edges.map((e, i) => (
              <line key={i} x1={pos[e.a].x} y1={pos[e.a].y} x2={pos[e.b].x} y2={pos[e.b].y} stroke="var(--border-default)" strokeOpacity={Math.min(0.8, 0.35 + e.w * 0.2)} strokeWidth={1 + e.w * 0.3} />
            ))}
            {pos.map((p) => {
              const isActive = panel?.term === p.term;
              const isHit = !!query && `${p.term} ${p.desc}`.toLowerCase().includes(query.toLowerCase());
              return (
                <g key={p.term} onMouseEnter={() => setActive(p)} onMouseLeave={() => setActive(null)}>
                  <circle cx={p.x} cy={p.y} r={isActive ? 12 : 9} fill={isHit ? 'var(--brand-highlight)' : isActive ? 'var(--brand-garden)' : 'var(--brand-primary)'} opacity="0.92" />
                  <text x={p.x + 12} y={p.y + 4} fontSize="11" fill="var(--text-secondary)">{p.term.slice(0, 20)}</text>
                </g>
              );
            })}
          </g>
        </svg>

        <aside className="graph-panel">
          {!panel && <div className="subtle">点击或搜索节点，查看学习面板。</div>}
          {panel && (
            <>
              <h4 style={{ margin: '0 0 6px' }}>{panel.term}</h4>
              <p className="subtle" style={{ marginTop: 0 }}>{panel.desc}</p>
              {!!panel.relatedTerms?.length && <div className="chips" style={{ marginTop: 6 }}>{panel.relatedTerms.map((t) => <span className="chip" key={t}>{t}</span>)}</div>}
              {!!panel.relatedChapters?.length && (
                <div className="quick-links" style={{ marginTop: 8 }}>
                  {panel.relatedChapters.map((cid) => <Link key={cid} to={`/curriculum#${cid}`} className="btn btn-ghost" style={{ padding: '5px 10px' }}>开始学习</Link>)}
                  {panel.relatedChapters.map((cid) => <Link key={`${cid}-quiz`} to={`/curriculum#${cid}`} className="btn btn-ghost" style={{ padding: '5px 10px' }}>去复测</Link>)}
                </div>
              )}
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
