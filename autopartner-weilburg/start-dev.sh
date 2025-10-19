#!/bin/bash

# Autopartner Weilburg - Complete Development Startup Script
# Starts Database, Backend, and Frontend all at once

set -e

echo "🚀 Autopartner Weilburg - Full Stack Startup"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Navigate to project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Start MariaDB with docker-compose
echo -e "${BLUE}📦 Starting MariaDB database...${NC}"
docker-compose up -d

# Wait for MariaDB to be ready
echo -e "${YELLOW}⏳ Waiting for MariaDB to be ready...${NC}"
sleep 5

until docker-compose exec -T mariadb mysqladmin ping -h localhost --silent 2>/dev/null; do
    echo -e "${YELLOW}⏳ Still waiting for MariaDB...${NC}"
    sleep 2
done

echo -e "${GREEN}✅ MariaDB is ready!${NC}"
echo ""

# Create log directory
mkdir -p logs

# Start Backend in background
echo -e "${BLUE}🔥 Starting Quarkus Backend...${NC}"
cd backend/backend
./mvnw quarkus:dev > ../../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ../..

# Wait a bit for backend to start
sleep 8

# Start Frontend in background
echo -e "${BLUE}⚛️  Starting React Frontend...${NC}"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for services to start
sleep 5

echo ""
echo "=============================================="
echo -e "${GREEN}✅ All services started successfully!${NC}"
echo "=============================================="
echo ""
echo "📍 Application URLs:"
echo "   Frontend:    http://localhost:5173"
echo "   Backend:     http://localhost:8080"
echo "   Swagger UI:  http://localhost:8080/q/swagger-ui"
echo "   Dev UI:      http://localhost:8080/q/dev"
echo ""
echo "🔑 Default Login:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "📋 Logs:"
echo "   Backend:  tail -f logs/backend.log"
echo "   Frontend: tail -f logs/frontend.log"
echo ""
echo "🛑 To stop all services:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   docker-compose down"
echo ""
echo "Or run: ./stop-dev.sh"
echo ""
echo "Press Ctrl+C to view logs (services keep running in background)"
echo "=============================================="

# Save PIDs to file for stop script
echo "$BACKEND_PID" > .dev-pids
echo "$FRONTEND_PID" >> .dev-pids

# Tail both log files
tail -f logs/backend.log logs/frontend.log

