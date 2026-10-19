import type {
  RefreshToken,
  RefreshTokenCreateParams,
} from '@audiophile/shared';

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
