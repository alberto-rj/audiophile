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
};

export const notFoundResponse = {
  [StatusCodes.NOT_FOUND]: {
    description: 'The requested resource was not found or is not accessible.',
    content: {
      'application/json': {
        schema: ApiErrorResponseSchema,
      },
    },
  },
};

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
};

export const internalServerErrorResponse = {
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    description: 'An unexpected error occurred while processing the request.',
    content: {
      'application/json': {
        schema: ApiErrorResponseSchema,
      },
    },
  },
};
