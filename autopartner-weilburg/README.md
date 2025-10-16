# 🚗 Autopartner Weilburg GmbH - Full Stack Application

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Quarkus](https://img.shields.io/badge/Quarkus-3.28.4-red.svg)](https://quarkus.io/)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.org/)
[![MariaDB](https://img.shields.io/badge/MariaDB-11-blue.svg)](https://mariadb.org/)

Modernes Full-Stack Vehicle Management System für Autopartner Weilburg GmbH.

---

## 📋 Übersicht

Ein komplettes, produktionsreifes System für ein Autohaus mit:
- ✅ **Backend**: Quarkus REST API mit JWT Authentication
- ✅ **Frontend**: React SPA mit Admin-Bereich
- ✅ **Database**: MariaDB mit Docker
- ✅ **Features**: CRUD, Auth, Email, Swagger UI

---

## 🏗️ Architektur

```
┌──────────────────────────────────────────┐
│         React Frontend (Port 5173)       │
│   Vite + TailwindCSS + React Router     │
└────────────────┬─────────────────────────┘
                 │ HTTP + JWT
                 ▼
┌──────────────────────────────────────────┐
│      Quarkus Backend (Port 8080)        │
│    REST API + JWT + Panache + Mailer    │
└────────────────┬─────────────────────────┘
                 │ JDBC
                 ▼
┌──────────────────────────────────────────┐
│      MariaDB Database (Port 3307)        │
│         Docker Container                 │
└──────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Voraussetzungen
- Java 21
- Node.js 20+
- Docker & Docker Compose
- Maven 3.9+

### Starten in 3 Schritten

**1. Database starten**
```bash
docker-compose up -d
```

**2. Backend starten** (neues Terminal)
```bash
cd backend/backend
./mvnw quarkus:dev
```
✅ Backend: http://localhost:8080

**3. Frontend starten** (neues Terminal)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend: http://localhost:5173

---

## 📁 Projektstruktur

```
autopartner-weilburg/
├── backend/backend/           # Quarkus Backend
│   ├── src/
│   │   ├── main/java/com/autopartner/backend/
│   │   │   ├── model/        # JPA Entities
│   │   │   ├── dto/          # Data Transfer Objects
│   │   │   ├── repository/   # Panache Repositories
│   │   │   ├── service/      # Business Logic
│   │   │   ├── resource/     # REST Controllers
│   │   │   ├── security/     # JWT Utils
│   │   │   ├── config/       # Configuration
│   │   │   └── util/         # Utilities
│   │   └── resources/
│   │       ├── application.properties
│   │       └── import.sql
│   ├── pom.xml
│   ├── Dockerfile
│   └── README.md
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/       # React Components
│   │   ├── pages/            # Page Components
│   │   ├── context/          # React Context (Auth)
│   │   ├── services/         # API Service
│   │   └── utils/            # Utilities
│   ├── package.json
│   ├── tailwind.config.js
│   ├── .env
│   └── README.md
│
├── docker-compose.yml         # Database
├── .gitignore
└── README.md                  # This file
```

---

## 🔑 Standard-Zugangsdaten

| Benutzer | Passwort | Rolle |
|----------|----------|-------|
| admin | admin123 | ADMIN |
| user | user123 | USER |

**⚠️ In Produktion ändern!**

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User Login → JWT
- `POST /api/auth/register` - User Registration (ADMIN)

### Vehicles
- `GET /api/vehicles` - Alle Fahrzeuge (Public)
- `GET /api/vehicles/{id}` - Fahrzeug Details (Public)
- `POST /api/vehicles` - Fahrzeug erstellen (ADMIN)
- `PUT /api/vehicles/{id}` - Fahrzeug aktualisieren (ADMIN/USER)
- `DELETE /api/vehicles/{id}` - Fahrzeug löschen (ADMIN)

**Swagger UI**: http://localhost:8080/q/swagger-ui

---

## 🌐 Frontend Routes

### Public
- `/` - Home
- `/vehicles` - Fahrzeugliste
- `/vehicles/:id` - Fahrzeug-Details
- `/contact` - Kontakt

### Protected (Login required)
- `/admin` - Dashboard
- `/admin/vehicles` - Fahrzeugverwaltung
- `/admin/users` - Benutzerverwaltung

---

## 🛠️ Technologie-Stack

### Backend
- **Framework**: Quarkus 3.28.4
- **Language**: Java 21
- **Database**: MariaDB 11
- **ORM**: Hibernate + Panache
- **Auth**: SmallRye JWT
- **Email**: Quarkus Mailer
- **API Docs**: SmallRye OpenAPI
- **Password**: BCrypt
- **Build**: Maven

### Frontend
- **Framework**: React 18
- **Build**: Vite
- **Styling**: TailwindCSS 3
- **Routing**: React Router v6
- **HTTP**: Axios
- **Auth**: JWT + localStorage
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Database
- **DBMS**: MariaDB 11
- **Port**: 3307
- **Database**: autohaus
- **Docker**: Yes

---

## 📚 Dokumentation

| Dokument | Beschreibung |
|----------|--------------|
| **START_HERE.md** | ⭐ Quick Start Guide |
| **FULLSTACK_GUIDE.md** | Komplette Deployment-Anleitung |
| **GIT_SETUP.md** | Git & GitHub Anleitung |
| **backend/backend/README.md** | Backend Setup |
| **backend/backend/API_REFERENCE.md** | API Dokumentation |
| **frontend/README.md** | Frontend Setup |

---

## ✨ Features

### Backend
- ✅ JWT Authentication (HS256)
- ✅ Role-Based Access Control
- ✅ Vehicle CRUD Operations
- ✅ User Management
- ✅ Email Notifications
- ✅ OpenAPI/Swagger Documentation
- ✅ CORS Configuration
- ✅ BCrypt Password Hashing
- ✅ Panache Repositories
- ✅ DTO Pattern
- ✅ Input Validation

### Frontend
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Public Vehicle Listing
- ✅ Detailed Vehicle View
- ✅ Admin Dashboard
- ✅ Vehicle Management (CRUD)
- ✅ User Management
- ✅ JWT Authentication Flow
- ✅ Protected Routes
- ✅ Toast Notifications
- ✅ Loading States
- ✅ Error Handling

---

## 🧪 Tests

### Backend Tests
```bash
cd backend/backend
./mvnw test
```
**Status**: ✅ 6/6 Tests bestanden

### Frontend Build
```bash
cd frontend
npm run build
```
**Status**: ✅ Build erfolgreich (328 KB)

---

## 🐳 Docker Deployment

### Backend
```bash
cd backend/backend
./mvnw clean package
docker build -t autopartner-backend .
docker run -p 8080:8080 autopartner-backend
```

### Database
```bash
docker-compose up -d
```

---

## 🌍 Production Deployment

### Backend
- Server mit Java 21
- MariaDB Datenbank
- SMTP für Emails
- HTTPS/TLS

### Frontend
- Vercel (empfohlen)
- Netlify
- Jeder Static Hosting

**Deployment-Anleitung**: Siehe `FULLSTACK_GUIDE.md`

---

## 📊 Statistiken

- **Backend**: 19 Java Klassen, ~2.000 LOC
- **Frontend**: 20 React Dateien, ~1.500 LOC
- **Tests**: 6 Backend Tests (100% pass)
- **Build Time**: Backend ~10s, Frontend ~1.5s
- **Bundle Size**: 328 KB (gzipped: 103 KB)

---

## 🔧 Development

### Backend Hot Reload
```bash
cd backend/backend
./mvnw quarkus:dev
# Änderungen werden automatisch erkannt!
```

### Frontend Hot Module Replacement
```bash
cd frontend
npm run dev
# Instant updates ohne Page Reload!
```

---

## 📞 Support

**Email**: us@autopartner-weilburg.de

---

## 📝 License

Copyright © 2025 Autopartner Weilburg GmbH

---

## 🎯 Nächste Schritte

1. ✅ **Code zu GitHub pushen** - Siehe `GIT_SETUP.md`
2. ⚡ **Anwendung testen** - `START_HERE.md`
3. 🚀 **Deployment vorbereiten** - `FULLSTACK_GUIDE.md`
4. 🎨 **Anpassen** - Logo, Farben, Kontaktdaten
5. 🔐 **Produktion härten** - Passwörter, JWT Secret, SMTP

---

## 🌟 Quick Links

- **GitHub Repo**: https://github.com/Yasin1012/Autopartner-Weilburg-GmbH.git
- **Backend Swagger**: http://localhost:8080/q/swagger-ui
- **Frontend Dev**: http://localhost:5173

---

**Built with ❤️ for Autopartner Weilburg GmbH** 🚗

