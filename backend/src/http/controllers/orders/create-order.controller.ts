import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  makeResBodyResult,
  toApiOrder,
  type AuthPayload,
  type AuthRequest,
} from '@/helpers';
import { createOrderUseCase } from '@/use-cases';

export async function createOrderController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload as AuthPayload;

    const {
      name,
      email,
      address,
      zip,
      city,
      country,
      paymentMethod,
      items,
      subtotal,
      shipping,
      vat,
      grandTotal,
    } = req.body;

    const { output } = await createOrderUseCase({
      input: {
        userId,
        name,
        email,
        address,
        zip,
        city,
        country,
        paymentMethod,
        items,
        subtotal,
        shipping,
        vat,
        grandTotal,
      },
    });

    res.status(StatusCodes.CREATED).json(makeResBodyResult(toApiOrder(output)));
  } catch (error) {
    next(error);
  }
}
