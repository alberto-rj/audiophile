import { CartSeeder, cartSeeds } from '@/db/seeds/cart';

import {
  DEFAULT_REPOSITORY_TYPE,
  type RepositoryType,
} from '../common/repository';
import { seedUsers } from '../user/user.seeder.helper';

import { makeCartRepository } from './cart.repository.helper';

export function makeCartSeeder(type: RepositoryType = DEFAULT_REPOSITORY_TYPE) {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    seeder: new CartSeeder(cartRepository),
  };
}

export async function seedCarts(repositoryType: RepositoryType) {
  const { seeder: cartSeeder } = makeCartSeeder(repositoryType);

  const { users } = await seedUsers(repositoryType);

  const persistedCarts = await cartSeeder.run({
    carts: cartSeeds,
    users,
  });

  return {
    carts: persistedCarts,
  };
}
