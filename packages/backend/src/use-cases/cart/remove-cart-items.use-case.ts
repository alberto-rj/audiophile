import type { CartDetailed } from '@audiophile/shared';

import { InternalServerError } from '@/helpers/app-error';
import { InvalidCartError, toCartRemoveAllInput } from '@/helpers/cart';
import type { CartRepository } from '@/repositories/types';

type RemoveCartItemsUseCaseParams = {
  input: unknown;
};

type RemoveCartItemsUseCaseResult = {
  output: CartDetailed;
};

export class RemoveCartItemsUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute({
    input,
  }: RemoveCartItemsUseCaseParams): Promise<RemoveCartItemsUseCaseResult> {
    const { userId } = toCartRemoveAllInput(input);

    const foundCart = await this.cartRepository.findByUserId({ userId });

    if (!foundCart) {
      throw new InvalidCartError('Cart is required to delete items.');
    }

    const emptyCart = await this.cartRepository.removeAll({
      cartId: foundCart.id,
    });

    if (!emptyCart) {
      throw new InternalServerError('Failed to clear cart.');
    }

    return {
      output: emptyCart,
    };
  }
}
