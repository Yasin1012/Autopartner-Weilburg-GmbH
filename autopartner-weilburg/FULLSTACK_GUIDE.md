# 🚀 Autopartner Weilburg - Full Stack Guide

Complete guide to run the entire Autopartner Weilburg application (Backend + Frontend).

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Quick Start](#quick-start)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Default Credentials](#default-credentials)
7. [API Documentation](#api-documentation)
8. [Deployment](#deployment)

---

## Prerequisites

### Required Software
- ✅ Java 21 (OpenJDK)
- ✅ Maven 3.9+
- ✅ Node.js 20+
- ✅ Docker & Docker Compose
- ✅ Git

### Verify Installation
```bash
java -version        # Should show Java 21
mvn -version         # Should show Maven 3.9+
node -version        # Should show v20+
docker -version      # Should show Docker
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                      │
│            React 18 + Vite + TailwindCSS       │
│              Port: 5173 (dev)                   │
└────────────────────┬────────────────────────────┘
                     │ HTTP/HTTPS
                     │ JWT Auth
                     ▼
┌─────────────────────────────────────────────────┐
│                   BACKEND                       │
│         Quarkus 3.28.4 + REST + JWT            │
│              Port: 8080                         │
└────────────────────┬────────────────────────────┘
                     │ JDBC
                     ▼
┌─────────────────────────────────────────────────┐
│                  DATABASE                       │
│            MariaDB 11 (Docker)                 │
│              Port: 3307                         │
└─────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd autopartner-weilburg
```

### 2. Start Database
```bash
docker-compose up -d
```

### 3. Start Backend
```bash
cd backend/backend
./mvnw quarkus:dev
```
Backend running at: **http://localhost:8080**

### 4. Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend running at: **http://localhost:5173**

### 5. Open Browser
- **Frontend**: http://localhost:5173
- **Swagger API**: http://localhost:8080/q/swagger-ui
- **Admin Login**: Use credentials below

---

## Backend Setup

### 1. Database Configuration

The database runs in Docker:

```yaml
# docker-compose.yml
services:
  mariadb:
    image: mariadb:11
    ports:
      - "3307:3306"
    environment:
      MARIADB_DATABASE: autohaus
      MARIADB_USER: admin
      MARIADB_PASSWORD: secret
```

Start database:
```bash
docker-compose up -d
```

### 2. Backend Configuration

File: `backend/backend/src/main/resources/application.properties`

```properties
# Database
quarkus.datasource.db-kind=mariadb
quarkus.datasource.username=admin
quarkus.datasource.password=secret
quarkus.datasource.jdbc.url=jdbc:mariadb://localhost:3307/autohaus

# JWT
jwt.duration=86400
jwt.issuer=https://autopartner-weilburg.de

# CORS
quarkus.http.cors.enabled=true
quarkus.http.cors.origins=http://localhost:5173,https://autopartner-weilburg.vercel.app
```

### 3. Run Backend

```bash
cd backend/backend

# Development mode (with hot reload)
./mvnw quarkus:dev

# Production build
./mvnw clean package
java -jar target/quarkus-app/quarkus-run.jar
```

### 4. Test Backend

```bash
# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get vehicles (public)
curl http://localhost:8080/api/vehicles
```

---

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

The `.env` file is already created. Verify it contains:

```env
VITE_API_URL=http://localhost:8080
```

### 3. Run Frontend

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 4. Access Frontend

- **Local**: http://localhost:5173
- **Public Pages**: /, /vehicles, /contact
- **Admin Area**: /admin (requires login)

---

## Default Credentials

### Admin Account
```
Username: admin
Password: admin123
Role: ADMIN
```

### Regular User Account
```
Username: user
Password: user123
Role: USER
```

**⚠️ IMPORTANT**: Change these passwords in production!

---

## API Documentation

### Swagger UI
Access interactive API documentation:
**http://localhost:8080/q/swagger-ui**

### Main Endpoints

#### Authentication
```bash
POST /api/auth/login
POST /api/auth/register  # ADMIN only
```

#### Vehicles
```bash
GET    /api/vehicles         # Public
GET    /api/vehicles/{id}    # Public
POST   /api/vehicles          # ADMIN only
PUT    /api/vehicles/{id}    # ADMIN/USER
DELETE /api/vehicles/{id}    # ADMIN only
```

### Example API Calls

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Get Vehicles:**
```bash
curl http://localhost:8080/api/vehicles
```

**Create Vehicle (with JWT):**
```bash
curl -X POST http://localhost:8080/api/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "model": "BMW 320d",
    "type": "Limousine",
    "firstRegistration": "2023-01-15",
    "mileage": 25000,
    "equipment": "Navi, Leder, PDC",
    "price": 32900.00
  }'
```

---

## Deployment

### Backend Deployment

#### Docker Build
```bash
cd backend/backend
./mvnw clean package
docker build -t autopartner-backend .
docker run -p 8080:8080 autopartner-backend
```

#### Production Configuration
Update `application.properties` for production:
- Change JWT secret
- Update database credentials
- Configure email SMTP
- Set proper CORS origins

### Frontend Deployment

#### Vercel (Recommended)
```bash
cd frontend
npm run build

# Deploy to Vercel
vercel

# Set environment variable in Vercel:
# VITE_API_URL=https://api.autopartner-weilburg.de
```

#### Netlify
```bash
npm run build

# Deploy dist/ folder to Netlify
netlify deploy --prod --dir=dist
```

#### Manual Static Hosting
```bash
npm run build
# Upload dist/ folder to any static hosting
```

---

## Development Workflow

### 1. Start All Services
```bash
# Terminal 1: Database
docker-compose up -d

# Terminal 2: Backend
cd backend/backend && ./mvnw quarkus:dev

# Terminal 3: Frontend
cd frontend && npm run dev
```

### 2. Development URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/q/swagger-ui
- H2 Console (if enabled): http://localhost:8080/h2-console

### 3. Hot Reload
- ✅ Backend: Quarkus Dev Mode (auto-reload on code changes)
- ✅ Frontend: Vite HMR (instant updates)

---

## Troubleshooting

### Database Connection Issues
```bash
# Check if MariaDB is running
docker ps | grep mariadb

# Restart database
docker-compose restart mariadb

# Check logs
docker-compose logs mariadb
```

### Backend Issues
```bash
# Check if port 8080 is available
lsof -i :8080

# Clean build
./mvnw clean

# Run with debug
./mvnw quarkus:dev -Ddebug=5005
```

### Frontend Issues
```bash
# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Check environment
cat .env

# Build and check for errors
npm run build
```

### CORS Issues
1. Check backend CORS configuration includes frontend URL
2. Verify `VITE_API_URL` in frontend `.env`
3. Clear browser cache
4. Check browser console for errors

---

## Project Structure

```
autopartner-weilburg/
├── backend/
│   └── backend/
│       ├── src/
│       │   ├── main/java/com/autopartner/backend/
│       │   │   ├── model/       # JPA entities
│       │   │   ├── dto/         # Data Transfer Objects
│       │   │   ├── repository/  # Panache repositories
│       │   │   ├── service/     # Business logic
│       │   │   ├── resource/    # REST endpoints
│       │   │   ├── security/    # JWT utilities
│       │   │   ├── config/      # Configuration
│       │   │   └── util/        # Helpers
│       │   └── resources/
│       │       ├── application.properties
│       │       └── import.sql
│       ├── pom.xml
│       └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context
│   │   ├── services/    # API services
│   │   └── utils/       # Utilities
│   ├── package.json
│   └── .env
└── docker-compose.yml
```

---

## Features Checklist

### ✅ Backend
- [x] JWT Authentication
- [x] Role-based Access Control
- [x] Vehicle CRUD API
- [x] User Management
- [x] Email Notifications
- [x] OpenAPI/Swagger
- [x] CORS Configuration
- [x] BCrypt Password Hashing
- [x] Seed Data

### ✅ Frontend
- [x] Responsive Design
- [x] Public Vehicle Listing
- [x] Vehicle Detail View
- [x] Admin Dashboard
- [x] Vehicle Management
- [x] User Management
- [x] JWT Authentication
- [x] Protected Routes
- [x] Toast Notifications

---

## Support

For support and questions:
- Email: us@autopartner-weilburg.de
- Documentation: See README files in backend/ and frontend/ directories

---

## License

Copyright © 2025 Autopartner Weilburg GmbH. All rights reserved.

