import { parseSchema, toSlug } from '@/helpers';

import type {
  Category,
  CategoryCreateParams,
  CategoryDeleteByIdParams,
  CategoryDeleteBySlugParams,
  CategoryFindByIdParams,
  CategoryFindBySlugParams,
  CategoryUpdateParams,
} from './category.types';
import {
  CategoryCreateParamsSchema,
  CategoryDeleteByIdParamsSchema,
  CategoryDeleteBySlugParamsSchema,
  CategoryFindByIdParamsSchema,
  CategoryFindBySlugParamsSchema,
  CategoryUpdateParamsSchema,
} from './category.schema';

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
  return parseSchema(CategoryCreateParamsSchema, params);
}

export function makeCategoryUpdateParams(
  params: unknown,
): CategoryUpdateParams {
  return parseSchema(CategoryUpdateParamsSchema, params);
}

export function makeCategoryFindByIdParams(
  params: unknown,
): CategoryFindByIdParams {
  return parseSchema(CategoryFindByIdParamsSchema, params);
}

export function makeCategoryFindBySlugParams(
  params: unknown,
): CategoryFindBySlugParams {
  return parseSchema(CategoryFindBySlugParamsSchema, params);
}

export function makeCategoryDeleteByIdParams(
  params: unknown,
): CategoryDeleteByIdParams {
  return parseSchema(CategoryDeleteByIdParamsSchema, params);
}

export function makeCategoryDeleteBySlugParams(
  params: unknown,
): CategoryDeleteBySlugParams {
  return parseSchema(CategoryDeleteBySlugParamsSchema, params);
}
