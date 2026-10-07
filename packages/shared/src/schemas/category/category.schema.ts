import { z } from '@/config';

import { ProductDetailedSchema } from '../product/product.schema';

import {
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySlugSchema,
} from './category.base.schema';

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  slug: CategorySlugSchema,
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});

export const CategoryDetailedSchema = CategorySchema.extend({
  products: z.array(ProductDetailedSchema),
});

export const CategoryProductDetailedSchema = z.object({
  name: CategoryNameSchema,
  slug: CategorySlugSchema,
  description: CategoryDescriptionSchema.nullish(),
});
