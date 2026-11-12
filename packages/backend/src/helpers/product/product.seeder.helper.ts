import { categorySeeds } from '@/db/seeds/category';
import {
  gallerySeeds,
  includeSeeds,
  ProductSeeder,
  productSeeds,
} from '@/db/seeds/product';

import { makeCategorySeeder } from '../category';
import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

import { makeProductRepository } from './product.repository.helper';
import { makeIncludeSeeder } from './include.seeder.helper';
import { makeGallerySeeder } from './gallery.seeder.helper';

export function makeProductSeeder(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const productRepository = makeProductRepository(type);

  return {
    productRepository,
    seeder: new ProductSeeder(productRepository),
  };
}

export async function seedProducts(repositoryType: RepositoryType) {
  const { seeder: categorySeeder } = makeCategorySeeder(repositoryType);
  const { seeder: productSeeder } = makeProductSeeder(repositoryType);
  const { seeder: includeSeeder } = makeIncludeSeeder(repositoryType);
  const { seeder: gallerySeeder } = makeGallerySeeder(repositoryType);

  const createdCategories = await categorySeeder.run({
    categories: categorySeeds,
  });

  const persistedProducts = await productSeeder.run({
    products: productSeeds,
    categories: createdCategories,
  });

  await Promise.all([
    gallerySeeder.run({ galleries: gallerySeeds, products: persistedProducts }),
    includeSeeder.run({ includes: includeSeeds, products: persistedProducts }),
  ]);

  return {
    products: persistedProducts,
  };
}
