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

export const CategoryFindManyInputSchema = CategoryFindManyParamsSchema.extend(
  {},
);
