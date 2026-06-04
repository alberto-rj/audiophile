import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { env } from '@/config';

const { NODE_ENV, ACCESS_EXPIRES_MS, ACCESS_SECRET, REFRESH_EXPIRES_MS } = env;

export const REFRESH_TOKEN_COOKIE_KEY = 'refreshToken';

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
      expiresIn: `${ACCESS_EXPIRES_MS}ms`,
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

export function getRefreshTokenCookieOptions() {
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: REFRESH_EXPIRES_MS,
    path: '/auth',
  } as const;

  if (NODE_ENV === 'production') {
    return {
      ...options,
      secure: true,
      sameSite: 'strict',
    } as const;
  }

  return options;
}

export function setRefreshTokenCookie(res: Response, refreshToken: string) {
  const options = getRefreshTokenCookieOptions();

  res.cookie(REFRESH_TOKEN_COOKIE_KEY, refreshToken, options);
}

export function clearRefreshTokenCookie(res: Response) {
  const options = getRefreshTokenCookieOptions();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { maxAge, ...restOptions } = options;

  res.clearCookie(REFRESH_TOKEN_COOKIE_KEY, restOptions);
}

export function refreshTokenExpiresAt() {
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_MS).toISOString();

  return expiresAt;
}
