import { z } from '@/config';

import type {
  OrderCreateParamsSchema,
  OrderFindManyParamsSchema,
  OrderFindByIdParamsSchema,
  OrderIdParamsSchema,
} from './order.params.schema';

export type OrderCreateParams = z.infer<typeof OrderCreateParamsSchema>;

export type OrderIdParams = z.infer<typeof OrderIdParamsSchema>;

export type OrderFindByIdParams = z.infer<typeof OrderFindByIdParamsSchema>;

export type OrderFindManyParams = z.infer<typeof OrderFindManyParamsSchema>;
