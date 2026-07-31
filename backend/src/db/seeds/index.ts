import {
  categoryRepository,
  galleryRepository,
  includeRepository,
  otherProductRepository,
  productRepository,
  userRepository,
} from '@/config';
import {
  categories,
  galleries,
  includes,
  otherProducts,
  products,
  users,
} from '@/db/mocks';

import { seedCategories } from './category/seed-categories';
import { seedProducts } from './product/seed-product';
import { seedOtherProducts } from './product/seed-other-product';
import { seedUsers } from './user/seed-users';

async function main() {
  try {
    await Promise.all([
      galleryRepository.clear(),
      includeRepository.clear(),
      otherProductRepository.clear(),
    ]);
    await productRepository.clear();
    await categoryRepository.clear();
    userRepository.clear();

    const createdCategories = await seedCategories({ categories });

    const createdProducts = await seedProducts({
      categories: createdCategories,
      galleries,
      includes,
      products,
    });

    await seedOtherProducts({
      otherProducts,
      products: createdProducts,
    });

    await seedUsers({ users });

    process.exit(0);
  } catch {
    process.exit(1);
  }
}

main();
