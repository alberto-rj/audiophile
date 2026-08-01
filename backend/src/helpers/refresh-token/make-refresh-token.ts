import type { RefreshToken, RefreshTokenCreateParams } from '@/schemas';

import { makeId } from '../make-id';

export function makeRefreshToken({
  expiresAt,
  token,
  userId,
}: RefreshTokenCreateParams): RefreshToken {
  return {
    id: makeId(),
    userId,
    token,
    expiresAt: expiresAt.toISOString(),
    createdAt: new Date().toISOString(),
  };
}
