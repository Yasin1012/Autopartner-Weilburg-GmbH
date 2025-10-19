#!/bin/bash

# Autopartner Weilburg - Stop Development Services Script

echo "🛑 Stopping Autopartner Weilburg services..."
echo ""

# Read PIDs if file exists
if [ -f .dev-pids ]; then
    echo "📋 Reading process IDs..."
    PIDS=$(cat .dev-pids)
    
    for PID in $PIDS; do
        if ps -p $PID > /dev/null 2>&1; then
            echo "   Stopping process $PID..."
            kill $PID 2>/dev/null || true
        fi
    done
    
    rm .dev-pids
    echo "✅ Backend and Frontend stopped"
else
    echo "⚠️  No PID file found. Searching for processes..."
    
    # Find and kill backend
    BACKEND_PID=$(lsof -ti:8080)
    if [ ! -z "$BACKEND_PID" ]; then
        echo "   Stopping Backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID 2>/dev/null || true
    fi
    
    # Find and kill frontend
    FRONTEND_PID=$(lsof -ti:5173)
    if [ ! -z "$FRONTEND_PID" ]; then
        echo "   Stopping Frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID 2>/dev/null || true
    fi
fi

echo ""

# Stop Docker Compose
echo "🐳 Stopping Docker containers..."
docker-compose down

echo ""
echo "✅ All services stopped!"

