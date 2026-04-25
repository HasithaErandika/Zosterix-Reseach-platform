# Architecture

## Monorepo Layout

- `backend/` implements API, auth, domain services, and data access.
- `frontend/` implements application UI, routes, forms, and client-side data fetching.

## Backend Design

The backend follows domain-based modular layering:
- `repository.go`: persistence and SQL access
- `service.go`: business logic and domain rules
- `handler.go`: HTTP transport and request/response mapping

Shared infrastructure is centralized in `backend/internal/shared`.

Cross-cutting concerns are middleware-driven:
- request logging
- recovery
- CORS
- CSRF checks
- rate limiting
- RBAC

## Frontend Design

Frontend is split by responsibility:
- `src/pages`: route-level views
- `src/components`: reusable UI/domain components
- `src/api`: API functions over a shared Axios client
- `src/hooks`: app hooks (auth, notifications polling, etc.)
- `src/stores`: local/global state (Zustand)
- `src/types`: shared types

## Data Stores

- PostgreSQL is the single source of truth for app data.
- Redis is used for temporary and high-throughput concerns (e.g. rate limits, token blocklist, cache).

## Security Baseline

- bcrypt password hashing
- JWT access/refresh model
- cookie hardening for refresh flow
- CSRF token checks for state-changing requests
- strict request validation at both client and server boundaries
