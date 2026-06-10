import { parseSchema, toSlug } from '@/helpers';

import type {
  Category,
  CategoryCreateParams,
  CategoryDeleteByIdParams,
  CategoryDeleteBySlugParams,
  CategoryFindByIdParams,
  CategoryFindBySlugParams,
  CategoryFindManyParams,
  CategoryUpdateParams,
} from './category.types';
import {
  ApiCategoryCreateBodySchema,
  ApiCategoryIdParamsSchema,
  ApiCategoryPaginationQuerySchema,
  ApiCategorySlugParamsSchema,
  ApiCategoryUpdateBodySchema,
} from './category.api.schema';

export function makeCategory({
  name,
  ...rest
}: CategoryCreateParams): Category {
  return {
    ...rest,
    id: Math.floor(Math.random() * Date.now()),
    slug: toSlug(name),
    name,
  };
}

export function makeCategoryCreateParams(
  params: unknown,
): CategoryCreateParams {
  return parseSchema(ApiCategoryCreateBodySchema, params);
}

export function makeCategoryUpdateBody(params: unknown): CategoryUpdateParams {
  return parseSchema(ApiCategoryUpdateBodySchema, params);
}

export function makeCategoryFindByIdParams(
  params: unknown,
): CategoryFindByIdParams {
  return parseSchema(ApiCategoryIdParamsSchema, params);
}

export function makeCategoryFindBySlugParams(
  params: unknown,
): CategoryFindBySlugParams {
  return parseSchema(ApiCategorySlugParamsSchema, params);
}

export function makeCategoryDeleteByIdParams(
  params: unknown,
): CategoryDeleteByIdParams {
  return parseSchema(ApiCategoryIdParamsSchema, params);
}

export function makeCategoryDeleteBySlugParams(
  params: unknown,
): CategoryDeleteBySlugParams {
  return parseSchema(ApiCategorySlugParamsSchema, params);
}

export function makeCategoryFindManyParams(
  params: unknown,
): CategoryFindManyParams {
  return parseSchema(ApiCategoryPaginationQuerySchema, params);
}
