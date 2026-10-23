import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toApiCategory } from '@/helpers/category';
import { makeResBodyPaginationResult } from '@/helpers/make-res-body';
import { findCategoriesUseCase } from '@/use-cases/category';

export async function getCategoriesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, limit } = req.query;

    const { items, ...rest } = await findCategoriesUseCase({
      input: { page, limit },
    });

    const apiItems = items.map(toApiCategory);

    res
      .status(StatusCodes.OK)
      .json(makeResBodyPaginationResult({ ...rest, items: apiItems }));
  } catch (error) {
    next(error);
  }
}
