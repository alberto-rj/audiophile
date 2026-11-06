import { CartSeeder } from '@/db/seeds/cart';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

import { makeCartRepository } from './cart.repository.helper';

export function makeCartSeeder(type: RepositoryType = DEFAULT_REPOSITORY_TYPE) {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    seeder: new CartSeeder(cartRepository),
  };
}
