import { z } from '@/config';

import { ProductIdSchema } from '../product/product.base.schema';
import { UserIdSchema } from '../user/user.base.schema';

import {
  CartItemIdSchema,
  CartItemQuantitySchema,
} from './cart-item.base.schema';
import { CartIdSchema } from './cart.base.schema';

export const CartFindManyItemsParamsSchema = z.object({
  cartId: CartIdSchema,
});

export const CartCreateParamsSchema = z.object({
  userId: UserIdSchema,
});

export const CartAddItemParamsSchema = z.object({
  cartId: CartIdSchema,
  productId: ProductIdSchema,
  quantity: CartItemQuantitySchema,
});

export const CartIdParamsSchema = z.object({
  cartId: CartIdSchema,
});

export const CartUserIdParamsSchema = z.object({
  userId: UserIdSchema,
});

export const CartFindOrCreateByUserIdParamsSchema = z.object({
  userId: UserIdSchema,
});

export const CartUpdateItemParamsSchema = z.object({
  itemId: CartItemIdSchema,
  cartId: CartIdSchema,
  quantity: CartItemQuantitySchema,
});

export const CartRemoveItemParamsSchema = z.object({
  itemId: CartItemIdSchema,
  cartId: CartIdSchema,
});

export const CartRemoveAllParamsSchema = z.object({
  cartId: CartIdSchema,
});
