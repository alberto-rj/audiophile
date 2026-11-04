import type { CartCreateParams, CartDetailed, User } from '@audiophile/shared';

import { logger } from '@/helpers/logger';
import type { CartRepository } from '@/repositories/types';

import type { CartSeed } from './cart.seeds';

type RunParams = {
  carts: CartSeed[];
  users: User[];
};

type ToCreateParams = {
  cart: CartSeed;
  users: User[];
};

export class CartSeeder {
  constructor(private cartRepository: CartRepository) {}

  static toCreateParams({ cart, users }: ToCreateParams): CartCreateParams {
    const foundUser = users.find((user) => user.email === cart.user);

    if (!foundUser) {
      throw new Error(`Cannot find user with email "${cart.user}" for cart.`);
    }

    return {
      userId: foundUser.id,
    };
  }

  async run({ carts, users }: RunParams): Promise<CartDetailed[]> {
    const paramsList = carts.map((cart) =>
      CartSeeder.toCreateParams({ cart, users }),
    );

    const createdCarts = await this.cartRepository.createMany(paramsList);

    return createdCarts;
  }

  async safeRun({ carts, users }: RunParams): Promise<CartDetailed[]> {
    try {
      logger.info('Seeding "carts"...');
      const createdCarts = await this.run({ carts, users });
      logger.info('"carts" was successfully seeded.');
      return createdCarts;
    } catch (error) {
      logger.error('Failed to seed "carts".', error);
      process.exit(1);
    }
  }
}
