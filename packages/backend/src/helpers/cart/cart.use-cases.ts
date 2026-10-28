import {
  AddCartItemUseCase,
  GetCartUseCase,
  RemoveCartItemsUseCase,
  RemoveCartItemUseCase,
  UpdateCartItemUseCase,
} from '@/use-cases/cart';

import type { RepositoryType } from '../common';
import { makeProductRepository } from '../product';

import { makeCartRepository } from './make-cart-repository';

export function makeAddCartItemUseCase(type: RepositoryType = 'drizzle') {
  const cartRepository = makeCartRepository(type);
  const productRepository = makeProductRepository(type);

  return {
    cartRepository,
    productRepository,
    useCase: new AddCartItemUseCase(cartRepository, productRepository),
  };
}

export function makeUpdateCartItemUseCase(type: RepositoryType = 'drizzle') {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    useCase: new UpdateCartItemUseCase(cartRepository),
  };
}

export function makeRemoveCartItemUseCase(type: RepositoryType = 'drizzle') {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    useCase: new RemoveCartItemUseCase(cartRepository),
  };
}

export function makeRemoveCartItemsUseCase(type: RepositoryType = 'drizzle') {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    useCase: new RemoveCartItemsUseCase(cartRepository),
  };
}

export function makeGetCartUseCase(type: RepositoryType = 'drizzle') {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    useCase: new GetCartUseCase(cartRepository),
  };
}
