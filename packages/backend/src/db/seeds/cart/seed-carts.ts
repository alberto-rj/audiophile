import type { CartCreateParams, User } from '@audiophile/shared';

import { cartRepository } from '@/config';
import { type Cart } from '@/db/mocks';
import { logger } from '@/helpers';

type CreateCartsParams = {
  carts: Cart[];
  users: User[];
};

type ToCreateCartParams = {
  cart: Cart;
  users: User[];
};

function toCartCreateParams({
  cart,
  users,
}: ToCreateCartParams): CartCreateParams {
  const foundUser = users.find((user) => user.email === cart.user);

  if (!foundUser) {
    throw new Error(`Cannot find user with email "${cart.user}" for cart.`);
  }

  return {
    userId: foundUser.id,
  };
}

export async function createCarts({ carts, users }: CreateCartsParams) {
  const paramsList = carts.map((cart) => toCartCreateParams({ cart, users }));

  const createdCarts = await cartRepository.createMany(paramsList);

  return createdCarts;
}

export async function seedCarts({ carts, users }: CreateCartsParams) {
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
