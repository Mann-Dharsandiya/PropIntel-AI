from fastapi import APIRouter

from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
)

from app.services.predictor import predict_price

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)


@router.post(
    "/price",
    response_model=PredictionResponse,
)
def predict(request: PredictionRequest):

    predicted_price = predict_price(
        request.model_dump()
    )

    return PredictionResponse(
        predictedPrice=predicted_price
    )