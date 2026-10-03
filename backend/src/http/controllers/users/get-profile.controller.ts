import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toApiUser, type AuthPayload, type AuthRequest } from '@/helpers';
import { getProfileUseCase } from '@/use-cases';

export async function getProfileController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload as AuthPayload;

    const { user } = await getProfileUseCase({
      input: {
        id: userId,
      },
    });

    res.status(StatusCodes.OK).json({ user: toApiUser(user) });
  } catch (error) {
    next(error);
  }
}
