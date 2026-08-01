import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiCartIdParamsSchema,
  ApiCartSchema,
  makeApiResultResponseSchema,
} from '@/schemas';

import {
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
} from '../common/response';

registry.registerPath({
  method: 'delete',
  path: '/cart/{itemId}',
  tags: ['Cart'],
  summary: 'Remove cart item',
  description: "Removes an item from the authenticated user's shopping cart.",
  request: {
    params: ApiCartIdParamsSchema,
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Cart item removed successfully.',
      content: {
        'application/json': {
          schema: makeApiResultResponseSchema(ApiCartSchema),
        },
      },
    },
    ...notFoundResponse,
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
});
