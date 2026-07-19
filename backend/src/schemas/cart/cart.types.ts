import type { z } from '@/config';

import { CartDetailedSchema, CartSchema } from './cart.schema';
import {
  CartGrandTotalSchema,
  CartIdSchema,
  CartShippingSchema,
  CartSubtotalSchema,
  CartVatSchema,
} from './cart.base.schema';

export type Cart = z.infer<typeof CartSchema>;

export type CartDetailed = z.infer<typeof CartDetailedSchema>;

export type CartId = z.infer<typeof CartIdSchema>;

export type CartSubtotal = z.infer<typeof CartSubtotalSchema>;

export type CartShipping = z.infer<typeof CartShippingSchema>;

export type CartVat = z.infer<typeof CartVatSchema>;

export type CartGrandTotal = z.infer<typeof CartGrandTotalSchema>;
