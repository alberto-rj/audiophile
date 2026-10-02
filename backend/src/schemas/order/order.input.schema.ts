import { z } from '@/config';

import { UserIdSchema } from '../user/user.schema';

import { OrderIdSchema } from './order.base.schema';
import {
  OrderCreateParamsSchema,
  OrderFindManyParamsSchema,
} from './order.params.schema';

export const OrderCreateInputSchema = OrderCreateParamsSchema.extend({
  userId: UserIdSchema,
})
  .refine(({ items }) => items.length == 0, {
    error: 'items cannot be empty.',
    path: ['items'],
  })
  .omit({
    subtotal: true,
    shipping: true,
    vat: true,
    grandTotal: true,
  });

export const OrderFindInputSchema = z.object({
  id: OrderIdSchema,
  userId: UserIdSchema,
});

export const OrderFindManyInputSchema = OrderFindManyParamsSchema.extend({});
