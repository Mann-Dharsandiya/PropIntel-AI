import { Request, Response, NextFunction } from "express";
import {
  predictPrice,
  PredictPriceRequest,
} from "../services/ml.service";

export async function predictPriceController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const prediction = await predictPrice(
      req.body as PredictPriceRequest
    );

    return res.status(200).json({
      success: true,
      message: "Price prediction generated successfully",
      data: prediction,
    });
  } catch (error) {
    next(error);
  }
}