import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeGetCartUseCase, toApiCart } from '@/helpers/cart';
import { makeResBodyResult } from '@/helpers/make-res-body';
import type { AuthRequest } from '@/helpers/tokens';

export async function getCartController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload!;

    const { useCase } = makeGetCartUseCase();
    const { output } = await useCase.execute({
      input: { userId },
    });

    res.status(StatusCodes.OK).json(makeResBodyResult(toApiCart(output)));
  } catch (error) {
    next(error);
  }
}
