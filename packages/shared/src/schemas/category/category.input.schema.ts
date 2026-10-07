import { LimitSchema, PageSchema } from '../common/common.schema';

import { CategoryIncludeProductsSchema } from './category.base.schema';
import {
  CategoryCreateParamsSchema,
  CategoryFindByIdParamsSchema,
  CategoryFindManyParamsSchema,
  CategorySlugParamsSchema,
} from './category.params.schema';

export const CategoryCreateInputSchema = CategoryCreateParamsSchema.extend({});

export const CategoryUpdateInputSchema = CategoryCreateParamsSchema.extend({});

export const CategoryIdInputSchema = CategoryFindByIdParamsSchema.extend({});

export const CategorySlugInputSchema = CategorySlugParamsSchema.extend({});

export const CategoryFindBySlugInputSchema = CategorySlugParamsSchema.extend({
  includeProducts: CategoryIncludeProductsSchema,
  page: PageSchema,
  limit: LimitSchema,
});

export const CategoryFindManyInputSchema = CategoryFindManyParamsSchema.extend(
  {},
);
