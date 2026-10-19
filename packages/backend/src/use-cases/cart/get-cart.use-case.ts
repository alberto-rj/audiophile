import type { CartDetailed } from '@audiophile/shared';

import { cartRepository } from '@/config';
import { ResourceNotFoundError, toCartUserIdInput } from '@/helpers';

type GetCartUseCaseParams = {
  input: unknown;
};

type RemoveCartUseCaseResult = {
  output: CartDetailed;
};

export async function getCartUseCase({
  input,
}: GetCartUseCaseParams): Promise<RemoveCartUseCaseResult> {
  const { userId } = toCartUserIdInput(input);

  const foundCart = await cartRepository.findByUserId({
    userId,
  });

  if (!foundCart) {
    throw new ResourceNotFoundError('Cart not found.');
  }

  return {
    output: foundCart,
  };
}
