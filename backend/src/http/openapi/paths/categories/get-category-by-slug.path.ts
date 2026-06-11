import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiCategorySchema,
  ApiCategorySlugParamsSchema,
  ApiErrorResponseSchema,
  makeApiResultResponseSchema,
} from '@/schemas';

import {
  internalServerErrorResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'get',
  path: '/categories/{slug}',
  tags: ['Categories'],
  security: [],
  summary: 'Get category by slug',
  description: 'Returns a category matching the provided slug.',
  request: {
    params: ApiCategorySlugParamsSchema,
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Category retrieved successfully.',
      content: {
        'application/json': {
          schema: makeApiResultResponseSchema(ApiCategorySchema),
        },
      },
    },
    [StatusCodes.NOT_FOUND]: {
      description: 'Category not found.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    ...unprocessableEntityResponse,
    ...internalServerErrorResponse,
  },
});
