import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResult, toApiCart, type AuthRequest } from '@/helpers';
import { updateCartItemUseCase } from '@/use-cases';

export async function updateCartItemController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const { item } = await updateCartItemUseCase({
      input: { itemId, quantity },
    });

    const apiItem = toApiCart(item);

    res.json(StatusCodes.OK).json(makeResBodyResult(apiItem));
  } catch (error) {
    next(error);
  }
}
