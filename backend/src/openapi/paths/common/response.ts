import { StatusCodes } from 'http-status-codes';

import {
  ApiErrorResponseSchema,
  ApiValidationErrorResponseSchema,
} from '@/schemas';

export const unauthorizedResponse = {
  [StatusCodes.UNAUTHORIZED]: {
    description:
      'Authentication required. The request does not contain a valid authentication cookie.',
    content: {
      'application/json': {
        schema: ApiErrorResponseSchema,
      },
    },
  },
} as const;

export const notFoundResponse = {
  [StatusCodes.NOT_FOUND]: {
    description: 'The requested resource was not found or is not accessible.',
    content: {
      'application/json': {
        schema: ApiErrorResponseSchema,
      },
    },
  },
} as const;

export const unprocessableEntityResponse = {
  [StatusCodes.UNPROCESSABLE_ENTITY]: {
    description:
      'The request contains validation errors in the path parameters or request body.',
    content: {
      'application/json': {
        schema: ApiValidationErrorResponseSchema,
      },
    },
  },
} as const;

export const internalServerErrorResponse = {
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    description: 'An unexpected error occurred while processing the request.',
    content: {
      'application/json': {
        schema: ApiErrorResponseSchema,
      },
    },
  },
} as const;

export const RefreshTokenCookieHeader = {
  description:
    'Refresh token in httpOnly cookie. Automatically sent by the browser in /auth/refresh and /auth/logout.',
  schema: {
    type: 'string',
    example:
      'refreshToken=abc123; HttpOnly; Secure; SameSite=None; Path=/auth; Max-Age=604800',
  },
} as const;

export const AuthCookieHeader = {
  'Set-Cookie': RefreshTokenCookieHeader,
} as const;
