import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiOrderListingQuerySchema,
  ApiOrderSchema,
  makeApiPaginationResponseSchema,
} from '@/schemas';

import {
  internalServerErrorResponse,
  unauthorizedResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'get',
  path: '/orders',
  tags: ['Orders'],
  summary: 'List current user orders',
  description:
    'Retrieves a paginated list of orders belonging to the authenticated user.',
  request: {
    query: ApiOrderListingQuerySchema,
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Orders retrieved successfully.',
      content: {
        'application/json': {
          schema: makeApiPaginationResponseSchema(ApiOrderSchema),
        },
      },
    },
    ...unprocessableEntityResponse,
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
});
