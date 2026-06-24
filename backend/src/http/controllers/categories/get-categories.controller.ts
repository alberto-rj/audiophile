import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findCategoriesUseCase } from '@/use-cases';
import { makeResBodyPaginationResult, toApiCategory } from '@/helpers';

export async function getCategoriesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.query;

    const { items, ...rest } = await findCategoriesUseCase({
      payload,
    });

    const apiItems = items.map(toApiCategory);

    res
      .status(StatusCodes.OK)
      .json(makeResBodyPaginationResult({ ...rest, items: apiItems }));
  } catch (error) {
    next(error);
  }
}
