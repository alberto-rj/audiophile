import { z } from '@/config';

import { ResponsiveImageSchema } from '../common/common.schema';

import {
  SuggestionCreateParamsSchema,
  SuggestionSourceIdParamsSchema,
  SuggestionTargetIdParamsSchema,
} from './suggestion.params.schema';
import { ProductNameSchema, ProductSlugSchema } from './product.base.schema';

export const ApiSuggestionSourceIdParamsSchema =
  SuggestionSourceIdParamsSchema.extend({});

export const ApiSuggestionTargetIdParamsSchema =
  SuggestionTargetIdParamsSchema.extend({});

export const ApiSuggestionCreateBodySchema =
  SuggestionCreateParamsSchema.extend({});

export const ApiSuggestionSchema = z.object({
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  image: ResponsiveImageSchema,
});
