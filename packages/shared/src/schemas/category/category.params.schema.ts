import { z } from '@/config';

import { LimitSchema, PageSchema } from '../common/common.schema';

import {
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySlugSchema,
} from './category.base.schema';

export const CategoryIdParamsSchema = z.object({
  id: CategoryIdSchema,
});

export const CategorySlugParamsSchema = z.object({
  slug: CategorySlugSchema,
});

export const CategoryCreateParamsSchema = z.object({
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  slug: CategorySlugSchema,
  description: CategoryDescriptionSchema,
});

export const CategoryUpdateParamsSchema = z.object({
  id: CategoryIdSchema,
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});

export const CategoryFindByIdParamsSchema = CategoryIdParamsSchema.extend({});

export const CategoryFindBySlugParamsSchema = CategorySlugParamsSchema.extend(
  {},
);

export const CategoryFindManyParamsSchema = z.object({
  page: PageSchema,
  limit: LimitSchema,
});
