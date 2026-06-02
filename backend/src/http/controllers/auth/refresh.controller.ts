import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { setRefreshTokenCookie } from '@/helpers';
import { refreshUseCase } from '@/use-cases';

export async function refreshController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { refreshToken } = req.cookies as {
      refreshToken?: string;
    };

    if (typeof refreshToken === 'undefined') {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    } = await refreshUseCase({
      payload: {
        token: refreshToken,
      },
    });

    setRefreshTokenCookie(res, newRefreshToken);

    return res.status(StatusCodes.OK).json({
      user,
      accessToken,
    });
  } catch (error) {
    return next(error);
  }
}
