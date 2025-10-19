# 🚀 Autopartner Weilburg - Startup Guide

Verschiedene Methoden, um das komplette System zu starten.

---

## ⚡ **Option 1: Alles mit einem Befehl starten (Empfohlen)**

### **Methode A: Mit Bash Script (Hintergrund-Prozesse)**

```bash
./start-dev.sh
```

**Was passiert:**
- ✅ Startet MariaDB (Docker)
- ✅ Startet Backend (Quarkus Dev Mode) im Hintergrund
- ✅ Startet Frontend (Vite Dev Server) im Hintergrund
- ✅ Zeigt Logs in Echtzeit an
- ✅ Logs werden auch in `logs/` gespeichert

**URLs nach Start:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Swagger: http://localhost:8080/q/swagger-ui

**Stoppen:**
```bash
./stop-dev.sh
```

Oder manuell:
```bash
kill <BACKEND_PID> <FRONTEND_PID>
docker-compose down
```

---

### **Methode B: Mit NPM (Concurrently)**

```bash
# Zuerst Database starten
docker-compose up -d

# Dann Backend + Frontend parallel
npm run start:all
```

**Was passiert:**
- ✅ Backend und Frontend starten parallel
- ✅ Beide Logs werden farblich unterschieden
- ✅ Ein Ctrl+C stoppt beide

**Stoppen:**
- Ctrl+C in Terminal
- `npm run stop` (stoppt nur Database)

---

### **Methode C: Mit tmux (Split Screen)**

```bash
./start-dev-simple.sh
```

**Voraussetzung:** tmux muss installiert sein
```bash
brew install tmux
```

**Was passiert:**
- ✅ Database startet
- ✅ Tmux-Session mit 2 Panes
- ✅ Links: Backend, Rechts: Frontend
- ✅ Live-Logs in beiden Panes

**Tmux Befehle:**
- `Ctrl+B` dann `D` - Detach (Services laufen weiter)
- `tmux attach -t autopartner` - Wieder anhängen
- `Ctrl+B` dann `←` oder `→` - Zwischen Panes wechseln
- `exit` in beiden Panes - Services stoppen

---

### **Methode D: In Cursor/VSCode (Tasks)**

1. **Drücken Sie:** `Cmd+Shift+P` (Mac) oder `Ctrl+Shift+P` (Windows/Linux)
2. **Suchen Sie:** "Tasks: Run Task"
3. **Wählen Sie:** "🚀 Start All (Database + Backend + Frontend)"

**Verfügbare Tasks:**
- 🚀 Start All (Database + Backend + Frontend)
- 🐳 Start Database Only
- 🔥 Start Backend Only
- ⚛️  Start Frontend Only
- 🛑 Stop All Services
- 🧪 Run Backend Tests
- 📦 Build Frontend
- 📦 Build Backend

---

## 🔧 **Option 2: Manuell starten (3 Terminals)**

### **Terminal 1: Database**
```bash
docker-compose up -d
```

### **Terminal 2: Backend**
```bash
cd backend/backend
./mvnw quarkus:dev
```

### **Terminal 3: Frontend**
```bash
cd frontend
npm run dev
```

---

## 📊 **Vergleich der Methoden**

| Methode | Vorteile | Nachteile |
|---------|----------|-----------|
| **start-dev.sh** | ✅ Alles mit einem Befehl<br>✅ Logs werden gespeichert<br>✅ Einfach zu stoppen | ⚠️ Läuft im Hintergrund |
| **npm run start:all** | ✅ Farbige Logs<br>✅ Beide in einem Terminal | ⚠️ Database muss extra gestartet werden |
| **tmux** | ✅ Split-Screen<br>✅ Live-Logs<br>✅ Detach möglich | ⚠️ tmux muss installiert sein |
| **VSCode Tasks** | ✅ In IDE integriert<br>✅ Klick-basiert | ⚠️ Mehrere Tasks nacheinander |
| **Manuell** | ✅ Volle Kontrolle<br>✅ Separate Logs | ⚠️ 3 Terminals nötig |

