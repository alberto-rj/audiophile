import { cartRepository } from '@/config';
import { toCartGetInput } from '@/helpers';
import type { CartDetailed } from '@audiophile/shared';

type GetCartUseCaseParams = {
  input: unknown;
};

type RemoveCartUseCaseResult = {
  item: CartDetailed;
};

export async function getCartUseCase({
  input,
}: GetCartUseCaseParams): Promise<RemoveCartUseCaseResult> {
  const { userId } = toCartGetInput(input);

  const userCart = await cartRepository.findOrCreateByUserId({
    userId,
  });

  return {
    item: userCart,
  };
}
