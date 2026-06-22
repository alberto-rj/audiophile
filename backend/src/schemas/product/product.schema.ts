import { z } from '@/config';

import {
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySlugSchema,
} from '../category/category.base.schema';
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
import {
  IncludeItemSchema,
  IncludeQuantitySchema,
} from './include.base.schema';
import { GalleryImageSchema } from './gallery.base.schema';

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

export const ProductDetailedSchema = z.object({
  id: ProductIdSchema,
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  image: ProductImageSchema,
  isNew: ProductIsNewSchema,
  description: ProductDescriptionSchema.nullish(),
  features: ProductFeaturesSchema,
  includes: z.array(
    z.object({
      quantity: IncludeQuantitySchema,
      item: IncludeItemSchema,
    }),
  ),
  category: z.object({
    name: CategoryNameSchema,
    slug: CategorySlugSchema,
    image: CategoryImageSchema,
    description: CategoryDescriptionSchema.nullish(),
  }),
  gallery: z
    .object({
      first: GalleryImageSchema,
      second: GalleryImageSchema,
      third: GalleryImageSchema,
    })
    .nullable(),
  suggestions: z.array(
    z.object({
      name: ProductNameSchema,
      slug: ProductSlugSchema,
      image: ProductImageSchema,
    }),
  ),
});

export const ProductOtherSchema = z.object({
  id: ProductIdSchema,
  productId: ProductIdSchema,
});
