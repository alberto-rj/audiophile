import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findProductsUseCase } from '@/use-cases';
import { makeResBodyPaginationResult, toApiProduct } from '@/helpers';

export async function getProductsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { categoryId, limit, page } = req.query;

    const result = await findProductsUseCase({
      input: {
        categoryId,
        limit,
        page,
      },
    });
    const apiItems = result.items.map(toApiProduct);

    res
      .status(StatusCodes.OK)
      .json(makeResBodyPaginationResult({ ...result, items: apiItems }));
  } catch (error) {
    next(error);
  }
}
