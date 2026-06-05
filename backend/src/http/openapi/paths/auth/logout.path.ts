import { StatusCodes } from 'http-status-codes';

import { registry } from '@/http/openapi';

import { internalServerErrorResponse } from '../common/response';

registry.registerPath({
  method: 'post',
  path: '/auth/logout',
  tags: ['Auth'],
  security: [],
  summary: 'Logout user',
  description:
    'Logs out the user by revoking the refresh token and clearing the refresh token cookie. The operation succeeds even if no refresh token is present.',
  request: {},
  responses: {
    [StatusCodes.NO_CONTENT]: {
      description:
        'Logout completed successfully. The refresh token cookie has been cleared and any existing refresh token has been revoked.',
    },
    ...internalServerErrorResponse,
  },
});
