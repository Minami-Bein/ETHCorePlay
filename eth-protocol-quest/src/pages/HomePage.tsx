import { Link } from 'react-router-dom';
import { useProgressStore } from '../game/store';
import { getDailyQuests } from '../game/daily';

export function HomePage() {
  const { xp, unlockedLevel } = useProgressStore();
  const daily = getDailyQuests();

  return (
    <main className="container">
      <h1>Ethereum Protocol Quest</h1>
      <p>用闯关游戏学习以太坊协议：EL / CL / EVM / TX / Engine API / EIP / 客户端测试。</p>
      <div className="card">
        <p>当前 XP：<strong>{xp}</strong></p>
        <p>已解锁关卡：<strong>Lv{unlockedLevel}</strong></p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/map" className="btn">开始闯关</Link>
          <Link to="/progress" className="btn">学习总览</Link>
        </div>
      </div>

      <div className="card">
        <h3>每日任务</h3>
        <ul>{daily.map((d) => <li key={d}>{d}</li>)}</ul>
      </div>
    </main>
  );
}
