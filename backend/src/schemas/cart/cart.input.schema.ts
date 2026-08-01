import { z } from '@/config';

import { ProductIdSchema } from '../product/product.base.schema';
import { UserIdSchema } from '../user/user.schema';
import {
  CartItemIdSchema,
  CartItemQuantitySchema,
} from './cart-item.base.schema';
import { CartIdSchema } from './cart.base.schema';

export const CartFindManyItemsInputSchema = z.object({
  cartId: CartIdSchema,
});

export const CartAddItemInputSchema = z.object({
  userId: UserIdSchema,
  productId: ProductIdSchema,
  quantity: CartItemQuantitySchema,
});

export const CartFindInputSchema = z.object({
  cartId: CartIdSchema,
});

export const CartFindOrCreateByUserIdInputSchema = z.object({
  userId: UserIdSchema,
});

export const CartUpdateItemInputSchema = z.object({
  itemId: CartItemIdSchema,
  quantity: CartItemQuantitySchema,
});

export const CartRemoveItemInputSchema = z.object({
  itemId: CartItemIdSchema,
});

export const CartRemoveAllInputSchema = z.object({
  userId: UserIdSchema,
});

export const CartGetInputSchema = z.object({
  userId: UserIdSchema,
});
