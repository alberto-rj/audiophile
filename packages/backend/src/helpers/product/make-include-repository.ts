import {
  DrizzleIncludeRepository,
  InMemoryIncludeRepository,
  type IncludeRepository,
} from '@/repositories';

type IncludeRepositoryType = 'drizzle' | 'in-memory';

export function makeIncludeRepository(type: IncludeRepositoryType = 'drizzle') {
  const repositories: Record<IncludeRepositoryType, IncludeRepository> = {
    'in-memory': new InMemoryIncludeRepository(),
    drizzle: new DrizzleIncludeRepository(),
  };

  return repositories[type];
}
