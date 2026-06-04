import { StatusCodes } from 'http-status-codes';

import {
  ApiAuthResponseSchema,
  ApiErrorResponseSchema,
  ApiLoginBodySchema,
} from '@/schemas';

import { registry } from '../../openapi';
import {
  internalServerErrorResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  security: [],
  summary: 'Authenticate a user',
  description:
    'Authenticates a user using email and password. On success, an authentication cookie is set, allowing access to protected endpoints.',
  request: {
    body: {
      required: true,
      description: 'User login payload.',
      content: {
        'application/json': {
          schema: ApiLoginBodySchema,
        },
      },
    },
  },
  responses: {
    [StatusCodes.OK]: {
      description:
        'Authentication successful. An authentication cookie is set in the response.',
      content: {
        'application/json': {
          schema: ApiAuthResponseSchema,
        },
      },
    },
    [StatusCodes.UNAUTHORIZED]: {
      description: 'Invalid email or password.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    ...unprocessableEntityResponse,
    ...internalServerErrorResponse,
  },
});
