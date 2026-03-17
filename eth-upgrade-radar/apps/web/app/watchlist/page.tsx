export const dynamic = 'force-dynamic';

import { WatchlistClient } from './WatchlistClient';

async function getSubs() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  return fetch(`${base}/api/subscriptions`, { cache: 'no-store' }).then((r) => r.json()).catch(() => []);
}

export default async function Page() {
  const subs = await getSubs();
  return (
    <main className="container">
      <h1 className="page-title">Watchlist / Alerts</h1>
      <WatchlistClient initial={subs} />
      <p className="sub" style={{ marginTop: 10 }}>RSS feed: <code>/api/subscriptions/rss.xml</code></p>
    </main>
  );
}
