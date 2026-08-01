import { cartRepository, productRepository } from '@/config';
import {
  InternalServerError,
  ResourceNotFoundError,
  toCartAddItemInput,
} from '@/helpers';
import type { CartDetailed } from '@/schemas';

type AddCartItemUseCaseParams = {
  input: unknown;
};

type AddCartItemUseCaseResult = {
  item: CartDetailed;
};

export async function addCartItemUseCase({
  input,
}: AddCartItemUseCaseParams): Promise<AddCartItemUseCaseResult> {
  const { userId, productId, quantity } = toCartAddItemInput(input);

  const foundProduct = await productRepository.findById({ id: productId });

  if (!foundProduct) {
    throw new ResourceNotFoundError('Product not found.');
  }

  const foundCart = await cartRepository.findOrCreateByUserId({ userId });

  const updatedCart = await cartRepository.add({
    cartId: foundCart.id,
    productId,
    quantity,
  });

  if (!updatedCart) {
    throw new InternalServerError('Failed to add item to cart.');
  }

  return {
    item: updatedCart,
  };
}
