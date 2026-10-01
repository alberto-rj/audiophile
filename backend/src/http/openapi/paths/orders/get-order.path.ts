import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiOrderIdParamsSchema,
  ApiOrderSchema,
  makeApiResultResponseSchema,
} from '@/schemas';

import {
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'get',
  path: '/orders/{id}',
  tags: ['Orders'],
  summary: 'Get order',
  description:
    'Retrieves an order belonging to the authenticated user by its unique identifier.',
  request: {
    params: ApiOrderIdParamsSchema,
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Order retrieved successfully.',
      content: {
        'application/json': {
          schema: makeApiResultResponseSchema(ApiOrderSchema),
        },
      },
    },
    ...unprocessableEntityResponse,
    ...notFoundResponse,
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
});
