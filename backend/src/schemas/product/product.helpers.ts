import { makeId, parseSchema, toSlug } from '@/helpers';

import {
  ApiProductCreateBodySchema,
  ApiProductIdParamsSchema,
  ApiProductFindManyQuerySchema,
  ApiProductSlugParamsSchema,
  ApiProductAddOtherBodySchema,
} from './product.api.schema';
import type {
  Product,
  ProductAddOtherParams,
  ProductCreateParams,
  ProductDeleteByIdParams,
  ProductDeleteBySlugParams,
  ProductFindByIdParams,
  ProductFindBySlugParams,
  ProductFindManyParams,
} from './product.types';

export function makeProduct({ name, ...rest }: ProductCreateParams): Product {
  const id = makeId();
  const isNew = id % 2 === 0;

  return {
    ...rest,
    id,
    isNew,
    name,
    slug: toSlug(name),
  };
}

export function makeProductAddOtherParams(
  params: unknown,
): ProductAddOtherParams {
  return parseSchema(ApiProductAddOtherBodySchema, params);
}

export function makeProductCreateParams(params: unknown): ProductCreateParams {
  return parseSchema(ApiProductCreateBodySchema, params);
}

export function makeProductFindByIdParams(
  params: unknown,
): ProductFindByIdParams {
  return parseSchema(ApiProductIdParamsSchema, params);
}

export function makeProductFindBySlugParams(
  params: unknown,
): ProductFindBySlugParams {
  return parseSchema(ApiProductSlugParamsSchema, params);
}

export function makeProductDeleteByIdParams(
  params: unknown,
): ProductDeleteByIdParams {
  return parseSchema(ApiProductIdParamsSchema, params);
}

export function makeProductDeleteBySlugParams(
  params: unknown,
): ProductDeleteBySlugParams {
  return parseSchema(ApiProductSlugParamsSchema, params);
}

export function makeProductFindManyParams(
  params: unknown,
): ProductFindManyParams {
  return parseSchema(ApiProductFindManyQuerySchema, params);
}
