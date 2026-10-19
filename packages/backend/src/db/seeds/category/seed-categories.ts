import { categoryRepository } from '@/config';
import { type Categories } from '@/db/mocks';
import { logger, toSlug } from '@/helpers';

type CreateCategoriesParams = {
  categories: Categories;
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
