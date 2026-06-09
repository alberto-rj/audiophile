import { z } from '@/config';

import { ResponsiveImageSchema } from '../common/common.schema';
import {
  CategoryIdSchema,
  CategoryNameSchema,
} from '../category/category.schema';

// Product (start)
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

export const ProductImageSchema = z.string({
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
// Product (end)

// Gallery base (start)
export const GalleryIdSchema = z.coerce.number().int().positive();

export const GalleryImageSchema = z.string();
// Gallery base (end)

// Gallery schemas (start)
export const GallerySchema = z.object({
  id: GalleryIdSchema,
  first: GalleryImageSchema,
  second: GalleryImageSchema,
  third: GalleryImageSchema,
  productId: ProductIdSchema,
});

export const ApiGallerySchema = z.object({
  first: ResponsiveImageSchema,
  second: ResponsiveImageSchema,
  third: ResponsiveImageSchema,
});
// Gallery schemas (end)

// include base (start)
export const IncludeQuantitySchema = z.coerce
  .number({
    error: 'quantity must be a number.',
  })
  .int()
  .positive();

export const IncludeItemSchema = z.string({
  error: 'item must be a string.',
});
// include base (end)

// include (start)
export const IncludeIdSchema = z.coerce.number().int().positive();

export const IncludeSchema = z.object({
  id: IncludeIdSchema,
  quantity: IncludeQuantitySchema,
  item: IncludeItemSchema,
  productId: ProductIdSchema,
});

export const ApiIncludeSchema = IncludeSchema.omit({
  id: true,
  productId: true,
});
// include (end)

// Product (start)
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
// Product (end)
