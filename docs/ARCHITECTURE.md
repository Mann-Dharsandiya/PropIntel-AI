# Architecture — Project Setup Module

This document covers only what exists in this module: the base scaffolding
for all three services. Feature-level architecture (valuation models, auth,
listings, etc.) will be documented as those modules are added.

## High-level layout

```
propintel-ai/
├── frontend/     React 19 + TypeScript + Vite SPA
├── backend/      Node.js + Express + TypeScript REST API
├── ml-service/   Python + FastAPI microservice
├── docker/       Compose support files
└── docs/         This documentation
```

## Backend — clean architecture layering

```
src/
├── config/        environment loading, DB connection
├── controllers/    request/response handling only
├── routes/         URL → controller wiring
├── middlewares/     cross-cutting concerns (errors, 404)
├── utils/           ApiError, logger, asyncHandler, response helpers
├── models/           (empty — populated by data modules)
├── types/            shared TS types
├── app.ts            Express app assembly (no side effects)
└── server.ts          process entrypoint: connect DB, start HTTP server
```

Controllers never talk to Mongoose directly in later modules — that will go
through a service layer once domain models exist. For this setup module,
`health.controller.ts` reads connection state directly since there is no
domain logic yet.

## Frontend — feature-ready structure

```
src/
├── api/            axios instance + interceptors
├── components/
│   ├── layout/      Navbar, Footer, Layout (route shell)
│   └── common/       ErrorBoundary, Loading (shared primitives)
├── hooks/            React Query hooks (useHealthCheck)
├── pages/             route-level screens
├── routes/            AppRoutes route table
├── types/             shared TS types (API envelope, etc.)
└── styles/            Tailwind entrypoint
```

Routing is centralized in `routes/AppRoutes.tsx` so future modules add a
lazy import + one `<Route>` line rather than touching `App.tsx`.

## ML service — router-based FastAPI layout

```
app/
├── core/config.py     pydantic-settings based config
├── routers/health.py  liveness/readiness endpoints
├── models/             (empty — trained model artifacts go here)
├── schemas/             (empty — pydantic request/response schemas)
└── main.py              FastAPI app assembly
```

New model-serving endpoints are added as routers under `app/routers/` and
included in `main.py`, mirroring the Express route registration pattern.

## Request flow (health check example)

```
Browser (LandingPage)
  → useHealthCheck() [React Query]
    → axios GET /api/v1/health
      → Express routes/health.routes.ts
        → controllers/health.controller.ts
          → config/db.ts (Mongoose connection state)
      ← { success, message, data: { status, uptimeSeconds } }
  ← rendered as a live status indicator on the landing page
```

This end-to-end path is what proves the module is "fully runnable" — it's a
real network call from a real frontend page to a real backend endpoint.
