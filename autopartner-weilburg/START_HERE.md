# 🎉 Autopartner Weilburg - Komplette Anwendung bereit!

## ✅ Was wurde implementiert?

### **Backend (Quarkus 3.28.4 + Java 21)**
- ✅ JWT Authentication mit BCrypt
- ✅ Role-based Access Control (ADMIN, USER)
- ✅ Vehicle CRUD API
- ✅ User Management
- ✅ Email Notifications
- ✅ OpenAPI/Swagger UI
- ✅ MariaDB Integration
- ✅ Docker Support

### **Frontend (React 18 + Vite + TailwindCSS)**
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Public Pages (Home, Vehicles, Detail, Contact)
- ✅ Admin Dashboard
- ✅ Vehicle Management (CRUD)
- ✅ JWT Authentication Flow
- ✅ Protected Routes
- ✅ Toast Notifications

---

## 🚀 Schnellstart (3 einfache Schritte)

### Schritt 1: Database starten
```bash
docker-compose up -d
```

### Schritt 2: Backend starten (neues Terminal)
```bash
cd backend/backend
./mvnw quarkus:dev
```
✅ Backend läuft auf: **http://localhost:8080**

### Schritt 3: Frontend starten (neues Terminal)
```bash
cd frontend
npm run dev
```
✅ Frontend läuft auf: **http://localhost:5173**

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:8080 |
| **Swagger UI** | http://localhost:8080/q/swagger-ui |
| **Dev UI** | http://localhost:8080/q/dev |

---

## 🔑 Login-Daten

### Admin-Zugang
```
Benutzername: admin
Passwort:     admin123
Rolle:        ADMIN
```

### Benutzer-Zugang
```
Benutzername: user
Passwort:     user123
Rolle:        USER
```

---

## 📱 Frontend-Funktionen

### Public (ohne Login)
- **Home** (`/`) - Startseite mit Hero, Über uns, Kontaktinfo
- **Fahrzeuge** (`/vehicles`) - Alle aktiven Fahrzeuge mit Filtern
- **Fahrzeug-Details** (`/vehicles/:id`) - Detailansicht mit Kontaktmöglichkeit
- **Kontakt** (`/contact`) - Kontaktinformationen + Google Maps

### Admin (mit Login)
- **Dashboard** (`/admin`) - Übersicht mit Statistiken
- **Fahrzeugverwaltung** (`/admin/vehicles`) - CRUD für Fahrzeuge
- **Benutzerverwaltung** (`/admin/users`) - Benutzerübersicht

---

## 🔐 Authentifizierung testen

### 1. Im Browser
1. Öffne http://localhost:5173
2. Klicke auf "Anmelden"
3. Login mit: `admin` / `admin123`
4. Du wirst zum Admin-Dashboard weitergeleitet

### 2. Via cURL (Backend direkt)
```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Response:
# {"token":"eyJhbGc...","role":"ADMIN","username":"admin"}
```

---

## 🚗 Fahrzeug-Verwaltung testen

### Im Frontend (Admin)
1. Login als `admin`
2. Gehe zu "Admin" → "Fahrzeuge"
3. Klicke auf "Neues Fahrzeug"
4. Fülle das Formular aus
5. Klicke "Erstellen"
6. ✅ Fahrzeug wird erstellt + Email-Benachrichtigung versendet!

### Via API (mit JWT)
```bash
# Zuerst login und Token kopieren
TOKEN="<YOUR_JWT_TOKEN>"

# Fahrzeug erstellen
curl -X POST http://localhost:8080/api/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "model": "Audi Q5 45 TFSI",
    "type": "SUV",
    "firstRegistration": "2023-06-15",
    "mileage": 18500,
    "equipment": "Quattro, S-Line, Virtual Cockpit Plus",
    "price": 48900.00
  }'
```

---

## 📊 Testdaten

Das System kommt mit 5 vorgefertigten Fahrzeugen:
1. BMW 320d (€28.900)
2. Mercedes-Benz C 200 (€35.500)
3. Audi A4 2.0 TDI (€26.900)
4. VW Golf 8 GTI (€32.900)
5. Porsche 911 Carrera (€98.500)

Diese sind sofort sichtbar auf `/vehicles`!

---

## 🛠️ Entwicklung

### Backend Hot Reload
Quarkus Dev Mode unterstützt automatisches Neuladen:
- Java-Code ändern → Automatisch neu kompiliert
- application.properties ändern → Automatisch neu geladen

### Frontend Hot Module Replacement
Vite HMR ist aktiviert:
- React-Komponenten ändern → Sofortige Updates ohne Page Reload
- CSS ändern → Sofortige Styling-Updates

---

## 📚 Dokumentation

| Dokument | Pfad | Beschreibung |
|----------|------|--------------|
| **Backend README** | `backend/backend/README.md` | Backend Setup & API |
| **Backend API Reference** | `backend/backend/API_REFERENCE.md` | Detaillierte API Docs |
| **Backend Summary** | `backend/backend/PROJECT_SUMMARY.md` | Implementierungs-Übersicht |
| **Frontend README** | `frontend/README.md` | Frontend Setup & Features |
| **Full Stack Guide** | `FULLSTACK_GUIDE.md` | Komplette Deployment-Anleitung |

---

## 🐛 Problemlösung

### Database verbindet nicht
```bash
# Prüfe ob MariaDB läuft
docker ps | grep mariadb

# Logs anzeigen
docker-compose logs mariadb

# Neustart
docker-compose restart mariadb
```

### Backend startet nicht
```bash
# Port 8080 in Benutzung?
lsof -i :8080

# Clean build
./mvnw clean compile
```

### Frontend startet nicht
```bash
# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
```

### CORS-Fehler
Prüfe `backend/backend/src/main/resources/application.properties`:
```properties
quarkus.http.cors.enabled=true
quarkus.http.cors.origins=http://localhost:5173
```

---

## 📦 Projektstruktur

```
autopartner-weilburg/
├── backend/backend/       # Quarkus Backend
│   ├── src/              # Java Source Code
│   ├── pom.xml           # Maven Dependencies
│   └── Dockerfile        # Production Build
├── frontend/             # React Frontend
│   ├── src/              # React Source Code
│   ├── package.json      # NPM Dependencies
│   └── .env              # Environment Config
└── docker-compose.yml    # MariaDB Database
```

---

## 🎯 Nächste Schritte

### 1. Lokale Entwicklung
✅ **FERTIG!** Alles ist eingerichtet und lauffähig.

### 2. Anpassen
- Logo/Branding in `frontend/src/components/Header.jsx`
- Farben in `frontend/tailwind.config.js`
- Kontaktdaten in `frontend/src/components/Footer.jsx`
- Öffnungszeiten anpassen

### 3. Deployment
- Backend auf Server/Cloud deployen
- Frontend auf Vercel/Netlify
- Produktions-Datenbank einrichten
- Email-SMTP konfigurieren
- **⚠️ JWT Secret ändern!**
- **⚠️ Default-Passwörter ändern!**

---

## 📞 Support

**Email:** us@autopartner-weilburg.de

---

## 🎊 Fertig!

Ihr komplettes Full-Stack System ist **betriebsbereit**!

- ✅ Backend mit REST API & JWT Auth
- ✅ Frontend mit Admin-Bereich
- ✅ Database mit Testdaten
- ✅ Alle Features implementiert
- ✅ Dokumentation komplett
- ✅ Tests erfolgreich

**Viel Erfolg mit Autopartner Weilburg! 🚗**

