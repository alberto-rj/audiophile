import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import { ApiCartSchema, makeApiResultResponseSchema } from '@/schemas';

import {
  internalServerErrorResponse,
  unauthorizedResponse,
} from '../common/response';

registry.registerPath({
  method: 'delete',
  path: '/cart',
  tags: ['Cart'],
  summary: 'Remove all cart items',
  description: "Removes all items from the authenticated user's shopping cart.",
  responses: {
    [StatusCodes.OK]: {
      description: 'All cart items removed successfully.',
      content: {
        'application/json': {
          schema: makeApiResultResponseSchema(ApiCartSchema),
        },
      },
    },
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
});
