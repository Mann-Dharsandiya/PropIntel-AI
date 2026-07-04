"""Health check endpoints for the ML microservice."""
import time
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/health", tags=["health"])

_START_TIME = time.time()


class HealthResponse(BaseModel):
    status: str
    service: str
    uptime_seconds: int


@router.get("", response_model=HealthResponse)
def liveness() -> HealthResponse:
    """Basic liveness probe."""
    return HealthResponse(
        status="ok",
        service="propintel-ml-service",
        uptime_seconds=int(time.time() - _START_TIME),
    )


@router.get("/ready", response_model=HealthResponse)
def readiness() -> HealthResponse:
    """Readiness probe. Extend later to check model artifacts are loaded."""
    return HealthResponse(
        status="ready",
        service="propintel-ml-service",
        uptime_seconds=int(time.time() - _START_TIME),
    )
