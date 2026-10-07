import { z } from '@/config';

import { CategoryIdSchema } from '../category/category.base.schema';
import { LimitSchema, PageSchema } from '../common/common.schema';

import {
  ProductCategorySchema,
  ProductDescriptionSchema,
  ProductFeaturesSchema,
  ProductIdSchema,
  ProductImageSchema,
  ProductNameSchema,
  ProductPriceSchema,
  ProductSlugSchema,
} from './product.base.schema';

export const ProductCreateParamsSchema = z.object({
  image: ProductImageSchema,
  name: ProductNameSchema,
  description: ProductDescriptionSchema.optional(),
  features: ProductFeaturesSchema,
  price: ProductPriceSchema,
  categoryId: CategoryIdSchema,
});

export const ProductIdParamsSchema = z.object({
  id: ProductIdSchema,
});

export const ProductSlugParamsSchema = z.object({
  slug: ProductSlugSchema,
});

export const ProductFindManyParamsSchema = z.object({
  limit: LimitSchema,
  page: PageSchema,
  category: ProductCategorySchema.optional(),
});
