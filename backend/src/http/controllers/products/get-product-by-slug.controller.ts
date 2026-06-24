import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findProductBySlugUseCase } from '@/use-cases';
import { makeResBodyResult, toApiProduct } from '@/helpers';

export async function getProductBySlugController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.params;

    const { item } = await findProductBySlugUseCase({
      payload,
    });

    res.status(StatusCodes.OK).json(makeResBodyResult(toApiProduct(item)));
  } catch (error) {
    next(error);
  }
}
