import {
  InMemoryRefreshTokenRepository,
  type RefreshTokenRepository,
} from '@/repositories';

type RefreshTokenRepositoryType = 'pg' | 'in-memory' | 'default';

export function makeRefreshTokenRepository(
  type: RefreshTokenRepositoryType = 'default',
) {
  const repositories: Record<
    RefreshTokenRepositoryType,
    RefreshTokenRepository
  > = {
    'in-memory': new InMemoryRefreshTokenRepository(),
    pg: new InMemoryRefreshTokenRepository(),
    default: new InMemoryRefreshTokenRepository(),
  };

  return repositories[type];
}
