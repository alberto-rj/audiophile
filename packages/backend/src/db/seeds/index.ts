import { makeCartSeeder } from '@/helpers/cart';
import { makeCategorySeeder } from '@/helpers/category';
import { logger } from '@/helpers/logger';
import { makeOrderSeeder } from '@/helpers/order';
import {
  makeGallerySeeder,
  makeIncludeSeeder,
  makeProductSeeder,
  makeSuggestionSeeder,
} from '@/helpers/product';
import { makeUserSeeder } from '@/helpers/user';

import {
  gallerySeeds,
  includeSeeds,
  productSeeds,
  suggestionSeeds,
} from './product';
import { orderSeeds } from './order';
import { userSeeds } from './user';
import { cartSeeds } from './cart';
import { categorySeeds } from './category';

async function main() {
  const { seeder: orderSeeder, orderRepository } = makeOrderSeeder();
  const { seeder: cartSeeder, cartRepository } = makeCartSeeder();
  const { seeder: gallerySeeder, galleryRepository } = makeGallerySeeder();
  const { seeder: includeSeeder, includeRepository } = makeIncludeSeeder();
  const { seeder: suggestionSeeder, suggestionRepository } =
    makeSuggestionSeeder();
  const { seeder: categorySeeder, categoryRepository } = makeCategorySeeder();
  const { seeder: userSeeder, userRepository } = makeUserSeeder();
  const { seeder: productSeeder, productRepository } = makeProductSeeder();

  try {
    await Promise.all([
      orderRepository.clear(),
      cartRepository.clear(),
      galleryRepository.clear(),
      includeRepository.clear(),
      suggestionRepository.clear(),
    ]);
    await productRepository.clear();
    await categoryRepository.clear();
    await userRepository.clear();

    const [createdUsers, createdCategories] = await Promise.all([
      userSeeder.safeRun({ users: userSeeds }),
      categorySeeder.safeRun({
        categories: categorySeeds,
      }),
    ]);

    const createdProducts = await productSeeder.safeRun({
      products: productSeeds,
      categories: createdCategories,
    });

    await Promise.all([
      gallerySeeder.safeRun({
        galleries: gallerySeeds,
        products: createdProducts,
      }),
      includeSeeder.safeRun({
        includes: includeSeeds,
        products: createdProducts,
      }),
      suggestionSeeder.safeRun({
        suggestions: suggestionSeeds,
        products: createdProducts,
      }),
      cartSeeder.safeRun({
        carts: cartSeeds,
        users: createdUsers,
      }),
      orderSeeder.safeRun({
        orders: orderSeeds,
        products: createdProducts,
        users: createdUsers,
      }),
    ]);

    logger.info('All entities successfully seeded.');
    process.exit(0);
  } catch (error) {
    logger.error('Seed failed.', error);
    process.exit(1);
  }
}

void main();
