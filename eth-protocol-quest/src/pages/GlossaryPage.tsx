import { Link } from 'react-router-dom';
import { glossary } from '../data/glossary';

export function GlossaryPage() {
  return (
    <main className="container">
      <Link to="/">← 首页</Link>
      <h2>协议术语花名册</h2>
      <div className="card">
        <ul>
          {glossary.map((g) => (
            <li key={g.term} style={{ marginBottom: 10 }}>
              <strong>{g.term}</strong>
              <div>{g.desc}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
