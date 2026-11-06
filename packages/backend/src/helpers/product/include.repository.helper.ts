import { DrizzleIncludeRepository } from '@/repositories/drizzle';
import { InMemoryIncludeRepository } from '@/repositories/in-memory';
import type { IncludeRepository } from '@/repositories/types';

import { DEFAULT_REPOSITORY_TYPE } from '../common';

type IncludeRepositoryType = 'drizzle' | 'in-memory';

export function makeIncludeRepository(
  type: IncludeRepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const repositories: Record<IncludeRepositoryType, IncludeRepository> = {
    drizzle: new DrizzleIncludeRepository(),
    'in-memory': new InMemoryIncludeRepository(),
  };

  return repositories[type];
}
