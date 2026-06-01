import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { env } from '@/config';
import { AppError, makeResBodyError } from '@/helpers';

const { NODE_ENV } = env;

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (NODE_ENV === 'development') {
    console.log(err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.format());
  }

  const message = 'Something went wrong.';

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(makeResBodyError(message));
}
