import { levels } from '../data/levels';

export function getDailyQuests() {
  const day = new Date().getDate();
  const idx = day % levels.length;
  const level = levels[idx];
  return [
    `完成 ${level.title} 的 1 次挑战`,
    '复习错题本中的 2 题',
    '写下 1 条你今天学到的协议洞察'
  ];
}
