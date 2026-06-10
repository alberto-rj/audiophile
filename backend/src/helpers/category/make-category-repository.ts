import {
  InMemoryCategoryRepository,
  type CategoryRepository,
} from '@/repositories';

type CategoryRepositoryType = 'pg' | 'in-memory' | 'default';

export function makeCategoryRepository(
  type: CategoryRepositoryType = 'default',
) {
  const repositories: Record<CategoryRepositoryType, CategoryRepository> = {
    'in-memory': new InMemoryCategoryRepository(),
    pg: new InMemoryCategoryRepository(),
    default: new InMemoryCategoryRepository(),
  };

  return repositories[type];
}
