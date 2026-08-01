import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResult, toApiCart, type AuthRequest } from '@/helpers';
import { removeCartItemUseCase } from '@/use-cases';

export async function removeCartItemController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { itemId } = req.params;

    const { item } = await removeCartItemUseCase({
      input: { itemId },
    });

    const apiItem = toApiCart(item);

    res.json(StatusCodes.OK).json(makeResBodyResult(apiItem));
  } catch (error) {
    next(error);
  }
}
