# PropIntel AI — Project Setup Module

AI-powered real estate intelligence platform. **This is the Project Setup
Module only**: base scaffolding for the frontend, backend, and ML service,
wired together and fully runnable. Feature modules (auth, listings,
valuation models, etc.) are built on top of this in later modules.

## Stack

| Layer     | Technology                                                             |
|-----------|-------------------------------------------------------------------------|
| Frontend  | React 19, TypeScript, Vite, Tailwind CSS, React Router, Axios, React Query, React Hook Form, Zod |
| Backend   | Node.js, Express, TypeScript, JWT, Mongoose                            |
| Database  | MongoDB                                                                  |
| ML        | Python, FastAPI, Scikit-learn                                          |

## Project structure

```
propintel-ai/
├── frontend/         React 19 + Vite SPA
├── backend/           Express + TypeScript REST API
├── ml-service/        FastAPI microservice
├── docker/             Compose support files (mongo-init, etc.)
├── docker-compose.yml  Orchestrates all four services
├── docs/               Architecture + API docs
└── package.json        Root workspace scripts
```

See `docs/ARCHITECTURE.md` for the internal folder layout of each service.

## Prerequisites

- Node.js ≥ 20
- npm ≥ 10
- Python ≥ 3.11
- MongoDB running locally, **or** Docker (recommended — spins up Mongo for you)

## Quick start (local, no Docker)

### 1. Install dependencies

```bash
# from the project root
npm install                 # installs frontend + backend (npm workspaces)

cd ml-service
pip install -r requirements.txt --break-system-packages   # or use a venv
cd ..
```

### 2. Configure environment variables

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
cp ml-service/.env.example ml-service/.env
```

Defaults work out of the box for local development as long as MongoDB is
reachable at `mongodb://localhost:27017`.

### 3. Start MongoDB

```bash
# if you have mongod installed locally
mongod --dbpath ./data

# OR just run mongo via docker without the rest of the stack
docker run -d -p 27017:27017 --name propintel-mongo mongo:7
```

### 4. Run everything

```bash
npm run dev
```

This runs the frontend and backend concurrently via the root `npm run dev`
script (backend on `:5000`, frontend on `:5173`). In a separate terminal,
start the ML service:

```bash
npm run dev:ml
# or: cd ml-service && uvicorn app.main:app --reload --port 8000
```

### 5. Verify

- Frontend: http://localhost:5173 — landing page shows a live "Backend
  connected" status pulled from the API.
- Backend health: http://localhost:5000/api/v1/health
- Backend readiness: http://localhost:5000/api/v1/health/ready
- ML service docs: http://localhost:8000/docs

## Quick start (Docker)

```bash
cp .env.example .env   # optional convenience file for compose
docker compose up --build
```

This starts MongoDB, the backend, the frontend, and the ML service together.
Same URLs as above.

## Individual service commands

### Frontend (`/frontend`)
```bash
npm run dev         # start Vite dev server
npm run build        # type-check + production build
npm run lint          # eslint
npm run format         # prettier
```

### Backend (`/backend`)
```bash
npm run dev         # start with nodemon + ts-node
npm run build        # compile TypeScript to dist/
npm run start          # run compiled dist/server.js
npm run lint           # eslint
```

### ML Service (`/ml-service`)
```bash
uvicorn app.main:app --reload --port 8000
```

## What's included in this module

- Clean, layered folder structure for all three services
- Express app with security middleware (helmet, cors), request logging,
  centralized error handling, and a 404 handler
- MongoDB connection via Mongoose with readiness reporting
- `/health` and `/health/ready` endpoints on both backend and ML service
- FastAPI app with CORS configured and auto-generated Swagger docs at `/docs`
- React app with routing, a shared layout (Navbar/Footer), a designed
  landing page, a 404 page, a global loading indicator, and a top-level
  error boundary
- Axios instance with interceptors (auth header attachment, normalized
  error messages) and a React Query hook demonstrating a real
  frontend → backend network call
- ESLint + Prettier configured for both frontend and backend
- Dockerfiles for all three services plus a root `docker-compose.yml`
- `.env.example` for every service

## What's intentionally NOT included

This module stops at scaffolding. The following are out of scope until
their respective modules:

- Authentication logic (JWT is a dependency, but no login/signup routes yet)
- Mongoose schemas/models beyond the setup check
- ML model training or inference endpoints
- Any property/listing/valuation domain features

## Troubleshooting

| Symptom | Fix |
|---|---|
| Landing page shows "Backend unreachable" | Make sure `npm run dev:backend` (or `npm run dev`) is running and `frontend/.env`'s `VITE_API_BASE_URL` matches the backend port. |
| Backend fails to start / DB errors | Confirm MongoDB is running and `backend/.env`'s `MONGO_URI` is correct. In development the server still boots without Mongo so you can verify the rest of the setup. |
| CORS errors in the browser console | Check `CLIENT_ORIGIN` in `backend/.env` matches the URL the frontend is actually served from. |
| `npm run dev` at the root doesn't start anything | Run `npm install` at the root first — it uses npm workspaces to link `frontend` and `backend`. |
