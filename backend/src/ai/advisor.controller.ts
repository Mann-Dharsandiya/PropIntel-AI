 import { Request, Response, NextFunction } from "express";

import { advisorService } from "./advisor.service";

export async function advisorController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {

    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result = await advisorService(
      message,
      sessionId ?? "default-session",
    );

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
}