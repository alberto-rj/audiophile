import { categoryRepository } from '@/config';
import { categories } from '@/db/mocks';
import { logger, toSlug } from '@/helpers';

async function createCategories() {
  await categoryRepository.clear();
  const newParams = categories.map(({ name, description, image }) => ({
    name,
    description,
    image,
    slug: toSlug(name),
  }));
  const createdCategories = await categoryRepository.createMany(newParams);
  return createdCategories;
}

export async function seedCategories() {
  try {
    logger.info('Seeding "categories"...');
    const createdCategories = await createCategories();
    logger.info('"categories" was successfully seeded.');
    return createdCategories;
  } catch (error) {
    logger.error('Failed to seed "categories".', error);
    process.exit(1);
  }
}
