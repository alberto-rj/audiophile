import type { CartDetailed } from '@audiophile/shared';

import { cartRepository } from '@/config';
import {
  InternalServerError,
  InvalidCartError,
  toCartRemoveItemInput,
} from '@/helpers';

type RemoveCartItemUseCaseParams = {
  input: unknown;
};

type RemoveCartItemUseCaseResult = {
  output: CartDetailed;
};

export async function removeCartItemUseCase({
  input,
}: RemoveCartItemUseCaseParams): Promise<RemoveCartItemUseCaseResult> {
  const { itemId, userId } = toCartRemoveItemInput(input);

  const foundCart = await cartRepository.findByUserId({ userId });

  if (!foundCart) {
    throw new InvalidCartError('Cart is required to delete an item.');
  }

  const updatedCart = await cartRepository.remove({
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
