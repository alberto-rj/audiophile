import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findCategoryBySlugUseCase } from '@/use-cases';
import { makeResBodyResult } from '@/helpers';

export async function getCategoryBySlugController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.params;

    const { item } = await findCategoryBySlugUseCase({
      payload,
    });

    res.status(StatusCodes.OK).json(makeResBodyResult(item));
  } catch (error) {
    next(error);
  }
}
