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
  items: true,
})
  .extend({
    userId: UserIdSchema,
  })
  .refine(({ items }) => items.length == 0, {
    error: 'items cannot be empty.',
    path: ['items'],
  });

export const OrderFindInputSchema = z.object({
  id: OrderIdSchema,
  userId: UserIdSchema,
});

export const OrderFindManyInputSchema = OrderFindManyParamsSchema.extend({});
