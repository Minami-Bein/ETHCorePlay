import Link from 'next/link';

async function fetchJson(path: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  try { return await fetch(`${base}${path}`, { cache: 'no-store' }).then((r) => r.json()); }
  catch { return []; }
}

export default async function Page() {
  const [upgrades, meetings, events] = await Promise.all([
    fetchJson('/api/upgrades'),
    fetchJson('/api/meetings'),
    fetchJson('/api/events')
  ]);

  return (
    <main className="container">
      <h1 className="page-title">Ethereum Upgrade Monitoring Dashboard</h1>
      <p className="sub">把 Ethereum PM、EIPs、Specs、Client、Devnet 的离散信号收敛到同一时间线，并保留可追溯证据。</p>

      <section className="kpi" style={{ marginTop: 10 }}>
        <article className="item"><div className="sub">Tracked Upgrades</div><div className="big">{upgrades.length || 0}</div></article>
        <article className="item"><div className="sub">Meetings</div><div className="big">{meetings.length || 0}</div></article>
        <article className="item"><div className="sub">Recent Events</div><div className="big">{events.length || 0}</div></article>
        <article className="item"><div className="sub">Hot EIP</div><div className="big"><Link href="/eip/4844">4844</Link></div></article>
      </section>

      <section className="grid grid-2" style={{ marginTop: 12 }}>
        <article className="card">
          <h3>Current Upgrades</h3>
          <ul className="list">
            {(upgrades || []).map((u: any) => (
              <li key={u.slug}>
                <Link href={`/upgrade/${u.slug}`}>{u.name || u.slug}</Link>{' '}
                <span className={`badge ${u.readinessScore > 60 ? 'ok' : u.readinessScore > 35 ? 'warn' : 'bad'}`}>readiness {u.readinessScore ?? 0}</span>
                <div className="sub">status: {u.status}</div>
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h3>Latest Meetings</h3>
          <ul className="list">
            {(meetings || []).slice(0, 8).map((m: any) => (
              <li key={m.id}><Link href={`/meeting/${m.id}`}>{m.title || m.id}</Link></li>
            ))}
          </ul>
        </article>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h3>Recent Timeline Events</h3>
        <ul className="timeline list">
          {(events || []).slice(0, 12).map((e: any) => (
            <li key={e.id}>
              <b>{e.type}</b> · {e.title}
              <br />
              <small>{e.occurredAt ? new Date(e.occurredAt).toLocaleString() : 'n/a'} · importance {e.importanceScore ?? 0}</small>
            </li>
          ))}
        </ul>
        <div className="chips"><Link className="btn" href="/search?q=fusaka">Search Signals</Link><Link className="btn" href="/watchlist">Open Watchlist</Link></div>
      </section>
    </main>
  );
}
