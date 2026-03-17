import Link from 'next/link';

async function getEip(number: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  const [eip, timeline] = await Promise.all([
    fetch(`${base}/api/eips/${number}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null),
    fetch(`${base}/api/timeline/eip/${number}?limit=200`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ stats: { byType: {} }, events: [] }))
  ]);
  return { eip, timeline };
}


function typeDist(events: any[]) {
  const m: Record<string, number> = {};
  for (const e of events) m[e.type] = (m[e.type] || 0) + 1;
  return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,8);
}

function dayTrend(events: any[]) {
  const m: Record<string, number> = {};
  for (const e of events) {
    const d = e.occurredAt ? new Date(e.occurredAt).toISOString().slice(0,10) : 'unknown';
    m[d] = (m[d] || 0) + 1;
  }
  return Object.entries(m).sort((a,b)=>a[0].localeCompare(b[0])).slice(-10);
}

export default async function Page({ params }: any) {
  const { eip, timeline } = await getEip(params.number);
  const events = timeline?.events || [];
  const dist = typeDist(events);
  const trend = dayTrend(events);

  return (
    <main className="container">
      <h1 className="page-title">EIP Detail · {params.number}</h1>
      {!eip && <p className="sub">EIP not found.</p>}
      {eip && (
        <section className="card">
          <h3>{eip.title}</h3>
          <div className="chips"><span className="chip">status {eip.status}</span><span className="chip">inclusion {eip.inclusionStage}</span></div>
        </section>
      )}

      <section className="grid grid-2" style={{ marginTop: 12 }}>
        <article className="card">
          <h3>Type Distribution</h3>
          <ul className="list">{dist.map(([k,v]) => <li key={k}><span className="chip">{k}</span> <span style={{ display:'inline-block', width: `${Math.min(100, v*8)}px`, height: 8, background: 'var(--pri)', borderRadius: 8, margin:'0 8px' }} /> {v}</li>)}</ul>
        </article>
        <article className="card">
          <h3>Daily Trend (10d)</h3>
          <ul className="list">{trend.map(([d,v]) => <li key={d}><small>{d}</small> <span style={{ display:'inline-block', width: `${Math.min(120, v*12)}px`, height: 8, background: 'var(--cyan)', borderRadius: 8, margin:'0 8px' }} /> {v}</li>)}</ul>
        </article>
        <article className="card"><h3>Signals</h3><pre>{JSON.stringify(timeline?.stats || {}, null, 2)}</pre></article>
        <article className="card"><h3>Recent Discussions / Implementations</h3><ul className="list">{events.slice(0, 10).map((e: any) => <li key={e.id}><b>{e.type}</b> · {e.title}</li>)}</ul></article>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h3>Evidence Timeline</h3>
        <ul className="timeline list">
          {events.slice(0, 40).map((e: any) => (
            <li key={e.id}><b>{e.type}</b> · {e.title}<br /><small>{e.occurredAt ? new Date(e.occurredAt).toLocaleString() : 'n/a'} · importance {e.importanceScore ?? 0} · {e.sourceRef ? <a href={e.sourceRef} target="_blank">source</a> : 'source n/a'}</small></li>
          ))}
        </ul>
      </section>

      <p style={{ marginTop: 12 }}><Link className="btn" href={`/search?q=EIP-${params.number}`}>Search related signals</Link></p>
    </main>
  );
}
