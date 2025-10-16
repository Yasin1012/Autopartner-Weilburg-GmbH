#!/bin/bash

# Autopartner Weilburg Backend - Development Startup Script
# This script starts the MariaDB database and the Quarkus backend in dev mode

set -e

echo "🚀 Starting Autopartner Weilburg Backend Development Environment"
echo "================================================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Navigate to project root
cd "$(dirname "$0")/../.."

# Start MariaDB with docker-compose
echo "📦 Starting MariaDB database..."
docker-compose up -d

# Wait for MariaDB to be ready
echo "⏳ Waiting for MariaDB to be ready..."
sleep 5

# Check if MariaDB is accessible
until docker-compose exec -T mariadb mysqladmin ping -h localhost --silent; do
    echo "⏳ Still waiting for MariaDB..."
    sleep 2
done

echo "✅ MariaDB is ready!"

# Navigate to backend directory
cd backend/backend

# Start Quarkus in dev mode
echo "🔥 Starting Quarkus in development mode..."
echo "================================================================"
echo ""
echo "📍 Application: http://localhost:8080"
echo "📚 Swagger UI: http://localhost:8080/q/swagger-ui"
echo "🛠️  Dev UI: http://localhost:8080/q/dev"
echo ""
echo "🔑 Default Users:"
echo "   Admin: username=admin, password=admin123"
echo "   User:  username=user, password=user123"
echo ""
echo "Press Ctrl+C to stop"
echo "================================================================"
echo ""

./mvnw quarkus:dev

