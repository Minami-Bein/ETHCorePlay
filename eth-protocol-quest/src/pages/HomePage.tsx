import { Link } from 'react-router-dom';
import { useProgressStore } from '../game/store';

export function HomePage() {
  const { xp, unlockedLevel } = useProgressStore();

  return (
    <main className="container">
      <h1>Ethereum Protocol Quest</h1>
      <p>用闯关游戏学习以太坊协议：EL / CL / EVM / TX / Engine API / EIP / 客户端测试。</p>
      <div className="card">
        <p>当前 XP：<strong>{xp}</strong></p>
        <p>已解锁关卡：<strong>Lv{unlockedLevel}</strong></p>
        <Link to="/map" className="btn">开始闯关</Link>
      </div>
    </main>
  );
}
