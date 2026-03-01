import { Link } from 'react-router-dom';
import { glossary } from '../data/glossary';
import { ArrowLeft } from 'lucide-react';

export function GlossaryPage() {
  return (
    <main className="container">
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <ArrowLeft size={16} /> 返回首页
      </Link>
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
