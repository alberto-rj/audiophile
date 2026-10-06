import { z } from '@/config';

import type {
  OrderCreateInputSchema,
  OrderFindInputSchema,
  OrderFindManyInputSchema,
} from './order.input.schema';

export type OrderCreateInput = z.infer<typeof OrderCreateInputSchema>;

export type OrderFindInput = z.infer<typeof OrderFindInputSchema>;

export type OrderFindManyInput = z.infer<typeof OrderFindManyInputSchema>;
