import { z } from '@/config';

import { CategoryNameSchema } from '../category/category.base.schema';
import { ResponsiveImageSchema } from '../common/common.schema';

import { ApiGallerySchema } from './gallery.api.schema';
import { ApiIncludeSchema } from './include.api.schema';
import {
  ProductDescriptionSchema,
  ProductFeaturesSchema,
  ProductIdSchema,
  ProductIsNewSchema,
  ProductNameSchema,
  ProductPriceSchema,
  ProductSlugSchema,
} from './product.base.schema';
import {
  ProductCreateParamsSchema,
  ProductFindManyParamsSchema,
  ProductIdParamsSchema,
  ProductSlugParamsSchema,
} from './product.params.schema';
import { ApiSuggestionSchema } from './suggestion.api.schema';

export const ApiProductCreateBodySchema = ProductCreateParamsSchema.extend({});

export const ApiProductIdParamsSchema = ProductIdParamsSchema.extend({});

export const ApiProductSlugParamsSchema = ProductSlugParamsSchema.extend({});

export const ApiProductSchema = z.object({
  id: ProductIdSchema,
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  price: ProductPriceSchema,
  image: ResponsiveImageSchema,
  isNew: ProductIsNewSchema,
  description: ProductDescriptionSchema.nullish(),
  features: ProductFeaturesSchema,
  category: CategoryNameSchema,
  previewImage: ResponsiveImageSchema,
  includes: z.array(ApiIncludeSchema),
  gallery: ApiGallerySchema,
  suggestions: z.array(ApiSuggestionSchema),
});

export const ApiProductFindManyQuerySchema = ProductFindManyParamsSchema.extend(
  {},
);
