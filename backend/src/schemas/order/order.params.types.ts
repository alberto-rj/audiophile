import { z } from '@/config';

import type {
  OrderCreateParamsSchema,
  OrderFindManyParamsSchema,
  OrderFindByIdParamsSchema,
} from './order.params.schema';

export type OrderCreateParams = z.infer<typeof OrderCreateParamsSchema>;

export type OrderFindByIdParams = z.infer<typeof OrderFindByIdParamsSchema>;

export type OrderFindManyParams = z.infer<typeof OrderFindManyParamsSchema>;
