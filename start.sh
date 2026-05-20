#!/usr/bin/env bash
set -euo pipefail

# Start script para backend e frontend.
# Ele força o encerramento de processos que estejam escutando nas portas 3000 e 5173.

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$ROOT_DIR/demo"
FRONTEND_DIR="$ROOT_DIR/front"
LOG_DIR="$ROOT_DIR/logs"

PORTS=(3000 5173)

kill_port() {
  local port=$1
  local pids

  if command -v lsof >/dev/null 2>&1; then
    pids=$(lsof -tiTCP:"$port" -sTCP:LISTEN || true)
  else
    pids=$(fuser -n tcp "$port" 2>/dev/null || true)
  fi

  if [ -n "$pids" ]; then
    echo "Porta $port em uso, encerrando processos: $pids"
    echo "$pids" | tr ' ' '\n' | xargs -r kill -9
  else
    echo "Porta $port livre."
  fi
}

mkdir -p "$LOG_DIR"

echo "Forçando encerramento de portas antes de iniciar..."
for port in "${PORTS[@]}"; do
  kill_port "$port"
done

echo "Iniciando backend Spring Boot em background..."
cd "$BACKEND_DIR"
./gradlew bootRun > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!

echo "Iniciando frontend React em background..."
cd "$FRONTEND_DIR"
npm run dev > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!

printf "\nBackend PID: %s\nFrontend PID: %s\n" "$BACKEND_PID" "$FRONTEND_PID"
echo "Logs:"
echo "  backend -> $LOG_DIR/backend.log"
echo "  frontend -> $LOG_DIR/frontend.log"

echo "Use 'kill $BACKEND_PID $FRONTEND_PID' para encerrar os servidores."