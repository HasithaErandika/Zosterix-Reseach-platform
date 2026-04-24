# Zosterix

Zosterix is a full-stack research platform for publishing knowledge, discussing academic topics, and discovering verified supervisors.

This repository contains:
- `backend/`: Go + Gin API server
- `frontend/`: React + TypeScript + Vite web app

## Current Status

V1 foundation is scaffolded and buildable. Core architecture, folder layout, migrations, and initial domain modules are in place.

## Tech Stack

### Frontend
- React 18+ with TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- React Hook Form + Zod
- TipTap editor
- Recharts
- Lucide React

### Backend
- Go + Gin
- PostgreSQL (single database)
- Redis (rate limiting, caching, token blocklist)
- JWT (access + refresh)
- pgxpool
- golang-migrate
- bcrypt

## Project Structure

```text
.
├── backend/
│   ├── cmd/server/
│   ├── internal/
│   ├── migrations/
│   └── Makefile
├── frontend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── docs/
│   ├── setup.md
│   ├── architecture.md
│   └── api-overview.md
└── .github/
    ├── workflows/ci.yml
    └── pull_request_template.md
```

## Quick Start

### Prerequisites
- Go 1.24+
- Node.js 20+
- PostgreSQL 15+
- Redis 7+

### 1) Backend
```bash
cd backend
cp .env.example .env
go mod tidy
make dev
```

Backend runs at `http://localhost:8080`.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Build and Checks

### Backend
```bash
cd backend
go build ./...
go test ./... -v
```

### Frontend
```bash
cd frontend
npm run build
```

## Documentation

- [Setup Guide](docs/setup.md)
- [Architecture Notes](docs/architecture.md)
- [API Overview](docs/api-overview.md)

## Contributing

1. Create a feature branch.
2. Keep changes scoped and documented.
3. Run build/test commands before opening a PR.
4. Use the PR template in `.github/pull_request_template.md`.
