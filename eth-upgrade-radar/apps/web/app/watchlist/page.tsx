export const dynamic = 'force-dynamic';

async function getSubs() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  return fetch(`${base}/api/subscriptions`, { cache: 'no-store' }).then((r) => r.json()).catch(() => []);
}

export default async function Page() {
  const subs = await getSubs();
  return (
    <main className="container">
      <h1 className="page-title">Watchlist / Alerts</h1>
      <section className="card">
        <h3>Subscriptions</h3>
        <pre>{JSON.stringify(subs, null, 2)}</pre>
        <p className="sub">RSS feed: <code>/api/subscriptions/rss.xml</code></p>
      </section>
    </main>
  );
}
