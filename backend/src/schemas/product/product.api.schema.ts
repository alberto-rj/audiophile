import { z } from '@/config';

import {
  CategoryIdSchema,
  CategoryNameSchema,
} from '../category/category.base.schema';
import {
  ApiPaginationQuerySchema,
  ResponsiveImageSchema,
} from '../common/common.schema';
import { ApiGallerySchema } from './gallery.api.schema';
import { ApiIncludeSchema } from './include.api.schema';
import {
  ProductDescriptionSchema,
  ProductFeaturesSchema,
  ProductIdSchema,
  ProductImageSchema,
  ProductIsNewSchema,
  ProductNameSchema,
  ProductPriceSchema,
  ProductSlugSchema,
} from './product.base.schema';
import { ProductBaseSchema } from './product.schema';

export const ApiProductCreateBodySchema = z.object({
  image: ProductImageSchema,
  name: ProductNameSchema,
  description: ProductDescriptionSchema.optional(),
  features: ProductFeaturesSchema,
  price: ProductPriceSchema,
  categoryId: CategoryIdSchema,
});

export const ApiProductAddOtherBodySchema = z.object({
  otherId: ProductIdSchema,
});

export const ApiProductIdParamsSchema = z.object({
  id: ProductIdSchema,
});

export const ApiProductSlugParamsSchema = z.object({
  slug: ProductSlugSchema,
});

export const ApiProductSchema = z.object({
  id: ProductIdSchema,
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  isNew: ProductIsNewSchema,
  price: ProductPriceSchema,
  description: ProductDescriptionSchema.nullish(),
  features: ProductFeaturesSchema,
  category: CategoryNameSchema,
  image: ResponsiveImageSchema,
  categoryImage: ResponsiveImageSchema,
  includes: z.array(ApiIncludeSchema),
  gallery: ApiGallerySchema,
  others: z.array(ProductBaseSchema),
});

export const ApiProductFindManyQuerySchema = ApiPaginationQuerySchema;
