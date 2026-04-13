# 🌍 EcoSphere — Interactive 3D Sustainability Dashboard

A React + Three.js frontend for exploring global sustainability metrics on an interactive 3D globe.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 — login with `demo` / `demo123`.

## Project Structure

```
src/
├── three/          # 3D components (React Three Fiber)
│   ├── Scene.jsx          Canvas + lights + controls
│   ├── Earth.jsx          Textured sphere with auto-rotation
│   ├── Atmosphere.jsx     Teal glow shader
│   ├── Starfield.jsx      Animated star field
│   └── CountryMarkers.jsx Pulsing pins per country
│
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.jsx    Country list, search, watchlist
│   │   └── MetricsPanel.jsx  Animated data panel
│   └── auth/
│       ├── LoginForm.jsx
│       └── RegisterForm.jsx
│
├── hooks/
│   ├── useAuth.js         Auth context + JWT management
│   └── useEarthData.js    Country data + metrics state
│
├── services/
│   ├── apiClient.js       Axios with JWT interceptors
│   ├── authService.js     Login / register
│   └── countryService.js  Countries + metrics + watchlist
│
├── utils/
│   ├── colorScale.js      CO2 value → color mapping
│   └── geometryUtils.js   lat/lon → 3D coordinates
│
├── pages/
│   ├── LoginPage.jsx
│   └── DashboardPage.jsx
│
└── mockData.js            15 countries with real data (dev only)
```

## Connecting to Spring Boot Backend

1. Start your Spring Boot app on port 8080
2. Edit `.env.local`:
   ```
   VITE_USE_MOCK=false
   ```
3. Restart the dev server — all API calls now go to `http://localhost:8080/api`

The services automatically switch between mock and real API based on this flag.

## Expected Backend API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | `{ username, password }` → `{ token, user }` |
| POST | `/api/auth/register` | `{ username, email, password }` → `{ token, user }` |
| GET | `/api/countries` | Returns array of all countries with metrics |
| GET | `/api/countries/{isoCode}/metrics` | Returns single country with full metrics |
| GET | `/api/users/me/watchlist` | Returns array of ISO codes |
| POST | `/api/users/me/watchlist` | `{ isoCode }` |
| DELETE | `/api/users/me/watchlist/{isoCode}` | |

## Deployment

**Frontend → Vercel**
```bash
# In Vercel dashboard: set environment variable
VITE_USE_MOCK=false
VITE_API_BASE_URL=https://your-render-app.onrender.com
```

**Backend → Render**
- Use the `Dockerfile` in `/backend`
- Set `SPRING_DATASOURCE_URL` to your Aiven PostgreSQL connection string

## Tech Stack

- React 18 + Vite
- React Three Fiber + Three.js + Drei
- Framer Motion
- Axios
- React Router v6
