import { z } from '@/config';

import {
  IncludeIdSchema,
  IncludeItemSchema,
  IncludeQuantitySchema,
} from './include.base.schema';
import { ProductIdSchema } from './product.base.schema';

export const IncludeSchema = z.object({
  id: IncludeIdSchema,
  quantity: IncludeQuantitySchema,
  item: IncludeItemSchema,
  productId: ProductIdSchema,
});
