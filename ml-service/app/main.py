"""PropIntel AI - ML Service entrypoint (FastAPI).

This is the main entry point for the ML microservice.
It exposes health check and AI prediction APIs.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routers import health
from app.routers import prediction

settings = get_settings()

app = FastAPI(
    title="PropIntel AI - ML Service",
    description="Machine Learning microservice for the PropIntel AI real estate intelligence platform.",
    version="1.0.0",
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# API Routers
# -----------------------------
app.include_router(health.router)
app.include_router(prediction.router)

# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/", tags=["Root"])
def root():
    return {
        "success": True,
        "message": "PropIntel AI ML Service",
        "version": "1.0.0",
        "docs": "/docs",
    }