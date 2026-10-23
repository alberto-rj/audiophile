import { DrizzleIncludeRepository } from '@/repositories/drizzle';
import { InMemoryIncludeRepository } from '@/repositories/in-memory';
import type { IncludeRepository } from '@/repositories/types';

type IncludeRepositoryType = 'drizzle' | 'in-memory';

export function makeIncludeRepository(type: IncludeRepositoryType = 'drizzle') {
  const repositories: Record<IncludeRepositoryType, IncludeRepository> = {
    drizzle: new DrizzleIncludeRepository(),
    'in-memory': new InMemoryIncludeRepository(),
  };

  return repositories[type];
}
