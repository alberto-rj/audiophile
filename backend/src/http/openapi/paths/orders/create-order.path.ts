import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiOrderCreateBodySchema,
  ApiOrderSchema,
  makeApiResultResponseSchema,
} from '@audiophile/shared';

import {
  internalServerErrorResponse,
  unauthorizedResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  summary: 'Create order',
  description:
    'Creates a new order for the authenticated user using the provided customer, shipping, payment, and order details.',
  request: {
    body: {
      required: true,
      description: 'Customer, shipping, payment, and order details.',
      content: {
        'application/json': {
          schema: ApiOrderCreateBodySchema,
        },
      },
    },
  },
  responses: {
    [StatusCodes.CREATED]: {
      description: 'Order created successfully.',
      content: {
        'application/json': {
          schema: makeApiResultResponseSchema(ApiOrderSchema),
        },
      },
    },
    ...unprocessableEntityResponse,
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
});
