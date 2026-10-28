import type { CartDetailed } from '@audiophile/shared';

import { InternalServerError } from '@/helpers/app-error';
import { toCartRemoveItemInput, InvalidCartError } from '@/helpers/cart';
import type { CartRepository } from '@/repositories/types';

type RemoveCartItemUseCaseParams = {
  input: unknown;
};

type RemoveCartItemUseCaseResult = {
  output: CartDetailed;
};

export class RemoveCartItemUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute({
    input,
  }: RemoveCartItemUseCaseParams): Promise<RemoveCartItemUseCaseResult> {
    const { itemId, userId } = toCartRemoveItemInput(input);

    const foundCart = await this.cartRepository.findByUserId({ userId });

    if (!foundCart) {
      throw new InvalidCartError('Cart is required to delete an item.');
    }

    const updatedCart = await this.cartRepository.remove({
      itemId,
      cartId: foundCart.id,
    });

    if (!updatedCart) {
      throw new InternalServerError('Failed to delete cart item.');
    }

    return {
      output: updatedCart,
    };
  }
}
