import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { env } from '@/config';

const { NODE_ENV, ACCESS_EXPIRES_IN_MS, ACCESS_SECRET, REFRESH_EXPIRES_IN_MS } =
  env;

const REFRESH_TOKEN_COOKIE_KEY = 'refreshToken';
const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: REFRESH_EXPIRES_IN_MS,
  path: '/auth',
} as const;

export interface AuthPayload {
  userId: number;
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
    ACCESS_SECRET,
    {
      expiresIn: `${ACCESS_EXPIRES_IN_MS}ms`,
    },
  );

  return accessToken;
}

export function getRefreshToken() {
  const refreshToken = uuidv4();

  return refreshToken;
}

export function getAccessTokenPayload(token: string): AuthPayload | null {
  try {
    const payload = jwt.verify(token, ACCESS_SECRET);
    return payload as AuthPayload;
  } catch {
    return null;
  }
}

export function setRefreshTokenCookie(res: Response, refreshToken: string) {
  res.cookie(
    REFRESH_TOKEN_COOKIE_KEY,
    refreshToken,
    REFRESH_TOKEN_COOKIE_OPTIONS,
  );
}

export function clearRefreshTokenCookie(res: Response) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { maxAge, ...restOptions } = REFRESH_TOKEN_COOKIE_OPTIONS;

  res.clearCookie(REFRESH_TOKEN_COOKIE_KEY, restOptions);
}

export function refreshTokenExpiresAt() {
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_IN_MS).toISOString();

  return expiresAt;
}
