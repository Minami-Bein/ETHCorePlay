#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if [[ -f .env ]]; then
  set -a
  source .env
  set +a
fi

echo "[1] CLI"
/Users/Zhuanz/.openclaw/.npm-global/bin/claude --version

echo "[2] ENV"
echo "ANTHROPIC_BASE_URL=${ANTHROPIC_BASE_URL:-<empty>}"
if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "ANTHROPIC_API_KEY=<empty>"
  exit 1
fi
echo "ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY:0:10}..."

echo "[3] API probe"
curl "${ANTHROPIC_BASE_URL:-https://api.anthropic.com}/v1/messages" \
  -sS -o /tmp/claudecode_probe.json -w 'HTTP:%{http_code}\n' \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":1,"messages":[{"role":"user","content":"ping"}]}'
head -c 240 /tmp/claudecode_probe.json; echo
