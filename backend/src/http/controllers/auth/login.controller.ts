import { type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { setRefreshTokenCookie } from '@/helpers';
import { loginUseCase } from '@/use-cases';

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.body;

    const { accessToken, refreshToken, user } = await loginUseCase({
      payload,
    });

    setRefreshTokenCookie(res, refreshToken);

    res.status(StatusCodes.OK).json({
      accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
}
