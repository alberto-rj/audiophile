import { z } from '@/config';

import { OrderIdSchema } from './order.base.schema';
import { OrderCreateParamsSchema } from './order.params.schema';
import { UserIdSchema } from '../user/user.schema';

export const OrderCreateInputSchema = OrderCreateParamsSchema.extend({
  userId: UserIdSchema,
});

export const OrderFindInputSchema = z.object({
  id: OrderIdSchema,
  userId: UserIdSchema,
});

export const OrderFindManyInputSchema = z.object({
  userId: UserIdSchema,
});
