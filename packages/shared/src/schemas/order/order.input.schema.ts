import { z } from '@/config';

import { UserIdSchema } from '../user/user.base.schema';

import { OrderIdSchema } from './order.base.schema';
import {
  OrderCreateParamsSchema,
  OrderFindManyParamsSchema,
} from './order.params.schema';

export const OrderCreateInputSchema = OrderCreateParamsSchema.pick({
  name: true,
  email: true,
  address: true,
  zip: true,
  city: true,
  country: true,
  paymentMethod: true,
}).extend({
  userId: UserIdSchema,
});

export const OrderFindInputSchema = z.object({
  id: OrderIdSchema,
  userId: UserIdSchema,
});

export const OrderFindManyInputSchema = OrderFindManyParamsSchema.extend({});
