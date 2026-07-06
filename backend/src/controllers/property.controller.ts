import { Request, Response, NextFunction } from 'express';

import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from '../services/property.service';

export async function create(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const property = await createProperty(
      req.body,
      req.user!.sub,
    );

    return res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const properties = await getProperties(req.query as any);

    return res.json({
      success: true,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOne(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const property = await getPropertyById(req.params.id);

    return res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const property = await updateProperty(
      req.params.id,
      req.body,
    );

    return res.json({
      success: true,
      message: 'Property updated successfully',
      data: property,
    });
  } catch (error) {
    next(error);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await deleteProperty(req.params.id);

    return res.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}