import { DrizzleCategoryRepository } from '@/repositories/drizzle';
import { InMemoryCategoryRepository } from '@/repositories/in-memory';
import type { CategoryRepository } from '@/repositories/types';

type CategoryRepositoryType = 'drizzle' | 'in-memory';

export function makeCategoryRepository(
  type: CategoryRepositoryType = 'drizzle',
) {
  const repositories: Record<CategoryRepositoryType, CategoryRepository> = {
    drizzle: new DrizzleCategoryRepository(),
    'in-memory': new InMemoryCategoryRepository(),
  };

  return repositories[type];
}
