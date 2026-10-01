import { z } from '@/config';

import { ResponsiveImageSchema } from '../common/common.schema';

import {
  OrderCreateParamsSchema,
  OrderFindManyParamsSchema,
  OrderIdParamsSchema,
} from './order.params.schema';
import { OrderItemSchema, OrderSchema } from './order.schema';

export const ApiOrderIdParamsSchema = OrderIdParamsSchema.extend({});

export const ApiOrderCreateBodySchema = OrderCreateParamsSchema.extend({});

export const ApiOrderListingQuerySchema = OrderFindManyParamsSchema.extend({});

export const ApiOrderItemSchema = OrderItemSchema.extend({
  image: ResponsiveImageSchema,
});

export const ApiOrderSchema = OrderSchema.extend({
  items: z.array(ApiOrderItemSchema),
});
