import type { z } from '@/config';

import { CartDetailedSchema, CartSchema } from './cart.schema';
import { CartIdSchema } from './cart.base.schema';

export type Cart = z.infer<typeof CartSchema>;

export type CartDetailed = z.infer<typeof CartDetailedSchema>;

export type CartId = z.infer<typeof CartIdSchema>;
