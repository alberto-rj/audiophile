import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { setRefreshTokenCookie } from '@/helpers';
import { registerUseCase } from '@/use-cases';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.body;

    const { user, accessToken, refreshToken } = await registerUseCase({
      payload,
    });

    setRefreshTokenCookie(res, refreshToken);

    res.status(StatusCodes.CREATED).json({
      user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}
