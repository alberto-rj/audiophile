import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  makeResBodyResult,
  toApiOrder,
  type AuthPayload,
  type AuthRequest,
} from '@/helpers';
import { findOrderUseCase } from '@/use-cases';

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
