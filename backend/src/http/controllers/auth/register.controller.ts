import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResult } from '@/helpers';
import { registerUseCase } from '@/use-cases';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { user } = await registerUseCase(req.body);

    res.status(StatusCodes.CREATED).json(makeResBodyResult(user));
  } catch (error) {
    next(error);
  }
}
