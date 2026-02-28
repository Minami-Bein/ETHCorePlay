import { Level } from '../game/types';

export const levels: Level[] = [
  {
    id: 1,
    slug: 'execution-layer-city',
    title: 'EL 城：状态转移引擎',
    topic: 'EL',
    goal: '理解执行层如何处理交易与状态。',
    story: '你是 EL 城的新晋执行官，任务是确保每笔交易都被正确执行。',
    knowledgeCards: ['EL 负责交易执行与状态转换。', 'Gas 是资源计价机制，防止无限计算。'],
    bossChallenge: '解释 nonce 为什么能防重放。',
    quiz: [
      { id: '1-1', type: 'single', prompt: 'EL 最核心职责是？', options: ['社交传播', '执行交易并更新状态', '生成助记词', '分发空投'], answerIndex: 1, explanation: 'EL 核心是状态机执行。' },
      { id: '1-2', type: 'single', prompt: 'Gas 的主要作用是？', options: ['提升 TPS', '奖励验证者', '限制计算资源并计费', '存储私钥'], answerIndex: 2, explanation: 'Gas 是计算资源定价。' }
    ]
  },
  {
    id: 2,
    slug: 'consensus-layer-mountain',
    title: 'CL 峰：共识与最终性',
    topic: 'CL',
    goal: '理解 slot/epoch/finality。',
    story: '你登上 CL 峰，必须协调验证者达成最终性。',
    knowledgeCards: ['CL 负责区块提议、投票与最终性。', 'Finality 代表很难回滚。'],
    bossChallenge: '用一句话解释 finality 对用户的意义。',
    quiz: [
      { id: '2-1', type: 'single', prompt: 'Finality 意味着？', options: ['区块已广播', '区块几乎不可回滚', '交易打包中', '节点离线'], answerIndex: 1, explanation: 'Finality 强调回滚成本极高。' },
      { id: '2-2', type: 'single', prompt: 'CL 与 EL 关系最准确的是？', options: ['互不关联', 'CL 定共识、EL 执行状态', 'EL 决定最终性', 'CL 负责 RPC'], answerIndex: 1, explanation: '两层通过 Engine API 协同。' }
    ]
  },
  {
    id: 3,
    slug: 'evm-tower',
    title: 'EVM 塔：字节码之心',
    topic: 'EVM',
    goal: '理解 EVM 执行模型与 gas 消耗。',
    story: '你进入 EVM 塔，逐条 opcode 追踪合约执行。',
    knowledgeCards: ['EVM 是确定性执行环境。', '每条 opcode 消耗不同 gas。'],
    bossChallenge: '为什么 EVM 必须确定性？',
    quiz: [
      { id: '3-1', type: 'single', prompt: 'EVM 确定性最重要原因？', options: ['便于 UI 美化', '确保所有节点执行结果一致', '节省磁盘', '支持更多语言'], answerIndex: 1, explanation: '全网一致性依赖确定性。' },
      { id: '3-2', type: 'single', prompt: 'Gas 与 opcode 的关系？', options: ['无关系', '每条 opcode 有成本', '只在部署时收费', '只对失败交易收费'], answerIndex: 1, explanation: 'opcode 成本是 gas 模型核心。' }
    ]
  },
  {
    id: 4,
    slug: 'transaction-factory',
    title: '交易工厂：从钱包到上链',
    topic: 'TX',
    goal: '掌握交易生命周期。',
    story: '你在交易工厂追踪一笔交易从签名到最终确认。',
    knowledgeCards: ['交易先进入 mempool。', '被打包后仍需等待最终性确认。'],
    bossChallenge: '列出交易生命周期 4 个关键阶段。',
    quiz: [
      { id: '4-1', type: 'single', prompt: '交易通常先到哪里？', options: ['IPFS', 'mempool', '冷钱包', '治理论坛'], answerIndex: 1, explanation: '交易先传播并进入内存池。' },
      { id: '4-2', type: 'single', prompt: '交易“打包成功”是否等于最终不可逆？', options: ['是', '否'], answerIndex: 1, explanation: '还需共识层最终性。' }
    ]
  },
  {
    id: 5,
    slug: 'engine-api-bridge',
    title: 'Engine API 桥：EL/CL 协同',
    topic: 'ENGINE',
    goal: '理解 EL 与 CL 如何通过 Engine API 通讯。',
    story: '你守护 Engine API 桥，确保两层协议消息正确交换。',
    knowledgeCards: ['Engine API 是后合并时代 EL/CL 接口。', '错误的 payload 会导致同步与提议问题。'],
    bossChallenge: '解释为什么 Engine API 是“桥”而不是“替代层”。',
    quiz: [
      { id: '5-1', type: 'single', prompt: 'Engine API 主要连接？', options: ['钱包与RPC', 'EL 与 CL', 'L1 与 L2', '节点与浏览器'], answerIndex: 1, explanation: '核心是 EL/CL 协同接口。' },
      { id: '5-2', type: 'single', prompt: 'Merge 后 EL/CL 交互最依赖？', options: ['邮件', 'Engine API', 'IPFS', 'DNS'], answerIndex: 1, explanation: '标准接口就是 Engine API。' }
    ]
  },
  {
    id: 6,
    slug: 'eip-council',
    title: 'EIP 议会：提案与共识流程',
    topic: 'EIP',
    goal: '理解 EIP 生命周期与协作方式。',
    story: '你进入 EIP 议会，把想法打磨成可审阅提案。',
    knowledgeCards: ['EIP 不是投票贴，而是规范化提案流程。', '讨论与迭代是常态。'],
    bossChallenge: '说出一个高质量 EIP 需要的要素。',
    quiz: [
      { id: '6-1', type: 'single', prompt: 'EIP 流程核心特点？', options: ['一次提交永久通过', '规范化迭代评审', '由单人拍板', '链上投票即通过'], answerIndex: 1, explanation: 'EIP 强调公开评审与迭代。' },
      { id: '6-2', type: 'single', prompt: '谁都可以提出 EIP 吗？', options: ['可以', '不可以'], answerIndex: 0, explanation: '任何人可提出，但需满足规范与评审。' }
    ]
  },
  {
    id: 7,
    slug: 'client-lab',
    title: '客户端实验室：实现与测试',
    topic: 'CLIENT',
    goal: '理解客户端贡献的入口：代码、测试、文档。',
    story: '最终 Boss 关：你要在客户端实验室提交第一份可合并贡献。',
    knowledgeCards: ['核心贡献不仅是功能，也包括测试与文档。', '小而稳定的贡献最容易起步。'],
    bossChallenge: '设计一个你本周可提交的最小贡献。',
    quiz: [
      { id: '7-1', type: 'single', prompt: '新手最稳贡献路径是？', options: ['直接重构全项目', '从小修复/测试开始', '跳过 issue 直接 push', '只做口头建议'], answerIndex: 1, explanation: '小步可验证贡献更稳。' },
      { id: '7-2', type: 'single', prompt: '协议学习最终应落到？', options: ['仅收藏文章', '可验证贡献与协作记录', '只刷题', '只做演讲'], answerIndex: 1, explanation: '输出要可验证。' }
    ]
  }
];
