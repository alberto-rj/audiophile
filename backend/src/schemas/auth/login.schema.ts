import { z } from '@/config';
import { registry } from '@/http/openapi';

import { UserEmailSchema, UserPasswordSchema } from '../user/user.schema';

export const ApiLoginBodySchema = registry.register(
  'LoginBody',
  z
    .object({
      email: UserEmailSchema,
      password: UserPasswordSchema,
    })
    .openapi('LoginBody'),
);

export type ApiLoginBody = z.infer<typeof ApiLoginBodySchema>;
