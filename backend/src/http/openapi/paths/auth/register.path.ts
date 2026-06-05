import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';
import {
  ApiAuthResponseSchema,
  ApiErrorResponseSchema,
  ApiRegisterBodySchema,
} from '@/schemas';

import {
  AuthCookieHeader,
  internalServerErrorResponse,
  unprocessableEntityResponse,
} from '../common/response';

registry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  security: [],
  summary: 'Register a new user',
  description:
    'Registers a new user account and signs the user in by issuing an access token and a refresh token cookie.',
  request: {
    body: {
      required: true,
      description: 'New user account information.',
      content: {
        'application/json': {
          schema: ApiRegisterBodySchema,
        },
      },
    },
  },
  responses: {
    [StatusCodes.CREATED]: {
      description:
        'User account created successfully. An access token is returned and a refresh token cookie is issued.',
      headers: {
        ...AuthCookieHeader,
      },
      content: {
        'application/json': {
          schema: ApiAuthResponseSchema,
        },
      },
    },
    [StatusCodes.CONFLICT]: {
      description:
        'The provided email address is already associated with an existing account.',
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
