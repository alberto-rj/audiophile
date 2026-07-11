import { z } from '@/config';

import { CartIdSchema } from './cart.base.schema';
import {
  CartItemIdSchema,
  CartItemQuantitySchema,
} from './cart-item.base.schema';
import {
  ProductIdSchema,
  ProductImageSchema,
  ProductPriceSchema,
} from '../product/product.base.schema';

export const CartItemSchema = z.object({
  id: CartItemIdSchema,
  cartId: CartIdSchema,
});

export const CartItemDetailedSchema = z.object({
  id: CartItemIdSchema,
  quantity: CartItemQuantitySchema,
  productId: ProductIdSchema,
  price: ProductPriceSchema,
  slug: ProductPriceSchema,
  image: ProductImageSchema,
});
