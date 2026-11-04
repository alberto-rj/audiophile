import type { CartCreateParams, User } from '@audiophile/shared';

import { cartRepository } from '@/config/repositories';
import { type Cart } from '@/db/mocks';
import { logger } from '@/helpers/logger';

type RunParams = {
  carts: Cart[];
  users: User[];
};

type ToCreateParams = {
  cart: Cart;
  users: User[];
};

/**
 * @deprecated
 */
function toCreateParams({ cart, users }: ToCreateParams): CartCreateParams {
  const foundUser = users.find((user) => user.email === cart.user);

  if (!foundUser) {
    throw new Error(`Cannot find user with email "${cart.user}" for cart.`);
  }

  return {
    userId: foundUser.id,
  };
}

/**
 * @deprecated
 */
export async function createCarts({ carts, users }: RunParams) {
  const paramsList = carts.map((cart) => toCreateParams({ cart, users }));

  const createdCarts = await cartRepository.createMany(paramsList);

  return createdCarts;
}

/**
 * @deprecated
 */
export async function seedCarts({ carts, users }: RunParams) {
  try {
    logger.info('Seeding "carts"...');
    const createdCarts = await createCarts({ carts, users });
    logger.info('"carts" was successfully seeded.');
    return createdCarts;
  } catch (error) {
    logger.error('Failed to seed "carts".', error);
    process.exit(1);
  }
}
