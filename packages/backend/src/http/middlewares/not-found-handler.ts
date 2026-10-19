import type { Request, Response, NextFunction } from 'express';

import { ResourceNotFoundError } from '@/helpers';

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const message = `Cannot find ${req.originalUrl} on this server.`;
  next(new ResourceNotFoundError(message));
}
