export const dynamic = 'force-dynamic';

type Params = { q?: string; entityType?: string; source?: string; dateFrom?: string; dateTo?: string };

async function search(p: Params) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  const qs = new URLSearchParams();
  if (p.q) qs.set('q', p.q);
  if (p.entityType) qs.set('entityType', p.entityType);
  if (p.source) qs.set('source', p.source);
  if (p.dateFrom) qs.set('dateFrom', p.dateFrom);
  if (p.dateTo) qs.set('dateTo', p.dateTo);
  return fetch(`${base}/api/search?${qs.toString()}`, { cache: 'no-store' })
    .then((r) => r.json())
    .catch(() => ({ upgrades: [], eips: [], meetings: [], osHits: [] }));
}

export default async function Page({ searchParams }: any) {
  const p: Params = {
    q: searchParams?.q || '',
    entityType: searchParams?.entityType || 'all',
    source: searchParams?.source || 'all',
    dateFrom: searchParams?.dateFrom || '',
    dateTo: searchParams?.dateTo || ''
  };
  const data = await search(p);

  const showUpgrade = p.entityType === 'all' || p.entityType === 'upgrade';
  const showEip = p.entityType === 'all' || p.entityType === 'eip';
  const showMeeting = p.entityType === 'all' || p.entityType === 'meeting';

  return (
    <main className="container">
      <h1 className="page-title">Search</h1>
      <form className="card" style={{ marginBottom: 12 }}>
        <div className="grid grid-3">
          <input name="q" defaultValue={p.q} className="search-input" placeholder="EIP / upgrade / meeting / client / devnet" />
          <select name="entityType" defaultValue={p.entityType} className="search-input">
            <option value="all">all entities</option>
            <option value="upgrade">upgrade</option>
            <option value="eip">eip</option>
            <option value="meeting">meeting</option>
          </select>
          <select name="source" defaultValue={p.source} className="search-input">
            <option value="all">all sources</option>
            <option value="github">github</option>
            <option value="forum">forum</option>
            <option value="specs">specs</option>
          </select>
        </div>
        <div className="grid grid-2" style={{ marginTop: 8 }}>
          <input type="date" name="dateFrom" defaultValue={p.dateFrom} className="search-input" />
          <input type="date" name="dateTo" defaultValue={p.dateTo} className="search-input" />
        </div>
        <div style={{ marginTop: 10 }}><button className="btn">Apply Filters</button></div>
      </form>

      <section className="grid grid-2">
        {showUpgrade && (
          <article className="card">
            <h3>Upgrades ({data.upgrades?.length || 0})</h3>
            <ul className="list">{(data.upgrades || []).map((u: any) => <li key={u.slug}><a href={`/upgrade/${u.slug}`}>{u.name || u.slug}</a> <span className="chip">{u.status}</span></li>)}</ul>
          </article>
        )}

        {showEip && (
          <article className="card">
            <h3>EIPs ({data.eips?.length || 0})</h3>
            <ul className="list">{(data.eips || []).map((e: any) => <li key={e.number}><a href={`/eip/${e.number}`}>EIP-{e.number}</a> · {e.title}</li>)}</ul>
          </article>
        )}

        {showMeeting && (
          <article className="card">
            <h3>Meetings ({data.meetings?.length || 0})</h3>
            <ul className="list">{(data.meetings || []).map((m: any) => <li key={m.id}><a href={`/meeting/${m.id}`}>{m.title || m.id}</a></li>)}</ul>
          </article>
        )}

        <article className="card">
          <h3>OpenSearch Hits ({data.osHits?.length || 0})</h3>
          <ul className="list">{(data.osHits || []).slice(0, 12).map((h: any, i: number) => <li key={i}>{h.title || h.name || h.type || 'untitled'}<div className="sub">{h.summary || h.sourceRef || ''}</div></li>)}</ul>
        </article>
      </section>
    </main>
  );
}
