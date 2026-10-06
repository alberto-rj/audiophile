import { z } from '@/config';

import {
  UserEmailSchema,
  UserNameSchema,
  UserPasswordSchema,
} from '../user/user.base.schema';

export const AuthLoginParamsSchema = z.object({
  email: UserEmailSchema,
  password: UserPasswordSchema,
});

export const AuthRegisterParamsSchema = z.object({
  name: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema,
});
