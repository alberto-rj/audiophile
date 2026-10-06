import {
  makeApiPaginationResponseSchema,
  makeApiResultResponseSchema,
  ResponsiveImageSchema,
} from '../common/common.schema';

import {
  CategoryCreateParamsSchema,
  CategoryFindManyParamsSchema,
  CategoryIdParamsSchema,
  CategorySlugParamsSchema,
  CategoryUpdateParamsSchema,
} from './category.params.schema';
import { CategorySchema } from './category.schema';

export const ApiCategoryCreateBodySchema = CategoryCreateParamsSchema.extend(
  {},
);

export const ApiCategoryUpdateBodySchema = CategoryUpdateParamsSchema.omit({
  id: true,
});

export const ApiCategoryFindManyQuerySchema =
  CategoryFindManyParamsSchema.extend({});

export const ApiCategoryIdParamsSchema = CategoryIdParamsSchema.extend({});

export const ApiCategorySlugParamsSchema = CategorySlugParamsSchema.extend({});

export const ApiCategorySchema = CategorySchema.extend({
  image: ResponsiveImageSchema,
});

export const ApiCategoryResultListResponseSchema =
  makeApiResultResponseSchema(ApiCategorySchema);

export const ApiCategoryPaginationResponseSchema =
  makeApiPaginationResponseSchema(ApiCategorySchema);
