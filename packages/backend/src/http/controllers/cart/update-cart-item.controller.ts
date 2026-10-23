import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toApiCart } from '@/helpers/cart';
import { makeResBodyResult } from '@/helpers/make-res-body';
import type { AuthRequest } from '@/helpers/tokens';
import { updateCartItemUseCase } from '@/use-cases/cart';

export async function updateCartItemController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload!;
    const { itemId } = req.params;
    const { quantity } = req.body;

    const { output } = await updateCartItemUseCase({
      input: { itemId, quantity, userId },
    });

    res.status(StatusCodes.OK).json(makeResBodyResult(toApiCart(output)));
  } catch (error) {
    next(error);
  }
}
