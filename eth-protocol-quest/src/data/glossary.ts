export const glossary = [
  { term: 'EL (Execution Layer)', desc: '执行交易并维护账户状态的层。' },
  { term: 'CL (Consensus Layer)', desc: '负责提议、证明与最终性的共识层。' },
  { term: 'EVM', desc: '以太坊虚拟机，确定性执行环境。' },
  { term: 'Nonce', desc: '账户交易序号，用于防重放并保持顺序。' },
  { term: 'Mempool/Txpool', desc: '节点暂存待打包交易的内存池。' },
  { term: 'Finality', desc: '区块达到强不可逆保证的状态。' },
  { term: 'LMD-GHOST', desc: '以太坊共识中的链头选择规则之一。' },
  { term: 'Engine API', desc: 'EL 与 CL 的标准接口。' },
  { term: 'EIP', desc: 'Ethereum Improvement Proposal，协议改进提案。' },
  { term: 'Slashing', desc: '对验证者恶意行为的罚没机制。' },
  { term: 'Reorg', desc: '链头从一个分支切换到另一分支。' },
  { term: 'Rollup', desc: 'L2 扩容方案，L2 执行、L1 结算。' }
];
