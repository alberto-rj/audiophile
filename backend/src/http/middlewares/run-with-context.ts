import type { NextFunction, Request, Response } from 'express';

import { asyncLocalStorage, type RequestContext } from '@/helpers';

/**
 * Creates a new store for each request.
 */
export function runWithContext(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  asyncLocalStorage.run({} as RequestContext, next);
}
