import { z } from '@/config';

import { CategoryIdSchema } from '../category/category.base.schema';
import { ResponsiveImageSchema } from '../common/common.schema';
import {
  ProductDescriptionSchema,
  ProductFeaturesSchema,
  ProductIdSchema,
  ProductImageSchema,
  ProductIsNewSchema,
  ProductNameSchema,
  ProductSlugSchema,
} from './product.base.schema';

export const ProductBaseSchema = z.object({
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  image: ResponsiveImageSchema,
});

export const ProductSchema = z.object({
  id: ProductIdSchema,
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  image: ProductImageSchema,
  isNew: ProductIsNewSchema,
  description: ProductDescriptionSchema.nullish(),
  features: ProductFeaturesSchema,
  categoryId: CategoryIdSchema,
});

export const ProductOtherSchema = z.object({
  id: ProductIdSchema,
  productId: ProductIdSchema,
});
