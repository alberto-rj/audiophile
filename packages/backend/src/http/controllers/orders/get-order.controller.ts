import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResult } from '@/helpers/make-res-body';
import { toApiOrder } from '@/helpers/order';
import type { AuthRequest, AuthPayload } from '@/helpers/tokens';
import { findOrderUseCase } from '@/use-cases/order';

export async function getOrderController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload as AuthPayload;

    const { id } = req.params;

    const { output } = await findOrderUseCase({
      input: {
        id,
        userId,
      },
    });

    res.status(StatusCodes.OK).json(makeResBodyResult(toApiOrder(output)));
  } catch (error) {
    next(error);
  }
}
