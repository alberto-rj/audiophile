import { type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { setRefreshTokenCookie, toApiUser } from '@/helpers';
import { loginUseCase } from '@/use-cases';

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await loginUseCase({
      input: { email, password },
    });

    setRefreshTokenCookie(res, refreshToken);

    res.status(StatusCodes.OK).json({
      accessToken,
      user: toApiUser(user),
    });
  } catch (error) {
    next(error);
  }
}
