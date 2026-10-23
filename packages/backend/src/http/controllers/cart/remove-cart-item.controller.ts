import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { AuthRequest } from '@/helpers/tokens';
import { toApiCart } from '@/helpers/cart';
import { makeResBodyResult } from '@/helpers/make-res-body';
import { removeCartItemUseCase } from '@/use-cases/cart';

export async function removeCartItemController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload!;
    const { itemId } = req.params;

    const { output } = await removeCartItemUseCase({
      input: { itemId, userId },
    });

    res.status(StatusCodes.OK).json(makeResBodyResult(toApiCart(output)));
  } catch (error) {
    next(error);
  }
}
