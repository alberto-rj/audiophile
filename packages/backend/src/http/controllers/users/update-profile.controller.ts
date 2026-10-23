import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { makeResBodyResultList } from '@/helpers/make-res-body';
import type { AuthRequest, AuthPayload } from '@/helpers/tokens';
import { toApiUser } from '@/helpers/user';
import { updateProfileUseCase } from '@/use-cases/user';

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

    res.status(StatusCodes.OK).json(makeResBodyResultList(toApiUser(user)));
  } catch (error) {
    next(error);
  }
}
