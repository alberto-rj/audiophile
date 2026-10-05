import type { z } from '@/config';

import { CartDetailedSchema, CartSchema } from './cart.schema';

export type Cart = z.infer<typeof CartSchema>;

export type CartDetailed = z.infer<typeof CartDetailedSchema>;
