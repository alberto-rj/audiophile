import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { refreshTokenRepository } from '@/config';
import { clearRefreshTokenCookie } from '@/helpers';

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { refreshToken } = req.cookies as {
      refreshToken?: string;
    };

    if (typeof refreshToken === 'string') {
      await refreshTokenRepository.delete({
        token: refreshToken,
      });
    }

    clearRefreshTokenCookie(res);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
}
