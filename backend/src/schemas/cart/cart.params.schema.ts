import { z } from '@/config';

import { ProductIdSchema } from '../product/product.base.schema';
import {
  CartItemIdSchema,
  CartItemQuantitySchema,
} from './cart-item.base.schema';
import { CartIdSchema } from './cart.base.schema';

export const CartFindManyItemsParamsSchema = z.object({
  cartId: CartIdSchema,
});

export const CartAddItemParamsSchema = z.object({
  cartId: CartIdSchema,
  productId: ProductIdSchema,
  quantity: CartItemQuantitySchema,
});

export const CartFindParamsSchema = z.object({
  cartId: CartIdSchema,
});

export const CartUpdateItemParamsSchema = z.object({
  itemId: CartItemIdSchema,
  quantity: CartItemQuantitySchema,
});

export const CartRemoveItemParamsSchema = z.object({
  itemId: CartItemIdSchema,
});

export const CartRemoveAllParamsSchema = z.object({
  cartId: CartIdSchema,
});
