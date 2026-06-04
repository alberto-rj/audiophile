import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { AuthPayload, AuthRequest } from '@/helpers';
import { getProfileUseCase } from '@/use-cases';

export async function getProfileController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload as AuthPayload;

    const { user } = await getProfileUseCase({
      payload: {
        id: userId,
      },
    });

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    next(error);
  }
}
