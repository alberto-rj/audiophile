import { z } from '@/config';

import { parseSchema } from '@/helpers';
import type { UserCreateParams } from '@/repositories';

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

export function makeRegisterPresenter(params: UserCreateParams) {
  return parseSchema<ApiRegisterBody>(ApiRegisterBodySchema, params);
}
