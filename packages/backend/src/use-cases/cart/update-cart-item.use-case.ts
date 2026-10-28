import type { CartDetailed } from '@audiophile/shared';

import { InternalServerError } from '@/helpers/app-error';
import { toCartUpdateItemInput, InvalidCartError } from '@/helpers/cart';
import type { CartRepository } from '@/repositories/types';

type UpdateCartItemUseCaseParams = {
  input: unknown;
};

type UpdateCartItemUseCaseResult = {
  output: CartDetailed;
};

export class UpdateCartItemUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute({
    input,
  }: UpdateCartItemUseCaseParams): Promise<UpdateCartItemUseCaseResult> {
    const { itemId, userId, quantity } = toCartUpdateItemInput(input);

    const foundCart = await this.cartRepository.findByUserId({ userId });

    if (!foundCart) {
      throw new InvalidCartError('Cart is required to update an item.');
    }

    const updatedCart = await this.cartRepository.update({
      itemId,
      cartId: foundCart.id,
      quantity,
    });

    if (!updatedCart) {
      throw new InternalServerError('Failed to update cart item.');
    }

    return {
      output: updatedCart,
    };
  }
}
