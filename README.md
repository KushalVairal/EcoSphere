# EcoSphere — Full Stack Project

## Quick Start

### Frontend only (no Java needed)
```bash
cd ecosphere-frontend
npm install
npm run dev
# Open http://localhost:5173  |  login: demo / demo123
```

### Full stack
```bash
# Terminal 1
cd ecosphere-backend
mvn spring-boot:run

# Terminal 2  (after changing .env.local → VITE_USE_MOCK=false)
cd ecosphere-frontend
npm install && npm run dev
```
