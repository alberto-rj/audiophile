import { z } from '@/config';

import {
  UserEmailSchema,
  UserNameSchema,
  UserPasswordSchema,
} from '../user/user.schema';

export const ApiRegisterBodySchema = z.object({
  name: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema,
});

export type ApiRegisterBody = z.infer<typeof ApiRegisterBodySchema>;
