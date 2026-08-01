import type {
  Cart,
  CartAddItemParams,
  CartItem,
  CartItemDetailed,
} from '@/schemas';

import { makeId } from '../make-id';

type MakeCartParams = Pick<Cart, 'userId'>;

type MakeCartItemParams = Pick<CartItem, 'cartId'>;

export function makeCart({ userId }: MakeCartParams): Cart {
  return {
    id: makeId(),
    userId,
  };
}

export function makeCartItem({ cartId }: MakeCartItemParams): CartItem {
  return {
    id: makeId(),
    cartId: cartId,
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
