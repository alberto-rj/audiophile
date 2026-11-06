import { ProductSeeder } from '@/db/seeds/product';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

import { makeProductRepository } from './product.repository.helper';

export function makeProductSeeder(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const productRepository = makeProductRepository(type);

  return {
    productRepository,
    seeder: new ProductSeeder(productRepository),
  };
}
