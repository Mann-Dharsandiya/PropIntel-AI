"""PropIntel AI - ML Service entrypoint (FastAPI).

This is the base scaffold for the ML microservice. Model-serving routers
(price prediction, valuation, recommendation, etc.) will be added in
future modules under app/routers and wired in here.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routers import health

settings = get_settings()

app = FastAPI(
    title="PropIntel AI - ML Service",
    description="Machine learning microservice for the PropIntel AI real estate intelligence platform.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)


@app.get("/", tags=["root"])
def root():
    return {
        "success": True,
        "message": "PropIntel AI ML Service",
        "version": "1.0.0",
        "docs": "/docs",
    }
