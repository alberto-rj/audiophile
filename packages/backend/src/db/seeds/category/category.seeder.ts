import {
  toSlug,
  type Category,
  type CategoryCreateParams,
} from '@audiophile/shared';

import { categoryRepository } from '@/config/repositories';
import { logger } from '@/helpers/logger';
import type { CategoryRepository } from '@/repositories/types';

import type { CategorySeed } from './category.seeds';

type RunParams = {
  categories: CategorySeed[];
};

type ToCreateParams = {
  category: CategorySeed;
};

/**
 * @deprecated
 */
export async function createCategories({ categories }: RunParams) {
  const newParamsList = categories.map(({ name, description, image }) => ({
    slug: toSlug(name),
    name,
    description,
    image,
  }));

  const createdCategories = await categoryRepository.createMany(newParamsList);

  return createdCategories;
}

/**
 * @deprecated
 */
export async function seedCategories({ categories }: RunParams) {
  try {
    logger.info('Seeding "categories"...');
    const createdCategories = await createCategories({ categories });
    logger.info('"categories" was successfully seeded.');
    return createdCategories;
  } catch (error) {
    logger.error('Failed to seed "categories".', error);
    process.exit(1);
  }
}

export class CategorySeeder {
  constructor(private categoryRepository: CategoryRepository) {}

  static toCreateParams({
    category: { name, description, image },
  }: ToCreateParams): CategoryCreateParams {
    return {
      slug: toSlug(name),
      name,
      description,
      image,
    };
  }

  async run({ categories }: RunParams): Promise<Category[]> {
    const paramsList = categories.map((category) =>
      CategorySeeder.toCreateParams({ category }),
    );

    const createdCategories =
      await this.categoryRepository.createMany(paramsList);

    return createdCategories;
  }

  async safeRun({ categories }: RunParams): Promise<Category[]> {
    try {
      logger.info('Seeding "categories"...');
      const createdCategories = await this.run({ categories });
      logger.info('"categories" was successfully seeded.');
      return createdCategories;
    } catch (error) {
      logger.error('Failed to seed "categories".', error);
      process.exit(1);
    }
  }
}
