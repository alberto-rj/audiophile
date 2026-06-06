import { z } from '@/config';

import { ResponsiveImageSchema } from '../common';
import {
  CategoryIdSchema,
  CategoryNameSchema,
} from '../category/category.schema';
import { ApiGallerySchema, GalleryIdSchema } from './gallery.schema';
import { ApiIncludeSchema, IncludeIdSchema } from './include.schema';

export const ProductIdSchema = z.coerce
  .number({
    error: 'id must be a number.',
  })
  .int()
  .positive();

export const ProductSlugSchema = z.string({
  error: 'slug must be a string.',
});

export const ProductNameSchema = z.string({
  error: 'name must be a string.',
});

export const ProductDescriptionSchema = z.string({
  error: 'description must be a string.',
});

export const ProductFeaturesSchema = z.string({
  error: 'features must be a string.',
});

export const ProductIsNewSchema = z
  .enum(['true', 'false'], {
    error: 'isNew must be a "true" or "false".',
  })
  .transform((value) => value === 'true');

export const ProductPriceSchema = z.number({
  error: 'price must be a number.',
});

export const ProductBaseSchema = z.object({
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  image: ResponsiveImageSchema,
});

export const ProductSchema = ProductBaseSchema.extend({
  id: ProductIdSchema,
  isNew: ProductIsNewSchema,
  description: ProductDescriptionSchema,
  features: ProductFeaturesSchema,
  categoryId: CategoryIdSchema,
  includeId: IncludeIdSchema,
  galleryId: GalleryIdSchema,
  otherId: ProductIdSchema,
});

export const ApiProductSchema = ProductBaseSchema.extend({
  id: ProductIdSchema,
  category: CategoryNameSchema,
  categoryImage: ResponsiveImageSchema,
  isNew: ProductIsNewSchema,
  description: ProductDescriptionSchema,
  features: ProductFeaturesSchema,
  includes: z.array(ApiIncludeSchema),
  gallery: ApiGallerySchema,
  others: z.array(ProductBaseSchema),
});
