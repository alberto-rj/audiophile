import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResult, toApiCart, type AuthRequest } from '@/helpers';
import { addCartItemUseCase } from '@/use-cases';

export async function addCartItemController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload!;
    const { quantity, productId } = req.body;

    const { item } = await addCartItemUseCase({
      input: { userId, productId, quantity },
    });

    const apiItem = toApiCart(item);

    res.json(StatusCodes.OK).json(makeResBodyResult(apiItem));
  } catch (error) {
    next(error);
  }
}
