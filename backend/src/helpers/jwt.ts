import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '@/config';

const { NODE_ENV, JWT_ACCESS_EXPIRES_IN_DAYS, JWT_ACCESS_SECRET } = env;

export interface AuthPayload {
  userId: string;
  userEmail: string;
}

export interface AuthRequest extends Request {
  payload?: AuthPayload;
}

export function getAccessToken({ userId, userEmail }: AuthPayload) {
  const accessToken = jwt.sign(
    {
      userId,
      userEmail,
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: `${JWT_ACCESS_EXPIRES_IN_DAYS}d`,
    },
  );
  return accessToken;
}

export function getAccessTokenPayload(token: string): AuthPayload | null {
  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    return payload as AuthPayload;
  } catch {
    return null;
  }
}

export function setAccessTokenCookie(res: Response, accessToken: string) {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: JWT_ACCESS_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
  });
}

export function clearAccessTokenCookie(res: Response) {
  res.clearCookie('accessToken');
}
