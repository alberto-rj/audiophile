import { z } from '@/config';

import {
  UserEmailSchema,
  UserIdSchema,
  UserNameSchema,
  UserPasswordSchema,
} from './user.base.schema';
import { UserSchema } from './user.schema';

export const UserIdParamsSchema = z.object({
  id: UserIdSchema,
});

export const UserCreateParamsSchema = z.object({
  name: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema,
});

export const UserUpdateParamsSchema = z.object({
  id: UserIdSchema,
  name: UserNameSchema,
  email: UserEmailSchema,
});

export const UserFindByIdParamsSchema = UserIdParamsSchema.extend({});

export const UserFindByEmailParamsSchema = UserSchema.pick({ email: true });
