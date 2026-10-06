import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiUserUpdateProfileBodySchema,
  ApiUserResponseSchema,
} from '@audiophile/shared';

import {
  internalServerErrorResponse,
  unauthorizedResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'put',
  path: '/users/me',
  tags: ['Users'],
  summary: 'Update current user profile',
  description:
    'Updates the profile information of the currently authenticated user. A valid access token must be provided in the Authorization header.',
  request: {
    body: {
      required: true,
      description: 'Profile fields to update.',
      content: {
        'application/json': {
          schema: ApiUserUpdateProfileBodySchema,
        },
      },
    },
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Current user profile updated successfully.',
      content: {
        'application/json': {
          schema: ApiUserResponseSchema,
        },
      },
    },
    ...unprocessableEntityResponse,
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
});
