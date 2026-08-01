import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResult, toApiCart, type AuthRequest } from '@/helpers';
import { removeCartItemsUseCase } from '@/use-cases';

export async function removeCartItemsController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload!;

    const { item } = await removeCartItemsUseCase({
      input: { userId },
    });

    const apiItem = toApiCart(item);

    res.json(StatusCodes.OK).json(makeResBodyResult(apiItem));
  } catch (error) {
    next(error);
  }
}
