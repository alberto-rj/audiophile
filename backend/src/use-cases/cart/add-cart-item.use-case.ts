import type { CartDetailed } from '@audiophile/shared';

import { cartRepository, productRepository } from '@/config';
import {
  InternalServerError,
  InvalidCartError,
  ResourceNotFoundError,
  toCartAddItemInput,
} from '@/helpers';

type AddCartItemUseCaseParams = {
  input: unknown;
};

type AddCartItemUseCaseResult = {
  output: CartDetailed;
};

export async function addCartItemUseCase({
  input,
}: AddCartItemUseCaseParams): Promise<AddCartItemUseCaseResult> {
  const { userId, productId, quantity } = toCartAddItemInput(input);

  const foundCart = await cartRepository.findByUserId({ userId });

  if (!foundCart) {
    throw new InvalidCartError('Cart is required to add an item.');
  }

  const foundProduct = await productRepository.findById({ id: productId });

  if (!foundProduct) {
    throw new ResourceNotFoundError('Product is required to add a cart item.');
  }

  const updatedCart = await cartRepository.add({
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
