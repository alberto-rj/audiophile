import { z } from '@/config';

import type {
  ApiOrderCreateBodySchema,
  ApiOrderSchema,
  ApiOrderIdParamsSchema,
  ApiOrderItemSchema,
} from './order.api.schema';

export type ApiOrderIdParams = z.infer<typeof ApiOrderIdParamsSchema>;

export type ApiOrderCreateBody = z.infer<typeof ApiOrderCreateBodySchema>;

export type ApiOrderItem = z.infer<typeof ApiOrderItemSchema>;

export type ApiOrder = z.infer<typeof ApiOrderSchema>;
