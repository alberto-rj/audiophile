import { z } from '@/config';

import { UserIdSchema } from '../user/user.schema';

import { OrderIdSchema } from './order.base.schema';
import { OrderCreateParamsSchema } from './order.params.schema';

export const OrderCreateInputSchema = OrderCreateParamsSchema.extend({
  userId: UserIdSchema,
}).refine(({ items }) => items.length == 0, {
  error: 'items cannot be empty.',
  path: ['items'],
});

export const OrderFindInputSchema = z.object({
  id: OrderIdSchema,
  userId: UserIdSchema,
});

export const OrderFindManyInputSchema = z.object({
  userId: UserIdSchema,
});
