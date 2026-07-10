from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    city: str = Field(..., example="Ahmedabad")

    propertyType: str = Field(..., example="Apartment")

    bedrooms: int = Field(..., ge=1, le=10)

    bathrooms: int = Field(..., ge=1, le=10)

    area: int = Field(..., gt=0)

    age: int = Field(..., ge=0)

    parking: int = Field(..., ge=0)

    furnished: str = Field(
        ...,
        example="Semi Furnished",
    )


class PredictionResponse(BaseModel):
    predictedPrice: float