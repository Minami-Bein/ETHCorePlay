export const dynamic = 'force-dynamic';

async function search(q: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  return fetch(`${base}/api/search?q=${encodeURIComponent(q)}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ upgrades: [], eips: [], meetings: [], osHits: [] }));
}

export default async function Page({ searchParams }: any) {
  const q = searchParams?.q || '';
  const data = await search(q);
  return (
    <main className="container">
      <h1 className="page-title">Search</h1>
      <form className="card" style={{ marginBottom: 12 }}>
        <input name="q" defaultValue={q} className="search-input" placeholder="EIP / upgrade / meeting / client / devnet" />
      </form>

      <section className="grid grid-2">
        <article className="card"><h3>Upgrades</h3><pre>{JSON.stringify(data.upgrades, null, 2)}</pre></article>
        <article className="card"><h3>EIPs</h3><pre>{JSON.stringify(data.eips, null, 2)}</pre></article>
        <article className="card"><h3>Meetings</h3><pre>{JSON.stringify(data.meetings, null, 2)}</pre></article>
        <article className="card"><h3>OpenSearch Hits</h3><pre>{JSON.stringify(data.osHits, null, 2)}</pre></article>
      </section>
    </main>
  );
}
