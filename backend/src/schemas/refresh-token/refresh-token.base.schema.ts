import { z } from '@/config';

export const RefreshTokenIdSchema = z.coerce
  .number({
    error: 'id must be a number.',
  })
  .int()
  .positive();

export const RefreshTokenExpiresAtSchema = z.string({
  error: 'expires at must be a string.',
});

export const RefreshTokenTokenSchema = z.string({
  error: 'token must be a string.',
});
