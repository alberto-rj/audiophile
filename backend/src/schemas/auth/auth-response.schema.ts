import { z } from '@/config';
import { registry } from '@/http/openapi';

import { ApiUserSchema } from '../user/user.schema';

const AccessTokenSchema = z.string().openapi({
  description: 'Short JWT (15 min). Send via Authorization: Bearer <token>',
  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
});

export const ApiAuthResponseSchema = registry.register(
  'AuthResponse',
  z
    .object({
      accessToken: AccessTokenSchema,
      user: ApiUserSchema,
    })
    .openapi('AuthResponse'),
);

export type ApiAuthResponse = z.infer<typeof ApiAuthResponseSchema>;
