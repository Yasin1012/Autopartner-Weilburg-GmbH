# API Reference - Autopartner Weilburg Backend

## Base URL
```
Development: http://localhost:8080
Production: https://autopartner-weilburg.de
```

## Authentication

All authenticated endpoints require the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### Login
Authenticate user and receive JWT token.

**Endpoint:** `POST /api/auth/login`  
**Access:** Public  

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "ADMIN",
  "username": "admin"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Invalid username or password"
}
```

---

### Register User
Create a new user account (ADMIN only).

**Endpoint:** `POST /api/auth/register`  
**Access:** ADMIN  
**Requires:** JWT Token  

**Request Body:**
```json
{
  "username": "newuser",
  "password": "password123",
  "role": "USER"
}
```

**Response (201 Created):**
```json
{
  "id": 3,
  "username": "newuser",
  "role": "USER",
  "createdAt": "2025-10-16T10:30:00"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Username already exists"
}
```

---

## 🚗 Vehicle Endpoints

### Get All Vehicles
Retrieve all vehicles in the system.

**Endpoint:** `GET /api/vehicles`  
**Access:** Public  

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "model": "BMW 320d",
    "type": "Limousine",
    "firstRegistration": "2020-03-15",
    "mileage": 45000,
    "equipment": "Leder, Navi, Klimaautomatik, PDC",
    "price": 28900.00,
    "active": true,
    "createdAt": "2025-10-16T08:00:00"
  },
  {
    "id": 2,
    "model": "Mercedes-Benz C 200",
    "type": "Kombi",
    "firstRegistration": "2021-06-20",
    "mileage": 32000,
    "equipment": "AMG Line, Navi Premium, LED, Keyless",
    "price": 35500.00,
    "active": true,
    "createdAt": "2025-10-16T08:00:00"
  }
]
```

---

### Get Vehicle by ID
Retrieve a specific vehicle by its ID.

**Endpoint:** `GET /api/vehicles/{id}`  
**Access:** Public  

**Response (200 OK):**
```json
{
  "id": 1,
  "model": "BMW 320d",
  "type": "Limousine",
  "firstRegistration": "2020-03-15",
  "mileage": 45000,
  "equipment": "Leder, Navi, Klimaautomatik, PDC",
  "price": 28900.00,
  "active": true,
  "createdAt": "2025-10-16T08:00:00"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Vehicle not found with id: 999"
}
```

---

### Create Vehicle
Create a new vehicle (ADMIN only).

**Endpoint:** `POST /api/vehicles`  
**Access:** ADMIN  
**Requires:** JWT Token  

**Request Body:**
```json
{
  "model": "Audi A6 3.0 TDI",
  "type": "Limousine",
  "firstRegistration": "2023-05-10",
  "mileage": 15000,
  "equipment": "S-Line, Matrix LED, Virtual Cockpit Plus",
  "price": 52900.00,
  "active": true
}
```

**Validation Rules:**
- `model`: Required, max 100 characters
- `type`: Required, max 50 characters
- `firstRegistration`: Required, must be past or present date
- `mileage`: Required, must be ≥ 0
- `price`: Required, must be > 0
- `equipment`: Optional
- `active`: Optional, defaults to true

**Response (201 Created):**
```json
{
  "id": 6,
  "model": "Audi A6 3.0 TDI",
  "type": "Limousine",
  "firstRegistration": "2023-05-10",
  "mileage": 15000,
  "equipment": "S-Line, Matrix LED, Virtual Cockpit Plus",
  "price": 52900.00,
  "active": true,
  "createdAt": "2025-10-16T11:20:00"
}
```

**Email Notification:**
An email is automatically sent to `us@autopartner-weilburg.de` when a vehicle is created.

---

### Update Vehicle
Update an existing vehicle (ADMIN and USER).

**Endpoint:** `PUT /api/vehicles/{id}`  
**Access:** ADMIN, USER  
**Requires:** JWT Token  

**Request Body:** (all fields optional)
```json
{
  "mileage": 47000,
  "price": 27900.00,
  "active": true
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "model": "BMW 320d",
  "type": "Limousine",
  "firstRegistration": "2020-03-15",
  "mileage": 47000,
  "equipment": "Leder, Navi, Klimaautomatik, PDC",
  "price": 27900.00,
  "active": true,
  "createdAt": "2025-10-16T08:00:00"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Vehicle not found with id: 999"
}
```

---

### Delete Vehicle
Delete a vehicle (ADMIN only).

**Endpoint:** `DELETE /api/vehicles/{id}`  
**Access:** ADMIN  
**Requires:** JWT Token  

**Response (204 No Content):**
No response body.

**Error Response (404 Not Found):**
```json
{
  "message": "Vehicle not found with id: 999"
}
```

---

## 📋 Role-Based Access Control

| Endpoint | Public | USER | ADMIN |
|----------|--------|------|-------|
| POST /api/auth/login | ✅ | ✅ | ✅ |
| POST /api/auth/register | ❌ | ❌ | ✅ |
| GET /api/vehicles | ✅ | ✅ | ✅ |
| GET /api/vehicles/{id} | ✅ | ✅ | ✅ |
| POST /api/vehicles | ❌ | ❌ | ✅ |
| PUT /api/vehicles/{id} | ❌ | ✅ | ✅ |
| DELETE /api/vehicles/{id} | ❌ | ❌ | ✅ |

---

## 🧪 Testing with cURL

### Login as Admin
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get All Vehicles (Public)
```bash
curl http://localhost:8080/api/vehicles
```

### Create Vehicle (with JWT)
```bash
curl -X POST http://localhost:8080/api/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "model": "VW Passat 2.0 TDI",
    "type": "Kombi",
    "firstRegistration": "2022-08-15",
    "mileage": 28000,
    "equipment": "Highline, ACC, Navi Discover Pro",
    "price": 31900.00
  }'
```

### Update Vehicle (with JWT)
```bash
curl -X PUT http://localhost:8080/api/vehicles/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"mileage": 48000, "price": 27500.00}'
```

### Delete Vehicle (with JWT)
```bash
curl -X DELETE http://localhost:8080/api/vehicles/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📚 Additional Resources

- **Swagger UI:** http://localhost:8080/q/swagger-ui
- **OpenAPI Spec:** http://localhost:8080/openapi
- **Health Check:** http://localhost:8080/q/health
- **Dev UI:** http://localhost:8080/q/dev (dev mode only)

---

## 🔑 Default Test Credentials

| Username | Password | Role  |
|----------|----------|-------|
| admin    | admin123 | ADMIN |
| user     | user123  | USER  |

**⚠️ Change these passwords in production!**

