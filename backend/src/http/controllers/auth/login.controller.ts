import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResult } from '@/helpers';

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.status(StatusCodes.OK).json(makeResBodyResult(req.body));
  } catch (error) {
    next(error);
  }
}
