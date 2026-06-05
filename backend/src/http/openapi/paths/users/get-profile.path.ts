import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import { ApiUserResponseSchema } from '@/schemas';

import {
  internalServerErrorResponse,
  unauthorizedResponse,
} from '../common/response';

registry.registerPath({
  method: 'get',
  path: '/users/me',
  tags: ['Users'],
  summary: 'Get current user profile',
  description:
    'Returns the profile information of the currently authenticated user. A valid access token must be provided in the Authorization header.',
  responses: {
    [StatusCodes.OK]: {
      description: 'Current user profile retrieved successfully.',
      content: {
        'application/json': {
          schema: ApiUserResponseSchema,
        },
      },
    },
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
});
