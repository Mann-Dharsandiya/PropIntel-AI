# Docker

This folder holds infrastructure helpers used by the root `docker-compose.yml`.

- `mongo-init.js` — seeds the `propintel_ai` database on first container start.

## Usage

From the project root:

```bash
docker compose up --build
```

Services:

| Service     | URL                        |
|-------------|-----------------------------|
| frontend    | http://localhost:5173       |
| backend     | http://localhost:5000       |
| ml-service  | http://localhost:8000/docs  |
| mongo       | mongodb://localhost:27017   |

Each service's Dockerfile lives inside its own folder (`frontend/Dockerfile`,
`backend/Dockerfile`, `ml-service/Dockerfile`) so they can also be built and
run independently of Compose.
