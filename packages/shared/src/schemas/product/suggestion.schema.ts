/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from '@/config';

import {
  ProductIdSchema,
  ProductImageSchema,
  ProductNameSchema,
  ProductSlugSchema,
} from './product.base.schema';

export const SuggestionSchema = z.object({
  sourceId: ProductIdSchema,
  targetId: ProductIdSchema,
});

export const SuggestionDetailedSchema = z.object({
  name: ProductNameSchema,
  slug: ProductSlugSchema,
  image: ProductImageSchema,
});
