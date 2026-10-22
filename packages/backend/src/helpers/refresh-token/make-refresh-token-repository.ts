import {
  DrizzleRefreshTokenRepository,
  InMemoryRefreshTokenRepository,
  type RefreshTokenRepository,
} from '@/repositories';

import type { RepositoryType } from '../common/types';

export function makeRefreshTokenRepository(type: RepositoryType = 'drizzle') {
  const repositories: Record<RepositoryType, RefreshTokenRepository> = {
    'in-memory': new InMemoryRefreshTokenRepository(),
    drizzle: new DrizzleRefreshTokenRepository(),
  };

  return repositories[type];
}
