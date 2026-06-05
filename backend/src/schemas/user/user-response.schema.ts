import { z } from '@/config';
import { registry } from '@/openapi';

import { ApiUserSchema } from './user.schema';

export const ApiUserResponseSchema = registry.register(
  'UserResponse',
  z
    .object({
      user: ApiUserSchema,
    })
    .openapi('UserResponse'),
);
