import {
  InMemoryIncludeRepository,
  type IncludeRepository,
} from '@/repositories';

type IncludeRepositoryType = 'pg' | 'in-memory' | 'default';

export function makeIncludeRepository(type: IncludeRepositoryType = 'default') {
  const repositories: Record<IncludeRepositoryType, IncludeRepository> = {
    'in-memory': new InMemoryIncludeRepository(),
    pg: new InMemoryIncludeRepository(),
    default: new InMemoryIncludeRepository(),
  };

  return repositories[type];
}
