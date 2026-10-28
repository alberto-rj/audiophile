import type { CartDetailed } from '@audiophile/shared';

import { ResourceNotFoundError } from '@/helpers/app-error';
import { toCartUserIdInput } from '@/helpers/cart';
import type { CartRepository } from '@/repositories/types';

type GetCartUseCaseParams = {
  input: unknown;
};

type RemoveCartUseCaseResult = {
  output: CartDetailed;
};

export class GetCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute({
    input,
  }: GetCartUseCaseParams): Promise<RemoveCartUseCaseResult> {
    const { userId } = toCartUserIdInput(input);

    const foundCart = await this.cartRepository.findByUserId({
      userId,
    });

    if (!foundCart) {
      throw new ResourceNotFoundError('Cart not found.');
    }

    return {
      output: foundCart,
    };
  }
}
