import { z } from '@/config';

import { LimitSchema, PageSchema } from '../common/common.schema';

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

export const UserFindManyParamsSchema = z.object({
  limit: LimitSchema,
  page: PageSchema,
});

export const UserFindByEmailParamsSchema = UserSchema.pick({ email: true });
