# Sales Tracking Module

Módulo full-stack de seguimiento de metas de ventas para promotores.

| Capa | Stack |
|---|---|
| **Backend** | Node.js · TypeScript · Express · SQLite (better-sqlite3) · Clean Architecture |
| **Frontend** | Angular 18 · TypeScript · Angular Material · Standalone components · Signals |
| **Auth** | HMAC-SHA256 (contraseñas) · JWT Bearer (sesiones) |
| **DI** | Inversify 5 (backend) · Inversify 6 (frontend) |
| **Notificaciones** | ngx-toastr |
| **Contenedores** | Docker · Docker Compose |

---

## Estructura del proyecto

```
sales-tracking-module/
├── docs/
│   └── DESIGN_SYSTEM.md          # Tokens, tipografía y componentes Material
├── backend/
│   └── src/
│       ├── container.ts           # Inversify DI container
│       ├── types.ts               # Símbolos de inyección
│       ├── domain/
│       │   ├── entities/          # Promoter, Sale
│       │   ├── repositories/      # IPromoterRepository, ISaleRepository
│       │   └── use-cases/         # CreateSale, GetSalesByUser, GetProgress
│       ├── infrastructure/
│       │   ├── auth/              # JWT (sign / verify)
│       │   ├── crypto/            # HMAC-SHA256 (hash / verify password)
│       │   ├── database/          # SQLite singleton + schema + seed
│       │   └── repositories/      # SQLitePromoterRepository, SQLiteSaleRepository
│       └── presentation/
│           ├── controllers/       # Auth, Promoter, Sale, Progress
│           ├── middleware/        # authMiddleware (JWT)
│           └── routes/            # index.ts (public + protected)
└── frontend/
    └── src/app/
        ├── core/
        │   ├── di/                # Inversify container + tokens + interfaces
        │   ├── interceptors/      # authInterceptor (adjunta Bearer token)
        │   ├── models/            # Promoter, Sale, Progress
        │   └── services/          # AuthService, PromoterService, SaleService
        ├── features/
        │   ├── auth/login/        # LoginComponent
        │   └── dashboard/         # DashboardComponent
        └── shared/components/
            ├── progress-badge/    # Badge individual (bronce / plata / oro)
            ├── progress-card/     # Tarjeta de KPIs + barra de progreso + badges
            ├── sale-form/         # Formulario de registro de venta
            ├── sales-history/     # Tabla de historial de ventas
            └── submit-button/     # Botón reutilizable con estado de carga
```

---

## Inicio rápido — desarrollo local

### Backend

```bash
cd backend
npm install
npm run dev          # http://localhost:3002
```

En el primer arranque SQLite crea `sales-tracking.db` con 3 promotores de demo:

| Nombre | Email | Contraseña |
|---|---|---|
| Alice Rivera | alice.rivera@company.com | alice123 |
| Brian Torres | brian.torres@company.com | brian123 |
| Carmen López | carmen.lopez@company.com | carmen123 |

### Frontend

```bash
cd frontend
npm install
npm start            # http://localhost:4200
```

---

## Inicio rápido — Docker

```bash
# Primera vez (compila imágenes)
docker compose up --build

# Arranque en background
docker compose up -d

# Detener y conservar datos
docker compose down

# Detener y borrar la base de datos
docker compose down -v
```

| Servicio | URL |
|---|---|
| Frontend (nginx) | http://localhost |
| Backend (API) | http://localhost:3002 |

---

## API

### Autenticación

Todos los endpoints excepto `/api/health` y `/api/auth/login` requieren el header:

```
Authorization: Bearer <token>
```

El token se obtiene en el login y tiene validez de **8 horas**.

### Endpoints

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| `GET` | `/api/health` | No | Health check (usado por Docker) |
| `POST` | `/api/auth/login` | No | Login con email y contraseña |
| `GET` | `/api/promoters` | Sí | Lista todos los promotores |
| `GET` | `/api/promoters/:id` | Sí | Detalle de un promotor |
| `POST` | `/api/sales` | Sí | Registrar una nueva venta |
| `GET` | `/api/sales/:userId` | Sí | Historial de ventas de un promotor |
| `GET` | `/api/progress/:userId` | Sí | Progreso mensual + badges ganados |

`GET /api/progress/:userId` acepta los query params opcionales `?year=2026&month=4`.

### POST /api/auth/login

```json
// Request
{ "email": "alice.rivera@company.com", "password": "alice123" }

// Response
{
  "token": "<jwt>",
  "promoter": { "id": 1, "name": "Alice Rivera", "email": "...", "monthlyGoal": 50000 }
}
```

### POST /api/sales

```json
{
  "promoterId": 1,
  "amount": 8500,
  "description": "Enterprise software license",
  "saleDate": "2026-04-20T12:00:00.000Z"
}
```

---

## Funcionalidades

### Autenticación
- Login con **email y contraseña**
- Contraseñas almacenadas con **HMAC-SHA256** (clave `C0dy_123`)
- Sesión gestionada con **JWT** (8 h de validez), persistida en `localStorage`
- El interceptor Angular adjunta automáticamente el token en todas las peticiones

### Dashboard
- **KPIs mensuales**: ventas del mes, meta, restante y porcentaje de cumplimiento
- **Barra de progreso** con color según avance: rojo (<50 %) → azul (50–99 %) → acento (100 %)
- **Badges de logro** otorgados automáticamente:
  - 🥉 Bronce — 50 % de la meta (`HALF_WAY`)
  - 🥈 Plata — 80 % de la meta (`ALMOST_THERE`)
  - 🥇 Oro — 100 % de la meta (`GOAL_ACHIEVED`)
- **Formulario de venta** con validación reactiva, datepicker y bloqueo de caracteres inválidos
- **Historial de ventas** en tabla con cabecera fija y scroll

### UI / UX
- Tema **oscuro completo** con design system documentado en `docs/DESIGN_SYSTEM.md`
- Identidad visual rosa (`#e91e8c`) en bordes de tarjetas y hover de botones
- **Notificaciones toast** con color semántico (verde / rojo / amarillo)
- Animación de sacudido en botones al hacer hover
- Botones con estilo píldora (`border-radius: 24px`)
- Scrollbar personalizado

---

## Variables de entorno — Backend

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3002` | Puerto del servidor Express |
| `CORS_ORIGIN` | `http://localhost:4200` | Origen(es) permitidos, separados por coma |
| `DB_PATH` | `<cwd>/sales-tracking.db` | Ruta absoluta del archivo SQLite |

En Docker Compose estas variables están preconfiguradas en `docker-compose.yml`.

---

## Seguridad

- Contraseñas hasheadas con HMAC-SHA256; la comparación usa `timingSafeEqual` para evitar timing attacks
- Todos los endpoints de datos están protegidos por JWT
- CORS restringido a orígenes explícitamente declarados
- El token JWT no se renueva automáticamente; expira a las 8 h y redirige al login
