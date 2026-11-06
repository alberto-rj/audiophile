import { CategorySeeder } from '@/db/seeds/category';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

import { makeCategoryRepository } from './category.repository.helper';

export function makeCategorySeeder(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const categoryRepository = makeCategoryRepository(type);

  return {
    seeder: new CategorySeeder(categoryRepository),
    categoryRepository,
  };
}
