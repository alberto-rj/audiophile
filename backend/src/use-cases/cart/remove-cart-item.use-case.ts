import { cartRepository } from '@/config';
import { InternalServerError, toCartRemoveItemInput } from '@/helpers';
import type { CartDetailed } from '@/schemas';

type RemoveCartItemUseCaseParams = {
  input: unknown;
};

type RemoveCartItemUseCaseResult = {
  item: CartDetailed;
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
    item: updatedCart,
  };
}
