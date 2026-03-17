'use client';

import { useState } from 'react';

type Sub = { id: string; channel: string; target: string; filter?: any };

export function WatchlistClient({ initial }: { initial: Sub[] }) {
  const [subs, setSubs] = useState<Sub[]>(initial || []);
  const [channel, setChannel] = useState('telegram');
  const [target, setTarget] = useState('');
  const [entityType, setEntityType] = useState('upgrade');
  const [entityId, setEntityId] = useState('fusaka');
  const [loading, setLoading] = useState(false);

  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${base}/api/subscriptions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ channel, target, filter: { entityType, entityId } })
      });
      const data = await res.json();
      setSubs((s) => [data, ...s]);
      setTarget('');
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    await fetch(`${base}/api/subscriptions/${id}`, { method: 'DELETE' });
    setSubs((s) => s.filter((x) => x.id !== id));
  }

  return (
    <>
      <form className="card" onSubmit={submit} style={{ marginBottom: 12 }}>
        <h3>Create Subscription</h3>
        <div className="grid grid-3">
          <label>Channel<select value={channel} onChange={(e) => setChannel(e.target.value)} className="search-input"><option>telegram</option><option>discord</option><option>webhook</option><option>email</option><option>rss</option></select></label>
          <label>Target<input value={target} onChange={(e) => setTarget(e.target.value)} className="search-input" placeholder="chat_id / webhook / email" required /></label>
          <label>Entity Type<select value={entityType} onChange={(e) => setEntityType(e.target.value)} className="search-input"><option>upgrade</option><option>eip</option><option>meeting</option><option>client</option></select></label>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Entity ID<input value={entityId} onChange={(e) => setEntityId(e.target.value)} className="search-input" placeholder="fusaka / eip-4844 / acde" /></label>
        </div>
        <div style={{ marginTop: 10 }}><button className="btn" disabled={loading}>{loading ? 'Submitting...' : 'Subscribe'}</button></div>
      </form>

      <section className="card">
        <h3>Subscriptions ({subs.length})</h3>
        <ul className="list">
          {subs.map((s) => (
            <li key={s.id}>
              <b>{s.channel}</b> · {s.target}
              <div className="sub">filter: {JSON.stringify(s.filter || {})}</div>
              <button className="btn" onClick={() => remove(s.id)} style={{ marginTop: 6 }}>Remove</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
