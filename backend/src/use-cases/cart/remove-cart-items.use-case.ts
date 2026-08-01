import { cartRepository } from '@/config';
import { InternalServerError, toCartRemoveAllInput } from '@/helpers';
import type { CartDetailed } from '@/schemas';

type RemoveCartItemsUseCaseParams = {
  input: unknown;
};

type RemoveCartItemsUseCaseResult = {
  item: CartDetailed;
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
    item: updatedCart,
  };
}
