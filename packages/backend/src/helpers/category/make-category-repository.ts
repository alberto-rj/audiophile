import {
  DrizzleCategoryRepository,
  InMemoryCategoryRepository,
  type CategoryRepository,
} from '@/repositories';

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
