import { cartRepository } from '@/config';
import { InternalServerError, toCartUpdateItemInput } from '@/helpers';
import type { CartDetailed } from '@/schemas';

type UpdateCartItemUseCaseParams = {
  input: unknown;
};

type UpdateCartItemUseCaseResult = {
  item: CartDetailed;
};

export async function updateCartItemUseCase({
  input,
}: UpdateCartItemUseCaseParams): Promise<UpdateCartItemUseCaseResult> {
  const { itemId, quantity } = toCartUpdateItemInput(input);

  const updatedCart = await cartRepository.update({
    itemId,
    quantity,
  });

  if (!updatedCart) {
    throw new InternalServerError('Failed to update cart item.');
  }

  return {
    item: updatedCart,
  };
}
