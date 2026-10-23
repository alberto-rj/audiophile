import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '@/helpers/app-error';
import { logger } from '@/helpers/logger';
import { makeResBodyError } from '@/helpers/make-res-body';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError
    ? err.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
  const { message, stack } = err;
  const { path, method } = req;

  if (isAppError) {
    logger.warn(message, {
      statusCode,
      stack,
      path,
      method,
    });

    return res.status(err.statusCode).json(err.format());
  }

  logger.error(message, {
    statusCode,
    stack,
    path,
    method,
  });

  return res.status(statusCode).json(makeResBodyError('Something went wrong.'));
}
