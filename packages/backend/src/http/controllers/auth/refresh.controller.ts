import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeRefreshUseCase } from '@/helpers/auth';
import { setRefreshTokenCookie } from '@/helpers/tokens';

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

    const { useCase } = makeRefreshUseCase();

    const {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    } = await useCase.execute({
      input: {
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
