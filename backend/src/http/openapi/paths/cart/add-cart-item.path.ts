import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiCartAddItemBodySchema,
  ApiCartSchema,
  makeApiResultResponseSchema,
} from '@/schemas';

import {
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'post',
  path: '/cart',
  tags: ['Cart'],
  summary: 'Add item to cart',
  description:
    "Adds a product to the authenticated user's shopping cart. If the product already exists in the cart, its quantity is updated.",
  request: {
    body: {
      required: true,
      description: 'Product identifier and quantity to add.',
      content: {
        'application/json': {
          schema: ApiCartAddItemBodySchema,
        },
      },
    },
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Item added to cart successfully.',
      content: {
        'application/json': {
          schema: makeApiResultResponseSchema(ApiCartSchema),
        },
      },
    },
    ...unprocessableEntityResponse,
    ...notFoundResponse,
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
});
