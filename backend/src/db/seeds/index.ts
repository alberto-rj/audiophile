import {
  categoryRepository,
  galleryRepository,
  includeRepository,
  orderRepository,
  suggestionRepository,
  productRepository,
  userRepository,
} from '@/config';
import {
  categories,
  galleries,
  includes,
  orders,
  suggestions,
  products,
  users,
} from '@/db/mocks';
import { logger } from '@/helpers';

import { seedCategories } from './category/seed-categories';
import { seedOrders } from './order/seed-orders';
import { seedProducts } from './product/seed-products';
import { seedSuggestions } from './product/seed-suggestions';
import { seedUsers } from './user/seed-users';

async function main() {
  try {
    await Promise.all([
      orderRepository.clear(),
      galleryRepository.clear(),
      includeRepository.clear(),
      suggestionRepository.clear(),
    ]);
    await productRepository.clear();
    await categoryRepository.clear();
    await userRepository.clear();

    const createdCategories = await seedCategories({ categories });

    const createdProducts = await seedProducts({
      categories: createdCategories,
      galleries,
      includes,
      products,
    });

    await seedSuggestions({
      suggestions,
      products: createdProducts,
    });

    const createdUsers = await seedUsers({ users });

    await seedOrders({
      orders,
      products: createdProducts,
      users: createdUsers,
    });

    logger.info('All entities successfully seeded.');
    process.exit(0);
  } catch (error) {
    logger.error('Seed failed.', error);
    process.exit(1);
  }
}

main();
