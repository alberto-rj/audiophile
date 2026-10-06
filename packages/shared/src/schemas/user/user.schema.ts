import { z } from '@/config';

import { CreatedAtSchema } from '../common/common.schema';

import {
  UserEmailSchema,
  UserIdSchema,
  UserNameSchema,
  UserPasswordSchema,
} from './user.base.schema';

export const UserSchema = z.object({
  id: UserIdSchema,
  name: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema,
  createdAt: CreatedAtSchema,
});

export const UserSafeSchema = UserSchema.omit({ password: true });

export const UserBasicSchema = UserSchema.pick({
  id: true,
  name: true,
  email: true,
});
