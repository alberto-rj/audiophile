import {
  DrizzleRefreshTokenRepository,
  InMemoryRefreshTokenRepository,
  type RefreshTokenRepository,
} from '@/repositories';

type RefreshTokenRepositoryType = 'pg' | 'in-memory';

export function makeRefreshTokenRepository(
  type: RefreshTokenRepositoryType = 'pg',
) {
  const repositories: Record<
    RefreshTokenRepositoryType,
    RefreshTokenRepository
  > = {
    'in-memory': new InMemoryRefreshTokenRepository(),
    pg: new DrizzleRefreshTokenRepository(),
  };

  return repositories[type];
}
