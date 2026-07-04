# API Reference — Project Setup Module

Base URL (development): `http://localhost:5000/api/v1`

Only health endpoints exist in this module. Domain endpoints (properties,
valuations, users, auth) will be documented here as their modules land.

## GET /health

Liveness probe. Confirms the Express process is running.

**Response `200`**
```json
{
  "success": true,
  "message": "PropIntel AI backend is alive",
  "data": {
    "status": "ok",
    "uptimeSeconds": 42,
    "timestamp": "2026-07-03T10:00:00.000Z"
  }
}
```

## GET /health/ready

Readiness probe. Confirms MongoDB is connected.

**Response `200` (ready)**
```json
{
  "success": true,
  "message": "Service ready",
  "data": {
    "status": "ready",
    "database": "connected",
    "timestamp": "2026-07-03T10:00:00.000Z"
  }
}
```

**Response `503` (not ready)** — same shape, `status: "not_ready"`,
`database: "disconnected" | "connecting"`.

## Error shape

All errors (via the centralized `errorHandler` middleware) share one shape:

```json
{
  "success": false,
  "message": "Human-readable message",
  "details": {}
}
```

In non-production environments, an additional `stack` field is included.

## ML Service

Base URL (development): `http://localhost:8000`

- `GET /health` — liveness
- `GET /health/ready` — readiness
- `GET /docs` — interactive Swagger UI (FastAPI auto-generated)
