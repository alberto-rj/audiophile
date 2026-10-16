import type { CartDetailed } from '@audiophile/shared';

import { cartRepository } from '@/config';
import { InternalServerError, toCartRemoveAllInput } from '@/helpers';

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

  const { id: cartId } = await cartRepository.findOrCreateByUserId({ userId });

  const updatedCart = await cartRepository.removeAll({
    cartId,
  });

  if (!updatedCart) {
    throw new InternalServerError('Failed to clear cart.');
  }

  return {
    output: updatedCart,
  };
}
