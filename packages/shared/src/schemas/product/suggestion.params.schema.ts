/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from '@/config';

import { ProductIdSchema } from './product.base.schema';

export const SuggestionOtherIdParamsSchema = z.object({
  otherId: ProductIdSchema,
});

export const SuggestionProductIdParamsSchema = z.object({
  productId: ProductIdSchema,
});

export const SuggestionCreateParamsSchema = z.object({
  otherId: ProductIdSchema,
  productId: ProductIdSchema,
});
