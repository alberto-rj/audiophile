import type {
  Cart,
  CartAddItemParams,
  CartItem,
  CartItemDetailed,
} from '@/schemas';

import { makeId } from '../make-id';

export function makeCart(params: CartAddItemParams): Cart {
  const userId = makeId();

  return {
    id: params.cartId,
    userId,
  };
}

export function makeCartItem(params: CartAddItemParams): CartItem {
  return {
    id: makeId(),
    cartId: params.cartId,
  };
}

export function makeCartItemDetailed(
  params: CartAddItemParams,
): CartItemDetailed {
  return {
    id: makeId(),
    cartId: params.cartId,
    productId: params.productId,
    quantity: params.quantity,
    image: 'image',
    name: 'name',
    slug: 'slug',
    price: 0,
  };
}
