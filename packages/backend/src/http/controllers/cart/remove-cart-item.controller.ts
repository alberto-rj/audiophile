import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { AuthRequest } from '@/helpers/tokens';
import { makeRemoveCartItemUseCase, toApiCart } from '@/helpers/cart';
import { makeResBodyResult } from '@/helpers/make-res-body';

export async function removeCartItemController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload!;
    const { itemId } = req.params;

    const { useCase } = makeRemoveCartItemUseCase();
    const { output } = await useCase.execute({
      input: { itemId, userId },
    });

    res.status(StatusCodes.OK).json(makeResBodyResult(toApiCart(output)));
  } catch (error) {
    next(error);
  }
}
