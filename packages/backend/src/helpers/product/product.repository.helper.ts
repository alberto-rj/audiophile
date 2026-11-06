import { DrizzleProductRepository } from '@/repositories/drizzle';
import { InMemoryProductRepository } from '@/repositories/in-memory';
import type { ProductRepository } from '@/repositories/types';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

export function makeProductRepository(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const repositories: Record<RepositoryType, ProductRepository> = {
    drizzle: new DrizzleProductRepository(),
    'in-memory': new InMemoryProductRepository(),
  };

  return repositories[type];
}
