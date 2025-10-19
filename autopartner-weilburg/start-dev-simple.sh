#!/bin/bash

# Autopartner Weilburg - Simple Development Startup (with tmux)
# This script uses tmux to run all services in split panes

set -e

echo "🚀 Starting Autopartner Weilburg with tmux..."

# Check if tmux is installed
if ! command -v tmux &> /dev/null; then
    echo "❌ tmux is not installed. Install it with: brew install tmux"
    echo ""
    echo "Alternative: Use ./start-dev.sh instead"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Navigate to project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Start database
echo "📦 Starting MariaDB database..."
docker-compose up -d

echo "⏳ Waiting for database..."
sleep 5

# Create or attach to tmux session
SESSION="autopartner"

# Kill existing session if it exists
tmux kill-session -t $SESSION 2>/dev/null || true

# Create new session
tmux new-session -d -s $SESSION -n "Autopartner"

# Split window into 2 panes (horizontal)
tmux split-window -h -t $SESSION

# Pane 0: Backend
tmux send-keys -t $SESSION:0.0 "cd $SCRIPT_DIR/backend/backend" C-m
tmux send-keys -t $SESSION:0.0 "echo '🔥 Starting Backend...'" C-m
tmux send-keys -t $SESSION:0.0 "./mvnw quarkus:dev" C-m

# Pane 1: Frontend
tmux send-keys -t $SESSION:0.1 "cd $SCRIPT_DIR/frontend" C-m
tmux send-keys -t $SESSION:0.1 "sleep 10 && echo '⚛️  Starting Frontend...'" C-m
tmux send-keys -t $SESSION:0.1 "sleep 10 && npm run dev" C-m

# Attach to session
echo ""
echo "=============================================="
echo "✅ Services starting in tmux session!"
echo "=============================================="
echo ""
echo "📍 URLs (will be available soon):"
echo "   Frontend:    http://localhost:5173"
echo "   Backend:     http://localhost:8080"
echo "   Swagger UI:  http://localhost:8080/q/swagger-ui"
echo ""
echo "🔑 Login: admin / admin123"
echo ""
echo "⌨️  Tmux Commands:"
echo "   Ctrl+B then D  - Detach (services keep running)"
echo "   Ctrl+B then %  - Split vertically"
echo "   Ctrl+B then arrows - Switch panes"
echo "   Type 'exit' in each pane to stop"
echo ""
echo "🛑 To stop all: ./stop-dev.sh"
echo "=============================================="
echo ""
sleep 2

# Attach to the tmux session
tmux attach-session -t $SESSION

