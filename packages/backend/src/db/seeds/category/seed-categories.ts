import { toSlug } from '@audiophile/shared';

import { categoryRepository } from '@/config/repositories';
import { type Category } from '@/db/mocks';
import { logger } from '@/helpers/logger';

type CreateCategoriesParams = {
  categories: Category[];
};

export async function createCategories({ categories }: CreateCategoriesParams) {
  const newParamsList = categories.map(({ name, description, image }) => ({
    slug: toSlug(name),
    name,
    description,
    image,
  }));

  const createdCategories = await categoryRepository.createMany(newParamsList);

  return createdCategories;
}

export async function seedCategories({ categories }: CreateCategoriesParams) {
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
