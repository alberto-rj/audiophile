import {
  AddCartItemUseCase,
  GetCartUseCase,
  RemoveCartItemsUseCase,
  RemoveCartItemUseCase,
  UpdateCartItemUseCase,
} from '@/use-cases/cart';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';
import { makeProductRepository } from '../product';

import { makeCartRepository } from './cart.repository.helper';

export function makeAddCartItemUseCase(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const cartRepository = makeCartRepository(type);
  const productRepository = makeProductRepository(type);

  return {
    cartRepository,
    productRepository,
    useCase: new AddCartItemUseCase(cartRepository, productRepository),
  };
}

export function makeUpdateCartItemUseCase(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    useCase: new UpdateCartItemUseCase(cartRepository),
  };
}

export function makeRemoveCartItemUseCase(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    useCase: new RemoveCartItemUseCase(cartRepository),
  };
}

export function makeRemoveCartItemsUseCase(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    useCase: new RemoveCartItemsUseCase(cartRepository),
  };
}

export function makeGetCartUseCase(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const cartRepository = makeCartRepository(type);

  return {
    cartRepository,
    useCase: new GetCartUseCase(cartRepository),
  };
}
