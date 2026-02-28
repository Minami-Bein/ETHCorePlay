export type KnowledgeNode = {
  id: string;
  domain: 'EL' | 'CL' | 'EVM' | 'Networking' | 'Economics' | 'EIP' | 'Client' | 'Testing' | 'Security' | 'L2';
  title: string;
  status: 'todo' | 'learning' | 'done';
};

export const defaultKnowledgeMap: KnowledgeNode[] = [
  { id: 'el-state-transition', domain: 'EL', title: 'State transition function', status: 'todo' },
  { id: 'el-fee-market', domain: 'EL', title: 'EIP-1559 fee market', status: 'todo' },
  { id: 'el-mempool', domain: 'EL', title: 'Tx pool and ordering', status: 'todo' },
  { id: 'cl-fork-choice', domain: 'CL', title: 'Fork choice (LMD-GHOST)', status: 'todo' },
  { id: 'cl-finality', domain: 'CL', title: 'Finality and checkpoints', status: 'todo' },
  { id: 'cl-slashing', domain: 'CL', title: 'Validator slashing conditions', status: 'todo' },
  { id: 'evm-opcodes', domain: 'EVM', title: 'Opcode gas & semantics', status: 'todo' },
  { id: 'evm-storage', domain: 'EVM', title: 'Storage layout & trie', status: 'todo' },
  { id: 'p2p-devp2p', domain: 'Networking', title: 'devp2p / discv5 basics', status: 'todo' },
  { id: 'engine-api', domain: 'Client', title: 'Engine API methods', status: 'todo' },
  { id: 'eip-lifecycle', domain: 'EIP', title: 'EIP process & lifecycle', status: 'todo' },
  { id: 'testing-hive', domain: 'Testing', title: 'Hive & consensus tests', status: 'todo' },
  { id: 'security-reorg', domain: 'Security', title: 'Reorg / MEV / censorship risks', status: 'todo' },
  { id: 'l2-rollup', domain: 'L2', title: 'Rollup sequencing and settlement', status: 'todo' }
];
