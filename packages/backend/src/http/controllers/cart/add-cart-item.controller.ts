import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeAddCartItemUseCase, toApiCart } from '@/helpers/cart';
import type { AuthRequest } from '@/helpers/tokens';
import { makeResBodyResult } from '@/helpers/make-res-body';

export async function addCartItemController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload!;
    const { quantity, productId } = req.body;

    const { useCase } = makeAddCartItemUseCase();
    const { output } = await useCase.execute({
      input: { userId, productId, quantity },
    });

    res.status(StatusCodes.OK).json(makeResBodyResult(toApiCart(output)));
  } catch (error) {
    next(error);
  }
}
