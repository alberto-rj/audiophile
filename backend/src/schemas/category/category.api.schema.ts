import { z } from '@/config';

import {
  LimitSchema,
  PageSchema,
  ResponsiveImageSchema,
} from '../common/common.schema';
import {
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySlugSchema,
} from './category.base.schema';

export const ApiCategoryCreateBodySchema = z.object({
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});

export const ApiCategoryUpdateBodySchema = z.object({
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});

export const ApiCategoryPaginationQuerySchema = z.object({
  page: PageSchema,
  limit: LimitSchema,
});

export const ApiCategoryIdParamsSchema = z.object({
  id: CategoryIdSchema,
});

export const ApiCategorySlugParamsSchema = z.object({
  slug: CategorySlugSchema,
});

export const ApiCategorySchema = z.object({
  id: CategoryIdSchema,
  slug: CategorySlugSchema,
  image: ResponsiveImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});
