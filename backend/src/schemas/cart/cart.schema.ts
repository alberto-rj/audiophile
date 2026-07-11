import { z } from '@/config';

import {
  CartGrandTotalSchema,
  CartIdSchema,
  CartShippingSchema,
  CartSubtotalSchema,
  CartVatSchema,
} from './cart.base.schema';
import { UserIdSchema } from '../user/user.schema';
import { CartItemDetailedSchema } from './cart-item.schema';

export const CartSchema = z.object({
  id: CartIdSchema,
  userId: UserIdSchema,
});

export const CartDetailedSchema = z.object({
  id: CartIdSchema,
  userId: UserIdSchema,
  subtotal: CartSubtotalSchema,
  grandTotal: CartGrandTotalSchema,
  vat: CartVatSchema,
  shipping: CartShippingSchema,
  items: z.array(CartItemDetailedSchema),
});
