import { z } from '@/config';
import { registry } from '@/http/openapi';

import {
  UserEmailSchema,
  UserNameSchema,
  UserPasswordSchema,
} from '../user/user.schema';

export const ApiRegisterBodySchema = registry.register(
  'RegisterBody',
  z
    .object({
      name: UserNameSchema,
      email: UserEmailSchema,
      password: UserPasswordSchema,
    })
    .openapi('RegisterBody'),
);

export type ApiRegisterBody = z.infer<typeof ApiRegisterBodySchema>;
