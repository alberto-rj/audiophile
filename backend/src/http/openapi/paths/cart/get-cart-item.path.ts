import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import { ApiCartSchema, makeApiResultResponseSchema } from '@/schemas';

import {
  internalServerErrorResponse,
  unauthorizedResponse,
} from '../common/response';

registry.registerPath({
  method: 'get',
  path: '/cart',
  tags: ['Cart'],
  summary: 'Get current cart',
  description: "Retrieves the authenticated user's shopping cart.",
  responses: {
    [StatusCodes.OK]: {
      description: 'Current shopping cart retrieved successfully.',
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
