import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiCartIdParamsSchema,
  ApiCartSchema,
  ApiCartUpdateItemBodySchema,
  makeApiResultResponseSchema,
} from '@/schemas';

import {
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'patch',
  path: '/cart/{itemId}',
  tags: ['Cart'],
  summary: 'Update cart item',
  description:
    "Updates the quantity of an item in the authenticated user's shopping cart.",
  request: {
    params: ApiCartIdParamsSchema,
    body: {
      required: true,
      description: 'New quantity for the cart item.',
      content: {
        'application/json': {
          schema: ApiCartUpdateItemBodySchema,
        },
      },
    },
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Cart item updated successfully.',
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
