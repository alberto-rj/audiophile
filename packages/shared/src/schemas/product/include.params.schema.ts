import { z } from '@/config';

import { LimitSchema, PageSchema } from '../common/common.schema';

import {
  IncludeIdSchema,
  IncludeItemSchema,
  IncludeQuantitySchema,
} from './include.base.schema';
import { ProductIdSchema } from './product.base.schema';

export const IncludeIdParamsSchema = z.object({
  id: IncludeIdSchema,
});

export const IncludeCreateParamsSchema = z.object({
  quantity: IncludeQuantitySchema,
  item: IncludeItemSchema,
  productId: ProductIdSchema,
});

export const IncludeFindManyParamsSchema = z.object({
  limit: LimitSchema,
  page: PageSchema,
});
