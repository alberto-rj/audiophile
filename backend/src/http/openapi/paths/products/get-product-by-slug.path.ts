import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiProductSchema,
  ApiProductSlugParamsSchema,
  ApiErrorResponseSchema,
  makeApiResultResponseSchema,
} from '@/schemas';

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
          schema: makeApiResultResponseSchema(ApiProductSchema),
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
