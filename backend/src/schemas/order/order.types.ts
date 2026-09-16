import { z } from '@/config';

import type { OrderItemSchema, OrderSchema } from './order.schema';

export type OrderItem = z.infer<typeof OrderItemSchema>;

export type Order = z.infer<typeof OrderSchema>;
