import type { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  getAccessToken,
  setAccessTokenCookie,
  type AuthPayload,
  type AuthRequest,
} from '@/helpers';

export function refreshController(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.payload as AuthPayload;

    const accessToken = getAccessToken(payload);
    setAccessTokenCookie(res, accessToken);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
}
