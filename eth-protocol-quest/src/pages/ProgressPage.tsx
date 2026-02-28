import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgressStore } from '../game/store';

export function ProgressPage() {
  const { xp, completed, wrongBook, clearWrongBook, knowledgeMap, setKnowledgeStatus } = useProgressStore();

  const doneCount = useMemo(() => Object.values(completed).filter(Boolean).length, [completed]);
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
      <div className="card">
        <p>总 XP：<strong>{xp}</strong></p>
        <p>已通关：<strong>{doneCount}</strong> 关</p>
        <p>错题数量：<strong>{wrongBook.length}</strong></p>
      </div>

      <div className="card">
        <h3>知识图谱（协议全栈）</h3>
        {Object.entries(domainGroups).map(([domain, nodes]) => (
          <div key={domain} style={{ marginBottom: 12 }}>
            <strong>{domain}</strong>
            <ul>
              {nodes.map((n) => (
                <li key={n.id}>
                  {n.title}
                  <select value={n.status} onChange={(e) => setKnowledgeStatus(n.id, e.target.value as any)} style={{ marginLeft: 8 }}>
                    <option value="todo">todo</option>
                    <option value="learning">learning</option>
                    <option value="done">done</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>错题本</h3>
        {wrongBook.length === 0 ? (
          <p>暂无错题，继续闯关吧。</p>
        ) : (
          <>
            <button className="btn" onClick={clearWrongBook}>清空错题本</button>
            <ul>
              {wrongBook.map((w) => (
                <li key={`${w.levelId}-${w.questionId}`}>
                  [Lv{w.levelId}] {w.prompt} —— {w.explanation}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
