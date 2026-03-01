import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgressStore } from '../game/store';

export function ProgressPage() {
  const { xp, completed, wrongBook, clearWrongBook, knowledgeMap, setKnowledgeStatus } = useProgressStore();

  const doneCount = useMemo(() => Object.values(completed).filter(Boolean).length, [completed]);
  const totalNodes = knowledgeMap.length || 1;
  const doneNodes = knowledgeMap.filter((n) => n.status === 'done').length;
  const completionPct = Math.round((doneNodes / totalNodes) * 100);
  const domainGroups = useMemo(() => {
    return knowledgeMap.reduce<Record<string, typeof knowledgeMap>>((acc, n) => {
      if (!acc[n.domain]) acc[n.domain] = [];
      acc[n.domain].push(n);
      return acc;
    }, {});
  }, [knowledgeMap]);

  return (
    <main className="container">
      <Link to="/">← 首页</Link>
      <h2>学习进度总览</h2>

      <section className="card card-hover">
        <div className="kpi-grid">
          <div className="kpi"><small>总 XP</small><br/><b>{xp}</b></div>
          <div className="kpi"><small>已通关</small><br/><b>{doneCount} 关</b></div>
          <div className="kpi"><small>错题数量</small><br/><b>{wrongBook.length}</b></div>
        </div>
        <div style={{ marginTop: 10 }}>
          <small>知识图谱完成度：{doneNodes}/{totalNodes}（{completionPct}%）</small>
          <div className="progress-rail" style={{ marginTop: 6 }}><div className="progress-fill" style={{ width: `${completionPct}%` }} /></div>
        </div>
      </section>

      <section className="card card-hover">
        <div className="card-title-row">
          <h3 style={{ margin: 0 }}>知识图谱（协议全栈）</h3>
          <span className="meta-pill">可直接修改学习状态</span>
        </div>
        <div className="grid">
          {Object.entries(domainGroups).map(([domain, nodes]) => {
            const done = nodes.filter((n) => n.status === 'done').length;
            return (
              <article key={domain} className="level" style={{ cursor: 'default' }}>
                <strong>{domain}</strong>
                <small>完成度：{done}/{nodes.length}</small>
                <ul>
                  {nodes.map((n) => (
                    <li key={n.id} style={{ marginBottom: 6 }}>
                      <span>{n.title}</span>
                      <select value={n.status} onChange={(e) => setKnowledgeStatus(n.id, e.target.value as any)} style={{ marginLeft: 8 }}>
                        <option value="todo">todo</option>
                        <option value="learning">learning</option>
                        <option value="done">done</option>
                      </select>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="card card-hover">
        <div className="card-title-row">
          <h3 style={{ margin: 0 }}>错题本</h3>
          {wrongBook.length > 0 && <button className="btn btn-ghost" onClick={clearWrongBook}>清空错题本</button>}
        </div>
        {wrongBook.length === 0 ? (
          <div className="notice">暂无错题，继续闯关吧。建议去课程页做一次章节复测。</div>
        ) : (
          <ul>
            {wrongBook.map((w) => (
              <li key={`${w.levelId}-${w.questionId}`}>
                <strong>[Lv{w.levelId}]</strong> {w.prompt}<br/>
                <small>{w.explanation}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