---

## 🎯 **Empfohlene Nutzung**

### Für schnelle Entwicklung:
```bash
./start-dev.sh
```

### Für Debugging (separate Logs):
- **Terminal 1**: `docker-compose up -d`
- **Terminal 2**: `cd backend/backend && ./mvnw quarkus:dev`
- **Terminal 3**: `cd frontend && npm run dev`

### In Cursor/VSCode:
- Cmd+Shift+P → "Run Task" → "Start All"

---

## 🔍 **Logs ansehen**

### Live-Logs (nach start-dev.sh):
```bash
# Backend
tail -f logs/backend.log

# Frontend
tail -f logs/frontend.log

# Beide gleichzeitig
tail -f logs/*.log
```

### Docker Logs:
```bash
docker-compose logs -f mariadb
```

---

## 🛑 **Services stoppen**

### Nach start-dev.sh:
```bash
./stop-dev.sh
```

### Manuell:
```bash
# Backend stoppen (Port 8080)
lsof -ti:8080 | xargs kill

# Frontend stoppen (Port 5173)
lsof -ti:5173 | xargs kill

# Database stoppen
docker-compose down
```

### Nach npm run start:all:
- Einfach `Ctrl+C` drücken

### Nach tmux:
- In jedem Pane `exit` eingeben
- Oder: `tmux kill-session -t autopartner`

---

## 📦 **Verfügbare NPM Scripts**

```bash
npm run start:db        # Nur Database
npm run start:backend   # Nur Backend
npm run start:frontend  # Nur Frontend
npm run start:all       # Backend + Frontend parallel
npm run stop            # Database stoppen

npm run test:backend    # Backend Tests
npm run build:backend   # Backend bauen
npm run build:frontend  # Frontend bauen
npm run build:all       # Alles bauen

npm run dev             # Gleiches wie ./start-dev.sh
```

---

## ⚙️ **Nach dem Start**

### **1. Prüfen ob alles läuft:**
```bash
# Prozesse prüfen
lsof -i :8080  # Backend
lsof -i :5173  # Frontend
lsof -i :3307  # Database

# Docker prüfen
docker ps | grep mariadb
```

### **2. Testen:**
```bash
# Backend Health
curl http://localhost:8080/q/health

# Backend API
curl http://localhost:8080/api/vehicles

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### **3. Browser öffnen:**
```bash
# macOS
open http://localhost:5173

# Linux
xdg-open http://localhost:5173

# Windows
start http://localhost:5173
```

---

## 🎊 **Quick Reference**

| Was | Befehl |
|-----|--------|
| Alles starten | `./start-dev.sh` |
| Alles stoppen | `./stop-dev.sh` |
| Nur Backend | `cd backend/backend && ./mvnw quarkus:dev` |
| Nur Frontend | `cd frontend && npm run dev` |
| Logs ansehen | `tail -f logs/*.log` |
| Tasks in IDE | Cmd+Shift+P → Run Task |

---

## 🔑 **Standard-Login**

```
Username: admin
Password: admin123
```

---

## 📞 **Troubleshooting**

### Port bereits belegt:
```bash
# Port 8080 (Backend)
lsof -ti:8080 | xargs kill

# Port 5173 (Frontend)
lsof -ti:5173 | xargs kill
```

### Docker läuft nicht:
```bash
# Docker starten
open -a Docker

# Oder Docker Desktop manuell starten
```

### Services laufen nicht:
```bash
# Logs prüfen
cat logs/backend.log
cat logs/frontend.log

# Database Logs
docker-compose logs mariadb
```

---

## 🎯 **Jetzt loslegen!**

```bash
./start-dev.sh
```

Dann im Browser öffnen: **http://localhost:5173**

**Viel Erfolg! 🚗**

