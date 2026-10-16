import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResult, toApiCart, type AuthRequest } from '@/helpers';
import { getCartUseCase } from '@/use-cases';

export async function getCartController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload!;

    const { output } = await getCartUseCase({
      input: { userId },
    });

    res.json(StatusCodes.OK).json(makeResBodyResult(toApiCart(output)));
  } catch (error) {
    next(error);
  }
}
