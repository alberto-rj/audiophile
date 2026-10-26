import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { setRefreshTokenCookie } from '@/helpers/tokens';
import { makeRegisterUseCase } from '@/helpers/auth';
import { toApiUser } from '@/helpers/user';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password } = req.body;

    const { useCase } = makeRegisterUseCase();
    const { user, accessToken, refreshToken } = await useCase.execute({
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
