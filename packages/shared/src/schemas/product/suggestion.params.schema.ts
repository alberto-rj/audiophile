/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from '@/config';

import { ProductIdSchema } from './product.base.schema';

export const SuggestionSourceIdParamsSchema = z.object({
  sourceId: ProductIdSchema,
});

export const SuggestionTargetIdParamsSchema = z.object({
  targetId: ProductIdSchema,
});

export const SuggestionCreateParamsSchema = z.object({
  sourceId: ProductIdSchema,
  targetId: ProductIdSchema,
});
