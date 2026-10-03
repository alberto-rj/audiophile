import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { toApiUser, type AuthPayload, type AuthRequest } from '@/helpers';
import { updateProfileUseCase } from '@/use-cases';

export async function updateProfileController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload as AuthPayload;

    const { name, email } = req.body;

    const { user } = await updateProfileUseCase({
      input: {
        id: userId,
        name,
        email,
      },
    });

    res.status(StatusCodes.OK).json({ user: toApiUser(user) });
  } catch (error) {
    next(error);
  }
}
