import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type LOD = 'zone' | 'plot' | 'edge';
type Node = { id: string; name: string; zone: string; x: number; y: number };

const nodes: Node[] = [
  { id: 'el-core', name: 'Execution', zone: 'Execution', x: 80, y: 140 },
  { id: 'cl-core', name: 'Consensus', zone: 'Consensus', x: 220, y: 80 },
  { id: 'engine-api-core', name: 'Engine API', zone: 'Tooling', x: 380, y: 150 },
  { id: 'l2-da-core', name: 'Scaling', zone: 'Scaling', x: 520, y: 90 },
  { id: 'security-core', name: 'Security', zone: 'Security', x: 660, y: 160 }
];

export function SVGRenderer() {
  const [hover, setHover] = useState<Node | null>(null);
  const [zoom, setZoom] = useState(1);
  const edges = useMemo(() => [[0, 1], [1, 2], [2, 3], [2, 4]], []);

  const lod: LOD = zoom < 0.9 ? 'zone' : zoom < 1.35 ? 'plot' : 'edge';

  return (
    <div className="card card-hover">
      <div className="card-title-row">
        <h3 className="section-title">花园地图（SVG）</h3>
        <small className="subtle">LOD 自动切换：{lod}（zoom {zoom.toFixed(2)}）</small>
      </div>
      <input type="range" min={0.7} max={1.7} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} style={{ width: '100%', marginBottom: 8 }} />

      <svg viewBox="0 0 760 230" style={{ width: '100%', height: 'auto', borderRadius: 12, background: 'var(--bg-elevated)' }}>
        <g transform={`scale(${zoom})`} transform-origin="50% 50%">
          {lod === 'edge' && edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="var(--border-default)" strokeDasharray="5 4" />
          ))}

          {nodes.map((n) => (
            <g key={n.id} tabIndex={0} role="button" aria-label={`打开 ${n.name}`} onFocus={() => setHover(n)} onBlur={() => setHover(null)} onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ window.location.hash=`/plot/${n.id}`; } }} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(null)}>
              <circle cx={n.x} cy={n.y} r={lod === 'zone' ? 26 : 18} fill="var(--brand-primary)" opacity="0.85" />
              {(lod !== 'zone' || hover?.id === n.id) && (
                <text x={n.x} y={n.y + 34} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{n.name}</text>
              )}
            </g>
          ))}
        </g>
      </svg>

      {hover && <p className="subtle">{hover.name} · {hover.zone} · <Link to={`/plot/${hover.id}`}>打开地块</Link></p>}
    </div>
  );
}
