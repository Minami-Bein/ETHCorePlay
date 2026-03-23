# Claude Code 本地即用配置

已完成：
- CLI: `/Users/Zhuanz/.openclaw/.npm-global/bin/claude`
- 启动脚本：`claudecode/run-claude.sh`
- 推荐使用官方 Anthropic 兼容模式（最稳）

## 你只需要做

```bash
cd /Users/Zhuanz/.openclaw/workspace/claudecode
cp .env.example .env
nano .env
```

填入：
- `ANTHROPIC_API_KEY=...`

## 启动

```bash
bash run-claude.sh
```

## 一键连通性校验

```bash
set -a; source .env; set +a
curl https://api.anthropic.com/v1/messages \
  -sS -o /tmp/anthropic_check.json -w 'HTTP:%{http_code}\n' \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":1,"messages":[{"role":"user","content":"ping"}]}'
```
