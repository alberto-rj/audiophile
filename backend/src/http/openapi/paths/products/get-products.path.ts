import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiCategoryPaginationQuerySchema,
  ApiProductSchema,
  makeApiPaginationResponseSchema,
} from '@/schemas';

import {
  internalServerErrorResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  security: [],
  summary: 'Get products',
  description: 'Returns a paginated list of products.',
  request: {
    query: ApiCategoryPaginationQuerySchema,
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Products retrieved successfully.',
      content: {
        'application/json': {
          schema: makeApiPaginationResponseSchema(ApiProductSchema),
        },
      },
    },
    ...unprocessableEntityResponse,
    ...internalServerErrorResponse,
  },
});
