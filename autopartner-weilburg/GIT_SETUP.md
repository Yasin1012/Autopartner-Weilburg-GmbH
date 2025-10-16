# 🔗 Git & GitHub Setup - Autopartner Weilburg

## ✅ Remote Repository hinzugefügt!

Ihr GitHub Repository wurde erfolgreich konfiguriert:

```
Repository: https://github.com/Yasin1012/Autopartner-Weilburg-GmbH.git
Remote: origin
Branch: main
```

---

## 📤 Projekt zu GitHub pushen

### Schritt 1: Dateien hinzufügen

```bash
# Alle Dateien zum Staging hinzufügen
git add .

# Status prüfen
git status
```

### Schritt 2: Ersten Commit erstellen

```bash
git commit -m "Initial commit: Full stack Autopartner Weilburg implementation

- Quarkus 3.28.4 Backend with REST API, JWT auth, MariaDB
- React 18 Frontend with Vite, TailwindCSS, React Router
- Complete CRUD for vehicles
- User authentication with role-based access
- Email notifications
- Docker support
- Full documentation"
```

### Schritt 3: Zu GitHub pushen

```bash
# Push zum main Branch
git push -u origin main
```

**Hinweis**: Beim ersten Push werden Sie nach Ihren GitHub-Credentials gefragt.

---

## 🔐 GitHub Authentication

### Option 1: Personal Access Token (empfohlen)

1. Gehen Sie zu: https://github.com/settings/tokens
2. Klicken Sie auf "Generate new token" (classic)
3. Name: `Autopartner Weilburg`
4. Scopes auswählen: `repo` (alle)
5. Token generieren und kopieren
6. Beim Push verwenden Sie:
   - **Username**: `Yasin1012`
   - **Password**: `<your-personal-access-token>`

### Option 2: SSH Key

```bash
# SSH Key generieren
ssh-keygen -t ed25519 -C "your-email@example.com"

# Public Key zu GitHub hinzufügen
cat ~/.ssh/id_ed25519.pub

# Remote URL zu SSH ändern
git remote set-url origin git@github.com:Yasin1012/Autopartner-Weilburg-GmbH.git
```

---

## 📝 Git Workflow

### Änderungen committen

```bash
# Status prüfen
git status

# Dateien hinzufügen
git add <file>
# oder alle:
git add .

# Committen
git commit -m "Beschreibung der Änderung"

# Pushen
git push
```

### Branch erstellen

```bash
# Neuen Branch erstellen
git checkout -b feature/neue-funktion

# Zum main Branch zurück
git checkout main
```

### Änderungen pullen

```bash
# Neueste Änderungen holen
git pull origin main
```

---

## 📂 Was wird NICHT hochgeladen (.gitignore)

Die `.gitignore` Datei ist bereits konfiguriert und verhindert das Hochladen von:

### Backend
- `target/` - Build-Artefakte
- `.quarkus/` - Quarkus Cache
- `*.class` - Kompilierte Klassen
- IDE-Dateien

### Frontend
- `node_modules/` - NPM Dependencies
- `dist/` - Build Output
- `.env.local` - Lokale Umgebungsvariablen

### Allgemein
- `.DS_Store` - macOS Dateien
- `*.log` - Log-Dateien
- IDE-Konfigurationen

---

## 🎯 Empfohlene Git-Struktur

```
main (production)
├── develop (development)
│   ├── feature/vehicle-images
│   ├── feature/user-management
│   └── bugfix/login-issue
```

---

## 📋 Commit Message Best Practices

### Format
```
<type>: <subject>

<body>

<footer>
```

### Types
- `feat`: Neue Funktion
- `fix`: Bug Fix
- `docs`: Dokumentation
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code-Refactoring
- `test`: Tests hinzufügen
- `chore`: Wartung

### Beispiele
```bash
git commit -m "feat: Add vehicle image upload"
git commit -m "fix: Correct price validation in VehicleForm"
git commit -m "docs: Update README with deployment instructions"
```

---

## 🚀 Deploy-Workflow

### 1. Development
```bash
git checkout develop
# Entwickeln & testen
git add .
git commit -m "feat: neue Funktion"
git push origin develop
```

### 2. Production
```bash
git checkout main
git merge develop
git push origin main
# → Automatisches Deployment (Vercel, etc.)
```

---

## 📊 Repository-Status prüfen

```bash
# Aktueller Status
git status

# Commit-Historie
git log --oneline

# Remote Branches
git branch -r

# Alle Branches
git branch -a
```

---

## 🔄 Repository klonen (auf anderem Computer)

```bash
# Repository klonen
git clone https://github.com/Yasin1012/Autopartner-Weilburg-GmbH.git
cd Autopartner-Weilburg-GmbH

# Backend Setup
cd backend/backend
./mvnw clean install

# Frontend Setup
cd ../../frontend
npm install
```

---

## 📌 Wichtige Git-Befehle

| Befehl | Beschreibung |
|--------|--------------|
| `git status` | Zeige Status |
| `git add .` | Alle Änderungen hinzufügen |
| `git commit -m "..."` | Commit mit Message |
| `git push` | Zu GitHub pushen |
| `git pull` | Von GitHub pullen |
| `git log` | Commit-Historie |
| `git branch` | Branches anzeigen |
| `git checkout -b <name>` | Neuen Branch erstellen |

---

## ⚠️ Vor dem ersten Push

**WICHTIG**: Stellen Sie sicher, dass sensible Daten nicht hochgeladen werden:

- ✅ `.env` Dateien sind in `.gitignore`
- ✅ `node_modules/` ist ignoriert
- ✅ `target/` ist ignoriert
- ✅ Keine Passwörter im Code

Die `.gitignore` wurde bereits konfiguriert!

---

## 🎊 Bereit zum Pushen!

Ihr Remote Repository ist konfiguriert und bereit. Führen Sie aus:

```bash
cd /Users/yasintuzen/autopartner-weilburg

# Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "Initial commit: Full stack Autopartner Weilburg"

# Zu GitHub pushen
git push -u origin main
```

Danach ist Ihr Code auf GitHub verfügbar! 🚀

---

**Repository URL**: https://github.com/Yasin1012/Autopartner-Weilburg-GmbH.git

