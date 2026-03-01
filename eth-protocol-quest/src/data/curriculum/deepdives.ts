import { Chapter } from '../../game/curriculumTypes';

export const deepDiveChapters: Chapter[] = [
  {
    id: 'el-deep-state-trie',
    title: 'EL 深层：状态树、存储树与 Merkle Patricia Trie',
    level: 'advanced',
    objective: '理解状态承诺结构、证明可验证性与读写成本来源。',
    sections: [
      {
        heading: '状态承诺结构',
        points: [
          '账户状态通过 trie 根承诺到区块头。',
          '合约存储也有独立存储树。',
          '状态证明依赖路径节点可验证性。'
        ]
      },
      {
        heading: '读写路径与成本',
        points: [
          '写 storage 的成本高于读 memory。',
          '路径深度与热点键分布影响访问性能。',
          '状态膨胀会影响节点运行成本。'
        ]
      },
      {
        heading: '细粒度小节：状态证明与验证路径',
        points: [
          '账户证明与存储证明路径长度不同。',
          '证明验证开销与节点结构有关。',
          '应用层可利用证明做轻验证与索引优化。'
        ]
      },
      {
        heading: '工程实践',
        points: [
          '设计合约时应减少不必要持久写入。',
          '事件日志用于索引，不替代状态一致性。',
          '调优时优先识别高频 SSTORE 路径。'
        ]
      }
    ],
    pitfalls: [
      '把日志当作可替代状态。',
      '忽视存储写放大带来的长期成本。',
      '只看单次交易 gas，不看长期状态负担。'
    ],
    glossary: ['State Trie', 'Storage Trie', 'State Root', 'Merkle Proof', 'SSTORE'],
    practice: [
      {
        title: '状态访问热点分析',
        steps: [
          '选一个合约函数统计 storage 读写次数。',
          '识别最贵写路径并提出优化方案。',
          '比较优化前后 gas 成本差异。'
        ]
      }
    ]
  },
  {
    id: 'cl-deep-forkchoice-finality',
    title: 'CL 深层：Fork Choice 细节与最终性故障模式',
    level: 'advanced',
    objective: '理解链头选择、最终性延迟与异常条件下的恢复策略。',
    sections: [
      {
        heading: 'Fork choice 关键机制',
        points: [
          '链头选择基于最新投票权重。',
          '延迟消息可能影响短时链头判断。',
          '节点实现需处理乱序与网络抖动。'
        ]
      },
      {
        heading: '最终性延迟场景',
        points: [
          '验证者离线比例上升可导致最终性延迟。',
          '网络分区会放大短重组概率。',
          '运维层需及时观察并告警。'
        ]
      },
      {
        heading: '细粒度小节：最终性异常的可观测信号',
        points: [
          'epoch 级最终性延迟可作为一级告警。',
          '链头切换频率上升可作为二级告警。',
          '验证者在线率下降是关键先行指标。'
        ]
      },
      {
        heading: '恢复与风险控制',
        points: [
          '确认策略应区分打包确认与最终性确认。',
          '关键业务可采用更保守确认阈值。',
          '事件复盘应覆盖网络、客户端、配置三层。'
        ]
      }
    ],
    pitfalls: [
      '把链头瞬时变化误判为协议故障。',
      '忽视验证者在线率对最终性的影响。',
      '没有分级确认策略。'
    ],
    glossary: ['Fork Choice', 'Finality Delay', 'Reorg Window', 'Checkpoint', 'Validator Liveness'],
    practice: [
      {
        title: '最终性延迟演练',
        steps: [
          '构造“最终性延迟”演练场景。',
          '记录监控指标变化与告警触发。',
          '输出恢复操作手册。'
        ]
      }
    ]
  }
];
