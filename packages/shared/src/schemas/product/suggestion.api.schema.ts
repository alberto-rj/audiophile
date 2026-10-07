import { z } from '@/config';

import { ResponsiveImageSchema } from '../common/common.schema';

import {
  SuggestionCreateParamsSchema,
  SuggestionOtherIdParamsSchema,
  SuggestionProductIdParamsSchema,
} from './suggestion.params.schema';
import { ProductNameSchema, ProductSlugSchema } from './product.base.schema';

export const ApiSuggestionOtherIdParamsSchema =
  SuggestionOtherIdParamsSchema.extend({});

export const ApiSuggestionProductIdParamsSchema =
  SuggestionProductIdParamsSchema.extend({});

export const ApiSuggestionCreateBodySchema =
  SuggestionCreateParamsSchema.extend({});

export const ApiSuggestionSchema = z.object({
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  image: ResponsiveImageSchema,
});
