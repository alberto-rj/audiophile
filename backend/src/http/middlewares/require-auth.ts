import type { Response, NextFunction } from 'express';

import {
  getAccessTokenPayload,
  UnauthorizedError,
  type AuthRequest,
} from '@/helpers';

export async function requireAuth(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new UnauthorizedError('No token provided.');
    }

    const payload = getAccessTokenPayload(accessToken);

    if (!payload) {
      throw new UnauthorizedError('Invalid or expired token.');
    }

    req.payload = payload;

    next();
  } catch (error) {
    next(error);
  }
}
