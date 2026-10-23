import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toApiCart } from '@/helpers/cart';
import { makeResBodyResult } from '@/helpers/make-res-body';
import type { AuthRequest } from '@/helpers/tokens';
import { removeCartItemsUseCase } from '@/use-cases/cart';

export async function removeCartItemsController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload!;

    const { output } = await removeCartItemsUseCase({
      input: { userId },
    });

    res.status(StatusCodes.OK).json(makeResBodyResult(toApiCart(output)));
  } catch (error) {
    next(error);
  }
}
