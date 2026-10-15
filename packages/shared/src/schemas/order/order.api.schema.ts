import { z } from '@/config';

import {
  makeApiPaginationResponseSchema,
  makeApiResultListResponseSchema,
  ResponsiveImageSchema,
} from '../common/common.schema';

import {
  OrderCreateParamsSchema,
  OrderFindManyParamsSchema,
  OrderIdParamsSchema,
} from './order.params.schema';
import { OrderItemSchema, OrderSchema } from './order.schema';

export const ApiOrderIdParamsSchema = OrderIdParamsSchema.extend({});

export const ApiOrderCreateBodySchema = OrderCreateParamsSchema.omit({
  userId: true,
  subtotal: true,
  shipping: true,
  vat: true,
  grandTotal: true,
  items: true,
});

export const ApiOrderListingQuerySchema = OrderFindManyParamsSchema.omit({
  userId: true,
});

export const ApiOrderItemSchema = OrderItemSchema.extend({
  image: ResponsiveImageSchema,
});

export const ApiOrderSchema = OrderSchema.extend({
  items: z.array(ApiOrderItemSchema),
});

export const ApiOrderResultListResponseSchema =
  makeApiResultListResponseSchema(ApiOrderSchema);

export const ApiOrderPaginationResponseSchema =
  makeApiPaginationResponseSchema(ApiOrderSchema);
