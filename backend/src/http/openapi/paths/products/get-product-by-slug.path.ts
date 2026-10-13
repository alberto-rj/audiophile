import {
  ApiProductSlugParamsSchema,
  ApiErrorResponseSchema,
  ApiProductResultListResponseSchema,
} from '@audiophile/shared';
import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';

import {
  internalServerErrorResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'get',
  path: '/products/{slug}',
  tags: ['Products'],
  security: [],
  summary: 'Get product by slug',
  description: 'Returns a product matching the provided slug.',
  request: {
    params: ApiProductSlugParamsSchema,
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Product retrieved successfully.',
      content: {
        'application/json': {
          schema: ApiProductResultListResponseSchema,
        },
      },
    },
    [StatusCodes.NOT_FOUND]: {
      description: 'Product not found.',
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
