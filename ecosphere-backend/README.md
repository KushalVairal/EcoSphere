# EcoSphere Backend — Spring Boot 3 REST API

Clean Architecture Spring Boot backend for the EcoSphere sustainability dashboard.

## Run locally (no Postgres needed)

```bash
# Java 17+ and Maven must be installed
mvn spring-boot:run
```

The `dev` profile activates automatically. It uses an **H2 in-memory database** —
no Postgres installation required. The `DataSeeder` seeds all 15 countries and
their baseline metrics on first startup, so the frontend works immediately.

- API base: `http://localhost:8080/api`
- H2 console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:ecosphere`, user: `sa`, no password)
- Health check: `http://localhost:8080/api/health`

## Run tests

```bash
mvn test
```

Tests use H2 and the `dev` profile — no external services needed.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | Public | `{username, email, password}` → `{token, user}` |
| POST | `/api/auth/login` | Public | `{username, password}` → `{token, user}` |
| GET | `/api/countries` | Public | All 15 countries with latest metrics |
| GET | `/api/countries/{isoCode}/metrics` | Public | Single country metrics |
| GET | `/api/users/me/watchlist` | JWT | List of watched ISO codes |
| POST | `/api/users/me/watchlist` | JWT | `{isoCode}` — add to watchlist |
| DELETE | `/api/users/me/watchlist/{isoCode}` | JWT | Remove from watchlist |
| GET | `/api/health` | Public | Health check |

All protected endpoints need: `Authorization: Bearer <token>`

## Connect the frontend

In `ecosphere-frontend/.env.local`:
```
VITE_USE_MOCK=false
```
Then restart the Vite dev server. All API calls proxy to `http://localhost:8080/api`.

## Architecture

```
com.ecosphere/
├── domain/              # Pure Java — no Spring. Entities, repository interfaces, exceptions.
├── application/         # Use cases (services) and DTOs. Depends only on domain.
└── infrastructure/      # Spring, JPA, JWT, HTTP. Depends on everything above.
    ├── config/          # SecurityConfig, WebConfig (CORS), DataSeeder
    ├── web/             # REST controllers + GlobalExceptionHandler
    ├── persistence/     # JPA entities, Spring Data repos, adapters, mapper
    ├── security/        # JWT provider, filter, UserDetailsService
    ├── external/        # WorldBankApiClient
    └── scheduler/       # DataRefreshScheduler (@Scheduled daily job)
```

## Deploy to Render (free tier)

### 1. Push to GitHub
```bash
git init && git add . && git commit -m "Initial EcoSphere backend"
git remote add origin https://github.com/YOUR_USERNAME/ecosphere-backend.git
git push -u origin main
```

### 2. Create Aiven PostgreSQL (free tier)
1. Sign up at https://aiven.io
2. Create a **Free PostgreSQL** service
3. Copy the connection details (host, port, user, password, database)

### 3. Create Render Web Service
1. Go to https://render.com → New → Web Service
2. Connect your GitHub repo
3. Set these fields:
   - **Environment**: Docker
   - **Dockerfile path**: `./Dockerfile`
4. Add environment variables:

| Variable | Value |
|----------|-------|
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `DATABASE_URL` | `jdbc:postgresql://HOST:PORT/DATABASE?sslmode=require` |
| `DATABASE_USERNAME` | your Aiven username |
| `DATABASE_PASSWORD` | your Aiven password |
| `JWT_SECRET` | any long random string (32+ chars) |
| `ALLOWED_ORIGINS` | `https://YOUR-APP.vercel.app` |

### 4. Deploy frontend to Vercel
1. Go to https://vercel.com → New Project → import `ecosphere-frontend`
2. Add environment variable:
   - `VITE_USE_MOCK` = `false`
3. Update `vite.config.js` proxy target to your Render URL for production,
   or set `VITE_API_BASE_URL` and update `apiClient.js` `baseURL` accordingly.

### Keep Render free tier alive
Render free tier spins down after 15 minutes of inactivity. Add a free uptime
monitor at https://uptimerobot.com pointing to:
`https://YOUR-APP.onrender.com/api/health`
Set it to ping every 10 minutes.

## World Bank data refresh
The scheduler runs daily at 02:00 UTC and fetches fresh data from:
`https://api.worldbank.org/v2` (no API key required).

Indicators fetched:
- `EN.ATM.CO2E.PC` — CO₂ per capita
- `EG.FEC.RNEW.ZS` — Renewable energy %
- `AG.LND.FRST.ZS` — Forest area %
- `SP.POP.TOTL` — Population
- `NY.GDP.PCAP.CD` — GDP per capita
