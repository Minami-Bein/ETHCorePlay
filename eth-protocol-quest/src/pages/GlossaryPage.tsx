import { Link } from 'react-router-dom';
import { glossary as localGlossary } from '../data/glossary';
import { useEffect, useMemo, useState } from 'react';
import { loadCmsJson } from '../services/cms';

export function GlossaryPage() {
  const [q, setQ] = useState('');
  const [glossary, setGlossary] = useState(localGlossary);

  useEffect(() => {
    loadCmsJson('glossary', localGlossary).then(setGlossary);
  }, []);

  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return glossary;
    return glossary.filter((g) => `${g.term} ${g.desc}`.toLowerCase().includes(k));
  }, [q]);

  const grouped = useMemo(() => {
    const buckets: Record<string, typeof filtered> = {};
    filtered.forEach((g) => {
      const c = /^[A-Za-z]/.test(g.term) ? g.term[0].toUpperCase() : '#';
      if (!buckets[c]) buckets[c] = [];
      buckets[c].push(g);
    });
    return Object.entries(buckets).sort((a,b)=>a[0].localeCompare(b[0]));
  }, [filtered]);

  return (
    <main className="container">
      <Link to="/">← 首页</Link>
      <h2>协议术语花名册</h2>
      <section className="card card-hover">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索术语：如 blob / pbs / paymaster / finality"
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid var(--border-default)' }}
        />
        <small className="subtle">当前术语：{filtered.length}/{glossary.length}</small>
      </section>

      <div className="card card-hover">
        <div className="chips" style={{ marginBottom: 10 }}>
          {grouped.map(([k]) => <a key={k} href={`#g-${k}`} className="chip">{k}</a>)}
        </div>
        {grouped.map(([k, list]) => (
          <section key={k} id={`g-${k}`} style={{ marginBottom: 14 }}>
            <h3 style={{ marginBottom: 8 }}>{k}</h3>
            <div className="grid">
              {list.map((g) => (
                <article key={g.term} className="level" style={{ cursor: 'default' }}>
                  <strong>{g.term}</strong>
                  <small>{g.desc}</small>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
