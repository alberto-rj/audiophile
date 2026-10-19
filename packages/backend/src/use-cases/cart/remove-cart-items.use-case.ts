import type { CartDetailed } from '@audiophile/shared';

import { cartRepository } from '@/config';
import {
  InternalServerError,
  InvalidCartError,
  toCartRemoveAllInput,
} from '@/helpers';

type RemoveCartItemsUseCaseParams = {
  input: unknown;
};

type RemoveCartItemsUseCaseResult = {
  output: CartDetailed;
};

export async function removeCartItemsUseCase({
  input,
}: RemoveCartItemsUseCaseParams): Promise<RemoveCartItemsUseCaseResult> {
  const { userId } = toCartRemoveAllInput(input);

  const foundCart = await cartRepository.findByUserId({ userId });

  if (!foundCart) {
    throw new InvalidCartError('Cart is required to delete items.');
  }

  const emptyCart = await cartRepository.removeAll({
    cartId: foundCart.id,
  });

  if (!emptyCart) {
    throw new InternalServerError('Failed to clear cart.');
  }

  return {
    output: emptyCart,
  };
}
