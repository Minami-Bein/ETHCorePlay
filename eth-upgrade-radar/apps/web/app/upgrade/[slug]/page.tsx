import Link from 'next/link';

async function getUpgrade(slug: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  const [upgrade, timeline] = await Promise.all([
    fetch(`${base}/api/upgrades/${slug}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null),
    fetch(`${base}/api/timeline/upgrade/${slug}?limit=200`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ stats: { byType: {} }, events: [] }))
  ]);
  return { upgrade, timeline };
}

function blockers(events: any[]) {
  return events.filter((e) => /block|issue|halt|fail|controvers/i.test(`${e.title} ${e.summary || ''}`)).slice(0, 8);
}

export default async function Page({ params }: any) {
  const { upgrade, timeline } = await getUpgrade(params.slug);
  const events = timeline?.events || [];
  const bl = blockers(events);

  return (
    <main className="container">
      <h1 className="page-title">Upgrade Detail · {params.slug}</h1>
      {!upgrade && <p className="sub">Upgrade not found.</p>}
      {upgrade && (
        <section className="card">
          <h3>{upgrade.name}</h3>
          <div className="chips">
            <span className="chip">status {upgrade.status}</span>
            <span className="chip">readiness {upgrade.readinessScore ?? 0}</span>
            <span className="chip">confidence {upgrade.confidenceScore ?? 0}</span>
          </div>
        </section>
      )}

      <section className="grid grid-2" style={{ marginTop: 12 }}>
        <article className="card">
          <h3>Signals</h3>
          <pre>{JSON.stringify(timeline?.stats || {}, null, 2)}</pre>
        </article>
        <article className="card">
          <h3>Blockers / Controversies</h3>
          <ul className="list">{bl.map((e: any) => <li key={e.id}><b>{e.type}</b> · {e.title}</li>)}</ul>
          {!bl.length && <p className="sub">No strong blocker signal in this window.</p>}
        </article>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h3>Evidence Timeline</h3>
        <ul className="timeline list">
          {events.slice(0, 40).map((e: any) => (
            <li key={e.id}>
              <b>{e.type}</b> · {e.title}
              <br />
              <small>{e.occurredAt ? new Date(e.occurredAt).toLocaleString() : 'n/a'} · importance {e.importanceScore ?? 0} · {e.sourceRef ? <a href={e.sourceRef} target="_blank">source</a> : 'source n/a'}</small>
            </li>
          ))}
        </ul>
      </section>

      <p style={{ marginTop: 12 }}><Link className="btn" href={`/search?q=${params.slug}`}>Search related signals</Link></p>
    </main>
  );
}
