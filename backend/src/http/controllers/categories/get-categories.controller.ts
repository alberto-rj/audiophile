import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findCategoriesUseCase } from '@/use-cases';
import { makeResBodyPaginationResult } from '@/helpers';

export async function getCategoriesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.query;

    const result = await findCategoriesUseCase({
      payload,
    });

    res.status(StatusCodes.OK).json(makeResBodyPaginationResult(result));
  } catch (error) {
    next(error);
  }
}
