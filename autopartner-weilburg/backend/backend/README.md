# Autopartner Weilburg Backend

Production-ready Quarkus 3.x backend for Autopartner Weilburg GmbH vehicle management system.

## 🚀 Features

- **RESTful API** with JAX-RS
- **JWT Authentication** with role-based access control (ADMIN, USER)
- **MariaDB Database** with Hibernate ORM and Panache
- **Email Notifications** via Quarkus Mailer
- **OpenAPI/Swagger UI** documentation
- **CORS Support** for frontend integration
- **BCrypt Password Hashing**
- **Docker Support** for containerization

## 📋 Prerequisites

- Java 21 or higher
- Maven 3.9+
- MariaDB 11+ (via Docker Compose)

## 🛠️ Tech Stack

- **Quarkus 3.28.4** - Supersonic Subatomic Java Framework
- **Hibernate ORM with Panache** - Simplified persistence
- **SmallRye JWT** - JSON Web Token support
- **MariaDB** - Database
- **BCrypt** - Password hashing
- **Quarkus Mailer** - Email notifications
- **SmallRye OpenAPI** - API documentation

## 🏗️ Project Structure

```
src/main/java/com/autopartner/backend/
├── model/          # JPA Entities (User, Vehicle)
├── dto/            # Data Transfer Objects
├── repository/     # Panache Repositories
├── service/        # Business Logic Layer
├── resource/       # REST Controllers/Endpoints
├── security/       # JWT utilities
├── config/         # Configuration classes
└── util/           # Helper utilities

src/main/resources/
├── application.properties  # Configuration
└── import.sql             # Seed data
```

## 🚦 Getting Started

### 1. Start MariaDB Database

```bash
# From project root
docker-compose up -d
```

This starts MariaDB on `localhost:3307` with:
- Database: `autohaus`
- User: `admin`
- Password: `secret`

### 2. Run in Development Mode

```bash
# From backend/backend directory
./mvnw quarkus:dev
```

The application starts on `http://localhost:8080`

### 3. Access Swagger UI

Open your browser and navigate to:
```
http://localhost:8080/q/swagger-ui
```

## 🔑 Authentication

### Default Users

Two users are created on startup via `import.sql`:

| Username | Password  | Role  |
|----------|-----------|-------|
| admin    | admin123  | ADMIN |
| user     | user123   | USER  |

### Login Flow

**POST** `/api/auth/login`

Request:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "ADMIN",
  "username": "admin"
}
```

### Using JWT Token

Include the token in the `Authorization` header:
```
Authorization: Bearer <JWT_TOKEN>
```

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint           | Access    | Description          |
|--------|-------------------|-----------|----------------------|
| POST   | `/api/auth/login` | Public    | User login           |
| POST   | `/api/auth/register` | ADMIN  | Register new user    |

### Vehicles (`/api/vehicles`)

| Method | Endpoint              | Access      | Description           |
|--------|-----------------------|-------------|-----------------------|
| GET    | `/api/vehicles`       | Public      | Get all vehicles      |
| GET    | `/api/vehicles/{id}`  | Public      | Get vehicle by ID     |
| POST   | `/api/vehicles`       | ADMIN       | Create new vehicle    |
| PUT    | `/api/vehicles/{id}`  | ADMIN, USER | Update vehicle        |
| DELETE | `/api/vehicles/{id}`  | ADMIN       | Delete vehicle        |

### Vehicle Entity Fields

```json
{
  "id": 1,
  "model": "BMW 320d",
  "type": "Limousine",
  "firstRegistration": "2020-03-15",
  "mileage": 45000,
  "equipment": "Leder, Navi, Klimaautomatik",
  "price": 28900.00,
  "active": true,
  "createdAt": "2025-10-16T10:30:00"
}
```

## 📧 Email Notifications

When a new vehicle is created, an email notification is sent to `us@autopartner-weilburg.de`.

### Email Configuration

Update `application.properties`:

```properties
quarkus.mailer.host=smtp.gmail.com
quarkus.mailer.port=587
quarkus.mailer.username=your-email@gmail.com
quarkus.mailer.password=your-app-password
quarkus.mailer.mock=false
```

In development mode, email mocking is enabled by default.

## 🔒 Security Configuration

### JWT Settings

```properties
jwt.duration=86400  # 24 hours in seconds
jwt.issuer=https://autopartner-weilburg.de
```

### CORS

CORS is configured for:
- `https://autopartner-weilburg.vercel.app`
- `http://localhost:3000`
- `http://localhost:5173`

## 🐳 Docker Deployment

### Build Docker Image

```bash
# Build the application
./mvnw clean package

# Build Docker image
docker build -t autopartner-backend .
```

### Run Container

```bash
docker run -p 8080:8080 \
  -e QUARKUS_DATASOURCE_JDBC_URL=jdbc:mariadb://host.docker.internal:3307/autohaus \
  autopartner-backend
```

## 🧪 Testing

### Run Tests

```bash
./mvnw test
```

### Integration Tests

```bash
./mvnw verify
```

## 📊 Database Schema

### Users Table

| Column     | Type         | Constraints           |
|------------|-------------|-----------------------|
| id         | BIGINT      | PRIMARY KEY, AUTO_INCREMENT |
| username   | VARCHAR(50) | UNIQUE, NOT NULL      |
| password   | VARCHAR(255)| NOT NULL              |
| role       | VARCHAR(20) | NOT NULL              |
| created_at | DATETIME    | NOT NULL              |

### Vehicles Table

| Column             | Type          | Constraints           |
|--------------------|---------------|-----------------------|
| id                 | BIGINT        | PRIMARY KEY, AUTO_INCREMENT |
| model              | VARCHAR(100)  | NOT NULL              |
| type               | VARCHAR(50)   | NOT NULL              |
| first_registration | DATE          | NOT NULL              |
| mileage            | INT           | NOT NULL              |
| equipment          | TEXT          | NULL                  |
| price              | DECIMAL(10,2) | NOT NULL              |
| active             | BOOLEAN       | NOT NULL, DEFAULT true|
| created_at         | DATETIME      | NOT NULL              |

## 🔧 Configuration

All configuration is in `src/main/resources/application.properties`:

- Database connection
- JWT settings
- CORS configuration
- Email settings
- Logging configuration
- OpenAPI settings

## 📝 Development Tips

1. **Hot Reload**: Quarkus dev mode supports hot reload - just save your files!
2. **Dev UI**: Access Quarkus Dev UI at `http://localhost:8080/q/dev`
3. **Health Check**: `http://localhost:8080/q/health`
4. **Metrics**: `http://localhost:8080/q/metrics`

## 🛡️ Production Checklist

Before deploying to production:

- [ ] Change JWT secret key in `application.properties`
- [ ] Update database credentials
- [ ] Configure email server settings
- [ ] Review and update CORS origins
- [ ] Enable HTTPS/TLS
- [ ] Set up proper logging and monitoring
- [ ] Remove or secure Swagger UI endpoint
- [ ] Change default user passwords

## 📄 License

Copyright © 2025 Autopartner Weilburg GmbH

## 🤝 Support

For support, contact: us@autopartner-weilburg.de
