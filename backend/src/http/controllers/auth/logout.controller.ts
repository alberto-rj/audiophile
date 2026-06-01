import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { clearAccessTokenCookie } from '@/helpers';

export function logoutController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    clearAccessTokenCookie(res);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
}
