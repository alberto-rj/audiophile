import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  makeResBodyPaginationResult,
  toApiOrder,
  type AuthPayload,
  type AuthRequest,
} from '@/helpers';
import { findOrdersUseCase } from '@/use-cases';

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
