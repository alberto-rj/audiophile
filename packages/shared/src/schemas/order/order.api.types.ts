import { z } from '@/config';

import type {
  ApiOrderCreateBodySchema,
  ApiOrderSchema,
  ApiOrderIdParamsSchema,
  ApiOrderItemSchema,
  ApiOrderListingQuerySchema,
  ApiOrderResultListResponseSchema,
  ApiOrderPaginationResponseSchema,
} from './order.api.schema';

export type ApiOrderIdParams = z.infer<typeof ApiOrderIdParamsSchema>;

export type ApiOrderListingQuery = z.infer<typeof ApiOrderListingQuerySchema>;

export type ApiOrderCreateBody = z.infer<typeof ApiOrderCreateBodySchema>;

export type ApiOrderItem = z.infer<typeof ApiOrderItemSchema>;

export type ApiOrder = z.infer<typeof ApiOrderSchema>;

export type ApiOrderResultListResponse = z.infer<
  typeof ApiOrderResultListResponseSchema
>;

export type ApiOrderPaginationResponse = z.infer<
  typeof ApiOrderPaginationResponseSchema
>;
