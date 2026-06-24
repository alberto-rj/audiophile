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
    const payload = req.query;

    const result = await findProductsUseCase({
      payload,
    });
    const apiItems = result.items.map(toApiProduct);

    res
      .status(StatusCodes.OK)
      .json(makeResBodyPaginationResult({ ...result, items: apiItems }));
  } catch (error) {
    next(error);
  }
}
