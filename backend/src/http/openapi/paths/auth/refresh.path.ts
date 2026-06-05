import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import { ApiAuthResponseSchema, ApiLoginBodySchema } from '@/schemas';

import {
  AuthCookieHeader,
  internalServerErrorResponse,
  unauthorizedResponse,
} from '../common/response';

registry.registerPath({
  method: 'post',
  path: '/auth/refresh',
  tags: ['Auth'],
  security: [],
  summary: 'Refresh access token',
  description:
    'Issues a new access token using the refresh token stored in the cookie. On success, the refresh token is rotated and a new refresh token cookie is issued.',
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
        'Token refresh successful. A new access token is returned and the refresh token cookie is updated.',
      headers: {
        ...AuthCookieHeader,
      },
      content: {
        'application/json': {
          schema: ApiAuthResponseSchema,
        },
      },
    },
    ...unauthorizedResponse,
    ...internalServerErrorResponse,
  },
});
