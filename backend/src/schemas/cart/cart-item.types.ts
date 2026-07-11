import type { z } from '@/config';

import {
  CartItemIdSchema,
  CartItemQuantitySchema,
} from './cart-item.base.schema';
import { CartItemDetailedSchema, CartItemSchema } from './cart-item.schema';

export type CartItem = z.infer<typeof CartItemSchema>;

export type CartItemDetailed = z.infer<typeof CartItemDetailedSchema>;

export type CartItemId = z.infer<typeof CartItemIdSchema>;

export type CartItemQuantity = z.infer<typeof CartItemQuantitySchema>;
