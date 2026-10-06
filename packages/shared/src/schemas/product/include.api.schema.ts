import { z } from '@/config';

import {
  IncludeIdSchema,
  IncludeItemSchema,
  IncludeQuantitySchema,
} from './include.base.schema';
import { ApiPaginationQuerySchema } from '../common/common.schema';
import { ProductIdSchema } from './product.base.schema';

export const ApiIncludeSchema = z.object({
  quantity: IncludeQuantitySchema,
  item: IncludeItemSchema,
});

export const ApiIncludeCreateBodySchema = z.object({
  quantity: IncludeQuantitySchema,
  item: IncludeItemSchema,
  productId: ProductIdSchema,
});

export const ApiIncludeIdParamsSchema = z.object({
  id: IncludeIdSchema,
});

export const ApiIncludePaginationQuerySchema = ApiPaginationQuerySchema;
