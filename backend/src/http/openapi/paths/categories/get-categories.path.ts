import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiCategoryPaginationQuerySchema,
  ApiCategorySchema,
  makeApiPaginationResponseSchema,
} from '@/schemas';

import {
  internalServerErrorResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'get',
  path: '/categories',
  tags: ['Categories'],
  security: [],
  summary: 'Get categories',
  description: 'Returns a paginated list of product categories.',
  request: {
    query: ApiCategoryPaginationQuerySchema,
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Categories retrieved successfully.',
      content: {
        'application/json': {
          schema: makeApiPaginationResponseSchema(ApiCategorySchema),
        },
      },
    },
    ...unprocessableEntityResponse,
    ...internalServerErrorResponse,
  },
});
