import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findCategoryBySlugUseCase } from '@/use-cases';
import { makeResBodyResult, toApiCategory } from '@/helpers';

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

    const apiItem = toApiCategory(item);

    res.status(StatusCodes.OK).json(makeResBodyResult(apiItem));
  } catch (error) {
    next(error);
  }
}
