import type { z } from '@/config';

import { CartItemDetailedSchema, CartItemSchema } from './cart-item.schema';

export type CartItem = z.infer<typeof CartItemSchema>;

export type CartItemDetailed = z.infer<typeof CartItemDetailedSchema>;
