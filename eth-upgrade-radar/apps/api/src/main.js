const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const DATA_DIR = path.resolve(__dirname, '../../worker/.data');
const SUBS_FILE = path.resolve(__dirname, '../data/subscriptions.json');

const fallback = {
  upgrades: [
    { id: 'u1', slug: 'fusaka', name: 'Fusaka', status: 'scoping', readinessScore: 56, confidenceScore: 62 },
    { id: 'u2', slug: 'glamsterdam', name: 'Glamsterdam', status: 'proposed', readinessScore: 31, confidenceScore: 44 },
    { id: 'u3', slug: 'hegota', name: 'Hegotá', status: 'proposed', readinessScore: 24, confidenceScore: 36 }
  ],
  eips: [{ id: 'e1', number: 4844, title: 'Shard Blob Transactions', status: 'final', inclusionStage: 'sfi' }],
  meetings: [{ id: 'acde-201', series: 'acde', title: 'All Core Devs Execution #201', meetingAt: new Date().toISOString() }],
  events: []
};

function safeReadJson(file, dft) {
  try {
    if (!fs.existsSync(file)) return dft;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return dft;
  }
}

function readData() {
  const events = safeReadJson(path.join(DATA_DIR, 'events.json'), fallback.events).map((e, i) => ({
    id: e.id || `evt-${i}`,
    type: e.type || 'event',
    title: e.title || 'untitled',
    summary: e.summary || null,
    sourceRef: e.sourceRef || null,
    importanceScore: Number(e.importanceScore || 0),
    occurredAt: e.occurredAt || new Date().toISOString(),
    entityRefs: Array.isArray(e.entityRefs) ? e.entityRefs : []
  }));
  return {
    upgrades: fallback.upgrades,
    eips: fallback.eips,
    meetings: fallback.meetings,
    events
  };
}

function ensureSubsFile() {
  const dir = path.dirname(SUBS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(SUBS_FILE)) fs.writeFileSync(SUBS_FILE, '[]');
}
function listSubs() {
  ensureSubsFile();
  return safeReadJson(SUBS_FILE, []);
}
function saveSubs(arr) {
  ensureSubsFile();
  fs.writeFileSync(SUBS_FILE, JSON.stringify(arr, null, 2));
}

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/api/upgrades', (_, res) => {
  const d = readData();
  res.json(d.upgrades);
});

app.get('/api/upgrades/:slug', (req, res) => {
  const d = readData();
  const row = d.upgrades.find((u) => u.slug === req.params.slug);
  res.json(row || null);
});

app.get('/api/eips/:number', (req, res) => {
  const d = readData();
  const n = Number(req.params.number);
  const row = d.eips.find((e) => Number(e.number) === n);
  res.json(row || null);
});

app.get('/api/meetings', (_, res) => {
  const d = readData();
  res.json(d.meetings);
});

app.get('/api/meetings/:id', (req, res) => {
  const d = readData();
  const row = d.meetings.find((m) => m.id === req.params.id);
  res.json(row || null);
});

app.get('/api/events', (_, res) => {
  const d = readData();
  res.json(d.events.slice(0, 300));
});

function timelineBy(entityKey, query) {
  const d = readData();
  let rows = d.events.filter((e) => (e.entityRefs || []).includes(entityKey));
  if (query.type) rows = rows.filter((e) => e.type === query.type);
  if (query.minImportance) rows = rows.filter((e) => Number(e.importanceScore || 0) >= Number(query.minImportance || 0));
  const limit = Math.min(500, Math.max(1, Number(query.limit || 200)));
  rows = rows.sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt)).slice(0, limit);

  const byType = {};
  rows.forEach((e) => { byType[e.type] = (byType[e.type] || 0) + 1; });
  const maxImportance = rows.length ? Math.max(...rows.map((e) => Number(e.importanceScore || 0))) : 0;

  return { entity: entityKey, stats: { total: rows.length, maxImportance, byType }, events: rows };
}

app.get('/api/timeline/upgrade/:slug', (req, res) => res.json(timelineBy(`upgrade:${req.params.slug}`, req.query)));
app.get('/api/timeline/eip/:number', (req, res) => res.json(timelineBy(`eip:eip-${req.params.number}`, req.query)));
app.get('/api/timeline/client/:name', (req, res) => res.json(timelineBy(`client:${String(req.params.name).toLowerCase()}`, req.query)));

app.get('/api/search', (req, res) => {
  const d = readData();
  const q = String(req.query.q || '').toLowerCase();
  const entityType = String(req.query.entityType || 'all');

  const upgrades = (entityType === 'all' || entityType === 'upgrade')
    ? d.upgrades.filter((u) => `${u.slug} ${u.name}`.toLowerCase().includes(q))
    : [];
  const eips = (entityType === 'all' || entityType === 'eip')
    ? d.eips.filter((e) => `${e.number} ${e.title}`.toLowerCase().includes(q))
    : [];
  const meetings = (entityType === 'all' || entityType === 'meeting')
    ? d.meetings.filter((m) => `${m.id} ${m.title}`.toLowerCase().includes(q))
    : [];
  const osHits = d.events.filter((e) => `${e.type} ${e.title} ${e.summary || ''}`.toLowerCase().includes(q)).slice(0, 30);

  res.json({ q, filters: { entityType }, upgrades, eips, meetings, osHits, facets: { source: ['github', 'forum', 'specs'], entityType: ['all', 'upgrade', 'eip', 'meeting'] } });
});

app.get('/api/subscriptions', (_, res) => res.json(listSubs()));

app.post('/api/subscriptions', (req, res) => {
  const subs = listSubs();
  const item = {
    id: String(Date.now()),
    channel: req.body.channel || 'telegram',
    target: req.body.target || '',
    filter: req.body.filter || {}
  };
  subs.unshift(item);
  saveSubs(subs);
  res.json(item);
});

app.delete('/api/subscriptions/:id', (req, res) => {
  const subs = listSubs().filter((x) => x.id !== req.params.id);
  saveSubs(subs);
  res.json({ ok: true });
});

app.get('/api/subscriptions/rss.xml', (_, res) => {
  const d = readData();
  const items = d.events.slice(0, 30).map((e) => `<item><title>${escapeXml(e.type)} - ${escapeXml(e.title)}</title><description>${escapeXml(e.summary || '')}</description><pubDate>${new Date(e.occurredAt).toUTCString()}</pubDate><guid>${e.id}</guid></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Eth Upgrade Radar RSS</title><link>http://localhost:3000</link><description>upgrade timeline feed</description>${items}</channel></rss>`;
  res.setHeader('content-type', 'application/rss+xml; charset=utf-8');
  res.send(xml);
});

app.get('/api/admin/queues', (_, res) => {
  res.json({ ingest: { waiting: 0, active: 0 }, normalize: { waiting: 0, active: 0 }, index: { waiting: 0, active: 0 }, score: { waiting: 0, active: 0 }, notify: { waiting: 0, active: 0 } });
});

app.post('/api/admin/rescore', (_, res) => {
  res.json({ ok: true, note: 'scoring recompute endpoint active (light mode)' });
});

function escapeXml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`api on :${port}`));
