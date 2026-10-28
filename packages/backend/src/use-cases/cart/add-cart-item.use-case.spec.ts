import { afterEach, beforeEach, describe, it } from 'vitest';

import { makeAddCartItemUseCase } from '@/helpers/cart';
import type { CartRepository, ProductRepository } from '@/repositories/types';

describe('[use case] cart / add item', () => {
  let cartRepo: CartRepository;
  let productRepo: ProductRepository;

  beforeEach(() => {
    const { cartRepository, productRepository } =
      makeAddCartItemUseCase('in-memory');
    cartRepo = cartRepository;
    productRepo = productRepository;
  });

  afterEach(async () => {
    await Promise.all([cartRepo.clear(), productRepo.clear()]);
  });

  it.todo('should add a cart item successfully', async () => {});

  it.todo(
    'should increase the quantity when an item is already in the cart',
    async () => {},
  );

  it.todo(
    'should reject adding an item when the cart does not exist',
    async () => {},
  );

  it.todo(
    'should reject adding an item when the product does not exist',
    async () => {},
  );
});
