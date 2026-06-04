import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { AuthPayload, AuthRequest } from '@/helpers';
import { updateProfileUseCase } from '@/use-cases';

export async function updateProfileController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.payload as AuthPayload;

    const changes = req.body;

    const { user } = await updateProfileUseCase({
      payload: {
        id: userId,
        ...changes,
      },
    });

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    next(error);
  }
}
