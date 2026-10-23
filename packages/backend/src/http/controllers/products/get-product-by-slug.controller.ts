import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResult } from '@/helpers/make-res-body';
import { toApiProduct } from '@/helpers/product';
import { findProductBySlugUseCase } from '@/use-cases/product';

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
