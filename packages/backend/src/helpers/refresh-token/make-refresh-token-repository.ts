import { DrizzleRefreshTokenRepository } from '@/repositories/drizzle';
import { InMemoryRefreshTokenRepository } from '@/repositories/in-memory';
import type { RefreshTokenRepository } from '@/repositories/types';

import type { RepositoryType } from '../common/types';

export function makeRefreshTokenRepository(type: RepositoryType = 'drizzle') {
  const repositories: Record<RepositoryType, RefreshTokenRepository> = {
    drizzle: new DrizzleRefreshTokenRepository(),
    'in-memory': new InMemoryRefreshTokenRepository(),
  };

  return repositories[type];
}
