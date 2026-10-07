import { z } from '@/config';

import { CategoryIdSchema } from '../category/category.base.schema';
import { CategoryProductDetailedSchema } from '../category/category.schema';

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
import { SuggestionDetailedSchema } from './suggestion.schema';
import { GalleryDetailedSchema } from './gallery.schema';
import { IncludeDetailedSchema } from './include.schema';

export const ProductSchema = z.object({
  id: ProductIdSchema,
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  price: ProductPriceSchema,
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
  price: ProductPriceSchema,
  description: ProductDescriptionSchema.nullish(),
  features: ProductFeaturesSchema,
  includes: z.array(IncludeDetailedSchema),
  category: CategoryProductDetailedSchema,
  gallery: GalleryDetailedSchema,
  suggestions: z.array(SuggestionDetailedSchema),
});

/*

export const ProductOtherSchema = z.object({
  id: ProductIdSchema,
  productId: ProductIdSchema,
});

*/
