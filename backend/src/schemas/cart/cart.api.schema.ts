import { z } from '@/config';

import {
  CartGrandTotalSchema,
  CartIdSchema,
  CartShippingSchema,
  CartSubtotalSchema,
  CartVatSchema,
} from './cart.base.schema';
import { LimitSchema, PageSchema } from '../common/common.schema';
import { ProductIdSchema } from '../product/product.base.schema';
import { CartItemQuantitySchema } from './cart-item.base.schema';
import { ApiCartItemSchema } from './cart-item.api.schema';

export const ApiCartSchema = z.object({
  id: CartIdSchema,
  subtotal: CartSubtotalSchema,
  shipping: CartShippingSchema,
  grandTotal: CartGrandTotalSchema,
  vat: CartVatSchema,
  items: z.array(ApiCartItemSchema),
});

export const ApiCartAddItemBodySchema = z.object({
  productId: ProductIdSchema,
  quantity: CartItemQuantitySchema,
});

export const ApiCartUpdateItemBodySchema = z.object({
  quantity: CartItemQuantitySchema,
});

export const ApiCartPaginationQuerySchema = z.object({
  page: PageSchema,
  limit: LimitSchema,
});

export const ApiCartIdParamsSchema = z.object({
  id: CartIdSchema,
});
