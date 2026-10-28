import type { CartDetailed } from '@audiophile/shared';

import {
  ResourceNotFoundError,
  InternalServerError,
} from '@/helpers/app-error';
import { toCartAddItemInput, InvalidCartError } from '@/helpers/cart';
import type { CartRepository, ProductRepository } from '@/repositories/types';

type AddCartItemUseCaseParams = {
  input: unknown;
};

type AddCartItemUseCaseResult = {
  output: CartDetailed;
};

export class AddCartItemUseCase {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute({
    input,
  }: AddCartItemUseCaseParams): Promise<AddCartItemUseCaseResult> {
    const { userId, productId, quantity } = toCartAddItemInput(input);

    const foundCart = await this.cartRepository.findByUserId({ userId });

    if (!foundCart) {
      throw new InvalidCartError('Cart is required to add an item.');
    }

    const foundProduct = await this.productRepository.findById({
      id: productId,
    });

    if (!foundProduct) {
      throw new ResourceNotFoundError(
        'Product is required to add a cart item.',
      );
    }

    const updatedCart = await this.cartRepository.add({
      cartId: foundCart.id,
      productId,
      quantity,
    });

    if (!updatedCart) {
      throw new InternalServerError('Failed to add item to cart.');
    }

    return {
      output: updatedCart,
    };
  }
}
