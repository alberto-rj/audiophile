import { makeId, parseSchema } from '@/helpers';

import {
  ApiIncludeCreateBodySchema,
  ApiIncludeIdParamsSchema,
  ApiIncludePaginationQuerySchema,
} from './include.api.schema';
import type {
  Include,
  IncludeCreateParams,
  IncludeDeleteByIdParams,
  IncludeFindByIdParams,
  IncludeFindManyParams,
} from './include.types';

export function makeInclude({ ...rest }: IncludeCreateParams): Include {
  return {
    ...rest,
    id: makeId(),
  };
}

export function makeIncludeCreateParams(params: unknown): IncludeCreateParams {
  return parseSchema(ApiIncludeCreateBodySchema, params);
}

export function makeIncludeFindByIdParams(
  params: unknown,
): IncludeFindByIdParams {
  return parseSchema(ApiIncludeIdParamsSchema, params);
}

export function makeIncludeDeleteByIdParams(
  params: unknown,
): IncludeDeleteByIdParams {
  return parseSchema(ApiIncludeIdParamsSchema, params);
}

export function makeIncludeFindManyParams(
  params: unknown,
): IncludeFindManyParams {
  return parseSchema(ApiIncludePaginationQuerySchema, params);
}
