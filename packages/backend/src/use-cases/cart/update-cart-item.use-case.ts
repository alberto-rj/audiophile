import type { CartDetailed } from '@audiophile/shared';

import { cartRepository } from '@/config/repositories';
import { InternalServerError } from '@/helpers/app-error';
import { toCartUpdateItemInput, InvalidCartError } from '@/helpers/cart';

type UpdateCartItemUseCaseParams = {
  input: unknown;
};

type UpdateCartItemUseCaseResult = {
  output: CartDetailed;
};

export async function updateCartItemUseCase({
  input,
}: UpdateCartItemUseCaseParams): Promise<UpdateCartItemUseCaseResult> {
  const { itemId, userId, quantity } = toCartUpdateItemInput(input);

  const foundCart = await cartRepository.findByUserId({ userId });

  if (!foundCart) {
    throw new InvalidCartError('Cart is required to update an item.');
  }

  const updatedCart = await cartRepository.update({
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
