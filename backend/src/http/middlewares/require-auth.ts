import type { Response, NextFunction } from 'express';

import {
  getAccessTokenPayload,
  UnauthorizedError,
  updateRequestContext,
  type AuthRequest,
} from '@/helpers';

export async function requireAuth(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Missing access token');
    }

    const [, accessToken] = authHeader.split(' ');

    if (!accessToken) {
      throw new UnauthorizedError('Missing access token');
    }

    const payload = getAccessTokenPayload(accessToken);

    if (!payload) {
      throw new UnauthorizedError('Invalid or expired access token');
    }

    updateRequestContext({
      userId: payload.userId.toString(10),
    });

    req.payload = payload;

    next();
  } catch (error) {
    next(error);
  }
}
