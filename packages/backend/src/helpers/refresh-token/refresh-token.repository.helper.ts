import { DrizzleRefreshTokenRepository } from '@/repositories/drizzle';
import { InMemoryRefreshTokenRepository } from '@/repositories/in-memory';
import type { RefreshTokenRepository } from '@/repositories/types';

import {
  DEFAULT_REPOSITORY_TYPE,
  type RepositoryType,
} from '../common/repository';

export function makeRefreshTokenRepository(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const repositories: Record<RepositoryType, RefreshTokenRepository> = {
    drizzle: new DrizzleRefreshTokenRepository(),
    'in-memory': new InMemoryRefreshTokenRepository(),
  };

  return repositories[type];
}
