import { categoryRepository } from '@/config';
import { categories } from '@/db/mocks';
import { logger, toSlug } from '@/helpers';

export async function seedCategories() {
  try {
    logger.info('Seeding "categories"...');
    await categoryRepository.clear();
    const newParams = categories.map(({ name, description, image }) => ({
      name,
      description,
      image,
      slug: toSlug(name),
    }));
    await categoryRepository.createMany(newParams);
    logger.info('"categories" was successfully seeded.');
    process.exit(0);
  } catch (error) {
    logger.error('Failed to seed "categories".', error);
    process.exit(1);
  }
}
