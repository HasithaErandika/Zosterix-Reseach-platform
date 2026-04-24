# Setup Guide

## Services Required

- PostgreSQL
- Redis

## Backend Setup

1. Open the backend folder:
```bash
cd backend
```

2. Create local env file:
```bash
cp .env.example .env
```

3. Fill required values in `.env`:
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`

4. Install dependencies and run:
```bash
go mod tidy
make dev
```

## Frontend Setup

1. Open the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start dev server:
```bash
npm run dev
```

## Environment Variables

### Backend
Use `backend/.env.example` as source of truth.

### Frontend
Create `frontend/.env` with:
```env
VITE_API_URL=http://localhost:8080
VITE_APP_URL=http://localhost:5173
VITE_GOOGLE_CLIENT_ID=
```
