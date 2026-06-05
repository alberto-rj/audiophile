import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiAuthResponseSchema,
  ApiErrorResponseSchema,
  ApiLoginBodySchema,
} from '@/schemas';

import {
  AuthCookieHeader,
  internalServerErrorResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  security: [],
  summary: 'Login user',
  description:
    'Authenticates a user using email and password. On success, an access token is returned and a refresh token cookie is issued.',
  request: {
    body: {
      required: true,
      description: 'User credentials.',
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
        'Authentication successful. An access token is returned and a refresh token cookie is issued.',
      headers: {
        ...AuthCookieHeader,
      },
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
