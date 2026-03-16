async function getMeeting(id: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  return fetch(`${base}/api/meetings/${id}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null);
}

export default async function Page({ params }: any) {
  const meeting = await getMeeting(params.id);
  return (
    <main className="container">
      <h1 className="page-title">Meeting Detail · {params.id}</h1>
      <section className="card">
        {!meeting && <p className="sub">Meeting not found.</p>}
        {meeting && <pre>{JSON.stringify(meeting, null, 2)}</pre>}
      </section>
    </main>
  );
}
