import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyPaginationResult } from '@/helpers/make-res-body';
import { toApiProduct } from '@/helpers/product';
import { findProductsUseCase } from '@/use-cases/product';

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
