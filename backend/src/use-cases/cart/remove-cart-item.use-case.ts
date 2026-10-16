import type { CartDetailed } from '@audiophile/shared';

import { cartRepository } from '@/config';
import { InternalServerError, toCartRemoveItemInput } from '@/helpers';

type RemoveCartItemUseCaseParams = {
  input: unknown;
};

type RemoveCartItemUseCaseResult = {
  output: CartDetailed;
};

export async function removeCartItemUseCase({
  input,
}: RemoveCartItemUseCaseParams): Promise<RemoveCartItemUseCaseResult> {
  const { itemId } = toCartRemoveItemInput(input);

  const updatedCart = await cartRepository.remove({
    itemId,
  });

  if (!updatedCart) {
    throw new InternalServerError('Failed to delete cart item.');
  }

  return {
    output: updatedCart,
  };
}
