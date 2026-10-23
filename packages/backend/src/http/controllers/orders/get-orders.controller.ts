import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyPaginationResult } from '@/helpers/make-res-body';
import { toApiOrder } from '@/helpers/order';
import type { AuthRequest, AuthPayload } from '@/helpers/tokens';
import { findOrdersUseCase } from '@/use-cases/order';

export async function getOrdersController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload as AuthPayload;

    const { page, limit } = req.query;

    const { output } = await findOrdersUseCase({
      input: {
        userId,
        page,
        limit,
      },
    });
    const apiOrders = output.items.map(toApiOrder);

    res
      .status(StatusCodes.OK)
      .json(makeResBodyPaginationResult({ ...output, items: apiOrders }));
  } catch (error) {
    next(error);
  }
}
