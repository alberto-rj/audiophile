import { z } from '@/config';

import {
  CategoryIdSchema,
  CategoryNameSchema,
} from '../category/category.base.schema';
import { ResponsiveImageSchema } from '../common/common.schema';
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
import { ApiGallerySchema } from './gallery.api.schema';
import { ApiIncludeSchema } from './include.schema';

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
  description: ProductDescriptionSchema,
  features: ProductFeaturesSchema,
  categoryId: CategoryIdSchema,
});

export const ProductOtherSchema = z.object({
  id: ProductIdSchema,
  productId: ProductIdSchema,
});

export const ApiProductSchema = z.object({
  id: ProductIdSchema,
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  isNew: ProductIsNewSchema,
  price: ProductPriceSchema,
  description: ProductDescriptionSchema,
  features: ProductFeaturesSchema,
  category: CategoryNameSchema,
  image: ResponsiveImageSchema,
  categoryImage: ResponsiveImageSchema,
  includes: z.array(ApiIncludeSchema),
  gallery: ApiGallerySchema,
  others: z.array(ProductBaseSchema),
});
