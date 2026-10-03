import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { setRefreshTokenCookie, toApiUser } from '@/helpers';
import { registerUseCase } from '@/use-cases';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password } = req.body;

    const { user, accessToken, refreshToken } = await registerUseCase({
      input: { name, email, password },
    });

    setRefreshTokenCookie(res, refreshToken);

    res.status(StatusCodes.CREATED).json({
      accessToken,
      user: toApiUser(user),
    });
  } catch (error) {
    next(error);
  }
}
