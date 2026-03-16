import Link from 'next/link';

async function getEip(number: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  const [eip, timeline] = await Promise.all([
    fetch(`${base}/api/eips/${number}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null),
    fetch(`${base}/api/timeline/eip/${number}?limit=200`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ stats: { byType: {} }, events: [] }))
  ]);
  return { eip, timeline };
}

export default async function Page({ params }: any) {
  const { eip, timeline } = await getEip(params.number);
  const events = timeline?.events || [];

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
