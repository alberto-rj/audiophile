import type { RefreshTokenCreateParams } from '@/repositories';
import type { RefreshToken } from '@/schemas';

export function makeRefreshToken(
  params: RefreshTokenCreateParams,
): RefreshToken {
  return {
    ...params,
    id: Math.floor(Date.now() * Math.random()),
    createdAt: new Date().toISOString(),
  };
}
