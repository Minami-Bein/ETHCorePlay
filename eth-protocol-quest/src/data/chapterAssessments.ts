export type AssessmentQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type ChapterAssessment = {
  chapterId: string;
  passThreshold: number; // 0-1
  questions: AssessmentQuestion[];
};

export const chapterAssessments: ChapterAssessment[] = [
  {
    chapterId: 'el-core',
    passThreshold: 0.7,
    questions: [
      { id: 'el-a1', prompt: 'EL 的主要职责是？', options: ['执行交易并更新状态', '做媒体传播', '提供 DNS', '管理钱包 UI'], answerIndex: 0, explanation: 'EL 是执行与状态层。' },
      { id: 'el-a2', prompt: 'Nonce 的主要作用是？', options: ['增加 gas', '防重放并排序', '提高 TPS', '降低延迟'], answerIndex: 1, explanation: 'Nonce 防重放并限制顺序。' },
      { id: 'el-a3', prompt: '1559 中动态变化的是？', options: ['chainId', 'baseFee', 'nonce', 'logs'], answerIndex: 1, explanation: 'baseFee 随拥堵动态调整。' }
    ]
  },
  {
    chapterId: 'cl-core',
    passThreshold: 0.7,
    questions: [
      { id: 'cl-a1', prompt: 'Finality 表示？', options: ['刚打包', '几乎不可逆', '钱包已签名', '节点已同步'], answerIndex: 1, explanation: 'Finality 是强不可逆保障。' },
      { id: 'cl-a2', prompt: 'Fork choice 解决什么问题？', options: ['手续费计算', '链头选择', '密钥管理', 'RPC 限流'], answerIndex: 1, explanation: '核心是链头选择。' },
      { id: 'cl-a3', prompt: 'Slashing 用于？', options: ['奖励恶意行为', '惩罚有害行为', '增加区块容量', '替代共识'], answerIndex: 1, explanation: '经济惩罚维护安全。' }
    ]
  },
  {
    chapterId: 'evm-core',
    passThreshold: 0.7,
    questions: [
      { id: 'evm-a1', prompt: 'EVM 是？', options: ['确定性栈机', '关系数据库', '流媒体服务', '消息队列'], answerIndex: 0, explanation: 'EVM 为确定性栈机。' },
      { id: 'evm-a2', prompt: '持久数据位置是？', options: ['Memory', 'Storage', 'Stack', 'Calldata'], answerIndex: 1, explanation: 'Storage 持久化。' },
      { id: 'evm-a3', prompt: 'Revert 的影响是？', options: ['提交状态', '回滚状态并报错', '跳过 gas', '强制成功'], answerIndex: 1, explanation: '回滚状态。' }
    ]
  },
  {
    chapterId: 'tx-lifecycle-core',
    passThreshold: 0.7,
    questions: [
      { id: 'tx-a1', prompt: '交易广播后通常先进入？', options: ['mempool', 'IPFS', '冷钱包', 'DNS'], answerIndex: 0, explanation: '先入 mempool。' },
      { id: 'tx-a2', prompt: '“已打包”是否等于最终不可逆？', options: ['是', '否'], answerIndex: 1, explanation: '需最终性确认。' },
      { id: 'tx-a3', prompt: '同 nonce 替换交易通常需？', options: ['更高费率', '更低费率', '更短 data', '不同 chain'], answerIndex: 0, explanation: '更高费率常用于替换。' }
    ]
  }
];
